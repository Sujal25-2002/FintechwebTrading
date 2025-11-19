"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

const AdvancedHoldingsTable = ({ data, brokers = [] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(num)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  // Get broker logo based on broker name
  const getBrokerLogo = (brokerName) => {
    const broker = brokers.find((b) => b.name === brokerName)
    if (broker && broker.logo) {
      return broker.logo
    }

    // Fallback logo mapping
    const logoMap = {
      Zerodha: "/zerodha_logo.png",
      Upstox: "/upstox_logo.png",
      "Angel One": "/angleone_logo.png",
      Groww: "/grow_logo.jpg",
      "5paisa": "/paise_logo.jpeg",
      INDmoney: "/indmoney_logo.png",
    }
    return logoMap[brokerName] || "/placeholder.svg?height=32&width=32&text=?"
  }

  // Filter data based on search query
  const filteredData = data.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exchange.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.broker.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize)

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(paginatedData.map((item) => item.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    }
  }

  const SortableHeader = ({ children, sortKey, className = "", align = "left" }) => (
    <TableHead
      className={cn(
        "font-semibold cursor-pointer hover:bg-gray-100 transition-colors py-4 px-4 whitespace-nowrap",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      onClick={() => handleSort(sortKey)}
    >
      <div
        className={cn(
          "flex items-center space-x-2",
          align === "center" && "justify-center",
          align === "right" && "justify-end",
        )}
      >
        <span>{children}</span>
        <ArrowUpDown className="h-3 w-3 text-gray-400 flex-shrink-0" />
      </div>
    </TableHead>
  )

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Table Controls */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search holdings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {selectedRows.length > 0 && (
              <div className="text-sm text-gray-600 ml-2">{selectedRows.length} selected</div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Show</span>
            <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
        </div>

        {/* Enhanced Table with Smooth Horizontal Scroll - All Columns Scroll */}
        <div className="border rounded-lg bg-white shadow-sm">
          <div
            className="overflow-x-auto"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Table className="min-w-[1000px] w-full">
              <TableHeader>
                <TableRow className="bg-gray-50 border-b-2">
                  <TableHead className="w-16 py-4 px-4">
                    <Checkbox
                      checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <SortableHeader sortKey="symbol" className="w-52">
                    Symbol
                  </SortableHeader>
                  <SortableHeader sortKey="broker" className="w-36" align="center">
                    Broker
                  </SortableHeader>
                  <SortableHeader sortKey="netQty" className="w-28" align="center">
                    Net Qty
                  </SortableHeader>
                  <SortableHeader sortKey="avgPrice" className="w-36" align="center">
                    Avg. Price
                  </SortableHeader>
                  <SortableHeader sortKey="ltp" className="w-36" align="center">
                    LTP
                  </SortableHeader>
                  <SortableHeader sortKey="currentValue" className="w-44" align="center">
                    Current Value
                  </SortableHeader>
                  <SortableHeader sortKey="dayPL" className="w-40" align="center">
                    Day P&L
                  </SortableHeader>
                  <SortableHeader sortKey="dayPercent" className="w-28" align="center">
                    Day %
                  </SortableHeader>
                  <SortableHeader sortKey="overallPL" className="w-40" align="center">
                    Overall P&L
                  </SortableHeader>
                  <SortableHeader sortKey="overallPercent" className="w-32" align="center">
                    Overall %
                  </SortableHeader>
                  <TableHead className="w-16 py-4 px-4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((holding) => (
                  <TableRow key={holding.id} className="hover:bg-gray-50 transition-colors border-b">
                    <TableCell className="py-5 px-4">
                      <Checkbox
                        checked={selectedRows.includes(holding.id)}
                        onCheckedChange={(checked) => handleSelectRow(holding.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900 text-base">{holding.symbol}</div>
                        <div className="text-sm text-gray-500">{holding.exchange}</div>
                      </div>
                    </TableCell>
                    {/* BROKER COLUMN WITH IMAGE INSTEAD OF TEXT */}
                    <TableCell className="py-5 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1 hover:shadow-md transition-shadow">
                              <img
                                src={getBrokerLogo(holding.broker) || "/placeholder.svg"}
                                alt={holding.broker}
                                className="w-8 h-8 object-contain rounded"
                                onError={(e) => {
                                  e.target.src = "/placeholder.svg?height=32&width=32&text=?"
                                }}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{holding.broker}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4 text-center font-medium text-base">{holding.netQty}</TableCell>
                    <TableCell className="py-5 px-4 text-right font-medium">
                      {formatCurrency(holding.avgPrice)}
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right font-semibold text-base">
                      {formatCurrency(holding.ltp)}
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right font-bold text-base">
                      {formatCurrency(holding.currentValue)}
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right">
                      <div
                        className={cn(
                          "flex items-center justify-end space-x-2 font-semibold text-base",
                          holding.dayPL >= 0 ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {holding.dayPL >= 0 ? (
                          <TrendingUp className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className="whitespace-nowrap">
                          {holding.dayPL >= 0 ? "+" : ""}
                          {formatCurrency(holding.dayPL)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right">
                      <span
                        className={cn(
                          "font-semibold text-base whitespace-nowrap",
                          holding.dayPercent >= 0 ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {holding.dayPercent >= 0 ? "+" : ""}
                        {formatNumber(holding.dayPercent)}%
                      </span>
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right">
                      <div
                        className={cn(
                          "flex items-center justify-end space-x-2 font-semibold text-base",
                          holding.overallPL >= 0 ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {holding.overallPL >= 0 ? (
                          <TrendingUp className="h-4 w-4 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className="whitespace-nowrap">
                          {holding.overallPL >= 0 ? "+" : ""}
                          {formatCurrency(holding.overallPL)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-4 text-right">
                      <span
                        className={cn(
                          "font-semibold text-base whitespace-nowrap",
                          holding.overallPercent >= 0 ? "text-green-600" : "text-red-600",
                        )}
                      >
                        {holding.overallPercent >= 0 ? "+" : ""}
                        {formatNumber(holding.overallPercent)}%
                      </span>
                    </TableCell>
                    <TableCell className="py-5 px-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t rounded-b-lg">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length}{" "}
            entries
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default AdvancedHoldingsTable
