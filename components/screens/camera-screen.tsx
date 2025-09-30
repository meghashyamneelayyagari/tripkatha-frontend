"use client"

import React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Camera, RotateCcw, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Screen } from "@/components/mobile-app"

interface CameraScreenProps {
  onNavigate: (screen: Screen) => void
}

export function CameraScreen({ onNavigate }: CameraScreenProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [isCapturing, setIsCapturing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      // Fallback to mock image for demo
      setCapturedImage("/travel-memory-photo.jpg")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageData)

        // Stop camera stream
        const stream = video.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
      }
    } else {
      // Demo fallback
      setCapturedImage("/travel-memory-photo.jpg")
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setCaption("")
    startCamera()
  }

  const saveToJournal = () => {
    // Here you would typically save to your trip journal/database
    console.log("Saving to journal:", { image: capturedImage, caption })

    // For demo, just navigate back
    onNavigate("home")
  }

  const discardPhoto = () => {
    setCapturedImage(null)
    setCaption("")
    onNavigate("home")
  }

  // Start camera when component mounts
  React.useEffect(() => {
    if (!capturedImage) {
      startCamera()
    }
  }, [capturedImage])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="font-semibold">Capture Memory</h1>
        <div className="w-16" />
      </div>

      <div className="p-4 space-y-4">
        {!capturedImage ? (
          // Camera View
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />

                {/* Camera Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    onClick={capturePhoto}
                    size="lg"
                    className="rounded-full h-16 w-16 bg-white hover:bg-gray-100"
                  >
                    <Camera className="h-6 w-6 text-gray-900" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Preview and Caption
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured memory"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Caption Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Caption</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Describe this memory..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mb-4"
                />

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={retakePhoto}
                    variant="outline"
                    className="flex-1 flex items-center gap-2 bg-transparent"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Retake
                  </Button>
                  <Button onClick={discardPhoto} variant="outline" className="flex items-center gap-2 bg-transparent">
                    <X className="h-4 w-4" />
                    Discard
                  </Button>
                  <Button onClick={saveToJournal} className="flex-1 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Save to Journal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
