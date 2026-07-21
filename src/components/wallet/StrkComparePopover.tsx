import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, X } from "lucide-react";
import { formatSignedPct } from "@/lib/binance/strkMarket";
import type { StrkRange, ConnectionStatus } from "@/types/strkMarket";

type Props = {
  currentPrice: number | null;
  selectedRangeChangePercent: number | null;
  selectedRange: StrkRange;
  connectionStatus: ConnectionStatus;
  onClose: () => void;
};

function formatSmart(n: number | null, unit: string): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let decimals = 4;
  if (abs > 0 && abs < 0.01) decimals = 6;
  else if (abs >= 100) decimals = 2;
  const s = n.toFixed(decimals).replace(/\.?0+$/, "");
  return `${s} ${unit}`;
}

export function StrkComparePopover({
  currentPrice,
  selectedRangeChangePercent,
  selectedRange,
  connectionStatus,
  onClose,
}: Props) {
  const priceOk = currentPrice != null && Number.isFinite(currentPrice) && currentPrice > 0;
  const strkInUsdt = priceOk ? (currentPrice as number) : null;
  const usdtInStrk = priceOk ? 1 / (currentPrice as number) : null;

  const [strkAmount, setStrkAmount] = useState("1");
  const [usdtAmount, setUsdtAmount] = useState<string>(() =>
    priceOk ? (1 * (currentPrice as number)).toFixed(6).replace(/\.?0+$/, "") : "",
  );
  const [active, setActive] = useState<"strk" | "usdt">("strk");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const computedUsdt =
    active === "strk" && priceOk && strkAmount !== "" && Number.isFinite(Number(strkAmount))
      ? (Number(strkAmount) * (currentPrice as number)).toFixed(6).replace(/\.?0+$/, "")
      : usdtAmount;

  const computedStrk =
    active === "usdt" && priceOk && usdtAmount !== "" && Number.isFinite(Number(usdtAmount))
      ? (Number(usdtAmount) / (currentPrice as number)).toFixed(6).replace(/\.?0+$/, "")
      : strkAmount;

  const strkPct = selectedRangeChangePercent;
  const relPos = (strkPct ?? 0) >= 0;
  const barPct = Math.min(50, Math.abs(strkPct ?? 0) * 5); // 10% -> 50% of half-bar

  const reconnecting =
    connectionStatus === "reconnecting" || connectionStatus === "connecting";

  return (
    <div
      id="strk-usdt-compare-panel"
      role="dialog"
      aria-label="STRK and USDT comparison"
      className="strk-compare-panel"
    >
      <div className="strk-compare-panel-head">
        <div>
          <div className="strk-compare-header">STRK / USDT Comparison</div>
          <div className="strk-compare-subheader">
            {reconnecting ? "Reconnecting…" : "Live Binance Spot conversion"}
          </div>
        </div>
        <button
          ref={closeBtnRef}
          type="button"
          className="strk-compare-close"
          aria-label="Close STRK and USDT comparison"
          onClick={onClose}
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {!priceOk ? (
        <div className="strk-compare-empty">Comparison temporarily unavailable</div>
      ) : (
        <>
          <div className="strk-compare-rates">
            <div>
              <div className="strk-compare-eyebrow">STARKNET</div>
              <div className="strk-compare-ticker">STRK</div>
              <div className="strk-compare-label">1 STRK</div>
              <div className="strk-compare-value">{formatSmart(strkInUsdt, "USDT")}</div>
            </div>
            <div>
              <div className="strk-compare-eyebrow">TETHER</div>
              <div className="strk-compare-ticker">USDT</div>
              <div className="strk-compare-label">1 USDT</div>
              <div className="strk-compare-value">{formatSmart(usdtInStrk, "STRK")}</div>
            </div>
          </div>

          <div className="strk-compare-converter">
            <label className="strk-compare-field">
              <span>STRK amount</span>
              <input
                type="text"
                inputMode="decimal"
                value={computedStrk}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || /^\d*\.?\d*$/.test(v)) {
                    setStrkAmount(v);
                    setActive("strk");
                  }
                }}
              />
            </label>
            <button
              type="button"
              className="strk-compare-swap"
              aria-label="Switch conversion direction"
              onClick={() => setActive((d) => (d === "strk" ? "usdt" : "strk"))}
            >
              <ArrowLeftRight size={14} aria-hidden="true" />
            </button>
            <label className="strk-compare-field">
              <span>USDT value</span>
              <input
                type="text"
                inputMode="decimal"
                value={computedUsdt}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "" || /^\d*\.?\d*$/.test(v)) {
                    setUsdtAmount(v);
                    setActive("usdt");
                  }
                }}
              />
            </label>
          </div>

          <div className="strk-compare-perf">
            <div>
              <div className="strk-compare-label">STRK performance</div>
              <div className={`strk-compare-value ${relPos ? "is-pos" : "is-neg"}`}>
                {formatSignedPct(strkPct)}{" "}
                <span className="strk-compare-range">· {selectedRange}</span>
              </div>
            </div>
            <div>
              <div className="strk-compare-label">USDT quote benchmark</div>
              <div className="strk-compare-value">0.00%</div>
            </div>
            <div>
              <div className="strk-compare-label">Relative performance</div>
              <div className={`strk-compare-value ${relPos ? "is-pos" : "is-neg"}`}>
                STRK {formatSignedPct(strkPct)} vs USDT
              </div>
            </div>
            <div className="strk-compare-bar" aria-hidden="true">
              <span className="strk-compare-bar-center" />
              <span
                className={`strk-compare-bar-fill ${relPos ? "is-pos" : "is-neg"}`}
                style={{
                  width: `${barPct}%`,
                  [relPos ? "left" : "right"]: "50%",
                } as React.CSSProperties}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
