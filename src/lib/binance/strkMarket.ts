import type {
  BinanceSpotInterval,
  StrkCandle,
  StrkTicker,
} from "@/types/strkMarket";

const BASE = "https://data-api.binance.vision";
export const SYMBOL = "STRKUSDT";

let symbolVerified: boolean | null = null;

export async function verifyStrkSymbol(signal?: AbortSignal): Promise<boolean> {
  if (symbolVerified !== null) return symbolVerified;
  try {
    const res = await fetch(
      `${BASE}/api/v3/exchangeInfo?symbol=${SYMBOL}`,
      { signal }
    );
    if (!res.ok) return (symbolVerified = false);
    const json = (await res.json()) as unknown;
    if (!json || typeof json !== "object") return (symbolVerified = false);
    const arr = (json as { symbols?: unknown[] }).symbols;
    if (!Array.isArray(arr) || arr.length === 0) return (symbolVerified = false);
    const s = arr[0] as {
      symbol?: string;
      status?: string;
      baseAsset?: string;
      quoteAsset?: string;
    };
    const ok =
      s.symbol === "STRKUSDT" &&
      s.status === "TRADING" &&
      s.baseAsset === "STRK" &&
      s.quoteAsset === "USDT";
    return (symbolVerified = ok);
  } catch {
    return false;
  }
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function normalizeCandle(raw: unknown): StrkCandle | null {
  if (!Array.isArray(raw) || raw.length < 9) return null;
  const timeMs = num(raw[0]);
  const open = num(raw[1]);
  const high = num(raw[2]);
  const low = num(raw[3]);
  const close = num(raw[4]);
  const volume = num(raw[5]);
  const closeTimeMs = num(raw[6]);
  const quoteVolume = num(raw[7]);
  const trades = num(raw[8]);
  if (
    !Number.isFinite(timeMs) ||
    !Number.isFinite(open) ||
    !Number.isFinite(high) ||
    !Number.isFinite(low) ||
    !Number.isFinite(close) ||
    !Number.isFinite(closeTimeMs) ||
    open <= 0 ||
    close <= 0 ||
    high < low
  ) {
    return null;
  }
  return {
    timeMs,
    timeSeconds: Math.floor(timeMs / 1000),
    open,
    high,
    low,
    close,
    volume: Number.isFinite(volume) ? volume : 0,
    quoteVolume: Number.isFinite(quoteVolume) ? quoteVolume : 0,
    closeTimeMs,
    trades: Number.isFinite(trades) ? trades : 0,
  };
}

function dedupeAndSort(candles: StrkCandle[]): StrkCandle[] {
  const map = new Map<number, StrkCandle>();
  for (const c of candles) map.set(c.timeMs, c);
  return Array.from(map.values()).sort((a, b) => a.timeMs - b.timeMs);
}

export async function fetchKlinesForSymbol(
  symbol: string,
  interval: BinanceSpotInterval,
  limit: number,
  signal?: AbortSignal,
  startTime?: number
): Promise<StrkCandle[]> {
  const url = new URL(`${BASE}/api/v3/klines`);
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);
  url.searchParams.set("limit", String(limit));
  if (startTime) url.searchParams.set("startTime", String(startTime));
  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`klines ${res.status}`);
  const raw = (await res.json()) as unknown;
  if (!Array.isArray(raw)) throw new Error("klines invalid");
  const out: StrkCandle[] = [];
  for (const r of raw) {
    const c = normalizeCandle(r);
    if (c) out.push(c);
  }
  return dedupeAndSort(out);
}

export async function fetchKlines(
  interval: BinanceSpotInterval,
  limit: number,
  signal?: AbortSignal,
  startTime?: number
): Promise<StrkCandle[]> {
  return fetchKlinesForSymbol(SYMBOL, interval, limit, signal, startTime);
}


export async function fetchAllDailyKlines(
  signal?: AbortSignal
): Promise<StrkCandle[]> {
  const all: StrkCandle[] = [];
  let startTime: number | undefined = undefined;
  const seen = new Set<number>();
  for (let i = 0; i < 10; i++) {
    const batch = await fetchKlines("1d", 1000, signal, startTime);
    if (batch.length === 0) break;
    let added = 0;
    for (const c of batch) {
      if (!seen.has(c.timeMs)) {
        seen.add(c.timeMs);
        all.push(c);
        added++;
      }
    }
    if (added === 0) break;
    const last = batch[batch.length - 1];
    startTime = last.closeTimeMs + 1;
    if (batch.length < 1000) break;
  }
  return dedupeAndSort(all);
}

export async function fetch24hTicker(
  signal?: AbortSignal
): Promise<StrkTicker | null> {
  try {
    const res = await fetch(
      `${BASE}/api/v3/ticker/24hr?symbol=${SYMBOL}`,
      { signal }
    );
    if (!res.ok) return null;
    const j = (await res.json()) as Record<string, unknown>;
    const price = num(j.lastPrice);
    if (!Number.isFinite(price) || price <= 0) return null;
    return {
      price,
      priceChange24h: num(j.priceChange),
      percentChange24h: num(j.priceChangePercent),
      high24h: num(j.highPrice),
      low24h: num(j.lowPrice),
      baseVolume24h: num(j.volume),
      quoteVolume24h: num(j.quoteVolume),
      eventTimeMs: num(j.closeTime),
    };
  } catch {
    return null;
  }
}

export function formatCompactVolume(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  const abs = Math.abs(v);
  if (abs >= 1e12) return (v / 1e12).toFixed(2) + "T";
  if (abs >= 1e9) return (v / 1e9).toFixed(2) + "B";
  if (abs >= 1e6) return (v / 1e6).toFixed(2) + "M";
  if (abs >= 1e3) return (v / 1e3).toFixed(2) + "K";
  return v.toFixed(2);
}

export function formatPrice(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  const abs = Math.abs(v);
  const decimals = abs >= 100 ? 2 : abs >= 1 ? 4 : abs >= 0.01 ? 5 : 6;
  return v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}

export function formatSignedPrice(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  return `${sign}$${formatPrice(Math.abs(v))}`;
}

export function formatSignedPct(v: number | null | undefined): string {
  if (v == null || !Number.isFinite(v)) return "—";
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  return `${sign}${Math.abs(v).toFixed(2)}%`;
}
