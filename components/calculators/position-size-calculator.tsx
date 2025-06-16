"use client"

import { useEffect } from "react"
import { Target } from "lucide-react"
import { useCalculatorStore } from "@/store/use-calculator-store"
import CalculatorCard from "@/components/ui/calculator-card"
import NumberInput from "@/components/ui/number-input"
import ResultDisplay from "@/components/ui/result-display"
import { Button } from "@/components/ui/button"

export default function PositionSizeCalculator() {
  const { calculators, updateCalculator, resetCalculator } = useCalculatorStore()
  const { accountSize, riskPercent, entryPrice, stopLoss, result } = calculators.positionSize

  useEffect(() => {
    if (accountSize && riskPercent && entryPrice && stopLoss) {
      const account = Number.parseFloat(accountSize)
      const risk = Number.parseFloat(riskPercent)
      const entry = Number.parseFloat(entryPrice)
      const stop = Number.parseFloat(stopLoss)

      if (account > 0 && risk > 0 && entry > 0 && stop > 0 && entry !== stop) {
        const riskAmount = (account * risk) / 100
        const riskPerShare = Math.abs(entry - stop)
        const positionSize = riskAmount / riskPerShare
        const shares = Math.floor(positionSize)

        updateCalculator("positionSize", {
          result: {
            positionSize: positionSize.toFixed(2),
            riskAmount: riskAmount.toFixed(2),
            shares: shares.toString(),
          },
        })
      }
    } else {
      updateCalculator("positionSize", { result: null })
    }
  }, [accountSize, riskPercent, entryPrice, stopLoss, updateCalculator])

  return (
    <CalculatorCard title="Position Size Calculator" icon={Target}>
      <div className="space-y-4">
        <NumberInput
          label="Account Size"
          value={accountSize}
          onChange={(value) => updateCalculator("positionSize", { accountSize: value })}
          placeholder="10000"
          prefix="$"
        />

        <NumberInput
          label="Risk Percentage"
          value={riskPercent}
          onChange={(value) => updateCalculator("positionSize", { riskPercent: value })}
          placeholder="2"
          suffix="%"
        />

        <NumberInput
          label="Entry Price"
          value={entryPrice}
          onChange={(value) => updateCalculator("positionSize", { entryPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Stop Loss Price"
          value={stopLoss}
          onChange={(value) => updateCalculator("positionSize", { stopLoss: value })}
          placeholder="0.00"
          prefix="$"
        />

        {result && (
          <div className="space-y-3">
            <ResultDisplay
              label="Risk Amount"
              value={`$${Number.parseFloat(result.riskAmount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="neutral"
            />
            <ResultDisplay
              label="Position Size"
              value={`$${Number.parseFloat(result.positionSize).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="neutral"
            />
            <ResultDisplay
              label="Number of Shares"
              value={Number.parseInt(result.shares).toLocaleString("en-US")}
              type="neutral"
            />
          </div>
        )}

        <Button variant="outline" onClick={() => resetCalculator("positionSize")} className="w-full">
          Reset
        </Button>
      </div>
    </CalculatorCard>
  )
}
