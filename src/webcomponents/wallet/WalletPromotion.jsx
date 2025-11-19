import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const WalletPromotion = () => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-violet-900 mb-2">Get up to ₹1,745 in your wallet in just 5 mins!</h3>
            <p className="text-violet-700 mb-4">Increase your overall buying power</p>
            <Button variant="link" className="text-violet-600 hover:text-violet-700 p-0">
              Learn more
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="flex-shrink-0 ml-6">
            {/* Placeholder for illustration */}
            <div className="w-32 h-24 bg-gradient-to-br from-violet-200 to-purple-300 rounded-lg flex items-center justify-center">
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WalletPromotion
