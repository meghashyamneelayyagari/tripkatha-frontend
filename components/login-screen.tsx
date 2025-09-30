"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Building2 } from "lucide-react"

interface LoginScreenProps {
  onLogin: (userType: "public" | "natpac") => void
  onCreateAccount: () => void
  onForgotPassword: () => void
}

export function LoginScreen({ onLogin, onCreateAccount, onForgotPassword }: LoginScreenProps) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  const validatePhone = (phoneNumber: string) => {
    const cleanPhone = phoneNumber.replace(/\D/g, "")
    if (cleanPhone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits")
      return false
    }
    setPhoneError("")
    return true
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setPhone(value)
    if (value.length > 0) {
      validatePhone(value)
    } else {
      setPhoneError("")
    }
  }

  const handlePublicLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhone(phone)) {
      return
    }

    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      onLogin("public")
    }, 1500)
  }

  const handleNatpacLogin = async () => {
    setIsLoading(true)

    // Simulate NATPAC login process
    setTimeout(() => {
      setIsLoading(false)
      onLogin("natpac")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kerala-green/5 via-background to-kerala-blue/5 flex items-center justify-center p-4 max-w-md mx-auto">
      <div className="w-full space-y-6">
        {/* App Logo/Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto">
            <img src="/logo.png" alt="TRIPKATHA Logo" className="w-full h-full object-contain rounded-xl" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to TripKatha</h1>
          <p className="text-muted-foreground text-sm">Your travel companion awaits</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePublicLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  className={`h-12 rounded-xl border-border/50 focus:border-kerala-green ${
                    phoneError ? "border-destructive focus:border-destructive" : ""
                  }`}
                />
                {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 rounded-xl border-border/50 focus:border-kerala-green pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-kerala-green to-kerala-blue hover:from-kerala-green/90 hover:to-kerala-blue/90 text-white font-medium shadow-lg"
                  disabled={isLoading || phone.length !== 10}
                >
                  {isLoading ? "Logging In..." : "Log In (Public User)"}
                </Button>

                <Button
                  type="button"
                  onClick={handleNatpacLogin}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white font-medium shadow-lg"
                  disabled={isLoading}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  NATPAC Login
                </Button>
              </div>
            </form>

            {/* Additional Links */}
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-sm text-kerala-blue hover:text-kerala-blue/80 p-0 h-auto"
                  onClick={onForgotPassword}
                >
                  Forgot Password?
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">New to TRIPKATHA?</span>
                </div>
              </div>

              <Button
                onClick={onCreateAccount}
                variant="outline"
                className="w-full h-12 rounded-xl border-kerala-green/30 text-kerala-green hover:bg-kerala-green/5 hover:border-kerala-green/50 bg-transparent"
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
