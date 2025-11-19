"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import AddStockSheet from "@/webcomponents/watchlist/AddStockSheet"
import OrderModal from "@/webcomponents/trading/OrderModal"

const Watchlist = () => {
  const [selectedWatchlist, setSelectedWatchlist] = useState(1)
  const [addStockSheetOpen, setAddStockSheetOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)
  const [orderType, setOrderType] = useState("BUY")
  const [hoveredStock, setHoveredStock] = useState(null)

  const marketIndices = [
    {
      name: "NIFTY",
      value: "24,487.40",
      change: "-97.65",
      percentage: "-0.40%",
      trend: "down",
    },
    {
      name: "SENSEX",
      value: "80,235.59",
      change: "-368.49",
      percentage: "-0.46%",
      trend: "down",
    },
  ]

  const [watchlist, setWatchlist] = useState([
    {
      symbol: "NSDL",
      exchange: "BSE B",
      price: "1,288.80",
      change: "+15.80",
      percentage: "(+1.24%)",
      trend: "up",
      selected: true,
    },
    {
      symbol: "ETERNAL",
      exchange: "NSE EQ",
      price: "305.90",
      change: "-3.50",
      percentage: "(-1.13%)",
      trend: "down",
    },
    {
      symbol: "TATASTEEL",
      exchange: "NSE EQ",
      price: "160.16",
      change: "+1.64",
      percentage: "(+1.03%)",
      trend: "up",
      hasHolding: true,
      quantity: "13",
    },
    {
      symbol: "TATASTEEL",
      exchange: "BSE A",
      price: "160.20",
      change: "+1.35",
      percentage: "(+0.85%)",
      trend: "up",
      hasHolding: true,
      quantity: "13",
    },
    {
      symbol: "RELIANCE",
      exchange: "NSE EQ",
      price: "1,380.40",
      change: "-5.80",
      percentage: "(-0.42%)",
      trend: "down",
    },
    {
      symbol: "TCS",
      exchange: "NSE EQ",
      price: "3,035.40",
      change: "-5.40",
      percentage: "(-0.18%)",
      trend: "down",
    },
    {
      symbol: "HDFCBANK",
      exchange: "NSE EQ",
      price: "1,969.90",
      change: "-25.70",
      percentage: "(-1.29%)",
      trend: "down",
    },
    {
      symbol: "INFY",
      exchange: "NSE EQ",
      price: "1,424.10",
      change: "-4.10",
      percentage: "(-0.29%)",
      trend: "down",
    },
    {
      symbol: "HINDUNILVR",
      exchange: "NSE EQ",
      price: "2,483.80",
      change: "-34.60",
      percentage: "(-1.37%)",
      trend: "down",
    },
    {
      symbol: "ICICIBANK",
      exchange: "NSE EQ",
      price: "1,422.00",
      change: "-14.60",
      percentage: "(-1.02%)",
      trend: "down",
    },
    {
      symbol: "KOTAKBANK",
      exchange: "NSE EQ",
      price: "1,959.00",
      change: "-16.90",
      percentage: "(-0.86%)",
      trend: "down",
    },
    {
      symbol: "SBIN",
      exchange: "NSE EQ",
      price: "820.60",
      change: "-2.85",
      percentage: "(-0.35%)",
      trend: "down",
    },
    {
      symbol: "BAJAJFINSV",
      exchange: "NSE EQ",
      price: "1,908.00",
      change: "-4.60",
      percentage: "(-0.24%)",
      trend: "down",
    },
  ])

  const handleAddStock = (stock) => {
    // Convert the stock format to match watchlist format
    const newStock = {
      symbol: stock.symbol,
      exchange: stock.exchange,
      price: stock.price > 0 ? stock.price.toFixed(2) : "0.00",
      change: stock.change >= 0 ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2),
      percentage: `(${stock.changePercent >= 0 ? "+" : ""}${stock.changePercent.toFixed(2)}%)`,
      trend: stock.change >= 0 ? "up" : "down",
    }

    setWatchlist((prev) => [...prev, newStock])
  }

  const handleRemoveStock = (stock) => {
    setWatchlist((prev) =>
      prev.filter(
        (watchlistStock) => !(watchlistStock.symbol === stock.symbol && watchlistStock.exchange === stock.exchange),
      ),
    )
  }

  const handleOrderClick = (stock, type) => {
    // Convert watchlist stock format to OrderModal format
    const stockData = {
      symbol: stock.symbol,
      exchange: stock.exchange,
      price: Number.parseFloat(stock.price.replace(/,/g, "")),
      change: Number.parseFloat(stock.change.replace(/[+,]/g, "")),
      changePercent: Number.parseFloat(stock.percentage.replace(/[()%+]/g, "")),
    }

    setSelectedStock(stockData)
    setOrderType(type)
    setOrderModalOpen(true)
  }

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 z-50 flex flex-col">
        {/* Market Indices Section - at header level */}
        <div className="h-16 px-3 bg-white border-b border-gray-200 flex items-center relative">
          {/* Vertical separator centered between columns */}
          <div className="absolute top-0 left-1/2 transform -translate-x-0.5 h-full w-px bg-gray-300"></div>

          <div className="grid grid-cols-2 w-full">
            {marketIndices.map((index) => (
              <div key={index.name} className="px-3">
                <div className="space-y-0.5">
                  {/* Row 1 → Name + Percentage */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-gray-900">{index.name}</span>
                    <span className="text-xs text-red-600">{index.percentage}</span>
                  </div>

                  {/* Row 2 → Value + Change */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-red-500">{index.value}</span>
                    <span className="text-xs text-red-600">{index.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist Controls */}
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">Top 20 by market cap</span>
                <span className="text-sm text-gray-500 ml-2">{watchlist.length} / 100</span>
              </div>
              <span className="text-xs text-violet-600 font-medium">by You</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                className="bg-violet-600 hover:bg-violet-700 cursor-pointer text-white h-8 w-8 p-0"
                onClick={() => setAddStockSheetOpen(true)}
              >
                <Plus className="h-10 w-10" />
              </Button>
            </div>
          </div>
        </div>

        {/* Watchlist Items */}
        <div className="flex-1 overflow-y-auto">
          {watchlist.map((stock, index) => (
            <div
              key={`${stock.symbol}-${stock.exchange}-${index}`}
              className={cn(
                "px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 relative group",
                stock.selected && "bg-violet-50 border-l-4 border-l-violet-600",
              )}
              onMouseEnter={() => setHoveredStock(`${stock.symbol}-${stock.exchange}-${index}`)}
              onMouseLeave={() => setHoveredStock(null)}
            >
              <div className="flex items-center justify-between">
                {/* Left side - Stock info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-base text-gray-900 truncate">{stock.symbol}</span>
                    {stock.hasHolding && (
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <span className="text-sm">📊</span>
                        <span className="text-sm font-medium text-gray-700">{stock.quantity}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{stock.exchange}</div>
                </div>

                {/* Middle - Buy/Sell Buttons (only on hover) */}
                <div className="flex-shrink-0 mx-3">
                  {hoveredStock === `${stock.symbol}-${stock.exchange}-${index}` && (
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white h-6 w-6 p-0 text-xs font-bold rounded-sm shadow-md"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOrderClick(stock, "BUY")
                        }}
                      >
                        B
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white h-6 w-6 p-0 text-xs font-bold rounded-sm shadow-md"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOrderClick(stock, "SELL")
                        }}
                      >
                        S
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right side - Price info */}
                <div className="text-right flex-shrink-0">
                  <div
                    className={cn(
                      "font-semibold text-base mb-1",
                      stock.trend === "up" ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {stock.price}
                  </div>
                  <div className={cn("text-sm", stock.trend === "up" ? "text-green-600" : "text-red-600")}>
                    {stock.change} {stock.percentage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Stock Sheet */}
      <AddStockSheet
        isOpen={addStockSheetOpen}
        onClose={() => setAddStockSheetOpen(false)}
        watchlistStocks={watchlist}
        onAddStock={handleAddStock}
        onRemoveStock={handleRemoveStock}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        stockData={selectedStock}
        orderType={orderType}
      />
    </>
  )
}

export default Watchlist