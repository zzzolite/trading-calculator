"use client"

import { useEffect } from "react"
import { TrendingUp } from "lucide-react"
import { useCalculatorStore } from "@/store/use-calculator-store"
import CalculatorCard from "@/components/ui/calculator-card"
import NumberInput from "@/components/ui/number-input"
import ResultDisplay from "@/components/ui/result-display"
import { Button } from "@/components/ui/button"

export default function BreakEvenCalculator() {
  const { calculators, updateCalculator, resetCalculator } = useCalculatorStore()
  const { purchasePrice, feesPercent, result } = calculators.breakEven

  useEffect(() => {
    if (purchasePrice && feesPercent) {
      const purchase = Number.parseFloat(purchasePrice)
      const fees = Number.parseFloat(feesPercent)

      if (purchase > 0 && fees >= 0) {
        const feeAmount = (purchase * fees) / 100
        const breakEvenPrice = purchase + feeAmount

        updateCalculator("breakEven", {
          result: {
            breakEvenPrice: breakEvenPrice.toFixed(2),
            feeAmount: feeAmount.toFixed(2),
          },
        })
      }
    } else {
      updateCalculator("breakEven", { result: null })
    }
  }, [purchasePrice, feesPercent, updateCalculator])

  return (
    <CalculatorCard title="Break-Even Calculator" icon={TrendingUp}>
      <div className="space-y-4">
        <NumberInput
          label="Purchase Price"
          value={purchasePrice}
          onChange={(value) => updateCalculator("breakEven", { purchasePrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Fees/Commissions"
          value={feesPercent}
          onChange={(value) => updateCalculator("breakEven", { feesPercent: value })}
          placeholder="0.5"
          suffix="%"
        />

        {result && (
          <div className="space-y-3">
            <ResultDisplay
              label="Fee Amount"
              value={`$${Number.parseFloat(result.feeAmount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="neutral"
            />
            <ResultDisplay
              label="Break-Even Price"
              value={`$${Number.parseFloat(result.breakEvenPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="neutral"
            />
          </div>
        )}

        <Button variant="outline" onClick={() => resetCalculator("breakEven")} className="w-full">
          Reset
        </Button>
      </div>
    </CalculatorCard>
  )
}
