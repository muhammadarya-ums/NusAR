'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Ear, Eye, Volume2, ChevronLeft, ChevronRight, Waves } from 'lucide-react'

// 1. Array levels diperbarui dengan properti imageUrl untuk semua level
const levels = [
  { 
    number: 1, 
    color: 'blue', 
    label: 'Bilangan', 
    desc: 'Kampung Nelayan Kenjeran', 
    imageUrl: '/images/boat.png',
    path: '/stage1/level1'
  },
  { 
    number: 2, 
    color: 'orange', 
    label: 'Operasi Hitung', 
    desc: 'Pasar Ikan Kenjeran', 
    imageUrl: '/images/pasar-ikan.png', // Placeholder gambar level 2
    path: '/stage1/level2'
  },
  { 
    number: 3, 
    color: 'green', 
    label: 'Berhitung Berkelompok', 
    desc: 'Batik Semanggi', 
    imageUrl: '/images/batik-semanggi.png', // Placeholder gambar level 3
    path: '/stage1/level3'
  },
]

// 2. Komponen Illustration
function Illustration({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="illustration flex justify-center items-center h-[120px] mb-4">
      <Image 
        src={src} 
        alt={alt} 
        width={220} 
        height={180} 
        className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>
  )
}

// 3. Komponen Mascots Baru dengan Gambar cak dan ning.png
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

  useEffect(() => {
    const savedProgress = localStorage.getItem('nusar_stage1_progress')
    if (savedProgress) {
      setCompleted(parseInt(savedProgress, 10))
    }
  }, [])

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

                <Illustration src={level.imageUrl} alt={`Ilustrasi ${level.label}`} />
                
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