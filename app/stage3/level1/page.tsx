'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Home, Lightbulb, Image as ImageIcon, ArrowDown, Shield, Hand, Flag, Waves, MapPin } from 'lucide-react'

export default function Level1Page() {
  const router = useRouter()
  // step 1: Tanda Gempa, step 2: Sikap Aman, step 3: Evakuasi
  const [step, setStep] = useState(1)
  
  // State Aktivitas 1
  const [foundItems, setFoundItems] = useState<string[]>([])
  
  // State Aktivitas 2
  const [safetySequence, setSafetySequence] = useState<number[]>([])
  const [showSequenceFeedback, setShowSequenceFeedback] = useState<boolean | null>(null)

  // State Aktivitas 3
  const [pathChosen, setPathChosen] = useState<string | null>(null)

  const speak = (text: string, rate = 0.85) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = rate 
      window.speechSynthesis.speak(utterance)
    }
  }

  // Narasi otomatis saat pindah step
  useEffect(() => {
    if (step === 1) {
      speak("Tanah bergetar perlahan. Coba sentuh benda yang bergoyang di dalam rumah.")
    } else if (step === 2) {
      speak("Saat gempa, kita harus melindungi diri. Sentuh urutan yang benar: Merunduk, Lindungi Kepala, lalu Bertahan.")
    } else if (step === 3) {
      speak("Setelah gempa berhenti, mari evakuasi. Pilih jalan menuju titik kumpul yang aman dari ombak.")
    }
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Mengenali Tanda Gempa) ---
  const handleFindItem = (item: string) => {
    if (!foundItems.includes(item)) {
      const newItems = [...foundItems, item]
      setFoundItems(newItems)
      
      if (item === 'lampu') speak("Benar, lampunya bergoyang.")
      if (item === 'pigura') speak("Benar, piguranya miring.")

      if (newItems.length === 2) {
        setTimeout(() => speak("Bagus! Benda yang bergoyang adalah tanda ada gempa bumi."), 1500)
      }
    }
  }

  // --- LOGIKA AKTIVITAS 2 (Sikap Aman) ---
  const handleSafetyAction = (id: number) => {
    if (safetySequence.includes(id) || safetySequence.length >= 3) return
    
    const newSeq = [...safetySequence, id]
    setSafetySequence(newSeq)
    
    if (id === 1) speak("Satu. Merunduk.")
    if (id === 2) speak("Dua. Lindungi Kepala.")
    if (id === 3) speak("Tiga. Bertahan.")

    if (newSeq.length === 3) {
      if (newSeq.join('') === '123') {
        setShowSequenceFeedback(true)
        setTimeout(() => speak("Pintar sekali! Merunduk, lindungi kepala, dan bertahan sampai gempa selesai."), 1000)
      } else {
        setShowSequenceFeedback(false)
        speak("Urutannya belum tepat. Ingat: Merunduk, lalu Lindungi Kepala, baru Bertahan.")
        setTimeout(() => {
          setShowSequenceFeedback(null)
          setSafetySequence([])
        }, 4000)
      }
    }
  }

  // --- LOGIKA AKTIVITAS 3 (Evakuasi Jalur Aman) ---
  const handleEvacuation = (choice: string) => {
    setPathChosen(choice)
    if (choice === 'safe') {
      speak("Luar biasa! Kamu memilih jalur aman menuju bukit bertanda bendera hijau.")
    } else {
      speak("Hati-hati! Jalur ke arah pantai berbahaya karena bisa ada ombak besar. Ayo cari jalur yang tinggi.")
      setTimeout(() => setPathChosen(null), 4000)
    }
  }

  return (
    <main className="min-h-screen bg-[#fcf5e5] text-[#18333a] font-sans pb-24">
      {/* CSS Animasi Wiggle Lembut Khusus Gempa */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gentle-shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        .animate-gentle-shake {
          animation: gentle-shake 1.5s ease-in-out infinite;
        }
      `}} />

      {/* HEADER Navigasi (Tema Oranye Mitigasi) */}
      <header className="bg-[#ed9817] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage3')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 1: Gempa & Tsunami</p>
          <h1 className="text-xl font-black">Evakuasi Virtual</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: TANDA GEMPA (Getaran)
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-700">
            <div className="bg-white border-4 border-[#ed9817] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[450px]">
              
              <button 
                onClick={() => speak("Ada gempa bumi perlahan. Coba sentuh lampu dan pigura yang bergoyang.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#d9484c] mb-2">Tanda-tanda Gempa</h2>
              <p className="text-lg font-bold text-gray-600 mb-6">Sentuh benda yang bergoyang karena tanah bergetar</p>

              {/* SIMULASI RUANGAN */}
              <div className="relative w-full max-w-sm mx-auto h-64 bg-orange-50 border-4 border-orange-200 rounded-2xl p-4 flex flex-col justify-between items-center shadow-inner overflow-hidden mb-8">
                
                {/* Lampu (Bisa digoyang) */}
                <button 
                  onClick={() => handleFindItem('lampu')}
                  disabled={foundItems.includes('lampu')}
                  className={`absolute top-0 right-16 transition-all duration-300 ${foundItems.includes('lampu') ? 'text-green-500 scale-110' : 'text-gray-600 animate-gentle-shake hover:scale-105'}`}
                >
                  <div className="w-1 h-12 bg-gray-400 mx-auto"></div>
                  <Lightbulb size={50} className={foundItems.includes('lampu') ? 'fill-green-200' : 'fill-yellow-100'} />
                  {foundItems.includes('lampu') && <CheckCircle2 className="absolute top-14 -right-4 text-green-500 bg-white rounded-full" size={24} />}
                </button>

                {/* Pigura (Bisa digoyang) */}
                <button 
                  onClick={() => handleFindItem('pigura')}
                  disabled={foundItems.includes('pigura')}
                  className={`absolute top-16 left-10 transition-all duration-300 ${foundItems.includes('pigura') ? 'text-green-500 scale-110 rotate-6' : 'text-gray-500 animate-gentle-shake hover:scale-105'}`}
                >
                  <ImageIcon size={60} />
                  {foundItems.includes('pigura') && <CheckCircle2 className="absolute -top-3 -right-3 text-green-500 bg-white rounded-full" size={24} />}
                </button>

                {/* Rumah/Dinding Standar */}
                <Home size={120} className="text-orange-300 opacity-30 mt-auto" />
              </div>
            </div>

            {/* Tombol Lanjut (Muncul jika 2 benda sudah ditemukan) */}
            {foundItems.length === 2 && (
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#d9484c] text-white text-xl font-black py-4 px-10 rounded-full shadow-lg animate-bounce"
              >
                Lanjut Belajar Sikap Aman <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: PRAKTIK SIKAP AMAN (1-2-3)
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#3b91ca] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <button 
                onClick={() => speak("Sentuh gambar secara berurutan: Merunduk, Lindungi Kepala, lalu Bertahan.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#173b63] mb-2">Saat Gempa Terjadi</h2>
              <p className="text-lg font-bold text-gray-600 mb-6">Susun urutan sikap berlindung yang benar</p>

              {/* SLOT JAWABAN */}
              <div className="flex justify-center gap-4 mb-8">
                {[0, 1, 2].map((idx) => {
                  const hasAnswer = safetySequence[idx]
                  return (
                    <div key={`slot-${idx}`} className={`w-20 h-24 md:w-28 md:h-32 rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${hasAnswer ? 'border-blue-500 bg-blue-50 scale-100' : 'border-dashed border-gray-300 bg-gray-50 scale-95'}`}>
                      {hasAnswer === 1 && <><ArrowDown size={40} className="text-blue-600 mb-1" /><span className="font-bold text-xs md:text-sm">Merunduk</span></>}
                      {hasAnswer === 2 && <><Shield size={40} className="text-blue-600 mb-1" /><span className="font-bold text-xs md:text-sm">Lindungi</span></>}
                      {hasAnswer === 3 && <><Hand size={40} className="text-blue-600 mb-1" /><span className="font-bold text-xs md:text-sm">Bertahan</span></>}
                      {!hasAnswer && <span className="text-3xl text-gray-300 font-black">{idx + 1}</span>}
                    </div>
                  )
                })}
              </div>

              {/* TOMBOL PILIHAN (Diacak secara visual) */}
              <div className="grid grid-cols-3 gap-3">
                {/* Opsi Lindungi (2) */}
                <button 
                  onClick={() => handleSafetyAction(2)}
                  disabled={safetySequence.includes(2)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all ${safetySequence.includes(2) ? 'bg-gray-100 border-gray-200 opacity-40' : 'bg-white border-blue-200 hover:border-blue-400 active:scale-95 shadow-sm'}`}
                >
                  <Shield size={40} className="text-orange-500 mb-2" />
                  <span className="font-black text-sm md:text-base text-gray-700">Lindungi Kepala</span>
                </button>
                
                {/* Opsi Merunduk (1) */}
                <button 
                  onClick={() => handleSafetyAction(1)}
                  disabled={safetySequence.includes(1)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all ${safetySequence.includes(1) ? 'bg-gray-100 border-gray-200 opacity-40' : 'bg-white border-blue-200 hover:border-blue-400 active:scale-95 shadow-sm'}`}
                >
                  <ArrowDown size={40} className="text-green-600 mb-2" />
                  <span className="font-black text-sm md:text-base text-gray-700">Merunduk</span>
                </button>

                {/* Opsi Bertahan (3) */}
                <button 
                  onClick={() => handleSafetyAction(3)}
                  disabled={safetySequence.includes(3)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all ${safetySequence.includes(3) ? 'bg-gray-100 border-gray-200 opacity-40' : 'bg-white border-blue-200 hover:border-blue-400 active:scale-95 shadow-sm'}`}
                >
                  <Hand size={40} className="text-purple-600 mb-2" />
                  <span className="font-black text-sm md:text-base text-gray-700">Bertahan</span>
                </button>
              </div>

              {/* FEEDBACK */}
              <div className="mt-8 h-16 flex justify-center items-center">
                {showSequenceFeedback === true && (
                  <div className="flex items-center gap-2 text-green-600 font-black text-xl md:text-2xl bg-green-50 px-6 py-3 rounded-full border-2 border-green-200 animate-in zoom-in">
                    <CheckCircle2 size={32} /> Urutan Benar!
                  </div>
                )}
                {showSequenceFeedback === false && (
                  <div className="flex items-center gap-2 text-red-500 font-black text-lg md:text-xl bg-red-50 px-6 py-3 rounded-full border-2 border-red-200 animate-in shake">
                    <RotateCcw size={28} /> Masih kurang tepat
                  </div>
                )}
              </div>

            </div>

            {/* Tombol Lanjut (Muncul jika urutan 1-2-3 benar) */}
            {showSequenceFeedback === true && (
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-4 px-10 rounded-full shadow-lg animate-bounce"
              >
                Lanjut ke Rute Evakuasi <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 3: EVAKUASI KE DATARAN TINGGI
        ========================================= */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#7db348] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <button 
                onClick={() => speak("Gempa telah berhenti. Segera evakuasi diri. Pilih jalur menuju bukit berbendera hijau, jangan ke arah pantai.")}
                className="mx-auto mb-4 bg-green-100 text-green-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#5ea138] mb-2">Ayo Evakuasi!</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Pilih jalur yang aman untuk menyelamatkan diri</p>

              <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                
                {/* JALUR SALAH (Menuju Pantai) */}
                <button 
                  onClick={() => handleEvacuation('danger')}
                  className={`relative w-full max-w-xs p-6 rounded-3xl border-4 transition-all duration-300 ${pathChosen === 'danger' ? 'border-red-500 bg-red-50 scale-95' : 'border-gray-200 hover:border-gray-400 bg-gray-50'}`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Waves size={70} className="text-blue-500 animate-pulse" />
                    <span className="font-black text-xl text-gray-700">Ke Arah Pantai</span>
                  </div>
                  {pathChosen === 'danger' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl animate-in fade-in">
                      <span className="text-red-600 font-black text-2xl rotate-12">Berbahaya!</span>
                    </div>
                  )}
                </button>

                {/* JALUR BENAR (Menuju Bukit/Titik Kumpul) */}
                <button 
                  onClick={() => handleEvacuation('safe')}
                  className={`relative w-full max-w-xs p-6 rounded-3xl border-4 transition-all duration-300 ${pathChosen === 'safe' ? 'border-green-500 bg-green-100 scale-105 shadow-xl' : 'border-green-300 hover:border-green-400 bg-green-50 shadow-md'}`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <MapPin size={80} className="text-green-600" />
                      <Flag size={30} className="absolute top-2 left-1/2 -translate-x-1/2 text-white fill-green-600" />
                    </div>
                    <span className="font-black text-xl text-green-800">Ke Titik Kumpul (Tinggi)</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Tombol Selesai Muncul Jika Pilih Jalur Aman */}
            {pathChosen === 'safe' && (
              <button 
                onClick={() => {
                  localStorage.setItem('nusar_stage3_progress', '2')
                  router.push('/stage3')
                }}
                className="flex items-center gap-2 bg-[#7db348] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
              >
                Selesai Level 1!
              </button>
            )}
          </section>
        )}

      </div>
    </main>
  )
}