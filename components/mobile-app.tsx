"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { HomeScreen } from "@/components/screens/home-screen"
import { TripsScreen } from "@/components/screens/trips-screen"
import { HiddenGemsScreen } from "@/components/screens/hidden-gems-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { CreateTripScreen } from "@/components/screens/create-trip-screen"
import { TripDiaryScreen } from "@/components/screens/trip-diary-screen"
import { SOSScreen } from "@/components/screens/sos-screen"
import { ActiveTripScreen } from "@/components/screens/active-trip-screen"
import { CameraScreen } from "@/components/screens/camera-screen" // Import camera screen

export type Screen =
  | "home"
  | "trips"
  | "hidden-gems"
  | "profile"
  | "create-trip"
  | "trip-diary"
  | "sos"
  | "active-trip"
  | "camera" // Add camera to screen types

interface MobileAppProps {
  username?: string
  onLogout?: () => void // Added onLogout prop
}

export function MobileApp({ username, onLogout }: MobileAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "trips":
        return <TripsScreen onNavigate={setCurrentScreen} />
      case "hidden-gems":
        return <HiddenGemsScreen onNavigate={setCurrentScreen} />
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} username={username} onLogout={onLogout} /> // Pass onLogout to ProfileScreen
      case "create-trip":
        return <CreateTripScreen onNavigate={setCurrentScreen} />
      case "trip-diary":
        return <TripDiaryScreen onNavigate={setCurrentScreen} />
      case "sos":
        return <SOSScreen onNavigate={setCurrentScreen} />
      case "active-trip":
        return <ActiveTripScreen onNavigate={setCurrentScreen} />
      case "camera": // Add camera screen case
        return <CameraScreen onNavigate={setCurrentScreen} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto border-x border-border">
      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto">{renderScreen()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}
