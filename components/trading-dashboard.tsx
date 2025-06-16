"use client"

import { Calculator } from "lucide-react"
import ThemeToggle from "@/components/ui/theme-toggle"
import PercentageCalculator from "./calculators/percentage-calculator"
import ProfitLossCalculator from "./calculators/profit-loss-calculator"
import PositionSizeCalculator from "./calculators/position-size-calculator"
import RiskRewardCalculator from "./calculators/risk-reward-calculator"
import BreakEvenCalculator from "./calculators/break-even-calculator"
import CompoundGrowthCalculator from "./calculators/compound-growth-calculator"

export default function TradingDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Trading Calculator Suite</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Professional-grade trading calculators for risk management, profit analysis, and position sizing
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <PercentageCalculator />
        <ProfitLossCalculator />
        <PositionSizeCalculator />
        <RiskRewardCalculator />
        <BreakEvenCalculator />
        <CompoundGrowthCalculator />
      </div>
    </div>
  )
}
