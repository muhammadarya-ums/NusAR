'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Home, CheckCircle2, Map } from 'lucide-react'

export default function Level1Page() {
  const router = useRouter()
  // step 1: Pengenalan 4 Arah, step 2: Navigasi mencari rumah
  const [step, setStep] = useState(1)
  
  // State untuk Aktivitas 1
  const [directionsClicked, setDirectionsClicked] = useState<string[]>([])
  
  // State untuk Aktivitas 2
  // 0: Cari rumah #2 (Kanan), 1: Ketemu rumah #2, 2: Cari rumah #3 (Atas), 3: Ketemu rumah #3 (Selesai)
  const [findingState, setFindingState] = useState(0)

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = 0.85 
      window.speechSynthesis.speak(utterance)
    }
  }

  // Narasi otomatis saat pindah step
  useEffect(() => {
    if (step === 1) speak("Mari belajar arah di Kampung Peneleh. Sentuh setiap panah untuk mendengar arahnya.")
    if (step === 2 && findingState === 0) speak("Ayo mencari rumah nomor dua! Ikuti panah ke kanan.")
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Mengenal Arah) ---
  const handleDirection = (dir: string, text: string) => {
    speak(text)
    if (!directionsClicked.includes(dir)) {
      setDirectionsClicked(prev => [...prev, dir])
    }
    
    // Jika keempat arah sudah ditekan semua
    if (directionsClicked.length === 3 && !directionsClicked.includes(dir)) {
      setTimeout(() => speak("Pintar sekali! Kamu sudah tahu semua arah."), 1500)
    }
  }

  // --- LOGIKA AKTIVITAS 2 (Navigasi Rumah) ---
  const handleFollowArrow = (expectedState: number) => {
    if (findingState === 0 && expectedState === 1) {
      setFindingState(1)
      speak("Hore! Kamu sampai di rumah nomor dua.")
      setTimeout(() => {
        setFindingState(2)
        speak("Sekarang, ayo mencari rumah nomor tiga! Ikuti panah ke atas.")
      }, 3500)
    } 
    else if (findingState === 2 && expectedState === 3) {
      setFindingState(3)
      speak("Hore! Kamu sampai di rumah nomor tiga. Hebat!")
    }
  }

  return (
    <main className="min-h-screen bg-[#eaf5fc] text-[#173b63] font-sans pb-24">
      {/* HEADER Navigasi */}
      <header className="bg-[#3b91ca] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage2')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 1: Kampung Peneleh</p>
          <h1 className="text-xl font-black">Konsep Ruang & Arah</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: PENGENALAN 4 ARAH
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="bg-white border-4 border-[#3b91ca] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Sentuh panah atas, bawah, kiri, dan kanan untuk mendengar namanya.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#173b63] mb-2">Mengenal Arah</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Sentuh semua tombol panah di bawah ini</p>

              {/* D-PAD Navigasi Besar */}
              <div className="grid grid-cols-3 grid-rows-3 gap-2 w-64 h-64 mx-auto mb-8">
                {/* Kosong */} <div />
                {/* ATAS */}
                <button 
                  onClick={() => handleDirection('up', 'Atas')}
                  className={`flex items-center justify-center rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${directionsClicked.includes('up') ? 'bg-blue-500 border-blue-700 text-white' : 'bg-gray-200 border-gray-400 text-gray-500'}`}
                >
                  <ArrowUp size={60} />
                </button>
                {/* Kosong */} <div />
                
                {/* KIRI */}
                <button 
                  onClick={() => handleDirection('left', 'Kiri')}
                  className={`flex items-center justify-center rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${directionsClicked.includes('left') ? 'bg-blue-500 border-blue-700 text-white' : 'bg-gray-200 border-gray-400 text-gray-500'}`}
                >
                  <ArrowLeft size={60} />
                </button>
                
                {/* TENGAH (Ikon Map) */}
                <div className="flex items-center justify-center bg-blue-50 rounded-2xl border-2 border-blue-200 text-blue-300">
                  <Map size={40} />
                </div>
                
                {/* KANAN */}
                <button 
                  onClick={() => handleDirection('right', 'Kanan')}
                  className={`flex items-center justify-center rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${directionsClicked.includes('right') ? 'bg-blue-500 border-blue-700 text-white' : 'bg-gray-200 border-gray-400 text-gray-500'}`}
                >
                  <ArrowRight size={60} />
                </button>

                {/* Kosong */} <div />
                {/* BAWAH */}
                <button 
                  onClick={() => handleDirection('down', 'Bawah')}
                  className={`flex items-center justify-center rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${directionsClicked.includes('down') ? 'bg-blue-500 border-blue-700 text-white' : 'bg-gray-200 border-gray-400 text-gray-500'}`}
                >
                  <ArrowDown size={60} />
                </button>
                {/* Kosong */} <div />
              </div>
            </div>

            {/* Tombol Lanjut akan muncul jika 4 arah sudah ditekan */}
            {directionsClicked.length === 4 && (
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-4 px-10 rounded-full shadow-md animate-bounce"
              >
                Lanjut Mencari Rumah <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: NAVIGASI MENCARI RUMAH
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#3b91ca] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[480px]">
              <button 
                onClick={() => {
                  if (findingState === 0) speak("Ayo mencari rumah nomor dua! Sentuh panah ke kanan.")
                  if (findingState === 1) speak("Hore! Sampai di rumah nomor dua.")
                  if (findingState === 2) speak("Ayo mencari rumah nomor tiga! Sentuh panah ke atas.")
                  if (findingState === 3) speak("Hore! Sampai di rumah nomor tiga.")
                }}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#173b63] mb-2">Lorong Peneleh</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">
                {findingState < 2 ? 'Target: Rumah No. 2' : 'Target: Rumah No. 3'}
              </p>

              {/* AREA SIMULASI JALAN / LORONG */}
              <div className="relative w-full max-w-sm mx-auto h-64 bg-[#e8f1f5] rounded-3xl border-4 border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                
                {/* State 0: Cari Rumah 2 (Panah Kanan) */}
                {findingState === 0 && (
                  <button 
                    onClick={() => handleFollowArrow(1)}
                    className="flex flex-col items-center animate-in zoom-in duration-500 hover:scale-110 active:scale-95 transition"
                  >
                    <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-xl border-b-8 border-blue-700 animate-pulse">
                      <ArrowRight size={80} />
                    </div>
                    <span className="mt-4 font-black text-2xl text-blue-600">Ke Kanan</span>
                  </button>
                )}

                {/* State 1: Ketemu Rumah 2 */}
                {findingState === 1 && (
                  <div className="flex flex-col items-center animate-in slide-in-from-right duration-700">
                    <Home size={100} className="text-green-600 drop-shadow-md" />
                    <span className="bg-white border-4 border-green-500 text-green-600 font-black text-3xl px-6 py-2 rounded-full -mt-6 z-10 shadow-lg">
                      2
                    </span>
                    <span className="mt-4 font-black text-xl text-green-700 bg-green-100 px-4 py-1 rounded-full">Sampai!</span>
                  </div>
                )}

                {/* State 2: Cari Rumah 3 (Panah Atas) */}
                {findingState === 2 && (
                  <button 
                    onClick={() => handleFollowArrow(3)}
                    className="flex flex-col items-center animate-in zoom-in duration-500 hover:scale-110 active:scale-95 transition"
                  >
                    <span className="mb-4 font-black text-2xl text-blue-600">Lurus / Atas</span>
                    <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-xl border-b-8 border-blue-700 animate-pulse">
                      <ArrowUp size={80} />
                    </div>
                  </button>
                )}

                {/* State 3: Ketemu Rumah 3 */}
                {findingState === 3 && (
                  <div className="flex flex-col items-center animate-in slide-in-from-bottom duration-700">
                    <Home size={100} className="text-orange-500 drop-shadow-md" />
                    <span className="bg-white border-4 border-orange-500 text-orange-600 font-black text-3xl px-6 py-2 rounded-full -mt-6 z-10 shadow-lg">
                      3
                    </span>
                    <span className="mt-4 font-black text-xl text-orange-600 bg-orange-100 px-4 py-1 rounded-full">Sampai!</span>
                  </div>
                )}
                
              </div>
            </div>

            {/* Tombol Selesai */}
            {findingState === 3 && (
              <button 
                onClick={() => {
                  // Menyimpan progres bahwa Level 1 selesai (sehingga terbuka Level 2)
                  localStorage.setItem('nusar_stage2_progress', '2')
                  router.push('/stage2')
                }}
                className="flex items-center gap-2 bg-[#3b91ca] text-white text-xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
              >
                <CheckCircle2 size={28} /> Selesai Level 1!
              </button>
            )}
          </section>
        )}

      </div>
    </main>
  )
}