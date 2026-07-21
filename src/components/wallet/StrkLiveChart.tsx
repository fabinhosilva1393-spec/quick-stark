import { useEffect, useRef } from "react";
import {
  BaselineSeries,
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
};

export function StrkLiveChart({
  candles,
  baselinePrice,
  currentPrice,
  height = 290,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Baseline"> | null>(null);
  const baselineLineRef = useRef<IPriceLine | null>(null);
  const lastTimeRef = useRef<number>(0);

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
      seriesRef.current = null;
      chartRef.current = null;
      chart.remove();
    };
  }, [height]);

  // Update baseline
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
      baselineLineRef.current = series.createPriceLine({
        price: baselinePrice,
        color: "rgba(167, 163, 184, 0.25)",
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: false,
        title: "",
      });
    }
  }, [baselinePrice]);

  // Load data
  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return;
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
    chartRef.current?.timeScale().fitContent();
  }, [candles]);

  // Live update
  useEffect(() => {
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
  }, [currentPrice, candles]);

  return (
    <div
      ref={containerRef}
      className="strk-chart-canvas"
      style={{ width: "100%", height }}
      role="img"
      aria-label="Live Starknet STRK/USDT Binance Spot price chart. Green values are above the selected-period opening price and red values are below it."
    />
  );
}
