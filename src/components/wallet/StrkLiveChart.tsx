import { useEffect, useRef } from "react";
import {
  BaselineSeries,
  LineSeries,
  createChart,
  LineStyle,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
  type IPriceLine,
} from "lightweight-charts";
import type { StrkCandle } from "@/types/strkMarket";

type Props = {
  candles: StrkCandle[];
  baselinePrice: number | null;
  currentPrice: number | null;
  height?: number;
  compareCandles?: StrkCandle[] | null;
  compareLabel?: string | null;
};

const MAIN_COMPARE_COLOR = "#EC7B69"; // apricot
const COMPARE_COLOR = "#7CA8FF"; // cool blue

function toPctSeries(candles: StrkCandle[]) {
  if (candles.length === 0) return [] as { time: UTCTimestamp; value: number }[];
  const base = candles[0].open > 0 ? candles[0].open : candles[0].close;
  if (!base || !Number.isFinite(base)) return [];
  return candles.map((c) => ({
    time: c.timeSeconds as UTCTimestamp,
    value: ((c.close - base) / base) * 100,
  }));
}

export function StrkLiveChart({
  candles,
  baselinePrice,
  currentPrice,
  height = 290,
  compareCandles = null,
  compareLabel = null,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Baseline"> | null>(null);
  const mainPctRef = useRef<ISeriesApi<"Line"> | null>(null);
  const comparePctRef = useRef<ISeriesApi<"Line"> | null>(null);
  const baselineLineRef = useRef<IPriceLine | null>(null);
  const zeroLineRef = useRef<IPriceLine | null>(null);
  const lastTimeRef = useRef<number>(0);

  const compareActive = !!(compareCandles && compareCandles.length > 0);

  // Create chart once
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { color: "transparent" },
        textColor: "#777287",
        attributionLogo: false,
        fontFamily:
          "'Sora', ui-sans-serif, system-ui, -apple-system, sans-serif",
      },
      grid: {
        horzLines: { color: "rgba(167, 163, 184, 0.08)" },
        vertLines: { color: "rgba(167, 163, 184, 0.04)" },
      },
      rightPriceScale: {
        borderColor: "rgba(167, 163, 184, 0.10)",
        scaleMargins: { top: 0.12, bottom: 0.08 },
      },
      timeScale: {
        borderColor: "rgba(167, 163, 184, 0.10)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: {
          color: "rgba(167, 163, 184, 0.30)",
          width: 1,
          style: LineStyle.Dotted,
          labelBackgroundColor: "#0E0E34",
        },
        horzLine: {
          color: "rgba(167, 163, 184, 0.30)",
          width: 1,
          style: LineStyle.Dotted,
          labelBackgroundColor: "#0E0E34",
        },
      },
      handleScale: false,
      handleScroll: false,
    });

    const series = chart.addSeries(BaselineSeries, {
      baseValue: { type: "price", price: 0 },
      topLineColor: "#22D39A",
      topFillColor1: "rgba(34, 211, 154, 0.28)",
      topFillColor2: "rgba(34, 211, 154, 0.03)",
      bottomLineColor: "#E06C75",
      bottomFillColor1: "rgba(240, 93, 120, 0.03)",
      bottomFillColor2: "rgba(240, 93, 120, 0.26)",
      lineWidth: 2,
      relativeGradient: true,
      pointMarkersVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 3,
      priceLineVisible: true,
      priceLineColor: "rgba(167, 163, 184, 0.45)",
      priceLineWidth: 1,
      priceLineStyle: LineStyle.Dotted,
      lastValueVisible: true,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      baselineLineRef.current = null;
      zeroLineRef.current = null;
      seriesRef.current = null;
      mainPctRef.current = null;
      comparePctRef.current = null;
      chartRef.current = null;
      chart.remove();
    };
  }, [height]);

  // Update baseline (only meaningful in solo mode)
  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;
    if (baselinePrice != null && Number.isFinite(baselinePrice)) {
      series.applyOptions({
        baseValue: { type: "price", price: baselinePrice },
      });
      if (baselineLineRef.current) {
        try {
          series.removePriceLine(baselineLineRef.current);
        } catch {
          /* noop */
        }
        baselineLineRef.current = null;
      }
      if (!compareActive) {
        baselineLineRef.current = series.createPriceLine({
          price: baselinePrice,
          color: "rgba(167, 163, 184, 0.25)",
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: false,
          title: "",
        });
      }
    }
  }, [baselinePrice, compareActive]);

  // Toggle between solo (baseline price) and compare (percent) modes
  useEffect(() => {
    const chart = chartRef.current;
    const baseline = seriesRef.current;
    if (!chart || !baseline) return;

    if (compareActive) {
      baseline.applyOptions({ visible: false, priceLineVisible: false, lastValueVisible: false });
      if (baselineLineRef.current) {
        try {
          baseline.removePriceLine(baselineLineRef.current);
        } catch {
          /* noop */
        }
        baselineLineRef.current = null;
      }
      if (!mainPctRef.current) {
        mainPctRef.current = chart.addSeries(LineSeries, {
          color: MAIN_COMPARE_COLOR,
          lineWidth: 2,
          priceFormat: {
            type: "custom",
            formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%`,
            minMove: 0.01,
          },
          priceLineVisible: false,
          lastValueVisible: true,
        });
      }
      if (!comparePctRef.current) {
        comparePctRef.current = chart.addSeries(LineSeries, {
          color: COMPARE_COLOR,
          lineWidth: 2,
          priceFormat: {
            type: "custom",
            formatter: (p: number) => `${p >= 0 ? "+" : ""}${p.toFixed(2)}%`,
            minMove: 0.01,
          },
          priceLineVisible: false,
          lastValueVisible: true,
        });
      }
      if (!zeroLineRef.current && mainPctRef.current) {
        zeroLineRef.current = mainPctRef.current.createPriceLine({
          price: 0,
          color: "rgba(167, 163, 184, 0.25)",
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: false,
          title: "",
        });
      }
    } else {
      baseline.applyOptions({ visible: true, priceLineVisible: true, lastValueVisible: true });
      if (zeroLineRef.current && mainPctRef.current) {
        try {
          mainPctRef.current.removePriceLine(zeroLineRef.current);
        } catch {
          /* noop */
        }
        zeroLineRef.current = null;
      }
      if (mainPctRef.current) {
        try { chart.removeSeries(mainPctRef.current); } catch { /* noop */ }
        mainPctRef.current = null;
      }
      if (comparePctRef.current) {
        try { chart.removeSeries(comparePctRef.current); } catch { /* noop */ }
        comparePctRef.current = null;
      }
    }
  }, [compareActive]);

  // Load data
  useEffect(() => {
    const series = seriesRef.current;
    const chart = chartRef.current;
    if (!series || !chart) return;

    if (compareActive) {
      const mainPct = toPctSeries(candles);
      const cmpPct = toPctSeries(compareCandles ?? []);
      mainPctRef.current?.setData(mainPct);
      comparePctRef.current?.setData(cmpPct);
      lastTimeRef.current =
        mainPct.length > 0 ? (mainPct[mainPct.length - 1].time as number) : 0;
    } else {
      if (candles.length === 0) {
        series.setData([]);
        lastTimeRef.current = 0;
        return;
      }
      const data = candles.map((c) => ({
        time: c.timeSeconds as UTCTimestamp,
        value: c.close,
      }));
      series.setData(data);
      lastTimeRef.current = data[data.length - 1].time as number;
    }
    chart.timeScale().fitContent();
  }, [candles, compareCandles, compareActive]);

  // Live update (solo mode only — compare mode updates via candles prop)
  useEffect(() => {
    if (compareActive) return;
    const series = seriesRef.current;
    if (!series) return;
    if (candles.length === 0 || currentPrice == null) return;
    const last = candles[candles.length - 1];
    if (last.timeSeconds < lastTimeRef.current) return;
    series.update({
      time: last.timeSeconds as UTCTimestamp,
      value: currentPrice,
    });
    lastTimeRef.current = last.timeSeconds;
  }, [currentPrice, candles, compareActive]);

  return (
    <div
      ref={containerRef}
      className="strk-chart-canvas"
      style={{ width: "100%", height }}
      role="img"
      aria-label={
        compareActive && compareLabel
          ? `STRK vs ${compareLabel} relative performance chart, percent change from start of selected period.`
          : "Live Starknet STRK/USDT Binance Spot price chart."
      }
    />
  );
}
