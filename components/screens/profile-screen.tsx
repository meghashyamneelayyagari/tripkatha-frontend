"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, User, Bell, Download, MapPin, LogOut } from "lucide-react"
import type { Screen } from "@/components/mobile-app"

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void
}

interface ProfileData {
  name: string;
  bio: string;
  stats: {
    trips: number;
    places: number;
    photos: number;
  };
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = "68cbe8364c4189af6b04d426"; // Hardcoded for testing
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!profileData) {
    return <p>Could not load profile.</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <User className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">{profileData.name || "User Name"}</h2>
          <p className="text-sm text-muted-foreground">{profileData.bio || "Travel Enthusiast"}</p>
          <Button variant="outline" className="mt-4">Edit Profile</Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{profileData.stats.trips}</p>
            <p className="text-xs text-muted-foreground">Trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{profileData.stats.places}</p>
            <p className="text-xs text-muted-foreground">Places</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{profileData.stats.photos}</p>
            <p className="text-xs text-muted-foreground">Photos</p>
          </CardContent>
        </Card>
      </div>

      {/* Other static sections from your UI */}
       <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Settings</h3>
          <div className="space-y-2">
             <div className="flex justify-between items-center"><Bell className="mr-2"/> Notifications</div>
             <div className="flex justify-between items-center"><Download className="mr-2"/> Offline Sync</div>
             <div className="flex justify-between items-center"><MapPin className="mr-2"/> Location Services</div>
          </div>
        </CardContent>
      </Card>

      <Button variant="destructive" className="w-full" onClick={() => onNavigate("login")}>
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  )
}