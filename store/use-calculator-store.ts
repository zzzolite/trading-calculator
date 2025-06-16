import { create } from "zustand"

interface CalculatorState {
  percentage: {
    entryPrice: string
    exitPrice: string
    result: {
      percentage: string
      type: "positive" | "negative"
    } | null
  }
  profitLoss: {
    entryPrice: string
    exitPrice: string
    amount: string
    result: {
      percentage: string
      profitLoss: string
      type: "positive" | "negative"
    } | null
  }
  positionSize: {
    accountSize: string
    riskPercent: string
    entryPrice: string
    stopLoss: string
    result: {
      positionSize: string
      riskAmount: string
      shares: string
    } | null
  }
  riskReward: {
    entryPrice: string
    targetPrice: string
    stopLoss: string
    positionSize: string
    result: {
      ratio: string
      potentialProfit: string
      potentialLoss: string
      type: "positive" | "negative" | "neutral"
    } | null
  }
  breakEven: {
    purchasePrice: string
    feesPercent: string
    result: {
      breakEvenPrice: string
      feeAmount: string
    } | null
  }
  compoundGrowth: {
    initialInvestment: string
    monthlyAddition: string
    annualReturn: string
    timePeriod: string
    result: {
      finalAmount: string
      totalProfit: string
      totalContributions: string
    } | null
  }
}

interface CalculatorActions {
  updateCalculator: (
    calculatorName: keyof CalculatorState,
    values: Partial<CalculatorState[keyof CalculatorState]>,
  ) => void
  resetCalculator: (calculatorName: keyof CalculatorState) => void
}

const initialCalculatorState: CalculatorState = {
  percentage: { entryPrice: "", exitPrice: "", result: null },
  profitLoss: { entryPrice: "", exitPrice: "", amount: "", result: null },
  positionSize: { accountSize: "", riskPercent: "", entryPrice: "", stopLoss: "", result: null },
  riskReward: { entryPrice: "", targetPrice: "", stopLoss: "", positionSize: "", result: null },
  breakEven: { purchasePrice: "", feesPercent: "", result: null },
  compoundGrowth: { initialInvestment: "", monthlyAddition: "", annualReturn: "", timePeriod: "", result: null },
}

export const useCalculatorStore = create<CalculatorState & CalculatorActions>((set) => ({
  ...initialCalculatorState,
  updateCalculator: (calculatorName, values) =>
    set((state) => ({
      calculators: {
        ...state.calculators,
        [calculatorName]: { ...state.calculators[calculatorName], ...values },
      },
    })),
  resetCalculator: (calculatorName) =>
    set((state) => ({
      calculators: {
        ...state.calculators,
        [calculatorName]: initialCalculatorState[calculatorName],
      },
    })),
  calculators: initialCalculatorState,
}))
