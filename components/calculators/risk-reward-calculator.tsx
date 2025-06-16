"use client"

import { useEffect } from "react"
import { BarChart3 } from "lucide-react"
import { useCalculatorStore } from "@/store/use-calculator-store"
import CalculatorCard from "@/components/ui/calculator-card"
import NumberInput from "@/components/ui/number-input"
import ResultDisplay from "@/components/ui/result-display"
import { Button } from "@/components/ui/button"

export default function RiskRewardCalculator() {
  const { calculators, updateCalculator, resetCalculator } = useCalculatorStore()
  const { entryPrice, targetPrice, stopLoss, positionSize, result } = calculators.riskReward

  useEffect(() => {
    if (entryPrice && targetPrice && stopLoss && positionSize) {
      const entry = Number.parseFloat(entryPrice)
      const target = Number.parseFloat(targetPrice)
      const stop = Number.parseFloat(stopLoss)
      const position = Number.parseFloat(positionSize)

      if (entry > 0 && target > 0 && stop > 0 && position > 0) {
        const risk = Math.abs(entry - stop)
        const reward = Math.abs(target - entry)
        const ratio = reward / risk
        const potentialProfit = reward * (position / entry)
        const potentialLoss = risk * (position / entry)

        updateCalculator("riskReward", {
          result: {
            ratio: ratio.toFixed(2),
            potentialProfit: potentialProfit.toFixed(2),
            potentialLoss: potentialLoss.toFixed(2),
            type: ratio >= 2 ? "positive" : ratio >= 1 ? "neutral" : "negative",
          },
        })
      }
    } else {
      updateCalculator("riskReward", { result: null })
    }
  }, [entryPrice, targetPrice, stopLoss, positionSize, updateCalculator])

  return (
    <CalculatorCard title="Risk-Reward Ratio" icon={BarChart3}>
      <div className="space-y-4">
        <NumberInput
          label="Entry Price"
          value={entryPrice}
          onChange={(value) => updateCalculator("riskReward", { entryPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Target Price"
          value={targetPrice}
          onChange={(value) => updateCalculator("riskReward", { targetPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Stop Loss Price"
          value={stopLoss}
          onChange={(value) => updateCalculator("riskReward", { stopLoss: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Position Size"
          value={positionSize}
          onChange={(value) => updateCalculator("riskReward", { positionSize: value })}
          placeholder="1000"
          prefix="$"
        />

        {result && (
          <div className="space-y-3">
            <ResultDisplay label="Risk-Reward Ratio" value={`1:${result.ratio}`} type={result.type} />
            <ResultDisplay
              label="Potential Profit"
              value={`+$${Number.parseFloat(result.potentialProfit).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="positive"
            />
            <ResultDisplay
              label="Potential Loss"
              value={`-$${Number.parseFloat(result.potentialLoss).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="negative"
            />
          </div>
        )}

        <Button variant="outline" onClick={() => resetCalculator("riskReward")} className="w-full">
          Reset
        </Button>
      </div>
    </CalculatorCard>
  )
}
