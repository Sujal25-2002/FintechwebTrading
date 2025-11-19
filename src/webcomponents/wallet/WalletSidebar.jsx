"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const WalletSidebar = () => {
  const [activeItem, setActiveItem] = useState("Wallet")
  const [importantLinksOpen, setImportantLinksOpen] = useState(false)

  const menuItems = [
    { label: "Funds", active: false },
    { label: "Wallet", active: true },
    { label: "Transactions", active: false },
    { label: "My Alerts", active: false },
    { label: "Active Price Alerts", active: false },
    { label: "Price Alerts History", active: false },
    { label: "P&L Alerts", active: false },
  ]

  return (
    <div className="fixed left-0 top-16 w-80 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
      {/* Close button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start text-left",
              item.active && "bg-violet-100 text-violet-700 hover:bg-violet-100",
            )}
            onClick={() => setActiveItem(item.label)}
          >
            {item.label}
          </Button>
        ))}

        {/* Important links */}
        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full justify-between text-left"
            onClick={() => setImportantLinksOpen(!importantLinksOpen)}
          >
            <span>Important links</span>
            {importantLinksOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {importantLinksOpen && (
            <div className="ml-4 mt-2 space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                Terms & Conditions
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                Support
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletSidebar
