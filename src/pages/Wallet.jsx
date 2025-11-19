"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import WalletMetrics from "@/webcomponents/wallet/WalletMetrics"
import WalletPromotion from "@/webcomponents/wallet/WalletPromotion"
import WalletSidebar from "@/webcomponents/wallet/WalletSidebar"
import { RefreshCw, HelpCircle, ChevronRight } from "lucide-react"


const Wallet = () => {
  // Demo wallet data matching the screenshot
  const walletData = {
    totalCash: -354.0,
    marginFromPledge: 0.0,
    availableToTrade: -354.0,
    marginUsed: 0.0,
    unavailableToTrade: 0.0,
    availableToWithdraw: -354.0,
  }

  return (
    <div className="flex bg-gray-50 min-h-full">
      {/* Wallet Navigation Sidebar - within content area */}
      {/* <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <WalletSidebar />
      </div> */}

      {/* Main Wallet Content */}
      <div className="flex-1 p-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600">Funds</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-900">Wallet</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Wallet</h1>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
              <HelpCircle className="h-4 w-4 mr-1" />
              Help
            </Button>
          </div>
        </div>

        {/* Wallet Metrics */}
        <WalletMetrics data={walletData} />

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mb-6">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white px-6">Add funds</Button>
          <Button variant="outline" className="border-gray-300 bg-transparent">
            Withdraw funds
          </Button>
          <Button variant="outline" className="border-gray-300 bg-transparent">
            Pledge shares
          </Button>
        </div>

        {/* Promotion Section */}
        <div className="mb-6">
          <WalletPromotion />
        </div>

        {/* Additional Sections */}
        <div className="space-y-4">
          {/* View deposit and withdrawals */}
          <Card className="cursor-pointer hover:bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">View deposit and withdrawals</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Available to withdraw */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Available to withdraw</h3>
                  <p className="text-sm text-gray-600">All segments</p>
                </div>
                <div className="text-right flex items-center">
                  <p className="text-xl font-bold mr-2">₹{walletData.availableToWithdraw.toFixed(2)}</p>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Wallet
