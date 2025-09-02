"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const { user, isLoading } = useAuth()
  const [showSignup, setShowSignup] = useState(true) // Changed to true to show signup first

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <div className="text-lg font-medium">Loading...</div>
        </div>
      </div>
    )
  }

  if (user) {
    return <Dashboard />
  }

  return showSignup ? (
    <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
  )
}