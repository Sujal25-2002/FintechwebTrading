"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Minus, Square, Triangle, Circle, Type, RotateCcw, Link, Trash2, Eye, Settings } from "lucide-react"

const TradingToolbar = () => {
  const tools = [
    { icon: TrendingUp, label: "Trend Line" },
    { icon: Minus, label: "Horizontal Line" },
    { icon: Square, label: "Rectangle" },
    { icon: Triangle, label: "Triangle" },
    { icon: Circle, label: "Circle" },
    { icon: Type, label: "Text" },
    { icon: RotateCcw, label: "Undo" },
    { icon: Link, label: "Link" },
    { icon: Trash2, label: "Delete" },
    { icon: Eye, label: "Hide" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="w-12 bg-white border rounded-lg flex flex-col items-center py-2 space-y-1">
      {tools.map((tool, index) => (
        <div key={index}>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-100" title={tool.label}>
            <tool.icon className="h-4 w-4" />
          </Button>
          {(index === 5 || index === 6) && <Separator className="my-1" />}
        </div>
      ))}
    </div>
  )
}

export default TradingToolbar
