"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Camera, Plus, Heart, Clock, Navigation, Pause, Play, Square } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface ActiveTripScreenProps {
  onNavigate: (screen: Screen) => void
}

interface PhotoMemory {
  id: string
  image: string
  location: string
  timestamp: string
  caption: string
  coordinates?: { lat: number; lng: number }
}

export function ActiveTripScreen({ onNavigate }: ActiveTripScreenProps) {
  const [isRecording, setIsRecording] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [showAddMemory, setShowAddMemory] = useState(false)
  const [newMemory, setNewMemory] = useState({
    caption: "",
    location: "",
  })
  const [photoMemories, setPhotoMemories] = useState<PhotoMemory[]>([
    {
      id: "1",
      image: "/munnar-tea-plantation-sunset.jpg",
      location: "Munnar Tea Gardens",
      timestamp: "2 hours ago",
      caption: "Beautiful tea plantations stretching as far as the eye can see!",
      coordinates: { lat: 10.0889, lng: 77.0595 },
    },
  ])

  const addPhotoMemory = () => {
    if (newMemory.caption) {
      const memory: PhotoMemory = {
        id: Date.now().toString(),
        image: "/travel-memory-photo.jpg",
        location: newMemory.location || "Current Location",
        timestamp: "Just now",
        caption: newMemory.caption,
        coordinates: { lat: 10.0889, lng: 77.0595 },
      }
      setPhotoMemories([memory, ...photoMemories])
      setNewMemory({ caption: "", location: "" })
      setShowAddMemory(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsPaused(!isPaused)
    } else {
      setIsRecording(true)
      setIsPaused(false)
    }
  }

  const stopTrip = () => {
    setIsRecording(false)
    setIsPaused(false)
    // Navigate back to trips screen or show trip summary
    onNavigate("trips")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Active Trip</h1>
          <p className="text-sm text-muted-foreground">
            {isRecording ? (isPaused ? "Paused" : "Recording") : "Stopped"} • Kochi → Munnar
          </p>
        </div>
      </div>

      {/* Trip Status */}
      <Card className={`${isRecording && !isPaused ? "bg-primary/10 border-primary/20" : "bg-muted/50"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${isRecording && !isPaused ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
              />
              <div>
                <div className="font-semibold text-foreground">
                  {isRecording ? (isPaused ? "Trip Paused" : "Trip in Progress") : "Trip Completed"}
                </div>
                <div className="text-sm text-muted-foreground">Started 2h 30m ago</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">127 km</div>
              <div className="text-xs text-muted-foreground">Distance covered</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-primary" />
            Live Route Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
              <div className="text-xs font-medium text-gray-700">Current Speed</div>
              <div className="text-lg font-bold text-primary">45 km/h</div>
            </div>
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
              <div className="text-xs font-medium text-gray-700">ETA</div>
              <div className="text-sm font-bold text-secondary">1h 15m</div>
            </div>
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">Live GPS Tracking</div>
              <div className="text-xs">Route: Kochi → Munnar</div>
            </div>
            {/* Route line visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-1 bg-primary/60 rounded-full transform -rotate-12" />
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ml-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Trip Controls */}
          <div className="flex space-x-3 mt-4">
            <Button
              onClick={toggleRecording}
              variant={isRecording && !isPaused ? "default" : "outline"}
              className="flex-1 rounded-xl"
            >
              {isRecording && !isPaused ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Trip
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {isRecording ? "Resume" : "Start"} Trip
                </>
              )}
            </Button>
            <Button onClick={stopTrip} variant="destructive" className="rounded-xl">
              <Square className="w-4 h-4 mr-2" />
              End Trip
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Photo Journal Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Camera className="w-5 h-5 mr-2 text-secondary" />
              Trip Snapshots
            </CardTitle>
            <Button onClick={() => setShowAddMemory(true)} size="sm" className="rounded-xl">
              <Plus className="w-4 h-4 mr-1" />
              Add Memory
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Memory Form */}
          {showAddMemory && (
            <Card className="bg-secondary/5 border-secondary/20">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="memoryCaption">What caught your eye?</Label>
                  <Textarea
                    id="memoryCaption"
                    placeholder="Describe this special moment..."
                    value={newMemory.caption}
                    onChange={(e) => setNewMemory({ ...newMemory, caption: e.target.value })}
                    className="rounded-xl resize-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memoryLocation">Location (Optional)</Label>
                  <Input
                    id="memoryLocation"
                    placeholder="Specific place name..."
                    value={newMemory.location}
                    onChange={(e) => setNewMemory({ ...newMemory, location: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowAddMemory(false)}
                    variant="outline"
                    className="flex-1 rounded-xl bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={addPhotoMemory} className="flex-1 rounded-xl" disabled={!newMemory.caption}>
                    <Camera className="w-4 h-4 mr-2" />
                    Save Memory
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Memory List */}
          <div className="space-y-4">
            {photoMemories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <div className="text-sm">No memories captured yet</div>
                <div className="text-xs">Tap "Add Memory" to save special moments</div>
              </div>
            ) : (
              photoMemories.map((memory) => (
                <Card key={memory.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={memory.image || "/placeholder.svg"}
                        alt={memory.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs text-white">{memory.timestamp}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{memory.location}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{memory.caption}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 pt-2 border-t border-border">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Heart className="w-4 h-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-primary">
                          <Camera className="w-4 h-4 mr-1" />
                          Add to Journal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trip Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-3 text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold text-primary">2h 30m</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </CardContent>
        </Card>
        <Card className="bg-secondary/10 border-secondary/20">
          <CardContent className="p-3 text-center">
            <Camera className="w-5 h-5 mx-auto mb-1 text-secondary" />
            <div className="text-lg font-bold text-secondary">{photoMemories.length}</div>
            <div className="text-xs text-muted-foreground">Memories</div>
          </CardContent>
        </Card>
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-3 text-center">
            <Navigation className="w-5 h-5 mx-auto mb-1 text-accent" />
            <div className="text-lg font-bold text-accent">127</div>
            <div className="text-xs text-muted-foreground">km traveled</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
