"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const TradingBottomPanel = () => {
  return (
    <div className="bg-white rounded-lg border">
      <Tabs defaultValue="orders" className="w-full">
        <div className="flex items-center justify-between p-3 border-b">
          <TabsList className="grid w-auto grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="positions" className="flex items-center space-x-2">
              <span>Positions</span>
              <Badge variant="secondary" className="text-xs">
                Day P&L 0.00
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="holdings" className="flex items-center space-x-2">
              <span>Holdings</span>
              <Badge variant="secondary" className="text-xs">
                Day P&L +7.41
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="orders" className="p-4">
          <div className="text-center text-gray-500 py-8">
            <p>No orders found</p>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="p-4">
          <div className="text-center text-gray-500 py-8">
            <p>No positions found</p>
          </div>
        </TabsContent>

        <TabsContent value="holdings" className="p-4">
          <div className="text-center text-gray-500 py-8">
            <p>Holdings data available in Holdings page</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TradingBottomPanel
