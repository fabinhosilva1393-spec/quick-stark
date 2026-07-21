import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StrkLiveChart } from "./StrkLiveChart";
import type { StrkCandle } from "@/types/strkMarket";
import {
  formatPrice,
  formatSignedPct,
  formatSignedPrice,
} from "@/lib/binance/strkMarket";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  candles: StrkCandle[];
  currentPrice: number | null;
  baselinePrice: number | null;
  absoluteChange: number | null;
  percentageChange: number | null;
  range: string;
};

export function StrkExpandedChart({
  open,
  onOpenChange,
  candles,
  currentPrice,
  baselinePrice,
  absoluteChange,
  percentageChange,
  range,
}: Props) {
  const pos = (percentageChange ?? 0) >= 0;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="strk-expanded-dialog max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-4">
            <span>Starknet · STRK / USDT · Binance Spot</span>
            <span className="strk-price-inline">
              ${formatPrice(currentPrice)}{" "}
              <span className={pos ? "is-pos" : "is-neg"}>
                {formatSignedPrice(absoluteChange)} ·{" "}
                {formatSignedPct(percentageChange)} · {range}
              </span>
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="strk-expanded-chart">
          <StrkLiveChart
            candles={candles}
            baselinePrice={baselinePrice}
            currentPrice={currentPrice}
            height={520}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
