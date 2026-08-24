'use client'

import { useState, useEffect } from 'react' // <-- 1. Tambahkan useEffect
import { useRouter } from 'next/navigation'
import { Ear, Eye, Volume2, ChevronLeft, ChevronRight, Waves, ShoppingBasket, Clover } from 'lucide-react'

const levels = [
  { 
    number: 1, 
    color: 'blue', 
    label: 'Bilangan', 
    desc: 'Kampung Nelayan Kenjeran', 
    art: 'boat',
    path: '/stage1/level1'
  },
  { 
    number: 2, 
    color: 'orange', 
    label: 'Operasi Hitung', 
    desc: 'Pasar Ikan Kenjeran', 
    art: 'market',
    path: '/stage1/level2'
  },
  { 
    number: 3, 
    color: 'green', 
    label: 'Berhitung Berkelompok', 
    desc: 'Batik Semanggi', 
    art: 'batik',
    path: '/stage1/level3'
  },
]

function Illustration({ type }: { type: string }) {
  if (type === 'boat') {
    return (
      <div className="illustration boat h-[120px] mb-4">
        <span className="mast" />
        <span className="sail" />
        <span className="hull">KENJERAN</span>
        <span className="wave" />
      </div>
    )
  }
  
  if (type === 'market') {
    return (
      <div className="illustration flex justify-center items-end gap-2 h-[120px] pb-4 mb-4">
        <ShoppingBasket size={55} className="text-orange-500 drop-shadow-md" />
        <ShoppingBasket size={70} className="text-blue-500 drop-shadow-md" />
      </div>
    )
  }

  return (
    <div className="illustration flex justify-center items-center h-[120px] mb-4">
      <Clover size={85} className="text-green-600 drop-shadow-md" />
    </div>
  )
}

function Mascots() {
  return (
    <div className="mascots" aria-label="Cak dan Ning belajar bersama">
      <div className="mascot-boy"><span className="head" /><span className="cap" /><span className="body" /></div>
      <div className="mascot-girl"><span className="head" /><span className="hijab" /><span className="body" /></div>
      <div className="mascot-copy"><strong>Cak &amp; Ning</strong><span>Belajar Bersama</span></div>
    </div>
  )
}

export default function Page() {
  const router = useRouter()
  const [completed, setCompleted] = useState(1)
  const [active, setActive] = useState(1)

  // 2. Ambil data dari localStorage saat halaman pertama kali dimuat
  useEffect(() => {
    const savedProgress = localStorage.getItem('nusar_stage1_progress')
    if (savedProgress) {
      setCompleted(parseInt(savedProgress, 10))
    }
  }, [])

  // 3. Buat fungsi khusus untuk update state & localStorage sekaligus
  const updateProgress = (newLevel: number) => {
    setCompleted((prev) => {
      const maxVal = Math.max(prev, newLevel)
      localStorage.setItem('nusar_stage1_progress', maxVal.toString())
      return maxVal
    })
  }

  function speak(level: typeof levels[number]) {
    if ('speechSynthesis' in window) {
      const textToSpeak = `Level ${level.number}. ${level.label}. Di ${level.desc}.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'id-ID'; 
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
    updateProgress(level.number) // Simpan progres
  }

  function next() { 
    setActive((value) => Math.min(value + 1, 3)); 
    updateProgress(active + 1) // Simpan progres
  }
  
  function previous() { 
    setActive((value) => Math.max(value - 1, 1)) 
  }

  return (
    <main className="lesson-shell">
      <div className="batik-edge left" aria-hidden="true" /><div className="batik-edge right" aria-hidden="true" />
      <section className="lesson-board">
        
        <header className="lesson-header">
          <span className="sense-icon"><Eye /></span>
          <div>
            <p>Unit 1: Numerasi Dasar</p>
            <h1>Bilangan & Berhitung di Kenjeran</h1>
          </div>
          <span className="sense-icon"><Ear /></span>
        </header>

        <div className="learning-area">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mx-auto">
            {levels.map((level) => (
              <article 
                key={level.number} 
                className={`number-card ${level.color} relative ${active === level.number ? 'selected' : ''} cursor-pointer hover:scale-105 transition-transform`} 
                onClick={() => {
                  setActive(level.number);
                  updateProgress(level.number); // 4. Simpan progres saat kartu diklik
                  
                  if (level.path) {
                    router.push(level.path);
                  }
                }}
              >
                <div className="number text-[70px] md:text-[90px] mb-[-15px]">{level.number}</div>
                
                <div className="text-center z-10 px-2 flex-1">
                  <h2 className="font-black text-xl md:text-2xl leading-tight text-inherit mt-2">
                    {level.label}
                  </h2>
                  <p className="text-sm md:text-base font-bold opacity-85 mt-2">
                    {level.desc}
                  </p>
                </div>

                <Illustration type={level.art} />
                
                <button 
                  className="audio-button mt-auto" 
                  aria-label={`Putar instruksi Level ${level.number}`} 
                  onClick={(event) => { 
                    event.stopPropagation(); 
                    speak(level); 
                  }}
                >
                  <Volume2 />
                </button>
              </article>
            ))}
          </div>
        </div>

        <footer className="lesson-footer">
          <Mascots />
          <div className="progress-area">
            <strong>Progres Belajar</strong>
            <div className="progress-track" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={3}>
              <span style={{ width: `${completed / 3 * 100}%` }} />
            </div>
            <small>{completed} dari 3 Level dipelajari</small>
          </div>
          <div className="footer-actions">
            <button className="previous" onClick={previous} disabled={active === 1}>
              <ChevronLeft /> Sebelumnya
            </button>
            <button className="next" onClick={next} disabled={active === 3}>
              Selanjutnya <ChevronRight />
            </button>
          </div>
        </footer>

        <div className="lesson-hint">
          <Waves /> Sentuh ikon suara pada kartu untuk mendengar instruksi
        </div>
      </section>
    </main>
  )
}