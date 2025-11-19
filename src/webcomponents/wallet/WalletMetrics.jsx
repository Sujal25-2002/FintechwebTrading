import { Card, CardContent } from "@/components/ui/card"

const WalletMetrics = ({ data }) => {
  const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Total cash */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-700">Total cash</h3>
            <p className="text-xs text-gray-500">All segments</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.totalCash)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Available to trade */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-700">Available to trade</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.availableToTrade)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Margin from Pledge */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-700">Margin from Pledge</h3>
            <p className="text-xs text-gray-500">Eq Delivery, Eq Intraday, F&O</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.marginFromPledge)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Unavailable to trade */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-700">Unavailable to trade</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.unavailableToTrade)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WalletMetrics
