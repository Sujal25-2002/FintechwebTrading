"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"

const OptionsChart = ({ data, spotPrice }) => {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    ...item,
    callOI: -item.callOI, // Negative values to show calls below the axis
  }))

  const CustomTick = (props) => {
    const { x, y, payload } = props
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="12">
          {payload.value.toLocaleString()}
        </text>
      </g>
    )
  }

  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props
    const value = Math.abs(payload.value)
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize="12">
          {value} L
        </text>
      </g>
    )
  }

  return (
    <div className="h-96">
      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">Spot price: {spotPrice.toLocaleString()}</p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="strike"
            tick={<CustomTick />}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={<CustomYAxisTick />} axisLine={false} tickLine={false} domain={[-150, 150]} />

          {/* Reference line at zero */}
          <ReferenceLine y={0} stroke="#666" strokeWidth={1} />

          {/* Spot price reference line */}
          <ReferenceLine
            x={spotPrice}
            stroke="#2563eb"
            strokeWidth={2}
            strokeDasharray="5 5"
            label={{ value: `Spot: ${spotPrice}`, position: "top" }}
          />

          {/* Call OI bars (negative values, shown below axis) */}
          <Bar dataKey="callOI" fill="#14b8a6" name="Call OI" radius={[0, 0, 2, 2]} />

          {/* Put OI bars (positive values, shown above axis) */}
          <Bar dataKey="putOI" fill="#f97316" name="Put OI" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OptionsChart
