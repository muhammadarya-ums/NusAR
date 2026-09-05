'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Ear, Eye, Volume2, ChevronLeft, ChevronRight, Waves, MapPin, Compass, Sun, Moon, Flag, ListOrdered } from 'lucide-react'

// Menyesuaikan data dengan 3 Level di Unit 2: Ruang & Waktu
const levels = [
  { 
    number: 1, 
    color: 'blue', 
    label: 'Konsep Ruang', 
    desc: 'Kampung Peneleh', 
    art: 'space',
    path: '/stage2/level1'
  },
  { 
    number: 2, 
    color: 'orange', 
    label: 'Konsep Waktu', 
    desc: 'Tugu Pahlawan', 
    art: 'time',
    path: '/stage2/level2'
  },
  { 
    number: 3, 
    color: 'green', 
    label: 'Mengurutkan Peristiwa', 
    desc: 'Hari Pahlawan', 
    art: 'sequence',
    path: '/stage2/level3'
  },
]

function Illustration({ type }: { type: string }) {
  // Level 1: Ilustrasi Konsep Ruang (Peta & Kompas)
  if (type === 'space') {
    return (
      <div className="illustration flex justify-center items-center gap-4 h-[120px] mb-4">
        <MapPin size={65} className="text-blue-500 drop-shadow-md animate-bounce" />
        <Compass size={60} className="text-blue-400 drop-shadow-md" />
      </div>
    )
  }
  
  // Level 2: Ilustrasi Konsep Waktu (Matahari & Bulan)
  if (type === 'time') {
    return (
      <div className="illustration flex justify-center items-center gap-4 h-[120px] mb-4">
        <Sun size={70} className="text-orange-500 drop-shadow-md animate-[spin_10s_linear_infinite]" />
        <Moon size={60} className="text-indigo-600 drop-shadow-md" />
      </div>
    )
  }

  // Level 3: Ilustrasi Mengurutkan (Bendera & Daftar)
  return (
    <div className="illustration flex justify-center items-center gap-4 h-[120px] mb-4">
      <Flag size={70} className="text-red-500 drop-shadow-md" />
      <ListOrdered size={65} className="text-green-600 drop-shadow-md" />
    </div>
  )
}

function Mascots() {
  return (
    <div className="mascots flex items-center gap-3" aria-label="Cak dan Ning belajar bersama">
      {/* Ukuran dibikin memanjang (w-32 h-24), pakai rounded-2xl, dan mask ellipse */}
      <div 
        className="relative w-32 h-24 md:w-40 md:h-28 rounded-2xl overflow-hidden"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)',
        }}
      >
        <Image 
          src="/images/cak dan ning.png" 
          alt="Cak dan Ning Surabaya"
          fill
          className="object-cover object-top"
        />
      </div>
      
      <div className="mascot-copy flex flex-col justify-center text-left">
        <strong className="text-lg md:text-xl leading-tight">Cak &amp; Ning</strong>
        <span className="text-sm md:text-base opacity-80">Belajar Bersama</span>
      </div>
    </div>
  )
}

export default function Page() {
  const router = useRouter()
  const [completed, setCompleted] = useState(1)
  const [active, setActive] = useState(1)

  // Ambil data progres dari localStorage khusus untuk Stage 2
  useEffect(() => {
    const savedProgress = localStorage.getItem('nusar_stage2_progress')
    if (savedProgress) {
      setCompleted(parseInt(savedProgress, 10))
    }
  }, [])

  const updateProgress = (newLevel: number) => {
    setCompleted((prev) => {
      const maxVal = Math.max(prev, newLevel)
      localStorage.setItem('nusar_stage2_progress', maxVal.toString())
      return maxVal
    })
  }

  function speak(level: typeof levels[number]) {
    if ('speechSynthesis' in window) {
      const textToSpeak = `Level ${level.number}. ${level.label}. Di ${level.desc}.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'id-ID'; 
      utterance.rate = 0.85; // Diperlambat sedikit
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
            <p>Unit 2: Ruang & Waktu</p>
            <h1>Menyusuri Peneleh, Menuju Tugu Pahlawan</h1>
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
              {/* Tanda kurung ditambahkan biar kalkulasi aman */}
              <span style={{ width: `${(completed / 3) * 100}%` }} />
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