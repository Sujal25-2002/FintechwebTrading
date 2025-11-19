import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const PortfolioSummary = ({ data }) => {
  const { invested, current, overallPL, overallPercent, dayPL, dayPercent } = data

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Invested */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Invested</p>
            <p className="text-2xl font-semibold">{formatNumber(invested)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Current */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Current</p>
            <p className="text-2xl font-semibold">{formatNumber(current)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Overall P&L */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Overall P&L</p>
            <div className="flex items-center space-x-2">
              <p className={cn("text-2xl font-semibold", overallPL >= 0 ? "text-green-600" : "text-red-600")}>
                {overallPL >= 0 ? "+" : ""}
                {formatNumber(overallPL)}
              </p>
              <div className={cn("flex items-center text-sm", overallPL >= 0 ? "text-green-600" : "text-red-600")}>
                {overallPL >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}(
                {overallPercent >= 0 ? "+" : ""}
                {formatNumber(overallPercent)}%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day P&L */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Day P&L</p>
            <div className="flex items-center space-x-2">
              <p className={cn("text-2xl font-semibold", dayPL >= 0 ? "text-green-600" : "text-red-600")}>
                {dayPL >= 0 ? "+" : ""}
                {formatNumber(dayPL)}
              </p>
              <div className={cn("flex items-center text-sm", dayPL >= 0 ? "text-green-600" : "text-red-600")}>
                {dayPL >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}(
                {dayPercent >= 0 ? "+" : ""}
                {formatNumber(dayPercent)}%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PortfolioSummary
