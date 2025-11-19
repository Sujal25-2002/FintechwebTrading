"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, Plus, Minus, Lock, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const OrderModal = ({ isOpen, onClose, stockData, orderType = "BUY" }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedOrderType, setSelectedOrderType] = useState("Market")
  const [selectedDelivery, setSelectedDelivery] = useState("Delivery (Longterm)")
  const [selectedValidity, setSelectedValidity] = useState("Regular")

  // Demo data - in real app this would come from props or context
  const defaultStockData = {
    symbol: "NSDL",
    price: 1273.0,
    change: -27.3,
    changePercent: -2.1,
    exchange: "BSE",
  }

  // Use provided stockData or fallback to default, with proper null checks
  const stock = stockData && stockData.price ? stockData : defaultStockData
  const availableFunds = -354.0
  const requiredAmount = (stock?.price || 0) * quantity
  const hasSufficientFunds = availableFunds >= requiredAmount

  const orderTypes = ["Market", "Limit", "SL Limit", "SL Mkt"]
  const deliveryTypes = ["Delivery (Longterm)", "Intraday (Same day)"]

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, quantity + delta)
    setQuantity(newQuantity)
  }

  const handlePlaceOrder = () => {
    if (!hasSufficientFunds) {
      // In real app, this would redirect to add funds
      alert("Insufficient funds. Please add funds to continue.")
      return
    }
    // In real app, this would place the actual order
    alert(`${orderType} order placed for ${quantity} shares of ${stock.symbol}`)
    onClose()
  }

  // Don't render if modal is not open
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <DialogHeader className="p-4 pb-0 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DialogTitle className="text-lg font-semibold">{stock?.symbol || "Stock"}</DialogTitle>
              <span className="text-lg font-semibold">{(stock?.price || 0).toFixed(2)}</span>
              <Badge variant="secondary" className="text-xs">
                {stock?.exchange || "NSE"}
              </Badge>
            </div>
          </div>
          <div
            className={cn(
              "flex items-center space-x-1 text-sm",
              (stock?.change || 0) >= 0 ? "text-green-600" : "text-red-600",
            )}
          >
            <span>
              {(stock?.change || 0) >= 0 ? "+" : ""}
              {(stock?.change || 0).toFixed(2)} ({(stock?.changePercent || 0) >= 0 ? "+" : ""}
              {(stock?.changePercent || 0).toFixed(2)}%)
            </span>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-4">
            {/* Order Type Tabs */}
            <Tabs value={selectedValidity} onValueChange={setSelectedValidity}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className="cursor-pointer" value="Regular">Regular</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="GTT">GTT</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* AMO Notice */}
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
              <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <div className="text-sm">
                <span className="text-blue-900">Placing After Market Order (AMO). </span>
                <button className="text-blue-600 underline">Learn more</button>
              </div>
            </div>

            {/* Delivery Type */}
            <Tabs value={selectedDelivery} onValueChange={setSelectedDelivery}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className="cursor-pointer" value="Delivery (Longterm)">Delivery (Longterm)</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="Intraday (Same day)">Intraday (Same day)</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Quantity and Price */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(-1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="text-center"
                    min="1"
                  />
                  <Button variant="outline" size="sm" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price</label>
                <div className="flex items-center space-x-2">
                  <Input value="Market" readOnly className="flex-1" />
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Order Type Buttons */}
            <div>
              <label className="text-sm font-medium mb-2 block">Order type</label>
              <div className="grid grid-cols-2 gap-2">
                {orderTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedOrderType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedOrderType(type)}
                    className={selectedOrderType === type ? "bg-violet-600 hover:bg-violet-700" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Settings Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="additional-settings" className="border-none">
                <AccordionTrigger className="text-sm font-medium py-2 hover:no-underline">
                  Additional settings
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-0">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-3">Configure advanced order settings</p>

                    {/* Validity Settings */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Validity</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="justify-start bg-transparent">
                          Day
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start bg-transparent">
                          IOC
                        </Button>
                      </div>
                    </div>

                    {/* Disclosed Quantity */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Disclosed quantity</label>
                      <Input type="text" placeholder="Optional" className="text-sm" />
                      <p className="text-xs text-gray-500 mt-1">Minimum 10% of total quantity</p>
                    </div>

                    {/* Trigger Price (for SL orders) */}
                    {(selectedOrderType === "SL Limit" || selectedOrderType === "SL Mkt") && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Trigger price</label>
                        <Input type="number" placeholder="Enter trigger price" className="text-sm" />
                      </div>
                    )}

                    {/* Limit Price (for Limit orders) */}
                    {(selectedOrderType === "Limit" || selectedOrderType === "SL Limit") && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Limit price</label>
                        <Input type="number" placeholder="Enter limit price" className="text-sm" />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Fund Requirements */}
            <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Required:</span>
                <span className="font-semibold">₹ {requiredAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Available:</span>
                <span className={cn("font-semibold", availableFunds >= 0 ? "text-green-600" : "text-red-600")}>
                  ₹ {availableFunds.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Insufficient Funds Warning */}
            {!hasSufficientFunds && (
              <div className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-900">
                  You've insufficient funds to buy {stock?.symbol || "this stock"}. To continue, add funds.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer with Action Button */}
        <div className="p-4 pt-0 flex-shrink-0 border-t bg-white">
          <Button
            className={cn(
              "w-full",
              hasSufficientFunds
                ? orderType === "BUY"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
                : "bg-violet-600 hover:bg-violet-700",
            )}
            onClick={hasSufficientFunds ? handlePlaceOrder : () => alert("Redirect to add funds")}
          >
            {hasSufficientFunds ? `${orderType} ${stock?.symbol || "Stock"}` : "Add funds"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
