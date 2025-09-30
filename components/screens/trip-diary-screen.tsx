"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Share2, Heart, MessageCircle, MapPin, Calendar } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface TripDiaryScreenProps {
  onNavigate: (screen: Screen) => void
}

export function TripDiaryScreen({ onNavigate }: TripDiaryScreenProps) {
  const [newEntry, setNewEntry] = useState("")

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">Trip Diary</h1>
          <p className="text-sm text-muted-foreground">Munnar Tea Gardens</p>
        </div>
      </div>

      {/* Trip Info */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="font-semibold text-foreground">Munnar, Kerala</div>
                <div className="text-sm text-muted-foreground">Jan 15-17, 2024</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-primary">3 Days</div>
              <div className="text-xs text-muted-foreground">4 companions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share your experience, thoughts, or precautions..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="rounded-xl resize-none"
            rows={4}
          />

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              Add Photos
            </Button>
            <Button className="flex-1 rounded-xl">Save Entry</Button>
          </div>
        </CardContent>
      </Card>

      {/* Previous Entries */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Previous Entries</h2>

        {/* Entry 1 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Jan 17, 2024 • 6:30 PM</span>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <img
                src="/munnar-tea-plantation-sunset.jpg"
                alt="Tea plantation"
                className="w-full h-20 object-cover rounded-lg"
              />
              <img
                src="/munnar-tea-plantations-kerala.jpg"
                alt="Tea plantations"
                className="w-full h-20 object-cover rounded-lg"
              />
              <img
                src="/munnar-mountain-view.jpg"
                alt="Mountain view"
                className="w-full h-20 object-cover rounded-lg"
              />
            </div>

            <p className="text-foreground text-pretty leading-relaxed">
              Amazing sunset at the tea plantations! The view from the top was breathtaking.
              <strong className="text-primary"> Precaution:</strong> The roads get slippery after 6 PM due to mist.
              Drive carefully and use headlights.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Heart className="w-4 h-4 mr-1" />
                12
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <MessageCircle className="w-4 h-4 mr-1" />3
              </Button>
              <Button variant="ghost" size="sm" className="text-primary">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Entry 2 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Jan 16, 2024 • 2:15 PM</span>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-foreground text-pretty leading-relaxed">
              Visited the tea museum today. Learned so much about the tea-making process! The guide was very
              knowledgeable. <strong className="text-secondary">Tip:</strong> Try the fresh tea tasting - it's
              complimentary and absolutely delicious.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Heart className="w-4 h-4 mr-1" />8
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <MessageCircle className="w-4 h-4 mr-1" />1
              </Button>
              <Button variant="ghost" size="sm" className="text-primary">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Share Options */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-foreground">Share Your Journey</h3>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                Instagram
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
