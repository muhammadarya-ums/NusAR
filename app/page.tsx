'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Compass,
  Headphones,
  Image as ImageIcon,
  Lightbulb,
  Menu,
  Play,
  QrCode,
  ScanLine,
  Settings,
  Sparkles,
  Trophy,
  UsersRound,
  X,
} from 'lucide-react'

const modules = [
  { label: 'My Modules', icon: BookOpen, tone: 'lavender', path: '/toc' },
  { label: 'Activities', icon: Check, tone: 'sky', path: '/stage1' },
  { label: 'Quizzes', icon: Trophy, tone: 'butter', path: '/quizzes' },
  { label: 'My Progress', icon: Sparkles, tone: 'mint', path: '/progress' },
]

const materials = [
  { category: 'Culture', title: 'Surabaya\nHeritage', tone: 'culture', art: 'heritage' },
  { category: 'Science', title: 'Animals Around\nUs', tone: 'science', art: 'animals' },
  { category: 'Technology', title: 'Simple\nMachines', tone: 'technology', art: 'machine' },
]

const quickAccess = [
  { label: 'How to Use', icon: Headphones, tone: 'coral' },
  { label: 'Gallery', icon: ImageIcon, tone: 'yellow' },
  { label: 'Bookmarks', icon: Bookmark, tone: 'green' },
  { label: 'For Teachers', icon: UsersRound, tone: 'purple' },
  { label: 'Settings', icon: Settings, tone: 'blue' },
]

// 1. Tambahkan properti 'path' ke navItems
const navItems = [
  { label: 'Home', icon: Compass, path: '/' },
  { label: 'Modules', icon: BookOpen, path: '/toc' },
  { label: 'Scan', icon: ScanLine, path: '/scan' }, // Path ke halaman scanner
  { label: 'Progress', icon: BarChart3, path: '#' },
  { label: 'Profile', icon: CircleUserRound, path: '#' },
]

function Brand() {
  return (
    <div className="brand" aria-label="NusAR home">
      <span className="brand-mark">⌁</span>
      <span className="brand-nus">Nus</span><span className="brand-ar">AR</span>
    </div>
  )
}

function ScanArtwork() {
  return (
    <div className="scan-art" aria-hidden="true">
      <div className="sun"></div>
      <div className="hill hill-back"></div>
      <div className="hill hill-front"></div>
      <div className="temple"><div className="temple-roof"></div><div className="temple-body"></div><div className="temple-spire"></div></div>
      <div className="student"><div className="student-head"></div><div className="student-hair"></div><div className="student-body"></div><div className="tablet"></div></div>
    </div>
  )
}

export default function Page() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const [scanStarted, setScanStarted] = useState(false)
  const [materialIndex, setMaterialIndex] = useState(0)

  return (
    <main className="nusar-shell">
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top"><Brand /><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <p className="sidebar-label">LEARN WITH NUSAR</p>
        
        {/* 2. Update navigasi Sidebar Desktop */}
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon, path }) => (
            <button 
              key={label} 
              className={activeNav === label ? 'active' : ''} 
              onClick={() => { 
                setActiveNav(label)
                setMenuOpen(false)
                if (path && path !== '#') router.push(path)
              }}
            >
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-card"><Sparkles /><strong>Keep exploring!</strong><span>New adventures are waiting.</span></div>
      </aside>

      <div className="page-wrap">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="mobile-brand"><Brand /></div>
          <div className="topbar-copy"><p>Welcome back, explorer!</p><span>Ready to discover something new?</span></div>
          <button className="profile-button" aria-label="Open profile"><span className="avatar-face">✦</span><span className="profile-name">Alya</span><ChevronRight /></button>
        </header>

        <div className="content">
          <div className="intro"><div><p className="eyebrow">EXPLORE · LEARN · IMAGINE</p><h1>Make learning <em>magical.</em></h1><p className="intro-sub">Bring every lesson to life with augmented reality.</p></div><div className="ethno-pill">Ethno-<b>STEAM</b></div></div>

          <button 
            className={`scan-hero ${scanStarted ? 'scan-active' : ''}`} 
            onClick={() => router.push('/scan')} 
            aria-label="Start AR and VR scanning"
          >
            <div className="scan-copy">
              <div className="scan-icon"><QrCode /></div>
              <div>
                <h2>SCAN MODUL</h2>
                <p>Ketuk untuk membuka kamera AR</p>
              </div>
            </div>
            <ScanArtwork />
            <ArrowRight className="hero-arrow" />
          </button>
          <div className="tip"><span className="tip-icon"><Lightbulb /></span><p><strong>Point your camera</strong> at the image or object to explore in AR/VR!</p><span className="bot">●</span></div>

          <SectionTitle title="E-MODULE" action="View all" />
          
          <div className="module-grid">
            {modules.map(({ label, icon: Icon, tone, path }) => (
              <button 
                className={`module-card ${tone}`} 
                key={label}
                onClick={() => router.push(path)} 
              >
                <span className="module-icon"><Icon /></span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>

          <SectionTitle title="LEARNING MATERIALS" action="See all" />
          <div className="materials-row"><button className="carousel-arrow" onClick={() => setMaterialIndex(Math.max(materialIndex - 1, 0))} aria-label="Previous materials"><ChevronLeft /></button><div className="materials-window"><div className="materials-track" style={{ transform: `translateX(-${materialIndex * 33.333}%)` }}>{materials.map(({ category, title, tone, art }) => <button className={`material-card ${tone}`} key={title}><span className="tag">{category}</span><h3>{title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3><span className={`material-art ${art}`}></span><span className="ar-badge"><ScanLine /></span></button>)}</div></div><button className="carousel-arrow" onClick={() => setMaterialIndex(Math.min(materialIndex + 1, materials.length - 1))} aria-label="Next materials"><ChevronRight /></button></div>

          <SectionTitle title="QUICK ACCESS" />
          <div className="quick-grid">{quickAccess.map(({ label, icon: Icon, tone }) => <button className="quick-item" key={label}><span className={`quick-icon ${tone}`}><Icon /></span><strong>{label}</strong></button>)}</div>
        </div>
      </div>

      {/* 3. Update navigasi Bottom Bar Mobile */}
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map(({ label, icon: Icon, path }) => (
          <button 
            key={label} 
            className={activeNav === label ? 'active' : ''} 
            onClick={() => {
              setActiveNav(label)
              if (path && path !== '#') router.push(path)
            }}
          >
            <Icon /><span>{label}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button>{action}<ArrowRight /></button>}</div>
}