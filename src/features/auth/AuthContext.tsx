import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USER: User = {
  id: '1',
  name: 'Conference Admin',
  email: 'admin@ezyconference.com',
  roles: ['admin', 'manager'],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = sessionStorage.getItem('ezyconf_user')
      return stored ? (JSON.parse(stored) as User) : null
    } catch {
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (username: string, _password: string) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const loggedInUser = { ...MOCK_USER, email: username }
    setUser(loggedInUser)
    try {
      sessionStorage.setItem('ezyconf_user', JSON.stringify(loggedInUser))
    } catch {
      // ignore
    }
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      sessionStorage.removeItem('ezyconf_user')
    } catch {
      // ignore
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
