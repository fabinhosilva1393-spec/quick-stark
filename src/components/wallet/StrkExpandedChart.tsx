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
          <DialogTitle asChild>
            <div className="strk-expanded-header">
              <span className="strk-expanded-header__title">
                Starknet · STRK / USDT · Binance Spot
              </span>
              <span className="strk-expanded-header__metrics">
                <span>${formatPrice(currentPrice)}</span>
                <span className={pos ? "is-pos" : "is-neg"}>
                  {formatSignedPrice(absoluteChange)}
                </span>
                <span className={pos ? "is-pos" : "is-neg"}>
                  {formatSignedPct(percentageChange)} · {range}
                </span>
              </span>
              <span className="strk-expanded-header__close-spacer" aria-hidden="true" />
            </div>
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
