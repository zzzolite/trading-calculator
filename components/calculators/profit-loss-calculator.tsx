"use client"

import { useEffect } from "react"
import { DollarSign } from "lucide-react"
import { useCalculatorStore } from "@/store/use-calculator-store"
import CalculatorCard from "@/components/ui/calculator-card"
import NumberInput from "@/components/ui/number-input"
import ResultDisplay from "@/components/ui/result-display"
import { Button } from "@/components/ui/button"

export default function ProfitLossCalculator() {
  const { calculators, updateCalculator, resetCalculator } = useCalculatorStore()
  const { entryPrice, exitPrice, amount, result } = calculators.profitLoss

  useEffect(() => {
    if (entryPrice && exitPrice && amount) {
      const entry = Number.parseFloat(entryPrice)
      const exit = Number.parseFloat(exitPrice)
      const investment = Number.parseFloat(amount)

      if (entry > 0 && investment > 0) {
        const percentage = ((exit - entry) / entry) * 100
        const profitLoss = (exit - entry) * (investment / entry)

        updateCalculator("profitLoss", {
          result: {
            percentage: percentage.toFixed(2),
            profitLoss: profitLoss.toFixed(2),
            type: profitLoss >= 0 ? "positive" : "negative",
          },
        })
      }
    } else {
      updateCalculator("profitLoss", { result: null })
    }
  }, [entryPrice, exitPrice, amount, updateCalculator])

  return (
    <CalculatorCard title="Profit/Loss Calculator" icon={DollarSign}>
      <div className="space-y-4">
        <NumberInput
          label="Entry Price"
          value={entryPrice}
          onChange={(value) => updateCalculator("profitLoss", { entryPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Exit Price"
          value={exitPrice}
          onChange={(value) => updateCalculator("profitLoss", { exitPrice: value })}
          placeholder="0.00"
          prefix="$"
        />

        <NumberInput
          label="Investment Amount"
          value={amount}
          onChange={(value) => updateCalculator("profitLoss", { amount: value })}
          placeholder="0.00"
          prefix="$"
        />

        {result && (
          <div className="space-y-3">
            <ResultDisplay
              label="Percentage Change"
              value={`${result.percentage}%`}
              type={result.type}
              showTrend={true}
            />
            <ResultDisplay
              label="Profit/Loss"
              value={`${result.profitLoss >= 0 ? "+" : ""}$${Math.abs(Number.parseFloat(result.profitLoss)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type={result.type}
            />
          </div>
        )}

        <Button variant="outline" onClick={() => resetCalculator("profitLoss")} className="w-full">
          Reset
        </Button>
      </div>
    </CalculatorCard>
  )
}
