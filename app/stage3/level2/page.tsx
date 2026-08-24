'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Waves, Zap, AlertTriangle, ArrowUp, Navigation } from 'lucide-react'

export default function Level2Page() {
  const router = useRouter()
  // step 1: Air Naik (Banjir Rob), step 2: Identifikasi Bahaya, step 3: Pilih Jalur
  const [step, setStep] = useState(1)
  
  // State Aktivitas 1
  const [waterRising, setWaterRising] = useState(false)
  const [waterFinished, setWaterFinished] = useState(false)
  
  // State Aktivitas 2
  const [foundHazards, setFoundHazards] = useState<string[]>([])

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

  // Narasi otomatis
  useEffect(() => {
    if (step === 1) {
      speak("Mari perhatikan jalanan di Kenjeran. Sentuh tombol untuk melihat apa yang terjadi saat banjir rob datang.")
    } else if (step === 2) {
      speak("Saat banjir, ada bahaya yang tersembunyi. Sentuh gambar selokan terbuka dan kabel listrik untuk menghindarinya.")
    } else if (step === 3) {
      speak("Sekarang, mari pilih jalan pulang. Pilih jalur yang kering dan lebih tinggi, jangan pilih yang tergenang air.")
    }
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Air Naik Perlahan) ---
  const handleRiseWater = () => {
    setWaterRising(true)
    speak("Air laut perlahan naik ke jalanan. Ini namanya banjir rob.")
    
    // Timer menyesuaikan durasi animasi CSS (3 detik)
    setTimeout(() => {
      setWaterFinished(true)
      speak("Jalanan sudah tergenang. Kita harus berhati-hati.")
    }, 3500)
  }

  // --- LOGIKA AKTIVITAS 2 (Identifikasi Bahaya) ---
  const handleHazard = (type: string) => {
    if (!foundHazards.includes(type)) {
      const newHazards = [...foundHazards, type]
      setFoundHazards(newHazards)
      
      if (type === 'selokan') speak("Benar! Hati-hati dengan selokan yang terbuka, kita bisa terperosok.")
      if (type === 'kabel') speak("Benar! Jauhi kabel listrik yang menjuntai, sangat berbahaya jika terkena air.")

      if (newHazards.length === 2) {
        setTimeout(() => speak("Hebat! Kamu sudah mengenali semua bahaya. Kita harus menjauhinya ya."), 2500)
      }
    }
  }

  // --- LOGIKA AKTIVITAS 3 (Pilih Jalur) ---
  const handleChoosePath = (choice: string) => {
    setPathChosen(choice)
    if (choice === 'kering') {
      speak("Pintar sekali! Jalur yang kering dan tinggi lebih aman untuk dilewati.")
    } else {
      speak("Ups! Jangan lewat situ, airnya dalam. Ayo pilih jalan yang tidak ada airnya.")
      setTimeout(() => setPathChosen(null), 3500)
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f8ff] text-[#173b63] font-sans pb-24">
      
      {/* HEADER Navigasi (Tema Biru Air) */}
      <header className="bg-[#3b91ca] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage3')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 2: Banjir Rob</p>
          <h1 className="text-xl font-black">Jalur Aman</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: TANDA BANJIR ROB
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-700">
            <div className="bg-white border-4 border-[#3b91ca] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[450px]">
              
              <button 
                onClick={() => speak("Sentuh tombol air laut naik untuk melihat proses banjir rob.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#173b63] mb-2">Mengenal Banjir Rob</h2>
              <p className="text-lg font-bold text-gray-600 mb-6">Air laut bisa naik ke jalanan darat</p>

              {/* SIMULASI JALANAN DAN AIR NAIK */}
              <div className="relative w-full max-w-sm mx-auto h-64 bg-gray-200 border-4 border-gray-400 rounded-2xl overflow-hidden shadow-inner mb-8 flex flex-col justify-end">
                
                {/* Awan/Langit (Visual statis atas) */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-50"></div>
                
                {/* Jalanan Aspal */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-500 flex items-center justify-center">
                  <div className="w-full border-t-4 border-dashed border-white opacity-50"></div>
                </div>

                {/* Genangan Air (Animasi tinggi) */}
                <div 
                  className="absolute bottom-0 left-0 w-full bg-blue-500/80 backdrop-blur-sm transition-all duration-[3000ms] ease-in-out border-t-4 border-blue-400 flex items-start justify-center pt-2"
                  style={{ height: waterRising ? '60%' : '0%' }}
                >
                  {waterRising && <Waves size={40} className="text-white opacity-60 animate-pulse" />}
                </div>
              </div>

              {/* KONTROL */}
              <div className="mt-4 flex justify-center">
                {!waterRising ? (
                  <button 
                    onClick={handleRiseWater}
                    className="bg-[#3b91ca] text-white text-xl font-black py-4 px-10 rounded-full shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    Mulai Air Naik
                  </button>
                ) : !waterFinished ? (
                  <div className="text-blue-500 font-black text-xl animate-pulse py-4">Air sedang naik perlahan...</div>
                ) : (
                  <button 
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-4 px-10 rounded-full shadow-md animate-bounce"
                  >
                    Lanjut Cari Bahaya <ArrowRight />
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: IDENTIFIKASI BAHAYA
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <button 
                onClick={() => speak("Sentuh gambar selokan terbuka dan kabel listrik yang putus.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-2">Bahaya Saat Banjir</h2>
              <p className="text-lg font-bold text-gray-600 mb-6">Cari dan sentuh 2 titik bahaya di bawah ini</p>

              {/* AREA PENCARIAN (Kontras Tinggi) */}
              <div className="relative w-full max-w-md mx-auto h-72 bg-blue-100 border-4 border-blue-300 rounded-3xl overflow-hidden shadow-inner mb-8">
                
                {/* Air Genangan Dasar */}
                <div className="absolute inset-0 bg-blue-200/50"></div>

                {/* Bahaya 1: Kabel Listrik Menjuntai (Kiri Atas) */}
                <button 
                  onClick={() => handleHazard('kabel')}
                  disabled={foundHazards.includes('kabel')}
                  className="absolute top-6 left-6 flex flex-col items-center group transition-transform active:scale-95"
                >
                  <div className={`p-4 rounded-full border-4 transition-all duration-300 ${foundHazards.includes('kabel') ? 'bg-orange-100 border-orange-500' : 'bg-white border-gray-400 shadow-md group-hover:border-orange-400'}`}>
                    {foundHazards.includes('kabel') ? (
                      <AlertTriangle size={48} className="text-orange-600 animate-pulse" />
                    ) : (
                      <Zap size={48} className="text-yellow-500" />
                    )}
                  </div>
                  <span className={`mt-2 font-black px-2 py-1 rounded bg-white/80 ${foundHazards.includes('kabel') ? 'text-orange-600' : 'text-gray-600'}`}>
                    Kabel Listrik
                  </span>
                </button>

                {/* Bahaya 2: Selokan Terbuka (Kanan Bawah) */}
                <button 
                  onClick={() => handleHazard('selokan')}
                  disabled={foundHazards.includes('selokan')}
                  className="absolute bottom-6 right-6 flex flex-col items-center group transition-transform active:scale-95"
                >
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${foundHazards.includes('selokan') ? 'bg-orange-100 border-orange-500' : 'bg-gray-800 border-gray-600 shadow-lg group-hover:border-orange-400'}`}>
                    {foundHazards.includes('selokan') ? (
                      <AlertTriangle size={40} className="text-orange-600 animate-pulse" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className={`mt-2 font-black px-2 py-1 rounded bg-white/80 ${foundHazards.includes('selokan') ? 'text-orange-600' : 'text-gray-800'}`}>
                    Selokan Terbuka
                  </span>
                </button>
              </div>

              {/* FEEDBACK STATUS */}
              <div className="h-12 flex justify-center items-center">
                {foundHazards.length === 2 && (
                  <div className="flex items-center gap-2 text-green-600 font-black text-xl bg-green-50 px-6 py-2 rounded-full border-2 border-green-200 animate-in zoom-in">
                    <CheckCircle2 size={28} /> Semua Bahaya Ditemukan!
                  </div>
                )}
              </div>
            </div>

            {/* Tombol Lanjut (Muncul jika 2 bahaya ditemukan) */}
            {foundHazards.length === 2 && (
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-4 px-10 rounded-full shadow-lg animate-bounce"
              >
                Lanjut Pilih Jalur <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 3: MEMILIH JALUR AMAN
        ========================================= */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#7db348] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <button 
                onClick={() => speak("Ada dua jalan menuju rumah. Pilih jalan yang kering dan tidak tergenang air.")}
                className="mx-auto mb-4 bg-green-100 text-green-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#5ea138] mb-2">Pilih Jalur Pulang</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Mana jalan yang paling aman untuk dilewati?</p>

              <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                
                {/* JALUR SALAH (Tergenang) */}
                <button 
                  onClick={() => handleChoosePath('basah')}
                  className={`relative w-full max-w-xs p-6 rounded-3xl border-4 transition-all duration-300 overflow-hidden ${pathChosen === 'basah' ? 'border-red-500 scale-95' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
                >
                  <div className="absolute inset-0 bg-blue-300/50"></div> {/* Lapisan Air */}
                  <div className="relative flex flex-col items-center gap-4 z-10">
                    <Waves size={70} className="text-blue-600" />
                    <span className="font-black text-xl text-blue-900 bg-white/70 px-4 py-1 rounded-full">Jalan Tergenang</span>
                  </div>
                  {pathChosen === 'basah' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl animate-in fade-in z-20">
                      <span className="text-red-600 font-black text-2xl rotate-12 flex flex-col items-center gap-2">
                        <RotateCcw size={40} /> Jangan Lewat Sini
                      </span>
                    </div>
                  )}
                </button>

                {/* JALUR BENAR (Kering & Tinggi) */}
                <button 
                  onClick={() => handleChoosePath('kering')}
                  className={`relative w-full max-w-xs p-6 rounded-3xl border-4 transition-all duration-300 overflow-hidden ${pathChosen === 'kering' ? 'border-green-500 bg-green-100 scale-105 shadow-xl' : 'border-green-300 hover:border-green-400 bg-green-50 shadow-md'}`}
                >
                  <div className="relative flex flex-col items-center gap-4 z-10">
                    <div className="relative">
                      <ArrowUp size={60} className="text-green-600 mb-2" />
                      <Navigation size={30} className="absolute bottom-0 right-0 text-white fill-green-500" />
                    </div>
                    <span className="font-black text-xl text-green-800 bg-white/70 px-4 py-1 rounded-full">Jalan Kering & Tinggi</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Tombol Selesai */}
            {pathChosen === 'kering' && (
              <button 
                onClick={() => {
                  localStorage.setItem('nusar_stage3_progress', '3')
                  router.push('/stage3')
                }}
                className="flex items-center gap-2 bg-[#7db348] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
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