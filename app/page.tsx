"use client"

import { useState } from "react"
import { OnboardingScreens } from "@/components/onboarding-screens"
import { LoginScreen } from "@/components/login-screen"
import { RegistrationScreen } from "@/components/registration-screen"
import { OtpScreen } from "@/components/otp-screen"
import { MobileApp } from "@/components/mobile-app"
import { NatpacDashboard } from "@/components/natpac-dashboard"

type UserType = "public" | "natpac" | null

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordPhone, setForgotPasswordPhone] = useState("")
  const [userType, setUserType] = useState<UserType>(null)
  const [username, setUsername] = useState<string>("") // Added username state

  const handleLogin = (type: UserType) => {
    setUserType(type)
    setIsLoggedIn(true)
  }

  const handleCreateAccount = () => {
    setShowRegistration(true)
  }

  const handleRegistrationComplete = (registeredUsername: string) => {
    // Accept username parameter
    setUsername(registeredUsername) // Store the username
    setShowRegistration(false)
    setUserType("public")
    setIsLoggedIn(true)
  }

  const handleBackToLogin = () => {
    setShowRegistration(false)
    setShowForgotPassword(false)
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
    // In a real app, you would get the phone number from the login form
    // For now, we'll use a placeholder
    setForgotPasswordPhone("1234567890")
  }

  const handleOtpVerified = () => {
    // After OTP verification, user can reset password or login directly
    setShowForgotPassword(false)
    setUserType("public")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setUsername("")
  }

  if (showOnboarding) {
    return <OnboardingScreens onComplete={() => setShowOnboarding(false)} />
  }

  if (showRegistration) {
    return <RegistrationScreen onRegister={handleRegistrationComplete} onBack={handleBackToLogin} />
  }

  if (showForgotPassword) {
    return <OtpScreen onVerifyOtp={handleOtpVerified} onBack={handleBackToLogin} phoneNumber={forgotPasswordPhone} />
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onCreateAccount={handleCreateAccount}
        onForgotPassword={handleForgotPassword}
      />
    )
  }

  if (userType === "natpac") {
    return <NatpacDashboard onLogout={handleLogout} />
  }

  return <MobileApp username={username} onLogout={handleLogout} />
}
