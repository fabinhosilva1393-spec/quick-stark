export type StrkRange = "24h" | "1W" | "1M" | "3M" | "1Y" | "All";

export type BinanceSpotInterval = "5m" | "1h" | "4h" | "12h" | "1d";

export type StrkCandle = {
  timeMs: number;
  timeSeconds: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume: number;
  closeTimeMs: number;
  trades: number;
};

export type StrkTicker = {
  price: number;
  priceChange24h: number;
  percentChange24h: number;
  high24h: number;
  low24h: number;
  baseVolume24h: number;
  quoteVolume24h: number;
  eventTimeMs: number;
};

export type ConnectionStatus = "connecting" | "live" | "reconnecting" | "offline";

export type RangeConfig = {
  interval: BinanceSpotInterval;
  limit: number;
  loadAll?: boolean;
};

export const RANGE_CONFIG: Record<StrkRange, RangeConfig> = {
  "24h": { interval: "5m", limit: 288 },
  "1W": { interval: "1h", limit: 168 },
  "1M": { interval: "4h", limit: 180 },
  "3M": { interval: "12h", limit: 180 },
  "1Y": { interval: "1d", limit: 365 },
  All: { interval: "1d", limit: 1000, loadAll: true },
};
