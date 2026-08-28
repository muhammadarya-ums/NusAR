'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ProgressItem = {
  id: string
  moduleName: string
  timestamp: string
}

type UserContextType = {
  user: string | null
  progress: ProgressItem[]
  login: (name: string) => void
  logout: () => void
  addProgress: (moduleName: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const [progress, setProgress] = useState<ProgressItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Load data dari Local Storage saat aplikasi pertama kali dibuka
  useEffect(() => {
    setIsMounted(true)
    const savedUser = localStorage.getItem('nusar_user')
    const savedProgress = localStorage.getItem('nusar_progress')
    
    if (savedUser) setUser(savedUser)
    if (savedProgress) setProgress(JSON.parse(savedProgress))
  }, [])

  // Simpan data ke Local Storage setiap ada perubahan
  useEffect(() => {
    if (isMounted) {
      if (user) localStorage.setItem('nusar_user', user)
      else localStorage.removeItem('nusar_user')
      
      localStorage.setItem('nusar_progress', JSON.stringify(progress))
    }
  }, [user, progress, isMounted])

  const login = (name: string) => setUser(name)
  const logout = () => {
    setUser(null)
    setProgress([]) // Hapus progres kalau logout (opsional)
  }
  
  const addProgress = (moduleName: string) => {
    const newItem = {
      id: Date.now().toString(),
      moduleName,
      timestamp: new Date().toLocaleDateString('id-ID', { 
        hour: '2-digit', minute: '2-digit' 
      })
    }
    setProgress((prev) => [newItem, ...prev])
  }

  return (
    <UserContext.Provider value={{ user, progress, login, logout, addProgress }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}