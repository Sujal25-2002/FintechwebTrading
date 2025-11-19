"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const AddStockSheet = ({ isOpen, onClose, watchlistStocks = [], onAddStock, onRemoveStock }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Demo stock data - in real app this would come from an API
  const allStocks = [
    { symbol: "TATASTEEL", exchange: "NSE EQ", price: 155.3, change: -4.88, changePercent: -3.05, category: "Cash" },
    { symbol: "TATASTEEL", exchange: "BSE A", price: 155.3, change: -4.85, changePercent: -3.03, category: "Cash" },
    { symbol: "TATASTEEL FUT", exchange: "NFO 28AUG2025", price: 0, change: 0, changePercent: 0, category: "Futures" },
    { symbol: "TATASTEEL FUT", exchange: "NFO 28OCT2025", price: 0, change: 0, changePercent: 0, category: "Futures" },
    { symbol: "TATASTEEL FUT", exchange: "NFO 30SEP2025", price: 0, change: 0, changePercent: 0, category: "Futures" },
      {
          symbol: "TATASTEEL 165 CE",
          exchange: "NFO 28AUG2025",
          price: 0,
          change: 0,
          changePercent: 0,
          category: "Options",
      },
    {
      symbol: "TATASTEEL 162.5 CE",
      exchange: "NFO 28AUG2025",
      price: 0,
      change: 0,
      changePercent: 0,
      category: "Options",
    },
    {
      symbol: "TATASTEEL 160 PE",
      exchange: "NFO 28AUG2025",
      price: 0,
      change: 0,
      changePercent: 0,
      category: "Options",
    },
    {
      symbol: "TATASTEEL 160 CE",
      exchange: "NFO 28AUG2025",
      price: 0,
      change: 0,
      changePercent: 0,
      category: "Options",
    },
    {
      symbol: "TATASTEEL 170 CE",
      exchange: "NFO 28AUG2025",
      price: 0,
      change: 0,
      changePercent: 0,
      category: "Options",
    },
    {
      symbol: "TATASTEEL 155 PE",
      exchange: "NFO 28AUG2025",
      price: 0,
      change: 0,
      changePercent: 0,
      category: "Options",
    },
    {
      symbol: "TATASTEEL 180 CE",
      exchange: "NFO 28AUG2025",
      price: 0,
      change: 0,
      changePercent: 0,
      category: "Options",
    },
    { symbol: "RELIANCE", exchange: "NSE EQ", price: 1380.4, change: -5.8, changePercent: -0.42, category: "Cash" },
    { symbol: "TCS", exchange: "NSE EQ", price: 3035.4, change: -5.4, changePercent: -0.18, category: "Cash" },
    { symbol: "HDFCBANK", exchange: "NSE EQ", price: 1969.9, change: -25.7, changePercent: -1.29, category: "Cash" },
    { symbol: "INFY", exchange: "NSE EQ", price: 1424.1, change: -4.1, changePercent: -0.29, category: "Cash" },
    { symbol: "NIFTY", exchange: "NSE", price: 24487.4, change: -97.65, changePercent: -0.4, category: "Indices" },
    { symbol: "SENSEX", exchange: "BSE", price: 80235.59, change: -368.49, changePercent: -0.46, category: "Indices" },
  ]

  const categories = ["All", "Cash", "Futures", "Options", "Indices"]

  // Filter stocks based on search query and category
  const filteredStocks = allStocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.exchange.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || stock.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Check if stock is already in watchlist
  const isInWatchlist = (stock) => {
    return watchlistStocks.some(
      (watchlistStock) => watchlistStock.symbol === stock.symbol && watchlistStock.exchange === stock.exchange,
    )
  }

  const handleAddStock = (stock) => {
    if (onAddStock) {
      onAddStock(stock)
    }
  }

  const handleRemoveStock = (stock) => {
    if (onRemoveStock) {
      onRemoveStock(stock)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[400px] sm:w-[500px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Add stocks to watchlist</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stocks, futures, options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="p-4 border-b">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto">
            {filteredStocks.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <div className="text-center">
                  <p className="text-sm">No stocks found</p>
                  <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredStocks.map((stock, index) => {
                  const inWatchlist = isInWatchlist(stock)
                  return (
                    <div
                      key={`${stock.symbol}-${stock.exchange}-${index}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{stock.symbol}</span>
                          <Badge variant="outline" className="text-xs">
                            {stock.exchange}
                          </Badge>
                        </div>
                        {stock.category === "Cash" && stock.price > 0 && (
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="font-medium">₹{stock.price.toFixed(2)}</span>
                            <span className={cn("font-medium", stock.change >= 0 ? "text-green-600" : "text-red-600")}>
                              {stock.change >= 0 ? "+" : ""}
                              {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%)
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        {inWatchlist ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                            onClick={() => handleRemoveStock(stock)}
                          >
                            <Minus className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleAddStock(stock)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredStocks.length} results found</span>
              <span>Watchlist: {watchlistStocks.length}/100</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AddStockSheet
