import { TrendingUp, TrendingDown } from "lucide-react"

interface ResultDisplayProps {
  label: string
  value: string | number
  type?: "positive" | "negative" | "neutral"
  prefix?: string
  suffix?: string
  showTrend?: boolean
}

export default function ResultDisplay({
  label,
  value,
  type = "neutral",
  prefix = "",
  suffix = "",
  showTrend = false,
}: ResultDisplayProps) {
  const getColorClass = () => {
    switch (type) {
      case "positive":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
      case "negative":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
    }
  }

  const getTrendIcon = () => {
    if (!showTrend) return null
    return type === "positive" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div
        className={`p-3 rounded-lg border-2 ${getColorClass()} flex items-center justify-between transition-colors duration-200`}
      >
        <span className="font-semibold text-lg">
          {prefix}
          {value}
          {suffix}
        </span>
        {getTrendIcon()}
      </div>
    </div>
  )
}
