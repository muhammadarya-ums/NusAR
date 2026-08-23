'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // <-- 1. Import useRouter
import { BookOpen, Check, ChevronRight, Circle, Map, Menu, Star, X } from 'lucide-react'

// 2. Tambahkan rute (path) di elemen ke-4 setiap array
const introRows = [
  ['1', 'Welcome to Numeration!', 'Meet your learning adventure', '#'],
  ['2', 'Meet Cak and Ning', 'Your friendly learning guides', '#'],
  ['3', 'Our Learning Map', 'Discover the journey ahead', '#'],
  ['4', 'What is Numeration?', 'Numbers are all around us', '#'],
  ['5', 'Why Numeration Matters', 'Numbers help us every day', '#'],
  ['6', "Let's Get Ready!", 'Prepare for your first activity', '#'],
]

const stageRows = [
  ['7–10', 'Stage 1: Numbers Around Us', 'Count, compare, and explore', '/stage1'],
  ['11–14', 'Stage 2: Add and Subtract', 'Put numbers together', '/stage2'],
  ['15–16', 'Stage 3: Shapes and Patterns', 'Find shapes everywhere', '/stage3'],
  ['17–19', 'Stage 4: Time and Measurement', 'Measure the world around us', '/stage4'], // Disesuaikan mengarah ke folder stage4
]

const progress = Array.from({ length: 20 }, (_, i) => i + 1)

function Brand() { 
  return <div className="brand"><span className="brand-nus">Nus</span><span className="brand-ar">AR</span></div> 
}

function Mascots() { 
  return (
    <div className="mascot-card" aria-label="Cak and Ning holding a learning map">
      <div className="speech cak">Cak</div>
      <div className="speech ning">Ning</div>
      <div className="mascot cak-person"><span className="face">●</span><b>C</b></div>
      <div className="mascot ning-person"><span className="face">●</span><b>N</b></div>
      <div className="map-art"><Map /><span>Explore<br />Indonesia</span></div>
    </div>
  ) 
}

// 3. Destructure array untuk menerima 'path' dan implementasi onClick
function Section({ title, tone, icon: Icon, rows }: { title: string; tone: string; icon: typeof BookOpen; rows: string[][] }) { 
  const router = useRouter(); // Panggil hook router di sini
  
  return (
    <section className={`toc-section ${tone}`}>
      <div className="section-label">
        <Icon />
        <strong>{title}</strong>
        <small>{tone === 'blue-section' ? 'Introduction' : tone === 'green-section' ? 'Stage 1–4' : 'Closing'}</small>
      </div>
      <div className="section-rows">
        {rows.map(([page, name, sub, path]) => (
          <button 
            className="toc-row" 
            key={page + name}
            onClick={() => {
              // Validasi agar tidak nge-route kalau tujuannya cuma '#' (seperti intro pages)
              if (path && path !== '#') {
                router.push(path);
              }
            }}
          >
            <span className="page-number">{page}</span>
            <span className="row-copy"><b>{name}</b><small>{sub}</small></span>
            <span className="mini-art" aria-hidden="true">
              {tone === 'blue-section' ? <BookOpen /> : tone === 'green-section' ? '123' : <Star />}
            </span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </section>
  ) 
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState(1)
  
  return (
    <main className="toc-shell">
      <header className="toc-header">
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Brand />
        <div className="title-pill">
          <BookOpen />
          <h1>Numeration E-Module <span>Table of Contents</span></h1>
          <BookOpen />
        </div>
        <div className="header-progress"><b>{selected}</b><small>of 20 pages</small></div>
      </header>
      
      <div className="toc-layout">
        <aside className={`mascot-side ${menuOpen ? 'open' : ''}`}>
          <Mascots />
          <p>Learn with Cak<br />and Ning!</p>
        </aside>
        
        <section className="main-toc">
          <div className="table-head"><span>Page</span><span>Page Title</span><span>Mini icons</span></div>
          <Section title="Section 1" tone="blue-section" icon={BookOpen} rows={introRows} />
          <Section title="Section 2" tone="green-section" icon={Circle} rows={stageRows} />
          {/* Tambahkan elemen ke-4 '#' untuk closing page agar struktur array sama */}
          <Section title="Section 3" tone="orange-section" icon={Star} rows={[["20", 'Great Job!', 'You did it!', '#']]} />
        </section>
        
        <aside className="progress-panel">
          <h2>20-Page Progress</h2>
          <div className="progress-grid">
            {progress.map((page) => (
              <button 
                key={page} 
                className={page <= selected ? 'done' : ''} 
                onClick={() => setSelected(page)} 
                aria-label={`Go to page ${page}`}
              >
                <span>{page <= selected ? <Check /> : page}</span>
              </button>
            ))}
          </div>
          <p>Tap a page to begin learning</p>
        </aside>
      </div>
    </main>
  )
}