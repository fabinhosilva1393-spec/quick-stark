import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetch24hTicker,
  fetchAllDailyKlines,
  fetchKlines,
  verifyStrkSymbol,
} from "@/lib/binance/strkMarket";
import type {
  ConnectionStatus,
  StrkCandle,
  StrkRange,
  StrkTicker,
} from "@/types/strkMarket";
import { RANGE_CONFIG } from "@/types/strkMarket";

type State = {
  range: StrkRange;
  candles: StrkCandle[];
  ticker: StrkTicker | null;
  currentPrice: number | null;
  status: ConnectionStatus;
  loadingHistory: boolean;
  historyError: string | null;
  symbolAvailable: boolean | null;
};

export type StrkMarketApi = State & {
  setRange: (r: StrkRange) => void;
  baselinePrice: number | null;
  absoluteChange: number | null;
  percentageChange: number | null;
  retry: () => void;
};

export function useStrkBinanceMarket(initialRange: StrkRange = "1W"): StrkMarketApi {
  const [range, setRange] = useState<StrkRange>(initialRange);
  const [candles, setCandles] = useState<StrkCandle[]>([]);
  const [ticker, setTicker] = useState<StrkTicker | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [symbolAvailable, setSymbolAvailable] = useState<boolean | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<number>(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wsRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountedRef = useRef(false);
  const requestSeqRef = useRef(0);

  // Verify symbol once
  useEffect(() => {
    let cancelled = false;
    verifyStrkSymbol().then((ok) => {
      if (!cancelled) setSymbolAvailable(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Load history + open WebSocket when range changes / retry
  useEffect(() => {
    if (symbolAvailable !== true) return;
    unmountedRef.current = false;
    const seq = ++requestSeqRef.current;
    const controller = new AbortController();
    setLoadingHistory(true);
    setHistoryError(null);

    const cfg = RANGE_CONFIG[range];

    const load = async () => {
      try {
        const [hist, tk] = await Promise.all([
          cfg.loadAll
            ? fetchAllDailyKlines(controller.signal)
            : fetchKlines(cfg.interval, cfg.limit, controller.signal),
          fetch24hTicker(controller.signal),
        ]);
        if (seq !== requestSeqRef.current) return;
        setCandles(hist);
        if (tk) {
          setTicker(tk);
          setCurrentPrice(tk.price);
        } else if (hist.length > 0) {
          setCurrentPrice(hist[hist.length - 1].close);
        }
        setLoadingHistory(false);
      } catch (err) {
        if (seq !== requestSeqRef.current) return;
        if ((err as Error).name === "AbortError") return;
        setHistoryError("Could not load STRK market history");
        setLoadingHistory(false);
      }
    };

    void load();

    // WebSocket
    const openSocket = () => {
      if (unmountedRef.current) return;
      const streams = `strkusdt@ticker/strkusdt@kline_${cfg.interval}`;
      const url = `wss://stream.binance.com:443/stream?streams=${streams}`;
      let ws: WebSocket;
      try {
        ws = new WebSocket(url);
      } catch {
        scheduleReconnect();
        return;
      }
      wsRef.current = ws;
      setStatus(reconnectRef.current === 0 ? "connecting" : "reconnecting");

      ws.onopen = () => {
        reconnectRef.current = 0;
        setStatus("live");
        if (wsRotateRef.current) clearTimeout(wsRotateRef.current);
        wsRotateRef.current = setTimeout(() => {
          try {
            ws.close(1000, "rotate");
          } catch {
            /* noop */
          }
        }, (23 * 60 + 50) * 60 * 1000);
      };

      ws.onmessage = (ev: MessageEvent) => {
        try {
          const parsed = JSON.parse(String(ev.data)) as {
            stream?: string;
            data?: Record<string, unknown>;
          };
          if (!parsed || typeof parsed !== "object" || !parsed.stream || !parsed.data)
            return;
          const stream = parsed.stream;
          const data = parsed.data;
          if (stream.endsWith("@ticker")) {
            const price = Number(data.c);
            if (!Number.isFinite(price) || price <= 0) return;
            setCurrentPrice(price);
            setTicker({
              price,
              priceChange24h: Number(data.p),
              percentChange24h: Number(data.P),
              high24h: Number(data.h),
              low24h: Number(data.l),
              baseVolume24h: Number(data.v),
              quoteVolume24h: Number(data.q),
              eventTimeMs: Number(data.E),
            });
          } else if (stream.includes("@kline_")) {
            const k = data.k as Record<string, unknown> | undefined;
            if (!k) return;
            const timeMs = Number(k.t);
            const open = Number(k.o);
            const high = Number(k.h);
            const low = Number(k.l);
            const close = Number(k.c);
            const closeTimeMs = Number(k.T);
            if (
              !Number.isFinite(timeMs) ||
              !Number.isFinite(open) ||
              !Number.isFinite(close) ||
              open <= 0 ||
              close <= 0 ||
              high < low
            )
              return;
            const candle: StrkCandle = {
              timeMs,
              timeSeconds: Math.floor(timeMs / 1000),
              open,
              high,
              low,
              close,
              volume: Number(k.v) || 0,
              quoteVolume: Number(k.q) || 0,
              closeTimeMs,
              trades: Number(k.n) || 0,
            };
            setCandles((prev) => {
              if (prev.length === 0) return [candle];
              const last = prev[prev.length - 1];
              if (candle.timeMs === last.timeMs) {
                const next = prev.slice(0, -1);
                next.push(candle);
                return next;
              }
              if (candle.timeMs > last.timeMs) {
                return [...prev, candle];
              }
              return prev;
            });
            setCurrentPrice(close);
          }
        } catch {
          /* ignore malformed */
        }
      };

      ws.onerror = () => {
        /* onclose will handle */
      };

      ws.onclose = () => {
        if (unmountedRef.current) return;
        if (wsRotateRef.current) clearTimeout(wsRotateRef.current);
        scheduleReconnect();
      };
    };

    const scheduleReconnect = () => {
      if (unmountedRef.current) return;
      if (reconnectTimerRef.current) return;
      setStatus("reconnecting");
      const attempt = reconnectRef.current;
      const delay = Math.min(30000, 1000 * Math.pow(2, attempt));
      reconnectRef.current = attempt + 1;
      reconnectTimerRef.current = setTimeout(() => {
        reconnectTimerRef.current = null;
        openSocket();
      }, delay);
    };

    openSocket();

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const ws = wsRef.current;
      if (!ws || ws.readyState === WebSocket.CLOSED) {
        openSocket();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      unmountedRef.current = true;
      controller.abort();
      document.removeEventListener("visibilitychange", onVisible);
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (wsRotateRef.current) {
        clearTimeout(wsRotateRef.current);
        wsRotateRef.current = null;
      }
      reconnectRef.current = 0;
      const ws = wsRef.current;
      if (ws) {
        ws.onopen = ws.onmessage = ws.onerror = ws.onclose = null;
        try {
          ws.close(1000, "range-change");
        } catch {
          /* noop */
        }
        wsRef.current = null;
      }
    };
  }, [range, symbolAvailable, retryToken]);

  const retry = useCallback(() => setRetryToken((n) => n + 1), []);

  const baselinePrice =
    candles.length > 0 && Number.isFinite(candles[0].open) && candles[0].open > 0
      ? candles[0].open
      : null;
  const absoluteChange =
    baselinePrice != null && currentPrice != null
      ? currentPrice - baselinePrice
      : null;
  const percentageChange =
    baselinePrice != null && currentPrice != null
      ? ((currentPrice - baselinePrice) / baselinePrice) * 100
      : null;

  return {
    range,
    candles,
    ticker,
    currentPrice,
    status,
    loadingHistory,
    historyError,
    symbolAvailable,
    setRange,
    baselinePrice,
    absoluteChange,
    percentageChange,
    retry,
  };
}
