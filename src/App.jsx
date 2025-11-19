"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Holdings from "../src/pages/Holdings"
import TradingCharts from "../src/pages/TradingCharts"
import Discover from "./pages/Discover"
import Wallet from "../src/pages/Wallet"
import OptionChain from "../src/pages/OptionChain"
import Layout from "./webcomponents/layout/Layout"
import Login from "./pages/Login"
import ProtectedRoute from "./protectedRoute/ProtectedRoute"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/holdings" replace />} />
                  <Route path="/holdings" element={<Holdings />} />
                  <Route path="/trading-charts" element={<TradingCharts />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/option-chain" element={<OptionChain />} />
                  <Route path="/orders" element={<div className="p-8">Orders Page - Coming Soon</div>} />
                  <Route path="/positions" element={<div className="p-8">Positions Page - Coming Soon</div>} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}
