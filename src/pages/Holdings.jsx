"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Download, ArrowUpDown, TrendingUp, TrendingDown, Settings } from "lucide-react"
import AdvancedHoldingsTable from "@/webcomponents/holdings/AdvancedHoldingsTable"
import { cn } from "@/lib/utils"

const Holdings = () => {
  const [activeTab, setActiveTab] = useState("all")

  // Comprehensive sample holdings data for all brokers
  const holdingsData = {
    zerodha: [
      {
        id: "1",
        symbol: "TATASTEEL",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 13,
        avgPrice: 148.75,
        ltp: 160.16,
        currentValue: 2082.08,
        dayPL: 21.32,
        dayPercent: 1.03,
        overallPL: 148.33,
        overallPercent: 7.67,
      },
      {
        id: "4",
        symbol: "HDFCBANK",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 10,
        avgPrice: 1850.0,
        ltp: 1969.9,
        currentValue: 19699.0,
        dayPL: -257.0,
        dayPercent: -1.29,
        overallPL: 1199.0,
        overallPercent: 6.49,
      },
      {
        id: "6",
        symbol: "ICICIBANK",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 15,
        avgPrice: 1350.0,
        ltp: 1422.0,
        currentValue: 21330.0,
        dayPL: -153.0,
        dayPercent: -1.02,
        overallPL: 1080.0,
        overallPercent: 5.33,
      },
      {
        id: "12",
        symbol: "SBIN",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 20,
        avgPrice: 780.0,
        ltp: 820.6,
        currentValue: 16412.0,
        dayPL: -57.0,
        dayPercent: -0.35,
        overallPL: 812.0,
        overallPercent: 5.21,
      },
      {
        id: "13",
        symbol: "BAJAJFINSV",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 3,
        avgPrice: 1850.0,
        ltp: 1908.0,
        currentValue: 5724.0,
        dayPL: -13.8,
        dayPercent: -0.24,
        overallPL: 174.0,
        overallPercent: 3.14,
      },
      {
        id: "14",
        symbol: "WIPRO",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 25,
        avgPrice: 420.0,
        ltp: 485.5,
        currentValue: 12137.5,
        dayPL: 182.5,
        dayPercent: 1.52,
        overallPL: 1637.5,
        overallPercent: 15.6,
      },
      {
        id: "15",
        symbol: "MARUTI",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 4,
        avgPrice: 9800.0,
        ltp: 10250.0,
        currentValue: 41000.0,
        dayPL: 180.0,
        dayPercent: 0.44,
        overallPL: 1800.0,
        overallPercent: 4.59,
      },
      {
        id: "16",
        symbol: "ASIANPAINT",
        exchange: "NSE EQ",
        broker: "Zerodha",
        netQty: 6,
        avgPrice: 2900.0,
        ltp: 2750.0,
        currentValue: 16500.0,
        dayPL: -165.0,
        dayPercent: -0.99,
        overallPL: -900.0,
        overallPercent: -5.17,
      },
    ],
    upstox: [
      {
        id: "2",
        symbol: "RELIANCE",
        exchange: "NSE EQ",
        broker: "Upstox",
        netQty: 5,
        avgPrice: 2450.0,
        ltp: 2380.4,
        currentValue: 11902.0,
        dayPL: -45.8,
        dayPercent: -0.38,
        overallPL: -347.0,
        overallPercent: -2.84,
      },
      {
        id: "7",
        symbol: "KOTAKBANK",
        exchange: "NSE EQ",
        broker: "Upstox",
        netQty: 7,
        avgPrice: 1900.0,
        ltp: 1959.0,
        currentValue: 13713.0,
        dayPL: -118.3,
        dayPercent: -0.86,
        overallPL: 413.0,
        overallPercent: 3.11,
      },
      {
        id: "17",
        symbol: "HINDUNILVR",
        exchange: "NSE EQ",
        broker: "Upstox",
        netQty: 4,
        avgPrice: 2400.0,
        ltp: 2483.8,
        currentValue: 9935.2,
        dayPL: -138.4,
        dayPercent: -1.37,
        overallPL: 335.2,
        overallPercent: 3.49,
      },
      {
        id: "18",
        symbol: "AXISBANK",
        exchange: "NSE EQ",
        broker: "Upstox",
        netQty: 12,
        avgPrice: 1050.0,
        ltp: 1125.0,
        currentValue: 13500.0,
        dayPL: -67.5,
        dayPercent: -0.5,
        overallPL: 900.0,
        overallPercent: 7.14,
      },
      {
        id: "19",
        symbol: "LT",
        exchange: "NSE EQ",
        broker: "Upstox",
        netQty: 8,
        avgPrice: 3200.0,
        ltp: 3350.0,
        currentValue: 26800.0,
        dayPL: 134.0,
        dayPercent: 0.4,
        overallPL: 1200.0,
        overallPercent: 4.69,
      },
      {
        id: "20",
        symbol: "ONGC",
        exchange: "NSE EQ",
        broker: "Upstox",
        netQty: 30,
        avgPrice: 180.0,
        ltp: 195.0,
        currentValue: 5850.0,
        dayPL: -29.25,
        dayPercent: -0.5,
        overallPL: 450.0,
        overallPercent: 8.33,
      },
    ],
    angelone: [
      {
        id: "3",
        symbol: "TCS",
        exchange: "NSE EQ",
        broker: "Angel One",
        netQty: 2,
        avgPrice: 3100.0,
        ltp: 3035.4,
        currentValue: 6070.8,
        dayPL: -12.8,
        dayPercent: -0.21,
        overallPL: -128.8,
        overallPercent: -2.08,
      },
      {
        id: "8",
        symbol: "SBIN",
        exchange: "NSE EQ",
        broker: "Angel One",
        netQty: 25,
        avgPrice: 800.0,
        ltp: 820.6,
        currentValue: 20515.0,
        dayPL: -71.25,
        dayPercent: -0.35,
        overallPL: 515.0,
        overallPercent: 2.58,
      },
      {
        id: "21",
        symbol: "BHARTIARTL",
        exchange: "NSE EQ",
        broker: "Angel One",
        netQty: 15,
        avgPrice: 850.0,
        ltp: 920.0,
        currentValue: 13800.0,
        dayPL: 69.0,
        dayPercent: 0.5,
        overallPL: 1050.0,
        overallPercent: 8.24,
      },
      {
        id: "22",
        symbol: "POWERGRID",
        exchange: "NSE EQ",
        broker: "Angel One",
        netQty: 40,
        avgPrice: 220.0,
        ltp: 235.0,
        currentValue: 9400.0,
        dayPL: -47.0,
        dayPercent: -0.5,
        overallPL: 600.0,
        overallPercent: 6.82,
      },
    ],
    groww: [
      {
        id: "5",
        symbol: "INFY",
        exchange: "NSE EQ",
        broker: "Groww",
        netQty: 8,
        avgPrice: 1500.0,
        ltp: 1424.1,
        currentValue: 11392.8,
        dayPL: -32.8,
        dayPercent: -0.29,
        overallPL: -607.2,
        overallPercent: -5.06,
      },
      {
        id: "9",
        symbol: "HINDUNILVR",
        exchange: "NSE EQ",
        broker: "Groww",
        netQty: 3,
        avgPrice: 2400.0,
        ltp: 2483.8,
        currentValue: 7451.4,
        dayPL: -103.8,
        dayPercent: -1.37,
        overallPL: 251.4,
        overallPercent: 3.49,
      },
      {
        id: "23",
        symbol: "NESTLEIND",
        exchange: "NSE EQ",
        broker: "Groww",
        netQty: 2,
        avgPrice: 22000.0,
        ltp: 23500.0,
        currentValue: 47000.0,
        dayPL: 235.0,
        dayPercent: 0.5,
        overallPL: 3000.0,
        overallPercent: 6.82,
      },
    ],
    "5paisa": [
      {
        id: "10",
        symbol: "BAJAJFINSV",
        exchange: "NSE EQ",
        broker: "5paisa",
        netQty: 4,
        avgPrice: 1850.0,
        ltp: 1908.0,
        currentValue: 7632.0,
        dayPL: -18.4,
        dayPercent: -0.24,
        overallPL: 232.0,
        overallPercent: 3.14,
      },
      {
        id: "24",
        symbol: "HCLTECH",
        exchange: "NSE EQ",
        broker: "5paisa",
        netQty: 10,
        avgPrice: 1200.0,
        ltp: 1350.0,
        currentValue: 13500.0,
        dayPL: 67.5,
        dayPercent: 0.5,
        overallPL: 1500.0,
        overallPercent: 12.5,
      },
    ],
    indmoney: [
      {
        id: "11",
        symbol: "WIPRO",
        exchange: "NSE EQ",
        broker: "INDmoney",
        netQty: 20,
        avgPrice: 450.0,
        ltp: 485.5,
        currentValue: 9710.0,
        dayPL: 142.0,
        dayPercent: 1.48,
        overallPL: 710.0,
        overallPercent: 7.89,
      },
      {
        id: "25",
        symbol: "TECHM",
        exchange: "NSE EQ",
        broker: "INDmoney",
        netQty: 12,
        avgPrice: 1100.0,
        ltp: 1180.0,
        currentValue: 14160.0,
        dayPL: 70.8,
        dayPercent: 0.5,
        overallPL: 960.0,
        overallPercent: 7.27,
      },
    ],
  }

  // Create "all" data by combining all broker holdings
  holdingsData.all = [
    ...holdingsData.zerodha,
    ...holdingsData.upstox,
    ...holdingsData.angelone,
    ...holdingsData.groww,
    ...holdingsData["5paisa"],
    ...holdingsData.indmoney,
  ]

  const brokers = [
    {
      id: "all",
      name: "All Brokers",
      logo: "/placeholder.svg?height=24&width=24&text=ALL",
      color: "from-gray-500 to-gray-600",
    },
    {
      id: "zerodha",
      name: "Zerodha",
      logo: "/zerodha_logo.png",
    },
    {
      id: "upstox",
      name: "Upstox",
      logo: "/upstox_logo.png",
    },
    {
      id: "angelone",
      name: "Angel One",
      logo: "/angleone_logo.png",
    },
    {
      id: "groww",
      name: "Groww",
      logo: "/grow_logo.jpg",
    },
    {
      id: "5paisa",
      name: "5paisa",
      logo: "/paise_logo.jpeg",
    },
    {
      id: "indmoney",
      name: "INDmoney",
      logo: "/indmoney_logo.png",
    },
  ]

  // Get current holdings and broker
  const currentHoldings = holdingsData[activeTab] || []
  const currentBroker = brokers.find((b) => b.id === activeTab) || brokers[0]

  // Calculate totals from actual data
  const calculateTotals = (holdings) => {
    return holdings.reduce(
      (acc, holding) => ({
        invested: acc.invested + holding.avgPrice * holding.netQty,
        current: acc.current + holding.currentValue,
        dayPL: acc.dayPL + holding.dayPL,
        overallPL: acc.overallPL + holding.overallPL,
      }),
      { invested: 0, current: 0, dayPL: 0, overallPL: 0 },
    )
  }

  const totals = calculateTotals(currentHoldings)
  const dayPercent = totals.invested > 0 ? (totals.dayPL / totals.invested) * 100 : 0
  const overallPercent = totals.invested > 0 ? (totals.overallPL / totals.invested) * 100 : 0

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
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Holdings</h1>
          <p className="text-gray-600 mt-2">Unified view across all your brokers</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="h-9 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-9 bg-transparent">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="h-9 bg-violet-600 hover:bg-violet-700">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Authorise
          </Button>
        </div>
      </div>

      {/* Enhanced Portfolio Summary Cards - MOVED TO TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {/* Invested Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-700">Invested</CardTitle>
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">💰</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(totals.invested)}</p>
              <p className="text-xs text-blue-600 font-medium">{currentBroker.name}</p>
            </div>
          </CardContent>
        </Card>

        {/* Current Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-700">Current Value</CardTitle>
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">📊</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(totals.current)}</p>
              <p className="text-xs text-purple-600 font-medium">{currentHoldings.length} holdings</p>
            </div>
          </CardContent>
        </Card>

        {/* Overall P&L Card */}
        <Card
          className={cn(
            "border-0 shadow-lg",
            totals.overallPL >= 0
              ? "bg-gradient-to-br from-green-50 to-green-100"
              : "bg-gradient-to-br from-red-50 to-red-100",
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle
                className={cn("text-sm font-medium", totals.overallPL >= 0 ? "text-green-700" : "text-red-700")}
              >
                Overall P&L
              </CardTitle>
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  totals.overallPL >= 0 ? "bg-green-500" : "bg-red-500",
                )}
              >
                {totals.overallPL >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-white" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <p className={cn("text-2xl font-bold", totals.overallPL >= 0 ? "text-green-900" : "text-red-900")}>
                {totals.overallPL >= 0 ? "+" : ""}
                {formatCurrency(totals.overallPL)}
              </p>
              <p className={cn("text-xs font-medium", totals.overallPL >= 0 ? "text-green-600" : "text-red-600")}>
                {overallPercent >= 0 ? "+" : ""}
                {formatNumber(overallPercent)}%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Day P&L Card */}
        <Card
          className={cn(
            "border-0 shadow-lg",
            totals.dayPL >= 0
              ? "bg-gradient-to-br from-emerald-50 to-emerald-100"
              : "bg-gradient-to-br from-orange-50 to-orange-100",
          )}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle
                className={cn("text-sm font-medium", totals.dayPL >= 0 ? "text-emerald-700" : "text-orange-700")}
              >
                Day P&L
              </CardTitle>
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  totals.dayPL >= 0 ? "bg-emerald-500" : "bg-orange-500",
                )}
              >
                {totals.dayPL >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-white" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <p className={cn("text-2xl font-bold", totals.dayPL >= 0 ? "text-emerald-900" : "text-orange-900")}>
                {totals.dayPL >= 0 ? "+" : ""}
                {formatCurrency(totals.dayPL)}
              </p>
              <p className={cn("text-xs font-medium", totals.dayPL >= 0 ? "text-emerald-600" : "text-orange-600")}>
                {dayPercent >= 0 ? "+" : ""}
                {formatNumber(dayPercent)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clean Horizontal Broker Tabs - NO CARD WRAPPER */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Simple horizontal line with underlined active tab */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex items-center space-x-12 px-2">
            {brokers.map((broker) => {
              const brokerHoldings = holdingsData[broker.id] || []
              const isActive = activeTab === broker.id
              return (
                <button
                  key={broker.id}
                  onClick={() => setActiveTab(broker.id)}
                  className={cn(
                    "flex items-center space-x-3 pb-4 border-b-2 transition-all duration-200 relative group",
                    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                    isActive
                      ? "border-violet-600 text-violet-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300",
                  )}
                >
                  {/* CONDITIONAL RENDERING - Only show image container for non-"all" brokers */}
                  {broker.id !== "all" && (
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r transition-transform group-hover:scale-105",
                        broker.color,
                      )}
                    >
                      <img src={broker.logo || "/placeholder.svg"} alt={broker.name} className="w-12 h-8 rounded" />
                    </div>
                  )}
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm whitespace-nowrap">{broker.name}</span>
                    <span className="text-xs text-gray-500 font-medium">{brokerHoldings.length}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Advanced Holdings Table for each broker */}
        {brokers.map((broker) => (
          <TabsContent key={broker.id} value={broker.id} className="mt-0">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* CONDITIONAL RENDERING - Only show image container for non-"all" brokers */}
                    {broker.id !== "all" && (
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r",
                          broker.color,
                        )}
                      >
                        <img src={broker.logo || "/placeholder.svg"} alt={broker.name} className="w-32 h-12 rounded" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">{broker.name} Holdings</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{currentHoldings.length} stocks</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {currentHoldings.length > 0 ? (
                  <AdvancedHoldingsTable data={currentHoldings} brokers={brokers} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    {/* CONDITIONAL RENDERING - Only show image container for non-"all" brokers */}
                    {broker.id !== "all" && (
                      <div
                        className={cn(
                          "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r",
                          broker.color,
                        )}
                      >
                        <img
                          src={broker.logo || "/placeholder.svg"}
                          alt={broker.name}
                          className="w-16 h-16 rounded opacity-80"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {broker.id === "all" ? "No holdings found" : `No holdings in ${broker.name}`}
                    </h3>
                    <p className="text-sm text-gray-500 text-center max-w-md mb-6">
                      {broker.id === "all"
                        ? "Connect your broker accounts to see your portfolio data here."
                        : `Connect your ${broker.name} account or add holdings to see your portfolio data here.`}
                    </p>
                    {broker.id !== "all" && (
                      <Button className="bg-violet-600 hover:bg-violet-700">Connect {broker.name}</Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Holdings
