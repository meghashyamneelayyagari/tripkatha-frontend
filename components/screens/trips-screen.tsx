"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Users, Trash2 } from "lucide-react"
import type { Screen } from "@/components/mobile-app"
import { Button } from "@/components/ui/button"

interface TripsScreenProps {
  onNavigate: (screen: Screen) => void
}

interface Trip {
  _id: string;
  title: string;
  segments: {
    from: string;
    to: string;
  }[];
  companions: number;
}

export function TripsScreen({ onNavigate }: TripsScreenProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = "68cbe8364c4189af6b04d426";
      try {
        const response = await fetch(`http://localhost:5000/api/trips/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch trips");
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // --- NEW FUNCTION TO HANDLE DELETION ---
  const handleDeleteTrip = async (tripId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the trip.');
      }

      // If successful, remove the trip from the list in the UI
      setTrips(currentTrips => currentTrips.filter(trip => trip._id !== tripId));
      alert('Trip deleted successfully.');

    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Failed to delete trip.');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Recent Trips</h1>
      </div>

      {isLoading ? (
        <p>Loading trips...</p>
      ) : trips.length === 0 ? (
        <Card className="text-center p-6">
          <CardContent>
             <p className="text-muted-foreground">No recent trips found.</p>
             <Button onClick={() => onNavigate("create-trip")} className="mt-4">Start a new journey</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {trips.map((trip) => (
            <Card key={trip._id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{trip.title}</CardTitle>
                {/* --- NEW DELETE BUTTON --- */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDeleteTrip(trip._id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {trip.segments.map((segment, index) => (
                   <div key={index} className="flex items-center">
                     <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                     <span>{segment.from} → {segment.to}</span>
                   </div>
                ))}
                <div className="flex items-center pt-2 text-muted-foreground">
                   <Users className="w-4 h-4 mr-2" />
                   <span>{trip.companions} Companions</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}