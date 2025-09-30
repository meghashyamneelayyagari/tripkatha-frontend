"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Phone, MapPin, Share2, AlertTriangle, Shield } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface SOSScreenProps {
  onNavigate: (screen: Screen) => void
}

const emergencyContacts = [
  { name: "Police", number: "100", icon: Shield },
  { name: "Fire Service", number: "101", icon: AlertTriangle },
  { name: "Ambulance", number: "108", icon: Phone },
  { name: "Tourist Helpline", number: "1363", icon: Phone },
]

export function SOSScreen({ onNavigate }: SOSScreenProps) {
  const [isHolding, setIsHolding] = useState(false)
  const [emergencyActivated, setEmergencyActivated] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleHelpButtonPress = () => {
    setIsHolding(true)
    setHoldProgress(0)

    // Progress animation
    progressTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimerRef.current!)
          return 100
        }
        return prev + 100 / 30 // 30 steps over 3 seconds
      })
    }, 100)

    // 3-second timer for activation
    holdTimerRef.current = setTimeout(() => {
      setEmergencyActivated(true)
      setIsHolding(false)
      setHoldProgress(100)
    }, 3000)
  }

  const handleHelpButtonRelease = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
    }
    setIsHolding(false)
    setHoldProgress(0)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-destructive">Emergency SOS</h1>
          <p className="text-sm text-muted-foreground">Stay safe during your travels</p>
        </div>
      </div>

      {/* Emergency Activated Message */}
      {emergencyActivated && (
        <Card className="bg-green-500/10 border-green-500/30 border-2">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-green-600">AUTHORITIES ON THE WAY</h2>
              <p className="text-sm text-muted-foreground">Emergency services have been notified of your location</p>
            </div>
            <Button onClick={() => setEmergencyActivated(false)} variant="outline" className="mt-4">
              Cancel Emergency
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Emergency Button */}
      {!emergencyActivated && (
        <Card className="bg-destructive/10 border-destructive/30 border-2">
          <CardContent className="p-6 text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <div
                className={`w-24 h-24 bg-destructive rounded-full flex items-center justify-center shadow-lg ${isHolding ? "animate-pulse" : "animate-pulse"}`}
              >
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              {isHolding && (
                <div className="absolute inset-0 w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-destructive/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - holdProgress / 100)}`}
                      className="text-white transition-all duration-100 ease-linear"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-destructive">EMERGENCY</h2>
              <p className="text-sm text-muted-foreground">
                {isHolding ? "Keep holding..." : "Press and hold for 3 seconds to activate emergency alert"}
              </p>
            </div>
            <Button
              className="w-full h-16 text-xl font-bold bg-destructive hover:bg-destructive/90 rounded-xl shadow-lg"
              size="lg"
              onMouseDown={handleHelpButtonPress}
              onMouseUp={handleHelpButtonRelease}
              onMouseLeave={handleHelpButtonRelease}
              onTouchStart={handleHelpButtonPress}
              onTouchEnd={handleHelpButtonRelease}
            >
              PRESS FOR HELP
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Location */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <div className="font-semibold text-foreground">Current Location</div>
              <div className="text-sm text-muted-foreground">Kochi, Kerala • Lat: 9.9312, Lng: 76.2673</div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 justify-start rounded-xl border-secondary/30 hover:bg-secondary/5 bg-transparent"
          >
            <Share2 className="w-5 h-5 mr-3 text-secondary" />
            Share Location with Emergency Contact
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 justify-start rounded-xl border-accent/30 hover:bg-accent/5 bg-transparent"
          >
            <Phone className="w-5 h-5 mr-3 text-accent" />
            Call Emergency Contact
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Emergency Numbers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon
            return (
              <div
                key={contact.number}
                className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold text-foreground">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">{contact.number}</div>
                  </div>
                </div>
                <Button size="sm" className="rounded-xl">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Safety Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Always inform someone about your travel plans</p>
            <p>• Keep emergency contacts easily accessible</p>
            <p>• Share your live location with trusted contacts</p>
            <p>• Carry a fully charged power bank</p>
            <p>• Know basic local emergency phrases</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
