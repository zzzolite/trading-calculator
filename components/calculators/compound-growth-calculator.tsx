"use client"

import { useEffect } from "react"
import { PiggyBank } from "lucide-react"
import { useCalculatorStore } from "@/store/use-calculator-store"
import CalculatorCard from "@/components/ui/calculator-card"
import NumberInput from "@/components/ui/number-input"
import ResultDisplay from "@/components/ui/result-display"
import { Button } from "@/components/ui/button"

export default function CompoundGrowthCalculator() {
  const { calculators, updateCalculator, resetCalculator } = useCalculatorStore()
  const { initialInvestment, monthlyAddition, annualReturn, timePeriod, result } = calculators.compoundGrowth

  useEffect(() => {
    if (initialInvestment && annualReturn && timePeriod) {
      const initial = Number.parseFloat(initialInvestment)
      const monthly = Number.parseFloat(monthlyAddition) || 0
      const rate = Number.parseFloat(annualReturn) / 100
      const years = Number.parseFloat(timePeriod)

      if (initial > 0 && rate >= 0 && years > 0) {
        // Compound interest with monthly contributions
        const monthlyRate = rate / 12
        const months = years * 12

        // Future value of initial investment
        const futureValueInitial = initial * Math.pow(1 + rate, years)

        // Future value of monthly contributions (annuity)
        let futureValueMonthly = 0
        if (monthly > 0 && monthlyRate > 0) {
          futureValueMonthly = (monthly * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate
        } else if (monthly > 0) {
          futureValueMonthly = monthly * months
        }

        const totalFutureValue = futureValueInitial + futureValueMonthly
        const totalContributions = initial + monthly * months
        const totalProfit = totalFutureValue - totalContributions

        updateCalculator("compoundGrowth", {
          result: {
            finalAmount: totalFutureValue.toFixed(2),
            totalProfit: totalProfit.toFixed(2),
            totalContributions: totalContributions.toFixed(2),
          },
        })
      }
    } else {
      updateCalculator("compoundGrowth", { result: null })
    }
  }, [initialInvestment, monthlyAddition, annualReturn, timePeriod, updateCalculator])

  return (
    <CalculatorCard title="Compound Growth Calculator" icon={PiggyBank}>
      <div className="space-y-4">
        <NumberInput
          label="Initial Investment"
          value={initialInvestment}
          onChange={(value) => updateCalculator("compoundGrowth", { initialInvestment: value })}
          placeholder="1000"
          prefix="$"
        />

        <NumberInput
          label="Monthly Addition"
          value={monthlyAddition}
          onChange={(value) => updateCalculator("compoundGrowth", { monthlyAddition: value })}
          placeholder="100"
          prefix="$"
        />

        <NumberInput
          label="Annual Return"
          value={annualReturn}
          onChange={(value) => updateCalculator("compoundGrowth", { annualReturn: value })}
          placeholder="7"
          suffix="%"
        />

        <NumberInput
          label="Time Period"
          value={timePeriod}
          onChange={(value) => updateCalculator("compoundGrowth", { timePeriod: value })}
          placeholder="10"
          suffix="years"
        />

        {result && (
          <div className="space-y-3">
            <ResultDisplay
              label="Total Contributions"
              value={`$${Number.parseFloat(result.totalContributions).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="neutral"
            />
            <ResultDisplay
              label="Total Profit"
              value={`$${Number.parseFloat(result.totalProfit).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="positive"
            />
            <ResultDisplay
              label="Final Amount"
              value={`$${Number.parseFloat(result.finalAmount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              type="positive"
            />
          </div>
        )}

        <Button variant="outline" onClick={() => resetCalculator("compoundGrowth")} className="w-full">
          Reset
        </Button>
      </div>
    </CalculatorCard>
  )
}
