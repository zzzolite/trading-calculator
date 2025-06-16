"use client"

import { useEffect } from "react"
import { TrendingUp } from "lucide-react"
import { useCalculatorStore } from "@/store/use-calculator-store"
import CalculatorCard from "@/components/ui/calculator-card"
import NumberInput from "@/components/ui/number-input"
import ResultDisplay from "@/components/ui/result-display"
import { Button } from "@/components/ui/button"

export default function PercentageCalculator() {
  const { calculators, updateCalculator, resetCalculator } = useCalculatorStore()
  const { entryPrice, exitPrice, result } = calculators.percentage

  useEffect(() => {
    if (entryPrice && exitPrice) {
      const entry = Number.parseFloat(entryPrice)
      const exit = Number.parseFloat(exitPrice)

      if (entry > 0) {
        const percentage = ((exit - entry) / entry) * 100
        updateCalculator("percentage", {
          result: {
            percentage: percentage.toFixed(2),
            type: percentage >= 0 ? "positive" : "negative",
          },
        })
      }
    } else {
      updateCalculator("percentage", { result: null })
    }
  }, [entryPrice, exitPrice, updateCalculator])

  return (
    <CalculatorCard title="Percentage Change" icon={TrendingUp}>
      <div className="space-y-4">
        <NumberInput
          label="Entry Price"
          value={entryPrice}
          onChange={(value) => updateCalculator("percentage", { entryPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Exit Price"
          value={exitPrice}
          onChange={(value) => updateCalculator("percentage", { exitPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        {result && (
          <ResultDisplay
            label="Percentage Change"
            value={`${result.percentage}%`}
            type={result.type}
            showTrend={true}
          />
        )}

        <Button variant="outline" onClick={() => resetCalculator("percentage")} className="w-full">
          Reset
        </Button>
      </div>
    </CalculatorCard>
  )
}
