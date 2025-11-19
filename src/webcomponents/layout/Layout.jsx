"use client"

import Header from "./Header"
import Watchlist from "./Watchlist"

const Layout = ({ children }) => {
  return (
    // Checking if git is working or not
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Watchlist />
        <main className="flex-1 ml-[305px] pt-20 p-6 max-w-none overflow-hidden">
          <div className="w-full max-w-none">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
