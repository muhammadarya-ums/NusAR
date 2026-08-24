'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Check, ChevronRight, Circle, Map, Menu, Star, X } from 'lucide-react'

// 1. Data Intro: Path diubah dari '#' menjadi '/pendahuluan'
const introRows = [
  ['1', 'Kata Pengantar', 'Pengenalan E-Modul NusAR', '/pendahuluan'],
  ['2', 'Pendahuluan & Identitas', 'Sasaran dan pendekatan modul', '/pendahuluan'],
  ['3', 'Petunjuk Penggunaan', 'Panduan untuk guru & orang tua', '/pendahuluan'],
  ['4', 'Peta Konsep', 'Alur 3 unit pembelajaran', '/pendahuluan'],
  ['5', 'Capaian Pembelajaran', 'Target kompetensi tiap level', '/pendahuluan'],
  ['6', 'Tujuan Pembelajaran', 'Manfaat literasi & mitigasi', '/pendahuluan'],
]

// 2. Data Stage disesuaikan dengan 3 Unit Pembelajaran + 1 Lampiran
const stageRows = [
  ['7–10', 'Unit 1: Numerasi Dasar', 'Bilangan & Berhitung di Kenjeran', '/stage1'],
  ['11–13', 'Unit 2: Ruang & Waktu', 'Menyusuri Peneleh, Menuju Tugu Pahlawan', '/stage2'],
  ['14–16', 'Unit 3: Mitigasi Bencana', 'Siaga Bencana Pesisir Kenjeran', '/stage3'],
  ['17–19', 'Rangkuman & Lampiran', 'Lembar observasi dan glosarium', '/rangkuman'],
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
      <div className="map-art"><Map /><span>Jelajah<br />Surabaya</span></div>
    </div>
  ) 
}

function Section({ title, tone, icon: Icon, rows }: { title: string; tone: string; icon: typeof BookOpen; rows: string[][] }) { 
  const router = useRouter()
  
  return (
    <section className={`toc-section ${tone}`}>
      <div className="section-label">
        <Icon />
        <strong>{title}</strong>
        <small>{tone === 'blue-section' ? 'Pendahuluan' : tone === 'green-section' ? 'Unit Belajar' : 'Penutup'}</small>
      </div>
      <div className="section-rows">
        {/* 3. Eksekusi router.push berjalan jika path valid */}
        {rows.map(([page, name, sub, path]) => (
          <button 
            className="toc-row" 
            key={page + name}
            onClick={() => {
              if (path && path !== '#') {
                router.push(path)
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
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <Brand />
        <div className="title-pill">
          <BookOpen />
          <h1>E-Modul NusAR <span>Daftar Isi</span></h1>
          <BookOpen />
        </div>
        <div className="header-progress"><b>{selected}</b><small>dari 20 halaman</small></div>
      </header>
      
      <div className="toc-layout">
        <aside className={`mascot-side ${menuOpen ? 'open' : ''}`}>
          <Mascots />
          <p>Belajar bareng<br />Cak dan Ning!</p>
        </aside>
        
        <section className="main-toc">
          <div className="table-head"><span>Hal</span><span>Judul Halaman</span><span>Ikon</span></div>
          {/* Mapping Data yang sudah diperbaiki ke komponen Section */}
          <Section title="Bagian 1" tone="blue-section" icon={BookOpen} rows={introRows} />
          <Section title="Bagian 2" tone="green-section" icon={Circle} rows={stageRows} />
          <Section title="Bagian 3" tone="orange-section" icon={Star} rows={[["20", 'Kerja Bagus!', 'Kamu berhasil menyelesaikannya!', '#']]} />
        </section>
        
        <aside className="progress-panel">
          <h2>Progres 20 Halaman</h2>
          <div className="progress-grid">
            {progress.map((page) => (
              <button 
                key={page} 
                className={page <= selected ? 'done' : ''} 
                onClick={() => setSelected(page)} 
                aria-label={`Pergi ke halaman ${page}`}
              >
                <span>{page <= selected ? <Check /> : page}</span>
              </button>
            ))}
          </div>
          <p>Sentuh judul bab untuk mulai belajar</p>
        </aside>
      </div>
    </main>
  )
}