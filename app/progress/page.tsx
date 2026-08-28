// file: app/progress/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Trophy, X, BookOpen, Clock } from 'lucide-react'
import { useUser } from '../context/UserContext'

export default function ProgressPage() {
  const router = useRouter()
  const { user, progress } = useUser()

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="w-full flex justify-between items-center mb-10">
        <button onClick={() => router.push('/')} className="p-3 bg-white/10 rounded-full">
          <X size={24} />
        </button>
        <h1 className="font-bold text-xl">Progres Belajar</h1>
        <div className="w-12" />
      </header>

      {!user ? (
        <div className="text-center mt-20">
          <Trophy size={64} className="text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Kamu belum masuk!</h2>
          <p className="text-gray-400 mt-2">Masuk ke Profil dulu untuk melihat progres belajarmu.</p>
          <button onClick={() => router.push('/profile')} className="mt-6 bg-blue-500 px-6 py-3 rounded-full font-bold">Ke Profil</button>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl mb-8 flex items-center justify-between">
            <div>
              <p className="text-white/80 font-medium">Total Aktivitas</p>
              <p className="text-4xl font-black">{progress.length}</p>
            </div>
            <Trophy size={48} className="text-yellow-400" />
          </div>

          <h2 className="font-bold text-lg mb-4 text-gray-300">Riwayat Terakhir</h2>
          
          {progress.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada modul yang dibuka. Yuk mulai belajar!</p>
          ) : (
            <div className="flex flex-col gap-4">
              {progress.map((item) => (
                <div key={item.id} className="bg-white/10 p-4 rounded-2xl flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-full text-blue-400">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{item.moduleName}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                      <Clock size={14} /> <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}