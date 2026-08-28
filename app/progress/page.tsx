'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3, BookOpen, CircleUserRound, Compass, ScanLine, X, Menu, ChevronRight, Trophy, Sparkles
} from 'lucide-react'
import { useUser } from '../context/UserContext'

// Navigasi yang sama dengan Home
const navItems = [
  { label: 'Home', icon: Compass, path: '/' },
  { label: 'Modules', icon: BookOpen, path: '/toc' },
  { label: 'Scan', icon: ScanLine, path: '/scan' },
  { label: 'Progress', icon: BarChart3, path: '/progress' },
  { label: 'Profile', icon: CircleUserRound, path: '/profile' },
]

function Brand() {
  return (
    <div className="brand" aria-label="NusAR home">
      <span className="brand-mark">⌁</span>
      <span className="brand-nus">Nus</span><span className="brand-ar">AR</span>
    </div>
  )
}

export default function ProgressPage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Set default aktif ke 'Progress'
  const [activeNav, setActiveNav] = useState('Progress')
  
  const { user, progress } = useUser()

  return (
    <main className="nusar-shell">
      {/* SIDEBAR */}
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top"><Brand /><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <p className="sidebar-label">LEARN WITH NUSAR</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, path }) => (
            <button key={label} className={activeNav === label ? 'active' : ''} onClick={() => { setActiveNav(label); setMenuOpen(false); if (path && path !== '#') router.push(path); }}>
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-card"><Sparkles /><strong>Keep exploring!</strong><span>New adventures are waiting.</span></div>
      </aside>

      <div className="page-wrap">
        {/* TOPBAR */}
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="mobile-brand"><Brand /></div>
          <div className="topbar-copy"><p>Your Journey</p><span>Track your learning</span></div>
          <button className="profile-button" onClick={() => router.push('/profile')} aria-label="Open profile">
            <span className="avatar-face">✦</span><span className="profile-name">{user ? user : 'Masuk'}</span><ChevronRight />
          </button>
        </header>

        {/* CONTENT PROGRESS */}
        <div className="content">
          <div className="intro">
            <div>
              <p className="eyebrow">YOUR JOURNEY</p>
              <h1>My <em>Progress.</em></h1>
            </div>
          </div>

          {!user ? (
            // STATE BELUM LOGIN
            <div className="text-center p-10 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-gray-100 shadow-sm mt-4">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy size={48} className="text-slate-300" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-2">Belum ada akun!</h2>
              <p className="text-slate-500 mb-8 font-medium">Buat profil dulu yuk supaya progres belajarmu bisa tersimpan otomatis.</p>
              <button onClick={() => router.push('/profile')} className="bg-blue-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-200">
                Buat Profil Sekarang
              </button>
            </div>
          ) : (
            // STATE SUDAH LOGIN
            <div className="mt-4">
              {/* KARTU STATISTIK */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-purple-200/50 mb-10 flex justify-between items-center relative overflow-hidden">
                <div className="z-10">
                  <p className="text-white/80 font-semibold tracking-wide mb-1 text-sm uppercase">Total Aktivitas</p>
                  <h2 className="text-6xl font-black">{progress.length}</h2>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md z-10">
                  <Trophy size={40} className="text-yellow-300 drop-shadow-md" />
                </div>
                {/* Hiasan background card */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              </div>

              <div className="section-title"><h2>RIWAYAT TERAKHIR</h2></div>

              {progress.length === 0 ? (
                <div className="text-center bg-white/50 p-8 rounded-[2rem] border border-slate-100 mt-4">
                  <p className="text-slate-400 font-medium">Belum ada modul yang kamu buka. Yuk mulai petualanganmu!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-4 pb-24">
                  {progress.map((item) => (
                    <div key={item.id} className="flex items-center p-5 bg-white/90 backdrop-blur-sm rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-md transition">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mr-5 shrink-0">
                        <BookOpen size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-lg">{item.moduleName}</h3>
                        <p className="text-sm font-semibold text-slate-400 flex items-center gap-1.5 mt-1">
                          <Sparkles size={14} className="text-yellow-400" /> Hari ini, pukul {item.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map(({ label, icon: Icon, path }) => (
          <button key={label} className={activeNav === label ? 'active' : ''} onClick={() => { setActiveNav(label); if (path && path !== '#') router.push(path); }}>
            <Icon /><span>{label}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}