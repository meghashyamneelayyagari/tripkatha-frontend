"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Map, Gem, ShieldAlert, BookOpen } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold text-foreground">TripKatha</h1>
        <p className="text-sm text-muted-foreground">Your Travel Companion</p>
      </div>

      {/* Main Action Button */}
      <Button
        onClick={() => onNavigate("create-trip")}
        className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg"
        size="lg"
      >
        <Plus className="w-6 h-6 mr-2" />
        Start New Trip
      </Button>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">Trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">47</p>
            <p className="text-xs text-muted-foreground">Places</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-muted-foreground">Photos</p>
          </CardContent>
        </Card>
      </div>

      {/* --- THIS IS THE CORRECTED GRID LAYOUT --- */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="cursor-pointer hover:bg-muted/50" onClick={() => onNavigate("trips")}>
          <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
            <Map className="w-6 h-6 text-primary" />
            <span className="font-semibold text-sm">My Trips</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50" onClick={() => onNavigate("hidden-gems")}>
          <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
            <Gem className="w-6 h-6 text-primary" />
            <span className="font-semibold text-sm">Hidden Gems</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50" onClick={() => onNavigate("sos")}>
          <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
            <ShieldAlert className="w-6 h-6 text-destructive" />
            <span className="font-semibold text-sm">Emergency SOS</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50" onClick={() => onNavigate("trip-diary")}>
           <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-semibold text-sm">Recent Diary</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
