import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { formatSignedPct } from "@/lib/binance/strkMarket";

type Props = {
  currentPrice: number | null;
  percentageChange: number | null;
  range: string;
};

export function StrkComparePopover({
  currentPrice,
  percentageChange,
  range,
}: Props) {
  const [strkAmount, setStrkAmount] = useState("1");
  const [usdtAmount, setUsdtAmount] = useState<string>(() =>
    currentPrice ? (1 * currentPrice).toFixed(4) : ""
  );
  const [lastEdited, setLastEdited] = useState<"strk" | "usdt">("strk");

  const priceOk = currentPrice != null && Number.isFinite(currentPrice) && currentPrice > 0;

  const computedUsdt = (() => {
    if (lastEdited === "strk" && priceOk) {
      const n = Number(strkAmount);
      if (Number.isFinite(n) && n >= 0) return (n * (currentPrice as number)).toFixed(4);
    }
    return usdtAmount;
  })();

  const computedStrk = (() => {
    if (lastEdited === "usdt" && priceOk) {
      const n = Number(usdtAmount);
      if (Number.isFinite(n) && n >= 0)
        return (n / (currentPrice as number)).toFixed(4);
    }
    return strkAmount;
  })();

  const strkInUsdt = priceOk ? currentPrice : null;
  const usdtInStrk = priceOk ? 1 / (currentPrice as number) : null;

  return (
    <div
      id="strk-usdt-compare-panel"
      role="dialog"
      aria-label="STRK USDT comparison"
      className="strk-compare-panel"
    >
      <div className="strk-compare-header">STRK / USDT Comparison</div>

      <div className="strk-compare-rates">
        <div>
          <div className="strk-compare-label">1 STRK</div>
          <div className="strk-compare-value">
            {strkInUsdt != null ? `${strkInUsdt.toFixed(4)} USDT` : "—"}
          </div>
        </div>
        <div>
          <div className="strk-compare-label">1 USDT</div>
          <div className="strk-compare-value">
            {usdtInStrk != null ? `${usdtInStrk.toFixed(4)} STRK` : "—"}
          </div>
        </div>
      </div>

      <div className="strk-compare-converter">
        <label className="strk-compare-field">
          <span>STRK amount</span>
          <input
            inputMode="decimal"
            value={computedStrk}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v)) {
                setStrkAmount(v);
                setLastEdited("strk");
              }
            }}
          />
        </label>
        <button
          type="button"
          className="strk-compare-swap"
          aria-label="Switch conversion direction"
          onClick={() =>
            setLastEdited((d) => (d === "strk" ? "usdt" : "strk"))
          }
        >
          <ArrowLeftRight size={14} aria-hidden="true" />
        </button>
        <label className="strk-compare-field">
          <span>USDT value</span>
          <input
            inputMode="decimal"
            value={computedUsdt}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^\d*\.?\d*$/.test(v)) {
                setUsdtAmount(v);
                setLastEdited("usdt");
              }
            }}
          />
        </label>
      </div>

      <div className="strk-compare-perf">
        <div>
          <div className="strk-compare-label">STRK performance</div>
          <div
            className={`strk-compare-value ${
              percentageChange != null && percentageChange >= 0
                ? "is-pos"
                : "is-neg"
            }`}
          >
            {formatSignedPct(percentageChange)}{" "}
            <span className="strk-compare-range">· {range}</span>
          </div>
        </div>
        <div>
          <div className="strk-compare-label">USDT quote benchmark</div>
          <div className="strk-compare-value">0.00%</div>
        </div>
        <div>
          <div className="strk-compare-label">Relative performance</div>
          <div
            className={`strk-compare-value ${
              percentageChange != null && percentageChange >= 0
                ? "is-pos"
                : "is-neg"
            }`}
          >
            STRK {formatSignedPct(percentageChange)} vs USDT
          </div>
        </div>
      </div>
    </div>
  );
}
