// file: app/profile/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircleUserRound, X, LogOut } from 'lucide-react'
import { useUser } from '../context/UserContext'

export default function ProfilePage() {
  const router = useRouter()
  const { user, login, logout } = useUser()
  const [inputName, setInputName] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputName.trim()) {
      login(inputName)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-10">
        <button onClick={() => router.push('/')} className="p-3 bg-white/10 rounded-full">
          <X size={24} />
        </button>
        <h1 className="font-bold text-xl">Profil Saya</h1>
        <div className="w-12" />
      </header>

      {user ? (
        // TAMPILAN JIKA SUDAH LOGIN
        <div className="w-full max-w-md bg-white/10 rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">✦</span>
          </div>
          <h2 className="text-3xl font-black mb-2">Halo, {user}!</h2>
          <p className="text-gray-400 mb-8">Siap untuk belajar hari ini?</p>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/20 text-red-400 p-4 rounded-2xl font-bold"
          >
            <LogOut size={20} /> Keluar Akun
          </button>
        </div>
      ) : (
        // TAMPILAN JIKA BELUM LOGIN
        <div className="w-full max-w-md flex flex-col items-center">
          <CircleUserRound size={80} className="text-gray-500 mb-8" />
          <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
          <p className="text-gray-400 text-center mb-8">Masukkan nama kamu untuk menyimpan progres belajar.</p>
          
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Tulis namamu disini..."
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white/10 text-white text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              disabled={!inputName.trim()}
              className="w-full bg-blue-500 text-white p-4 rounded-2xl font-bold text-lg disabled:opacity-50"
            >
              Mulai Belajar
            </button>
          </form>
        </div>
      )}
    </main>
  )
}