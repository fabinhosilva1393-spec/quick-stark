import { useEffect, useRef, useState } from "react";
import { RefreshCw, GitCompareArrows, X, Check, Maximize2 } from "lucide-react";
import { StrkExpandedChart } from "./StrkExpandedChart";
import { useStrkBinanceMarket } from "@/hooks/useStrkBinanceMarket";
import {
  fetchKlinesForSymbol,
  formatCompactVolume,
  formatPrice,
  formatSignedPct,
  formatSignedPrice,
} from "@/lib/binance/strkMarket";
import type { StrkCandle, StrkRange } from "@/types/strkMarket";
import { RANGE_CONFIG } from "@/types/strkMarket";
import { StrkLiveChart } from "./StrkLiveChart";

const RANGES: StrkRange[] = ["24h", "1W", "1M", "3M", "1Y", "All"];

type CompareAsset = { symbol: string; label: string; name: string };
const COMPARE_ASSETS: CompareAsset[] = [
  { symbol: "BTCUSDT", label: "BTC", name: "Bitcoin" },
  { symbol: "ETHUSDT", label: "ETH", name: "Ethereum" },
  { symbol: "SOLUSDT", label: "SOL", name: "Solana" },
  { symbol: "BNBUSDT", label: "BNB", name: "BNB" },
];

function pctChange(candles: StrkCandle[]): number | null {
  if (candles.length < 2) return null;
  const base = candles[0].open > 0 ? candles[0].open : candles[0].close;
  const last = candles[candles.length - 1].close;
  if (!base || !Number.isFinite(base) || !Number.isFinite(last)) return null;
  return ((last - base) / base) * 100;
}

export function StarknetMarketView() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const market = useStrkBinanceMarket("1W");

  const {
    range,
    setRange,
    candles,
    currentPrice,
    baselinePrice,
    absoluteChange,
    percentageChange,
    ticker,
    status,
    loadingHistory,
    historyError,
    symbolAvailable,
    retry,
  } = market;

  const pos = (percentageChange ?? 0) >= 0;

  // Compare state
  const [compareOpen, setCompareOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [compareAsset, setCompareAsset] = useState<CompareAsset | null>(null);
  const [compareCandles, setCompareCandles] = useState<StrkCandle[] | null>(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);
  const compareMenuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!compareOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!compareMenuRef.current?.contains(e.target as Node)) setCompareOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [compareOpen]);

  // Fetch compare candles whenever asset or range changes
  useEffect(() => {
    if (!compareAsset) {
      setCompareCandles(null);
      setCompareError(null);
      return;
    }
    const controller = new AbortController();
    const cfg = RANGE_CONFIG[range];
    setCompareLoading(true);
    setCompareError(null);
    fetchKlinesForSymbol(compareAsset.symbol, cfg.interval, cfg.limit, controller.signal)
      .then((c) => {
        setCompareCandles(c);
        setCompareLoading(false);
      })
      .catch((err) => {
        if ((err as Error).name === "AbortError") return;
        setCompareError(`Could not load ${compareAsset.label} data`);
        setCompareLoading(false);
      });
    return () => controller.abort();
  }, [compareAsset, range]);

  const comparePct = compareCandles ? pctChange(compareCandles) : null;
  const strkPctInWindow = pctChange(candles);
  const relative =
    strkPctInWindow != null && comparePct != null ? strkPctInWindow - comparePct : null;

  // Price flash on tick (respects prefers-reduced-motion via CSS)
  const prevPriceRef = useRef<number | null>(null);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  useEffect(() => {
    if (currentPrice == null) return;
    const prev = prevPriceRef.current;
    if (prev != null && currentPrice !== prev) {
      setFlash(currentPrice > prev ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 320);
      prevPriceRef.current = currentPrice;
      return () => clearTimeout(t);
    }
    prevPriceRef.current = currentPrice;
  }, [currentPrice]);

  if (symbolAvailable === false) {
    return (
      <div className="strk-market">
        <div className="strk-market-header">
          <div>
            <div className="strk-market-asset">Starknet</div>
            <div className="strk-market-pair">STRK / USDT · Binance Spot</div>
          </div>
        </div>
        <div className="strk-market-empty">STRK market temporarily unavailable</div>
      </div>
    );
  }

  const compareActive = !!(compareAsset && compareCandles && compareCandles.length > 0);

  return (
    <div className="strk-market">
      <div className="strk-market-panel">
        <div className="strk-market-header">
          <div className="min-w-0">
            <div className="strk-market-asset">Starknet</div>
            <div className="strk-market-pair">STRK / USDT · Binance Spot</div>
          </div>
          <div className="strk-market-status-block" aria-live="polite">
            <div className="strk-market-status">
              <span className={`strk-dot strk-dot-${status}`} aria-hidden="true" />
              <span className="strk-status-label">
                {status === "live"
                  ? "Live"
                  : status === "connecting"
                    ? "Connecting"
                    : status === "reconnecting"
                      ? "Reconnecting"
                      : "Offline"}
              </span>
            </div>
            <div className="strk-status-sub">Updated just now</div>
          </div>
        </div>

        <div className="strk-market-price-row">
          <div className={`strk-market-price ${flash ? `is-flash-${flash}` : ""}`}>
            ${formatPrice(currentPrice)}
          </div>
          <div className={`strk-market-change ${pos ? "is-pos" : "is-neg"}`}>
            <span className="strk-market-change-abs">{formatSignedPrice(absoluteChange)}</span>
            <span className="strk-market-change-pct">
              {formatSignedPct(percentageChange)} · {range}
            </span>
          </div>
        </div>

        <div className="strk-market-toolbar" role="toolbar" aria-label="Chart controls">
          <div className="strk-range-group" role="group" aria-label="Time range">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                className={`strk-range-btn ${range === r ? "is-active" : ""}`}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="strk-toolbar-spacer" />
          <div ref={compareMenuRef} style={{ position: "relative" }}>
            <button
              type="button"
              className="strk-tool-btn"
              aria-haspopup="menu"
              aria-expanded={compareOpen}
              onClick={() => setCompareOpen((o) => !o)}
            >
              <GitCompareArrows size={13} aria-hidden="true" />
              <span>
                {compareAsset ? `Compare · STRK / ${compareAsset.label}` : "Compare"}
              </span>
            </button>
            {compareOpen ? (
              <div className="strk-compare-menu" role="menu">
                <div className="strk-compare-menu-title">Compare STRK with</div>
                {COMPARE_ASSETS.map((a) => {
                  const active = compareAsset?.symbol === a.symbol;
                  return (
                    <button
                      key={a.symbol}
                      type="button"
                      role="menuitemradio"
                      aria-checked={active}
                      className={`strk-compare-menu-item ${active ? "is-active" : ""}`}
                      onClick={() => {
                        setCompareAsset(a);
                        setCompareOpen(false);
                      }}
                    >
                      <span className="strk-compare-menu-label">
                        <span className="strk-compare-menu-ticker">{a.label}</span>
                        <span className="strk-compare-menu-name">{a.name}</span>
                      </span>
                      {active ? <Check size={13} aria-hidden="true" /> : null}
                    </button>
                  );
                })}
                {compareAsset ? (
                  <button
                    type="button"
                    role="menuitem"
                    className="strk-compare-menu-item strk-compare-menu-clear"
                    onClick={() => {
                      setCompareAsset(null);
                      setCompareOpen(false);
                    }}
                  >
                    <X size={13} aria-hidden="true" />
                    <span>Remove comparison</span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {compareActive ? (
          <div className="strk-compare-legend" aria-live="polite">
            <div className="strk-compare-legend-item">
              <span className="strk-compare-swatch" style={{ background: "#EC7B69" }} />
              <span className="strk-compare-legend-label">STRK</span>
              <span className={`strk-compare-legend-pct ${(strkPctInWindow ?? 0) >= 0 ? "is-pos" : "is-neg"}`}>
                {formatSignedPct(strkPctInWindow)}
              </span>
            </div>
            <div className="strk-compare-legend-item">
              <span className="strk-compare-swatch" style={{ background: "#7CA8FF" }} />
              <span className="strk-compare-legend-label">{compareAsset!.label}</span>
              <span className={`strk-compare-legend-pct ${(comparePct ?? 0) >= 0 ? "is-pos" : "is-neg"}`}>
                {formatSignedPct(comparePct)}
              </span>
            </div>
            <div className="strk-compare-legend-rel">
              <span>Relative</span>
              <span className={`strk-compare-legend-pct ${(relative ?? 0) >= 0 ? "is-pos" : "is-neg"}`}>
                {formatSignedPct(relative)}
              </span>
              <span className="strk-compare-legend-range">· {range}</span>
            </div>
          </div>
        ) : null}

        <div className="strk-market-chart-wrap">
          {mounted ? (
            <StrkLiveChart
              candles={candles}
              baselinePrice={baselinePrice}
              currentPrice={currentPrice}
              height={340}
              compareCandles={compareActive ? compareCandles : null}
              compareLabel={compareAsset?.label ?? null}
            />
          ) : (
            <div className="strk-chart-skeleton" aria-hidden="true" />
          )}
          {(loadingHistory || compareLoading) && candles.length > 0 ? (
            <div className="strk-chart-overlay" aria-hidden="true" />
          ) : null}
          {loadingHistory && candles.length === 0 ? (
            <div className="strk-chart-skeleton" aria-hidden="true" />
          ) : null}
          {historyError || compareError ? (
            <div className="strk-chart-error" role="alert">
              <span>{historyError ?? compareError}</span>
              <button type="button" onClick={retry} className="strk-tool-btn">
                <RefreshCw size={12} aria-hidden="true" />
                Retry
              </button>
            </div>
          ) : null}
        </div>

        <div className="strk-market-stats">
          <div>
            <div className="strk-stat-label">24H HIGH</div>
            <div className="strk-stat-value">${formatPrice(ticker?.high24h ?? null)}</div>
          </div>
          <div>
            <div className="strk-stat-label">24H LOW</div>
            <div className="strk-stat-value">${formatPrice(ticker?.low24h ?? null)}</div>
          </div>
          <div>
            <div className="strk-stat-label">24H VOLUME</div>
            <div className="strk-stat-value">
              ${formatCompactVolume(ticker?.quoteVolume24h ?? null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
