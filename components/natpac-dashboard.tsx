"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  MapPin,
  TrendingUp,
  Users,
  Car,
  Bus,
  Train,
  Leaf,
  AlertTriangle,
  Clock,
  Target,
  LogOut,
} from "lucide-react"

interface NatpacDashboardProps {
  onLogout?: () => void
}

export function NatpacDashboard({ onLogout }: NatpacDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">NATPAC Analytics Portal</h1>
                <p className="text-sm text-slate-600">Kerala Transport Analytics Dashboard</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "traffic", label: "Traffic Analysis", icon: AlertTriangle },
              { id: "transport", label: "Public Transport", icon: Bus },
              { id: "sustainability", label: "Sustainability", icon: Leaf },
              { id: "policy", label: "Policy Goals", icon: Target },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-kerala-blue text-kerala-blue"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Daily Trips</p>
                      <p className="text-2xl font-bold text-slate-900">24,567</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +12% from last week
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-kerala-blue" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Peak Hour Traffic</p>
                      <p className="text-2xl font-bold text-slate-900">8-10 AM</p>
                      <p className="text-xs text-orange-600 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        High congestion
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Public Transport Usage</p>
                      <p className="text-2xl font-bold text-slate-900">42%</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +5% this month
                      </p>
                    </div>
                    <Bus className="w-8 h-8 text-kerala-green" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">CO₂ Saved Today</p>
                      <p className="text-2xl font-bold text-slate-900">2.4 tons</p>
                      <p className="text-xs text-green-600 flex items-center mt-1">
                        <Leaf className="w-3 h-3 mr-1" />
                        Eco-friendly trips
                      </p>
                    </div>
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Travel Mode Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Travel Mode Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      mode: "Private Car",
                      percentage: 35,
                      icon: Car,
                      color: "bg-red-500",
                      iconColor: "text-slate-600",
                    }, // restored private car icon to black
                    {
                      mode: "Bus",
                      percentage: 28,
                      icon: Bus,
                      color: "bg-orange-500",
                      iconColor: "text-kerala-green",
                    },
                    {
                      mode: "Metro/Train",
                      percentage: 14,
                      icon: Train,
                      color: "bg-blue-500",
                      iconColor: "text-kerala-blue",
                    },
                    {
                      mode: "Walking",
                      percentage: 23,
                      icon: Users,
                      color: "bg-green-500",
                      iconColor: "text-slate-600", // restored walking icon to black
                    },
                  ].map((item) => (
                    <div key={item.mode} className="flex items-center space-x-4">
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-slate-700">{item.mode}</span>
                          <span className="text-sm text-slate-600">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Routes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Top Travel Routes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { route: "Kochi → Ernakulam", trips: 3420, status: "High Traffic" },
                    { route: "Thiruvananthapuram → Kollam", trips: 2890, status: "Moderate" },
                    { route: "Kozhikode → Malappuram", trips: 2156, status: "Low Traffic" },
                    { route: "Thrissur → Palakkad", trips: 1876, status: "Moderate" },
                  ].map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{route.route}</p>
                        <p className="text-sm text-slate-600">{route.trips} trips today</p>
                      </div>
                      <Badge
                        variant={
                          route.status === "High Traffic"
                            ? "destructive"
                            : route.status === "Moderate"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {route.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tab contents would be implemented similarly */}
        {activeTab !== "overview" && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-slate-600">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} analytics coming soon...
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
