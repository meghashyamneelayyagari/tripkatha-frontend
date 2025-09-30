"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, Star, Plus, Navigation } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface HiddenGemsScreenProps {
  onNavigate: (screen: Screen) => void
}

const hiddenGems = [
  {
    id: 1,
    name: "Secret Waterfall Trail",
    location: "Near Athirapally",
    distance: "2.3 km away",
    rating: 4.8,
    description: "A hidden waterfall accessible through a short trek. Perfect for photography and peaceful moments.",
    image: "/hidden-waterfall-in-kerala-forest.jpg",
    difficulty: "Easy",
    category: "Nature",
  },
  {
    id: 2,
    name: "Ancient Spice Garden",
    location: "Kumily Village",
    distance: "5.1 km away",
    rating: 4.6,
    description: "Traditional spice garden maintained by local families. Learn about organic farming practices.",
    image: "/kerala-spice-garden-cardamom-pepper.jpg",
    difficulty: "Easy",
    category: "Culture",
  },
  {
    id: 3,
    name: "Fisherman's Sunrise Point",
    location: "Vembanad Lake",
    distance: "8.7 km away",
    rating: 4.9,
    description: "Watch local fishermen at work during sunrise. Authentic Kerala backwater experience.",
    image: "/kerala-fishermen-sunrise-vembanad-lake.jpg",
    difficulty: "Easy",
    category: "Culture",
  },
  {
    id: 4,
    name: "Bamboo Forest Walk",
    location: "Silent Valley",
    distance: "12.4 km away",
    rating: 4.7,
    description: "Serene bamboo forest with natural walking trails. Great for meditation and bird watching.",
    image: "/kerala-bamboo-forest-walking-trail.jpg",
    difficulty: "Moderate",
    category: "Adventure",
  },
]

export function HiddenGemsScreen({ onNavigate }: HiddenGemsScreenProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Hidden Gems</h1>
          <p className="text-sm text-muted-foreground">Discover local treasures</p>
        </div>
      </div>

      {/* Location Status */}
      <Card className="bg-secondary/10 border-secondary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Navigation className="w-5 h-5 text-secondary" />
            <div className="flex-1">
              <div className="font-semibold text-foreground">Searching near you</div>
              <div className="text-sm text-muted-foreground">Kochi, Kerala • 4 gems found</div>
            </div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button variant="default" size="sm" className="rounded-full whitespace-nowrap">
          All
        </Button>
        <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap bg-transparent">
          Nature
        </Button>
        <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap bg-transparent">
          Culture
        </Button>
        <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap bg-transparent">
          Adventure
        </Button>
        <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap bg-transparent">
          Food
        </Button>
      </div>

      {/* Hidden Gems List */}
      <div className="space-y-4">
        {hiddenGems.map((gem) => (
          <Card
            key={gem.id}
            className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
            showSnapshot={true}
            onSnapshot={() => onNavigate("camera")}
          >
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative h-40 bg-muted">
                <img src={gem.image || "/placeholder.svg"} alt={gem.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-white font-medium">{gem.rating}</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs text-white font-medium">{gem.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-pretty">{gem.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {gem.location} • {gem.distance}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{gem.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        gem.difficulty === "Easy" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                      }`}
                    >
                      {gem.difficulty}
                    </span>
                  </div>

                  <Button size="sm" className="rounded-xl">
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Trip
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suggest New Gem */}
      <Card className="bg-muted/50 border-dashed border-2 border-muted-foreground/20">
        <CardContent className="p-4 text-center space-y-3">
          <div className="text-muted-foreground">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div className="font-medium">Know a hidden gem?</div>
            <div className="text-sm">Share it with fellow travelers</div>
          </div>
          <Button variant="outline" className="rounded-xl bg-transparent">
            Suggest a Place
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
