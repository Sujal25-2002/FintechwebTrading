"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Percent } from "lucide-react"

const TimePeriodSelector = ({ selectedPeriod, onPeriodChange }) => {
  const periods = ["5Y", "1Y", "6M", "3M", "1M", "5D", "1D"]

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
      <div className="flex items-center space-x-1">
        {periods.map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "ghost"}
            size="sm"
            onClick={() => onPeriodChange(period)}
            className={selectedPeriod === period ? "bg-violet-600 hover:bg-violet-700" : ""}
          >
            {period}
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Calendar className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-500">Powered by TBT</span>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500">22:48:38 (UTC+5:30)</span>
          <Button variant="ghost" size="sm">
            <Percent className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            log
          </Button>
          <Button variant="ghost" size="sm">
            auto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TimePeriodSelector
