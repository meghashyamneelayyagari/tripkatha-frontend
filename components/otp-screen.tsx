"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield } from "lucide-react"

interface OtpScreenProps {
  onVerifyOtp: () => void
  onBack: () => void
  phoneNumber: string
}

export function OtpScreen({ onVerifyOtp, onBack, phoneNumber }: OtpScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.some((digit) => !digit)) {
      return
    }

    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      onVerifyOtp()
    }, 2000)
  }

  const handleResendOtp = () => {
    setResendTimer(30)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  const maskedPhone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3")

  return (
    <div className="min-h-screen bg-gradient-to-br from-kerala-green/5 via-background to-kerala-blue/5 flex items-center justify-center p-4 max-w-md mx-auto">
      <div className="w-full space-y-6">
        {/* Header with back button */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2 hover:bg-kerala-green/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-kerala-green to-kerala-blue rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* OTP Verification Card */}
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4 text-center">
            <CardTitle className="text-xl">Verify OTP</CardTitle>
            <p className="text-sm text-muted-foreground">We've sent a 6-digit code to {maskedPhone}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* OTP Input Fields */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-center block">Enter OTP Code</Label>
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold rounded-xl border-border/50 focus:border-kerala-green"
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-kerala-green to-kerala-blue hover:from-kerala-green/90 hover:to-kerala-blue/90 text-white font-medium shadow-lg"
                disabled={isLoading || otp.some((digit) => !digit)}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              {/* Resend OTP */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
                {canResend ? (
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendOtp}
                    className="text-sm text-kerala-blue hover:text-kerala-blue/80 p-0 h-auto"
                  >
                    Resend OTP
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">Resend in {resendTimer}s</p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">For security, this code will expire in 10 minutes</p>
      </div>
    </div>
  )
}
