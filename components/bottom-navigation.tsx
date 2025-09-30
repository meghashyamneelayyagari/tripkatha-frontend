"use client"

import { Home, MapPin, Gem, User } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface BottomNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

const navItems = [
  { id: "home" as Screen, icon: Home, label: "Home" },
  { id: "trips" as Screen, icon: MapPin, label: "Trips" },
  { id: "hidden-gems" as Screen, icon: Gem, label: "Gems" },
  { id: "profile" as Screen, icon: User, label: "Profile" },
]

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div className="bg-card border-t border-border px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
