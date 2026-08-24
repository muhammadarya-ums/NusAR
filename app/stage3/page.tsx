'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Ear, Eye, Volume2, ChevronLeft, ChevronRight, AlertTriangle, Activity, Waves, Map, Flame, ShieldAlert } from 'lucide-react'

// Menyesuaikan data dengan 3 Level di Unit 3: Mitigasi Bencana
const levels = [
  { 
    number: 1, 
    color: 'orange', 
    label: 'Evakuasi Virtual', 
    desc: 'Gempa & Tsunami', 
    art: 'quake',
    path: '/stage3/level1'
  },
  { 
    number: 2, 
    color: 'blue', 
    label: 'Jalur Aman', 
    desc: 'Banjir Rob', 
    art: 'flood',
    path: '/stage3/level2'
  },
  { 
    number: 3, 
    color: 'red', 
    label: 'Respon Preventif', 
    desc: 'Kebakaran & Siaga', 
    art: 'fire',
    path: '/stage3/level3'
  },
]

function Illustration({ type }: { type: string }) {
  // Level 1: Ilustrasi Gempa & Tsunami
  if (type === 'quake') {
    return (
      <div className="illustration flex justify-center items-center gap-4 h-[120px] mb-4">
        <Activity size={70} className="text-orange-500 drop-shadow-md" />
        <Waves size={65} className="text-blue-500 drop-shadow-md" />
      </div>
    )
  }
  
  // Level 2: Ilustrasi Banjir Rob & Jalur
  if (type === 'flood') {
    return (
      <div className="illustration flex justify-center items-center gap-4 h-[120px] mb-4">
        <Waves size={70} className="text-blue-400 drop-shadow-md animate-pulse" />
        <Map size={60} className="text-green-600 drop-shadow-md" />
      </div>
    )
  }

  // Level 3: Ilustrasi Kebakaran & Kesiapsiagaan
  return (
    <div className="illustration flex justify-center items-center gap-4 h-[120px] mb-4">
      <Flame size={75} className="text-red-500 drop-shadow-md" />
      <ShieldAlert size={60} className="text-orange-400 drop-shadow-md" />
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

  // Ambil data progres dari localStorage khusus untuk Stage 3
  useEffect(() => {
    const savedProgress = localStorage.getItem('nusar_stage3_progress')
    if (savedProgress) {
      setCompleted(parseInt(savedProgress, 10))
    }
  }, [])

  const updateProgress = (newLevel: number) => {
    setCompleted((prev) => {
      const maxVal = Math.max(prev, newLevel)
      localStorage.setItem('nusar_stage3_progress', maxVal.toString())
      return maxVal
    })
  }

  function speak(level: typeof levels[number]) {
    if ('speechSynthesis' in window) {
      const textToSpeak = `Level ${level.number}. ${level.label}. Bencana ${level.desc}.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'id-ID'; 
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
    updateProgress(level.number) 
  }

  function next() { 
    setActive((value) => Math.min(value + 1, 3)); 
    updateProgress(active + 1) 
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
            <p>Unit 3: Mitigasi Bencana</p>
            <h1>Siaga Bencana Pesisir Kenjeran</h1>
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
                  updateProgress(level.number);
                  
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
          <AlertTriangle className="text-orange-500" /> Sentuh ikon suara pada kartu untuk mendengar jenis bencana
        </div>
      </section>
    </main>
  )
}