"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, BookOpen, Shield, Gem, Route } from "lucide-react"

interface OnboardingScreensProps {
  onComplete: () => void
}

const onboardingData = [
  {
    title: "Welcome to TripKatha",
    subtitle: "Your Ultimate Travel Companion",
    description: "Discover Kerala's beauty while staying safe and organized on your journeys.",
    icon: <MapPin className="w-16 h-16 text-primary" />,
    image: "/kerala-backwaters-with-traditional-houseboat.jpg",
  },
  {
    title: "Track Your Adventures",
    subtitle: "Smart Trip Tracking",
    description: "Automatically log your routes, destinations, and travel companions with GPS precision.",
    icon: <Route className="w-16 h-16 text-primary" />,
    image: "/gps-navigation-on-smartphone-with-kerala-map.jpg",
  },
  {
    title: "Capture Memories",
    subtitle: "Travel Diary & Reviews",
    description: "Document your experiences with photos, notes, and share your adventures instantly.",
    icon: <BookOpen className="w-16 h-16 text-primary" />,
    image: "/travel-journal-with-kerala-landscape-photos.jpg",
  },
  {
    title: "Stay Safe Always",
    subtitle: "Emergency SOS Feature",
    description: "Quick access to emergency services and location sharing for peace of mind.",
    icon: <Shield className="w-16 h-16 text-destructive" />,
    image: "/emergency-sos-button-on-smartphone.jpg",
  },
  {
    title: "Discover Hidden Gems",
    subtitle: "Local Treasures Await",
    description: "Find lesser-known beautiful places recommended by locals and fellow travelers.",
    icon: <Gem className="w-16 h-16 text-secondary" />,
    image: "/hidden-waterfall-in-kerala-forest.jpg",
  },
]

export function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  const nextScreen = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      onComplete()
    }
  }

  const skipOnboarding = () => {
    onComplete()
  }

  const currentData = onboardingData[currentScreen]

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background flex flex-col">
      {/* Skip Button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={skipOnboarding} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <Card className="w-full max-w-sm shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            {/* Image */}
            <div className="w-full h-48 rounded-xl overflow-hidden bg-muted">
              <img
                src={currentData.image || "/placeholder.svg"}
                alt={currentData.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Icon */}
            <div className="flex justify-center">{currentData.icon}</div>

            {/* Text Content */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-foreground text-balance">{currentData.title}</h1>
              <h2 className="text-lg font-semibold text-primary">{currentData.subtitle}</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">{currentData.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicators */}
        <div className="flex space-x-2 mt-8">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentScreen ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Navigation Button */}
        <Button
          onClick={nextScreen}
          className="mt-8 w-full max-w-sm h-12 text-lg font-semibold rounded-xl shadow-lg"
          size="lg"
        >
          {currentScreen === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  )
}
