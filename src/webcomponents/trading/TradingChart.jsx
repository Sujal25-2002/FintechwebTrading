"use client"

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const TradingChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />

          {/* Main Y-axis for price */}
          <YAxis
            yAxisId="price"
            domain={["dataMin - 5", "dataMax + 5"]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666" }}
            orientation="right"
          />

          {/* Secondary Y-axis for volume */}
          <YAxis yAxisId="volume" domain={[0, "dataMax"]} axisLine={false} tickLine={false} hide={true} />

          {/* Volume bars */}
          <Bar dataKey="volume" fill="#e5e7eb" opacity={0.3} yAxisId="volume" />

          {/* Price line */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            connectNulls
            yAxisId="price"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TradingChart
