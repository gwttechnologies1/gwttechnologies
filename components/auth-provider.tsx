"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser 
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface User {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: User | null
  signup: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async (email: string, password: string, displayName?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName })
      }
      
      return { success: true }
    } catch (error: any) {
      console.error("Signup error:", error)
      let errorMessage = "An error occurred during signup."
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists."
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address."
      }
      
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error: any) {
      console.error("Login error:", error)
      let errorMessage = "An error occurred during login."
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "User not found. Please check your email."
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address."
      }
      
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}