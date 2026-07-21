import { useEffect, useState } from "react";
import { ArrowLeftRight, Maximize2, RefreshCw } from "lucide-react";
import { useStrkBinanceMarket } from "@/hooks/useStrkBinanceMarket";
import {
  formatCompactVolume,
  formatPrice,
  formatSignedPct,
  formatSignedPrice,
} from "@/lib/binance/strkMarket";
import type { StrkRange } from "@/types/strkMarket";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StrkLiveChart } from "./StrkLiveChart";
import { StrkComparePopover } from "./StrkComparePopover";
import { StrkExpandedChart } from "./StrkExpandedChart";

const RANGES: StrkRange[] = ["24h", "1W", "1M", "3M", "1Y", "All"];

export function StarknetMarketView() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const market = useStrkBinanceMarket("1W");
  const [expanded, setExpanded] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

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
  const priceTint =
    percentageChange == null
      ? "is-neutral"
      : percentageChange > 0
        ? "is-pos"
        : percentageChange < 0
          ? "is-neg"
          : "is-neutral";

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
      <div className="strk-market-header">
        <div className="min-w-0">
          <div className="strk-market-asset">Starknet</div>
          <div className="strk-market-pair">STRK / USDT · Binance Spot</div>
        </div>
        <div className="strk-market-status" aria-live="polite">
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
      </div>

      <div className="strk-market-price-row">
        <div className={`strk-market-price ${priceTint}`}>
          ${formatPrice(currentPrice)}
        </div>
        <div className={`strk-market-change ${pos ? "is-pos" : "is-neg"}`}>
          <span>{formatSignedPrice(absoluteChange)}</span>
          <span className="strk-market-change-pct">
            {formatSignedPct(percentageChange)} · {range}
          </span>
        </div>
      </div>

      <div className="strk-market-toolbar" role="toolbar" aria-label="Range and chart tools">
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
              className="strk-tool-btn"
              aria-expanded={compareOpen}
              aria-controls="strk-usdt-compare-panel"
              aria-label="Compare STRK and USDT"
            >
              <ArrowLeftRight size={13} aria-hidden="true" />
              <span>Compare</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="strk-compare-popover-content p-0 border-0 bg-transparent shadow-none"
          >
            <StrkComparePopover
              currentPrice={currentPrice}
              percentageChange={percentageChange}
              range={range}
            />
          </PopoverContent>
        </Popover>
        <button
          type="button"
          className="strk-tool-btn"
          title="Expand STRK chart"
          aria-label="Open large Starknet market chart"
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
            height={280}
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
