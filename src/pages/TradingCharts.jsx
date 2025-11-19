"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, RefreshCw, Calendar, Percent, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import TradingChart from "@/webcomponents/trading/TradingChart"
import OrderModal from "@/webcomponents/trading/OrderModal"

const TradingCharts = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("NSDL")
  const [selectedPeriod, setSelectedPeriod] = useState("1D")
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [orderType, setOrderType] = useState("BUY")

  const stockData = {
    symbol: "NSDL",
    name: "NATIONAL SECURITIES DEPOSITORY",
    exchange: "BSE",
    sector: "5",
    currentPrice: 1273.95,
    change: 11.0,
    changePercent: 0.87,
    volume: "453.366K",
    high: 1279.95,
    low: 1265.95,
    open: 1265.95,
    prevClose: 1264.1,
    sellPrice: 1276.0,
    buyPrice: 1273.0,
    price: 1273.95,
  }

  const chartData = [
    { time: "10:30", open: 1265, high: 1270, low: 1260, close: 1268, volume: 45000 },
    { time: "11:00", open: 1268, high: 1275, low: 1265, close: 1272, volume: 52000 },
    { time: "11:30", open: 1272, high: 1280, low: 1270, close: 1278, volume: 48000 },
    { time: "12:00", open: 1278, high: 1285, low: 1275, close: 1282, volume: 55000 },
    { time: "12:30", open: 1282, high: 1290, low: 1280, close: 1288, volume: 62000 },
    { time: "13:00", open: 1288, high: 1295, low: 1285, close: 1292, volume: 58000 },
    { time: "13:30", open: 1292, high: 1298, low: 1290, close: 1295, volume: 51000 },
    { time: "14:00", open: 1295, high: 1300, low: 1292, close: 1298, volume: 47000 },
    { time: "14:30", open: 1298, high: 1305, low: 1295, close: 1302, volume: 53000 },
    { time: "15:00", open: 1302, high: 1308, low: 1300, close: 1305, volume: 49000 },
    { time: "15:30", open: 1305, high: 1310, low: 1302, close: 1308, volume: 45000 },
  ]

  const periods = ["5Y", "1Y", "6M", "3M", "1M", "5D", "1D"]

  const handleOrderClick = (type) => {
    setOrderType(type)
    setOrderModalOpen(true)
  }

  return (
    <div className="w-full max-w-none overflow-hidden">
      <div className="flex flex-col gap-4 h-full">
        {/* Top Search and Info Bar */}
        <div className="bg-white rounded-lg border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search symbol..."
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  5m
                </Button>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Info Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900">{stockData.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {stockData.sector}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {stockData.exchange}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-6 text-sm">
                <div>
                  <span className="text-gray-500">O</span>
                  <div className="font-medium">{stockData.open}</div>
                </div>
                <div>
                  <span className="text-gray-500">H</span>
                  <div className="font-medium">{stockData.high}</div>
                </div>
                <div>
                  <span className="text-gray-500">L</span>
                  <div className="font-medium">{stockData.low}</div>
                </div>
                <div>
                  <span className="text-gray-500">C</span>
                  <div className="font-medium">{stockData.prevClose}</div>
                </div>
                <div>
                  <span className="text-gray-500">Vol</span>
                  <div className="font-medium">{stockData.volume}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Buy/Sell Bar */}
        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-6">
              <div className="text-3xl font-bold text-gray-900">{stockData.currentPrice}</div>
              <div className={cn("flex items-center gap-2", stockData.change >= 0 ? "text-green-600" : "text-red-600")}>
                {stockData.change >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                <span className="text-lg font-semibold">
                  {stockData.change >= 0 ? "+" : ""}
                  {stockData.change} ({stockData.changePercent >= 0 ? "+" : ""}
                  {stockData.changePercent}%)
                </span>
              </div>
              <div className="text-sm text-gray-600">Volume SMA {stockData.volume}</div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                onClick={() => handleOrderClick("SELL")}
              >
                SELL {stockData.sellPrice}
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                onClick={() => handleOrderClick("BUY")}
              >
                BUY {stockData.buyPrice}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="bg-white rounded-lg border" style={{ height: "450px" }}>
          <TradingChart data={chartData} />
        </div>

        {/* Time Period Selector */}
        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-1">
              {periods.map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  {period}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4" />
              </Button>
              <span>Powered by TBT</span>
              <span>22:48:38 (UTC+5:30)</span>
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

        {/* Bottom Panel */}
        <div className="bg-white rounded-lg border">
          <Tabs defaultValue="orders" className="w-full">
            <div className="flex items-center justify-between p-3 border-b">
              <TabsList className="grid w-auto grid-cols-3">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="positions" className="flex items-center gap-2">
                  <span>Positions</span>
                  <Badge variant="secondary" className="text-xs">
                    Day P&L 0.00
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="holdings" className="flex items-center gap-2">
                  <span>Holdings</span>
                  <Badge variant="secondary" className="text-xs">
                    Day P&L +7.41
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  📥
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="orders" className="p-4">
              <div className="text-center text-gray-500 py-6">
                <p>No orders found</p>
              </div>
            </TabsContent>

            <TabsContent value="positions" className="p-4">
              <div className="text-center text-gray-500 py-6">
                <p>No positions found</p>
              </div>
            </TabsContent>

            <TabsContent value="holdings" className="p-4">
              <div className="text-center text-gray-500 py-6">
                <p>Holdings data available in Holdings page</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Modal */}
        <OrderModal
          isOpen={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
          stockData={stockData}
          orderType={orderType}
        />
      </div>
    </div>
  )
}

export default TradingCharts
