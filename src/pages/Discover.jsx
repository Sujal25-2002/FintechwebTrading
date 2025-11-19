"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Calendar, RefreshCw } from "lucide-react"
import OptionsMetrics from "@/webcomponents/options/OptionsMetrics"
import OptionsChart from "@/webcomponents/options/OptionsChart"

const Discover = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState("NIFTY50")
  const [selectedAnalysis, setSelectedAnalysis] = useState("OI")
  const [selectedDate, setSelectedDate] = useState("14 Aug 2025")
  const [dataType, setDataType] = useState("Intraday")

  // Demo options data matching the screenshot
  const optionsData = {
    NIFTY50: {
      spot: 24585.05,
      totalCalls: 1441.85,
      totalPuts: 1440.89,
      chartData: [
        { strike: 24100, callOI: 45, putOI: 25 },
        { strike: 24150, callOI: 35, putOI: 30 },
        { strike: 24200, callOI: 60, putOI: 15 },
        { strike: 24250, callOI: 40, putOI: 35 },
        { strike: 24300, callOI: 80, putOI: 25 },
        { strike: 24350, callOI: 95, putOI: 45 },
        { strike: 24400, callOI: 85, putOI: 55 },
        { strike: 24450, callOI: 75, putOI: 65 },
        { strike: 24500, callOI: 90, putOI: 85 },
        { strike: 24550, callOI: 110, putOI: 95 },
        { strike: 24600, callOI: 45, putOI: 75 },
        { strike: 24650, callOI: 35, putOI: 65 },
        { strike: 24700, callOI: 70, putOI: 45 },
        { strike: 24750, callOI: 65, putOI: 35 },
        { strike: 24800, callOI: 25, putOI: 55 },
        { strike: 24850, callOI: 15, putOI: 45 },
        { strike: 24900, callOI: 25, putOI: 35 },
        { strike: 24950, callOI: 20, putOI: 25 },
        { strike: 25000, callOI: 125, putOI: 15 },
        { strike: 25050, callOI: 85, putOI: 25 },
        { strike: 25100, callOI: 55, putOI: 35 },
      ],
    },
  }

  const indices = [
    { key: "NIFTY50", label: "NIFTY50" },
    { key: "SENSEX", label: "SENSEX" },
    { key: "NIFTYBANK", label: "NIFTYBANK" },
    { key: "FINNIFTY", label: "FINNIFTY" },
  ]

  const analysisTypes = [
    { key: "OI", label: "OI" },
    { key: "Change OI", label: "Change OI" },
    { key: "PCR", label: "PCR" },
    { key: "Max pain", label: "Max pain" },
  ]

  const currentData = optionsData[selectedIndex] || optionsData.NIFTY50

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600">OI Analysis</span>
      </div>

      {/* Index Tabs */}
      <div className="bg-white rounded-lg border">
        <Tabs value={selectedIndex} onValueChange={setSelectedIndex}>
          <div className="flex items-center justify-between p-4 border-b">
            <TabsList className="grid w-auto grid-cols-4">
              {indices.map((index) => (
                <TabsTrigger key={index.key} value={index.key}>
                  {index.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedDate}
              </Button>
              <Button variant="default" size="sm" className="bg-violet-600 hover:bg-violet-700">
                Option chain
              </Button>
            </div>
          </div>

          {/* Analysis Type Tabs */}
          <div className="p-4 border-b">
            <Tabs value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
              <TabsList className="grid w-auto grid-cols-4">
                {analysisTypes.map((type) => (
                  <TabsTrigger key={type.key} value={type.key}>
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <TabsContent value={selectedIndex} className="mt-0">
            <div className="p-6 space-y-6">
              {/* Metrics */}
              <OptionsMetrics data={currentData} />

              {/* Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <OptionsChart data={currentData.chartData} spotPrice={currentData.spot} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-teal-500 rounded"></div>
                    <span>Call OI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span>Put OI</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Monday 11 Aug 2025 04:57 PM IST</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={dataType === "Intraday" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setDataType("Intraday")}
                      className={dataType === "Intraday" ? "bg-violet-600 hover:bg-violet-700" : ""}
                    >
                      Intraday
                    </Button>
                    <Button
                      variant={dataType === "Historical" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setDataType("Historical")}
                      className={dataType === "Historical" ? "bg-violet-600 hover:bg-violet-700" : ""}
                    >
                      Historical
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Discover
