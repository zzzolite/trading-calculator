import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface CalculatorCardProps {
  title: string
  icon: LucideIcon
  children: ReactNode
}

export default function CalculatorCard({ title, icon: Icon, children }: CalculatorCardProps) {
  return (
    <Card className="h-fit shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}
