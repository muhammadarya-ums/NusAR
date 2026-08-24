'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, Sun, Moon, Sunrise, Sunset, Coffee, Bed, CheckCircle2, RotateCcw } from 'lucide-react'

// Data 4 Bagian Waktu (sesuai instruksi warna modul)
const timeData = [
  { id: 'pagi', label: 'Pagi', bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Sunrise, desc: 'Pagi hari, langit kuning cerah.' },
  { id: 'siang', label: 'Siang', bg: 'bg-blue-300', text: 'text-blue-900', icon: Sun, desc: 'Siang hari, langit biru terang.' },
  { id: 'sore', label: 'Sore', bg: 'bg-orange-300', text: 'text-orange-900', icon: Sunset, desc: 'Sore hari, langit jingga.' },
  { id: 'malam', label: 'Malam', bg: 'bg-indigo-900', text: 'text-indigo-100', icon: Moon, desc: 'Malam hari, langit gelap.' },
]

// Data Aktivitas untuk Step 2
const activities = [
  { id: 'sarapan', label: 'Makan Sarapan', icon: Coffee, correctTime: 'pagi', question: 'Kapan biasanya kita makan sarapan?' },
  { id: 'tidur', label: 'Tidur', icon: Bed, correctTime: 'malam', question: 'Kapan biasanya kita tidur?' }
]

export default function Level2Page() {
  const router = useRouter()
  // step 1: Mengenal Waktu, step 2: Mencocokkan Waktu
  const [step, setStep] = useState(1)
  
  // State untuk Aktivitas 1
  const [activeTime, setActiveTime] = useState(timeData[0])
  const [timesExplored, setTimesExplored] = useState<string[]>(['pagi'])
  
  // State untuk Aktivitas 2
  const [activityIndex, setActivityIndex] = useState(0)
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null)

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = 0.85 
      window.speechSynthesis.speak(utterance)
    }
  }

  // Narasi pembuka otomatis
  useEffect(() => {
    if (step === 1) {
      speak("Mari mengenal waktu di Tugu Pahlawan. Sentuh tombol pagi, siang, sore, dan malam.")
    } else if (step === 2) {
      speak("Sekarang, mari mencocokkan kegiatan dengan waktunya. " + activities[0].question)
    }
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Mengubah Waktu) ---
  const handleTimeChange = (timeId: string) => {
    const selected = timeData.find(t => t.id === timeId)!
    setActiveTime(selected)
    speak(selected.label + ". " + selected.desc)
    
    if (!timesExplored.includes(timeId)) {
      setTimesExplored(prev => [...prev, timeId])
    }
    
    if (timesExplored.length === 3 && !timesExplored.includes(timeId)) {
      setTimeout(() => speak("Hebat! Kamu sudah melihat semua waktu di Tugu Pahlawan."), 2500)
    }
  }

  // --- LOGIKA AKTIVITAS 2 (Mencocokkan) ---
  const handleAnswer = (timeId: string) => {
    const currentActivity = activities[activityIndex]
    
    if (timeId === currentActivity.correctTime) {
      setShowFeedback(true)
      speak(`Benar sekali! Kita ${currentActivity.label} di waktu ${timeData.find(t => t.id === timeId)?.label}.`)
      
      setTimeout(() => {
        setShowFeedback(null)
        if (activityIndex < activities.length - 1) {
          setActivityIndex(prev => prev + 1)
          speak(activities[activityIndex + 1].question)
        } else {
          // Permainan selesai
          setActivityIndex(99) 
        }
      }, 3500)
    } else {
      setShowFeedback(false)
      speak("Kurang tepat. Coba pilih waktu yang lain ya.")
      setTimeout(() => setShowFeedback(null), 2000)
    }
  }

  return (
    <main className={`min-h-screen font-sans pb-24 transition-colors duration-1000 ${step === 1 ? activeTime.bg : 'bg-[#fff5e6]'}`}>
      
      {/* HEADER Navigasi (Tema Oranye untuk Level 2 Konsep Waktu) */}
      <header className="bg-[#e98608] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage2')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 2: Tugu Pahlawan</p>
          <h1 className="text-xl font-black">Konsep Waktu</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: MENGENAL WAKTU
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-700">
            <div className="bg-white/90 backdrop-blur-sm border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-2xl mb-8">
              
              <button 
                onClick={() => speak("Sentuh tombol di bawah untuk mengubah waktu di Tugu Pahlawan.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-2">Suasana Tugu Pahlawan</h2>
              <p className="text-lg font-bold text-gray-600 mb-6">Pilih waktu untuk melihat perubahan langit</p>

              {/* VISUALISASI TUGU PAHLAWAN */}
              <div className={`relative w-full max-w-sm mx-auto h-64 rounded-3xl border-4 transition-colors duration-1000 flex flex-col justify-end items-center overflow-hidden mb-8 ${activeTime.bg} border-gray-400 shadow-inner`}>
                
                {/* Ornamen Langit */}
                <div className="absolute top-4 right-6 transition-all duration-1000">
                  <activeTime.icon size={60} className={`${activeTime.text} opacity-80`} />
                </div>

                {/* Siluet Tugu Pahlawan */}
                <div className="relative flex flex-col items-center z-10">
                  {/* Pucuk Tugu */}
                  <div className="w-2 h-4 bg-gray-600"></div>
                  {/* Badan Tugu (Trapesium CSS) */}
                  <div className="w-12 h-40 bg-gray-300 border-x-4 border-gray-400" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
                  {/* Dudukan/Base Tugu */}
                  <div className="w-32 h-6 bg-gray-500 rounded-t-lg"></div>
                  <div className="w-40 h-6 bg-gray-700 rounded-t-md"></div>
                </div>
              </div>

              {/* TOMBOL WAKTU (4 PANEL) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeData.map((time) => {
                  const Icon = time.icon
                  const isSelected = activeTime.id === time.id
                  return (
                    <button
                      key={time.id}
                      onClick={() => handleTimeChange(time.id)}
                      className={`flex flex-col items-center justify-center py-4 rounded-2xl border-b-4 active:translate-y-1 active:border-b-0 transition-all ${isSelected ? 'bg-orange-500 border-orange-700 text-white scale-105 shadow-lg' : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Icon size={36} className="mb-2" />
                      <span className="font-black text-lg">{time.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tombol Lanjut jika ke-4 waktu sudah ditekan minimal sekali */}
            {timesExplored.length === 4 && (
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-4 px-10 rounded-full shadow-lg animate-bounce"
              >
                Lanjut Mencocokkan <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: MENCOCOKKAN AKTIVITAS
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              {activityIndex < activities.length ? (
                <>
                  <button 
                    onClick={() => speak(activities[activityIndex].question)}
                    className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
                  >
                    <Volume2 size={32} />
                  </button>
                  
                  <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-8">Pilih Waktu yang Tepat</h2>
                  
                  {/* Kartu Aktivitas yang sedang aktif */}
                  <div className="flex flex-col items-center justify-center bg-orange-50 w-full max-w-sm mx-auto py-8 rounded-3xl border-4 border-dashed border-orange-300 mb-8 animate-in zoom-in">
                    {(() => {
                      const CurrentIcon = activities[activityIndex].icon
                      return <CurrentIcon size={100} className="text-orange-600 mb-4 drop-shadow-md" />
                    })()}
                    <span className="text-3xl font-black text-orange-800">
                      {activities[activityIndex].label}
                    </span>
                  </div>

                  {/* 4 Pilihan Waktu untuk Menjawab */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeData.map((time) => {
                      const Icon = time.icon
                      return (
                        <button
                          key={time.id}
                          onClick={() => handleAnswer(time.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-transform active:scale-95 ${time.bg} border-white shadow-md text-gray-800 hover:scale-105`}
                        >
                          <Icon size={40} className="mb-2 opacity-80" />
                          <span className="font-black text-lg">{time.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Feedback Benar/Salah */}
                  <div className="mt-8 h-16 flex items-center justify-center">
                    {showFeedback === true && (
                      <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 px-8 py-3 rounded-full border-2 border-green-200">
                        <CheckCircle2 size={36} /> Benar Sekali!
                      </div>
                    )}
                    {showFeedback === false && (
                      <div className="flex items-center gap-3 text-red-500 animate-in shake font-black text-xl bg-red-50 px-6 py-3 rounded-full border-2 border-red-200">
                        <RotateCcw size={28} /> Ups, coba waktu lain!
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Tampilan jika semua soal selesai
                <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in">
                  <CheckCircle2 size={120} className="text-green-500 mb-6 drop-shadow-lg" />
                  <h2 className="text-4xl font-black text-green-600 mb-4">Luar Biasa!</h2>
                  <p className="text-xl font-bold text-gray-600">Kamu sudah tahu waktu Pagi, Siang, Sore, dan Malam.</p>
                </div>
              )}
            </div>

            {/* Tombol Selesai */}
            {activityIndex === 99 && (
              <button 
                onClick={() => {
                  // Simpan progres ke level 3 dan kembali ke menu Stage 2
                  localStorage.setItem('nusar_stage2_progress', '3')
                  router.push('/stage2')
                }}
                className="flex items-center gap-2 bg-[#e98608] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
              >
                Selesai Level 2!
              </button>
            )}
          </section>
        )}

      </div>
    </main>
  )
}