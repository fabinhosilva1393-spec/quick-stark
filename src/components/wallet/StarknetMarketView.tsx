import { useEffect, useRef, useState } from "react";
import { RefreshCw, ArrowLeftRight, Maximize2 } from "lucide-react";
import { StrkExpandedChart } from "./StrkExpandedChart";
import { StrkComparePopover } from "./StrkComparePopover";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStrkBinanceMarket } from "@/hooks/useStrkBinanceMarket";
import {
  formatCompactVolume,
  formatPrice,
  formatSignedPct,
  formatSignedPrice,
} from "@/lib/binance/strkMarket";
import type { StrkRange } from "@/types/strkMarket";
import { StrkLiveChart } from "./StrkLiveChart";

const RANGES: StrkRange[] = ["24h", "1W", "1M", "3M", "1Y", "All"];

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

  const [compareOpen, setCompareOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
          <Popover open={compareOpen} onOpenChange={setCompareOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`strk-tool-btn strk-compare-trigger ${compareOpen ? "is-open" : ""}`}
                aria-label="Compare STRK and USDT"
                aria-expanded={compareOpen}
                aria-controls="strk-usdt-compare-panel"
              >
                <ArrowLeftRight size={13} aria-hidden="true" />
                <span>Compare</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="strk-compare-popover-content"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <StrkComparePopover
                currentPrice={currentPrice}
                selectedRangeChangePercent={percentageChange}
                selectedRange={range}
                connectionStatus={status}
                onClose={() => setCompareOpen(false)}
              />
            </PopoverContent>
          </Popover>
          <button
            type="button"
            className="strk-tool-btn"
            aria-label="Expand chart"
            aria-expanded={expanded}
            aria-controls="expanded-market-chart"
            onClick={() => setExpanded(true)}
          >
            <Maximize2 size={13} aria-hidden="true" />
            <span>Expand</span>
          </button>
        </div>

        <div className="strk-market-chart-wrap">
          {mounted ? (
            <StrkLiveChart
              candles={candles}
              baselinePrice={baselinePrice}
              currentPrice={currentPrice}
              height={340}
            />
          ) : (
            <div className="strk-chart-skeleton" aria-hidden="true" />
          )}
          {loadingHistory && candles.length > 0 ? (
            <div className="strk-chart-overlay" aria-hidden="true" />
          ) : null}
          {loadingHistory && candles.length === 0 ? (
            <div className="strk-chart-skeleton" aria-hidden="true" />
          ) : null}
          {historyError ? (
            <div className="strk-chart-error" role="alert">
              <span>{historyError}</span>
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
      <StrkExpandedChart
        open={expanded}
        onOpenChange={setExpanded}
        candles={candles}
        currentPrice={currentPrice}
        baselinePrice={baselinePrice}
        absoluteChange={absoluteChange}
        percentageChange={percentageChange}
        range={range}
      />
    </div>
  );
}
