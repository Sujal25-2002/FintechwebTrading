import { Card, CardContent } from "@/components/ui/card"

const OptionsMetrics = ({ data }) => {
  const formatNumber = (num) => {
    if (num >= 100) {
      return `${(num / 100).toFixed(2)} L`
    }
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Spot Price */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Spot</p>
            <p className="text-2xl font-bold">{data.spot.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Total Calls */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total calls</p>
            <p className="text-2xl font-bold">{formatNumber(data.totalCalls)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Total Puts */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total puts</p>
            <p className="text-2xl font-bold">{formatNumber(data.totalPuts)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OptionsMetrics
