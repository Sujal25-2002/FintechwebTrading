"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase" // adjust path as needed

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Star,
  HelpCircle,
  CreditCard,
  MoreHorizontal,
  ChevronDown
} from "lucide-react"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  // ✅ Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navItems = [
    { label: "TBT Charts", path: "/trading-charts" },
    { label: "F&O", path: "/option-chain" },
    { label: "Discover", path: "/discover" },
    { label: "Orders", path: "/orders" },
    { label: "Positions", path: "/positions" },
    { label: "Holdings", path: "/holdings" },
  ]

  return (
    <header className="fixed top-0 left-80 right-0 bg-white border-b border-gray-200 px-4 z-50 h-16">
      <div className="flex items-center justify-between h-full">
        {/* Center - Navigation */}
        <nav className="flex items-center space-x-1">  
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`${
                location.pathname === item.path
                  ? "bg-violet-600 text-white hover:bg-violet-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-200"
              } h-8 px-3 text-sm font-medium cursor-pointer`}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right side - User Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-200"
          >
            <Star className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            <MoreHorizontal className="h-4 w-4 mr-1" />
            More
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Help
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 flex items-center cursor-pointer" 
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage
                    src={user?.photoURL || "/user-avatar.png"}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback>
                    {user?.displayName
                      ? user.displayName[0].toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">
                  {user?.displayName || "User"}
                </span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44 cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer bg-red-500 text-white hover:bg-red-400 hover:text-white" onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-sm border-gray-300 text-gray-700 hover:bg-gray-200 bg-transparent"
            onClick={() => navigate("/wallet")}
          >
            <CreditCard className="h-4 w-4 mr-1" />
            Funds
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
