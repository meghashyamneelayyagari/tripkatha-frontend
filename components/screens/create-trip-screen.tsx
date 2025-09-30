"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Car, Train, Plane, Bus, Plus, Users } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

// Helper function to get the current time reliably
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

interface CreateTripScreenProps {
  onNavigate: (screen: Screen) => void
}

const transportModes = [
  { id: "car", icon: Car, label: "Car" },
  { id: "train", icon: Train, label: "Train" },
  { id: "plane", icon: Plane, label: "Flight" },
  { id: "bus", icon: Bus, label: "Bus" },
]

interface TripSegment {
  id: string
  origin: string
  destination: string
  transport: string
  companions: number
  companionNames: string
  date: string
  startTime: string
  endTime: string
  notes: string
}

export function CreateTripScreen({ onNavigate }: CreateTripScreenProps) {
  const [selectedTransport, setSelectedTransport] = useState("car")
  const [tripChain, setTripChain] = useState<TripSegment[]>([])
  const [currentSegment, setCurrentSegment] = useState<Partial<TripSegment>>({
    origin: "Kochi, Kerala",
    transport: "car",
    companions: 1,
    companionNames: "",
    date: new Date().toISOString().split("T")[0],
    startTime: getCurrentTime(),
    notes: "",
  })

  const addSegmentToChain = () => {
    if (currentSegment.destination && currentSegment.endTime) {
      const newSegment: TripSegment = {
        id: Date.now().toString(),
        origin: currentSegment.origin || "Current Location",
        destination: currentSegment.destination,
        transport: selectedTransport,
        companions: currentSegment.companions || 1,
        companionNames: currentSegment.companionNames || "",
        date: currentSegment.date || new Date().toISOString().split("T")[0],
        startTime: currentSegment.startTime || "",
        endTime: currentSegment.endTime || "",
        notes: currentSegment.notes || "",
      }

      setTripChain([...tripChain, newSegment])

      setCurrentSegment({
        origin: currentSegment.destination,
        transport: "car",
        companions: currentSegment.companions,
        companionNames: currentSegment.companionNames,
        date: currentSegment.date,
        startTime: currentSegment.endTime,
        notes: "",
      })
      setSelectedTransport("car")
    }
  }

  const removeSegment = (segmentId: string) => {
    setTripChain(tripChain.filter((segment) => segment.id !== segmentId))
  }

  // --- THIS FUNCTION SAVES THE TRIP TO THE BACKEND ---
  const handleStartTrip = async () => {
    const segmentsToSend = tripChain.length > 0 ? tripChain : [currentSegment];
    
    if (!segmentsToSend[0] || !segmentsToSend[0].destination) {
      alert("Please add a destination before starting a trip.");
      return;
    }

    const formattedSegments = segmentsToSend.map(seg => ({
      from: seg.origin,
      to: seg.destination,
      startTime: new Date(`${seg.date}T${seg.startTime}`).toISOString(),
      transportMode: seg.transport,
      notes: seg.notes,
    }));

    const tripPayload = {
      ownerId: "68cbe8364c4189af6b04d426", // Use a real user ID from your DB
      title: `Trip to ${formattedSegments[0].to}`,
      companions: currentSegment.companions || 1,
      segments: formattedSegments,
    };

    try {
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripPayload),
      });

      if (!response.ok) {
        throw new Error('Something went wrong on the server.');
      }

      await response.json();
      alert('Success! Trip created.');
      // After successfully saving, navigate to the active trip screen
      onNavigate("active-trip"); 

    } catch (error) {
      console.error("Failed to create trip:", error);
      alert("Failed to create trip. Please try again.");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Create Trip Chain</h1>
          <p className="text-sm text-muted-foreground">
            {tripChain.length > 0 ? `${tripChain.length} segments added` : "Plan your day's journey"}
          </p>
        </div>
      </div>

      {tripChain.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Today's Trip Chain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tripChain.map((segment, index) => (
              <div key={segment.id} className="bg-background rounded-lg p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">Segment {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSegment(segment.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-medium">
                    {segment.origin} → {segment.destination}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-4">
                    <span>
                      {segment.startTime} - {segment.endTime}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {segment.companions}
                    </span>
                    <span className="capitalize">{segment.transport}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-secondary" />
            <div className="flex-1">
              <div className="font-semibold text-foreground">
                {tripChain.length > 0 ? "Next Starting Point" : "Current Location"}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentSegment.origin} • {tripChain.length > 0 ? "From previous trip" : "Auto-detected"}
              </div>
            </div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {tripChain.length > 0 ? `Add Segment ${tripChain.length + 1}` : "Trip Details"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Where are you going next?"
              className="rounded-xl"
              value={currentSegment.destination || ""}
              onChange={(e) => setCurrentSegment({ ...currentSegment, destination: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tripDate">Trip Date</Label>
            <Input
              id="tripDate"
              type="date"
              className="rounded-xl"
              value={currentSegment.date || ""}
              onChange={(e) => setCurrentSegment({ ...currentSegment, date: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                className="rounded-xl"
                value={currentSegment.startTime || ""}
                onChange={(e) => setCurrentSegment({ ...currentSegment, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                className="rounded-xl"
                value={currentSegment.endTime || ""}
                onChange={(e) => setCurrentSegment({ ...currentSegment, endTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Mode of Transport</Label>
            <div className="grid grid-cols-4 gap-2">
              {transportModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <Button
                    key={mode.id}
                    variant={selectedTransport === mode.id ? "default" : "outline"}
                    className="h-16 flex-col space-y-1 rounded-xl"
                    onClick={() => setSelectedTransport(mode.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{mode.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companionCount">Number of Companions</Label>
                <Input
                  id="companionCount"
                  type="number"
                  min="0"
                  max="20"
                  className="rounded-xl"
                  value={currentSegment.companions || 1}
                  onChange={(e) =>
                    setCurrentSegment({ ...currentSegment, companions: Number.parseInt(e.target.value) || 1 })
                  }
                />
              </div>
              <div className="flex items-end">
                <div className="bg-muted rounded-xl p-3 text-center flex-1">
                  <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-sm font-medium">{currentSegment.companions || 1} Total</div>
                </div>
              </div>
            </div>

            {(currentSegment.companions || 1) > 1 && (
              <div className="space-y-2">
                <Label htmlFor="companionNames">Companion Names (Optional)</Label>
                <Input
                  id="companionNames"
                  placeholder="John, Sarah, Mike..."
                  className="rounded-xl"
                  value={currentSegment.companionNames || ""}
                  onChange={(e) => setCurrentSegment({ ...currentSegment, companionNames: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes for this segment</Label>
            <Textarea
              id="notes"
              placeholder="Any special notes for this part of the trip?"
              className="rounded-xl resize-none"
              rows={2}
              value={currentSegment.notes || ""}
              onChange={(e) => setCurrentSegment({ ...currentSegment, notes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="h-32 bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">
                {tripChain.length > 0 ? `Chain route with ${tripChain.length} segments` : "Route will appear here"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3 pb-4">
        <Button
          onClick={addSegmentToChain}
          variant="outline"
          className="w-full h-12 rounded-xl bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
          disabled={!currentSegment.destination || !currentSegment.endTime}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add to Trip Chain
        </Button>

        {/* This button now saves the trip AND then navigates */}
        <Button
          onClick={handleStartTrip}
          className="w-full h-12 text-lg font-semibold rounded-xl shadow-lg"
          size="lg"
          disabled={tripChain.length === 0 && !currentSegment.destination}
        >
          {tripChain.length > 0 ? `Start Trip Chain (${tripChain.length} segments)` : "Start Single Trip"}
        </Button>

        <Button variant="outline" className="w-full h-12 rounded-xl bg-transparent" onClick={() => onNavigate("home")}>
          Save as Draft
        </Button>
      </div>
    </div>
  )
}