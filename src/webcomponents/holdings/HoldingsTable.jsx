import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const HoldingsTable = ({ data }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Symbol</TableHead>
            <TableHead className="font-semibold text-center">Broker</TableHead>
            <TableHead className="font-semibold text-center">Net Qty</TableHead>
            <TableHead className="font-semibold text-center">Avg. Price</TableHead>
            <TableHead className="font-semibold text-center">LTP</TableHead>
            <TableHead className="font-semibold text-center">Current Value</TableHead>
            <TableHead className="font-semibold text-center">Day P&L</TableHead>
            <TableHead className="font-semibold text-center">Day %</TableHead>
            <TableHead className="font-semibold text-center">Overall P&L</TableHead>
            <TableHead className="font-semibold text-center">Overall %</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((holding, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <div className="space-y-1">
                  <div className="font-semibold">{holding.symbol}</div>
                  <div className="text-sm text-gray-500">{holding.exchange}</div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="text-xs">
                  {holding.broker}
                </Badge>
              </TableCell>
              <TableCell className="text-center font-medium">{holding.netQty}</TableCell>
              <TableCell className="text-center">{formatCurrency(holding.avgPrice)}</TableCell>
              <TableCell className="text-center font-medium">{formatCurrency(holding.ltp)}</TableCell>
              <TableCell className="text-center font-medium">{formatCurrency(holding.currentValue)}</TableCell>
              <TableCell className="text-center">
                <div
                  className={cn(
                    "flex items-center justify-center space-x-1",
                    holding.dayPL >= 0 ? "text-green-600" : "text-red-600",
                  )}
                >
                  {holding.dayPL >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>
                    {holding.dayPL >= 0 ? "+" : ""}
                    {formatCurrency(holding.dayPL)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className={cn("font-medium", holding.dayPercent >= 0 ? "text-green-600" : "text-red-600")}>
                  {holding.dayPercent >= 0 ? "+" : ""}
                  {formatNumber(holding.dayPercent)}%
                </span>
              </TableCell>
              <TableCell className="text-center">
                <div
                  className={cn(
                    "flex items-center justify-center space-x-1",
                    holding.overallPL >= 0 ? "text-green-600" : "text-red-600",
                  )}
                >
                  {holding.overallPL >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>
                    {holding.overallPL >= 0 ? "+" : ""}
                    {formatCurrency(holding.overallPL)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className={cn("font-medium", holding.overallPercent >= 0 ? "text-green-600" : "text-red-600")}>
                  {holding.overallPercent >= 0 ? "+" : ""}
                  {formatNumber(holding.overallPercent)}%
                </span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  ⚡
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default HoldingsTable
