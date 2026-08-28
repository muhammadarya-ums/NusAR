'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3, BookOpen, CircleUserRound, Compass, ScanLine, X, Menu, ChevronRight, LogOut, Sparkles
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

export default function ProfilePage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Set default aktif ke 'Profile'
  const [activeNav, setActiveNav] = useState('Profile')
  
  const { user, login, logout } = useUser()
  const [inputName, setInputName] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputName.trim()) {
      login(inputName)
    }
  }

  return (
    <main className="nusar-shell">
      {/* SIDEBAR (Untuk Desktop/Tablet) */}
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
          <div className="topbar-copy"><p>Your Account</p><span>Manage your profile</span></div>
          <button className="profile-button active" aria-label="Open profile">
            <span className="avatar-face">✦</span><span className="profile-name">{user ? user : 'Masuk'}</span><ChevronRight />
          </button>
        </header>

        {/* CONTENT PROFILE */}
        <div className="content">
          <div className="intro">
            <div>
              <p className="eyebrow">YOUR ACCOUNT</p>
              <h1>My <em>Profile.</em></h1>
            </div>
          </div>

          {user ? (
            // STATE SUDAH LOGIN
            <div className="flex flex-col items-center justify-center p-10 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-gray-100 text-center mt-4">
              <div className="w-28 h-28 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 text-5xl">✦</div>
              <h2 className="text-3xl font-black text-slate-800 mb-1">{user}</h2>
              <p className="text-slate-500 mb-10 font-medium">NusAR Explorer</p>
              
              <button 
                onClick={logout}
                className="w-full flex justify-center items-center gap-2 bg-red-50 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-100 transition duration-300"
              >
                <LogOut size={20} /> Keluar Akun
              </button>
            </div>
          ) : (
            // STATE BELUM LOGIN
            <div className="flex flex-col items-center justify-center p-10 bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-gray-100 text-center mt-4">
              <CircleUserRound size={80} className="text-slate-300 mb-6" />
              <h2 className="text-2xl font-black text-slate-800 mb-2">Selamat Datang!</h2>
              <p className="text-slate-500 mb-8 font-medium leading-relaxed">Masukkan nama panggilan kamu untuk mulai menyimpan progres belajar.</p>
              
              <form onSubmit={handleLogin} className="w-full">
                <input 
                  type="text" 
                  value={inputName} 
                  onChange={e => setInputName(e.target.value)} 
                  placeholder="Siapa namamu?" 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition text-center text-lg font-bold mb-4 text-slate-800 placeholder:text-slate-400" 
                />
                <button 
                  type="submit" 
                  disabled={!inputName.trim()} 
                  className="w-full bg-blue-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none transition duration-300"
                >
                  Mulai Belajar!
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM NAV (Untuk Mobile) */}
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