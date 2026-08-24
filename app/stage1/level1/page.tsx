'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, Fish, ShoppingBasket, CheckCircle2, RotateCcw } from 'lucide-react'

export default function Level1Page() {
  const router = useRouter()
  // step 1: Membilang 1-5, step 2: Membilang 6-15, step 3: Membandingkan
  const [step, setStep] = useState(1)
  
  // State untuk Aktivitas 1 & 2
  const [fishCount, setFishCount] = useState(0)
  
  // State untuk Aktivitas 3
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null)

  // Fungsi untuk memutar suara instruksi atau hitungan
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Hapus antrean suara sebelumnya
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = 0.85 // Diperlambat agar ramah untuk anak tunagrahita
      window.speechSynthesis.speak(utterance)
    }
  }

  // Instruksi otomatis saat pindah halaman/step
  useEffect(() => {
    if (step === 1) speak("Mari berhitung ikan di atas perahu. Sentuh tombol untuk memunculkan ikan.")
    if (step === 2) speak("Wah, tangkapannya banyak! Mari hitung ikan di dalam jaring. Sentuh tombol tambah lima.")
    if (step === 3) speak("Keranjang mana yang lebih banyak ikannya? Merah atau biru?")
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Membilang 1-5) ---
  const handleAddFishStep1 = () => {
    if (fishCount < 5) {
      const newCount = fishCount + 1
      setFishCount(newCount)
      speak(newCount.toString())
    }
  }

  // --- LOGIKA AKTIVITAS 2 (Membilang 6-15 Kelompok 5) ---
  const handleAddFishStep2 = () => {
    if (fishCount < 15) {
      const newCount = fishCount + 5
      setFishCount(newCount)
      speak(newCount.toString())
    }
  }

  // --- LOGIKA AKTIVITAS 3 (Membandingkan Jumlah) ---
  const handleChooseBasket = (isCorrect: boolean) => {
    setShowFeedback(isCorrect)
    if (isCorrect) {
      speak("Pintar sekali! Keranjang biru lebih banyak.")
    } else {
      speak("Coba lagi, cari yang ikannya lebih penuh ya.")
      setTimeout(() => setShowFeedback(null), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-[#f0faf7] text-[#18333a] font-sans pb-24">
      {/* HEADER Navigasi */}
      <header className="bg-[#18a7a2] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage1')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 1: Kampung Nelayan Kenjeran</p>
          <h1 className="text-xl font-black">Bilangan</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: MEMBILANG 1-5
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="bg-white border-4 border-[#18a7a2] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Sentuh tombol hijau untuk memunculkan ikan satu per satu di atas perahu.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Hitung Ikan di Perahu</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Tekan tombol untuk memunculkan ikan (1-5)</p>

              {/* Visualisasi Perahu & Ikan */}
              <div className="relative w-full max-w-md mx-auto h-48 bg-blue-50 rounded-2xl border-b-8 border-[#123d75] flex items-end justify-center pb-4 gap-2 px-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`transition-all duration-500 transform ${i < fishCount ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10'}`}>
                    <Fish size={50} className="text-blue-500 fill-blue-200" />
                  </div>
                ))}
                {/* Tulisan background perahu */}
                <span className="absolute bottom-1 text-[#123d75] font-black tracking-widest opacity-30 text-2xl">KENJERAN</span>
              </div>

              {/* Kontrol */}
              <div className="mt-8">
                <button 
                  onClick={handleAddFishStep1}
                  disabled={fishCount === 5}
                  className="bg-[#18a7a2] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg disabled:opacity-50 active:scale-95 transition"
                >
                  {fishCount < 5 ? `Munculkan Ikan (${fishCount}/5)` : 'Bagus!'}
                </button>
              </div>
            </div>

            {fishCount === 5 && (
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce"
              >
                Lanjut ke Jaring <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: MEMBILANG 6-15 (KELOMPOK)
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#7db348] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Hitung ikan di dalam jaring. Tambah kelompok isi lima ikan.")}
                className="mx-auto mb-4 bg-green-100 text-green-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Hitung Ikan di Jaring</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Mari berhitung dalam kelompok 5 (6-15)</p>

              {/* Visualisasi Jaring */}
              <div className="relative w-full max-w-lg mx-auto min-h-[250px] bg-[radial-gradient(#7db348_2px,transparent_2px)] [background-size:16px_16px] bg-green-50 rounded-3xl border-4 border-[#7db348] p-4 flex flex-wrap justify-center content-start gap-4">
                
                {/* Render Kelompok Ikan */}
                {[...Array(Math.floor(fishCount / 5))].map((_, groupIndex) => (
                  <div key={groupIndex} className="bg-white/80 p-2 rounded-xl border-2 border-green-300 flex gap-1 animate-in zoom-in duration-500">
                    {[...Array(5)].map((_, i) => (
                      <Fish key={i} size={35} className="text-green-600 fill-green-200" />
                    ))}
                  </div>
                ))}
                
                {/* Total Counter besar di tengah jika sudah selesai */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[120px] font-black text-green-700 opacity-20">{fishCount}</span>
                </div>
              </div>

              {/* Kontrol */}
              <div className="mt-8 flex justify-center gap-4">
                <button 
                  onClick={handleAddFishStep2}
                  disabled={fishCount === 15}
                  className="bg-[#7db348] text-white text-xl font-black py-4 px-8 rounded-full shadow-lg disabled:opacity-50 active:scale-95 transition"
                >
                  + Tambah 5 Ikan
                </button>
              </div>
            </div>

            {fishCount === 15 && (
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce"
              >
                Lanjut ke Pasar <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 3: MEMBANDINGKAN JUMLAH
        ========================================= */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#f2a329] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Keranjang mana yang lebih banyak ikannya? Sentuh keranjang yang ikannya paling banyak.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Keranjang Mana yang Lebih Banyak?</h2>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-12 mb-8">
                
                {/* Keranjang Merah (Sedikit) */}
                <button 
                  onClick={() => handleChooseBasket(false)}
                  className="flex flex-col items-center gap-4 active:scale-95 transition"
                >
                  <div className="relative">
                    <ShoppingBasket size={120} className="text-red-500" />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                      <Fish size={24} className="text-white fill-red-300 -rotate-45" />
                      <Fish size={24} className="text-white fill-red-300 rotate-12" />
                    </div>
                  </div>
                  <span className="bg-red-500 text-white font-black text-xl py-2 px-8 rounded-full">Merah</span>
                </button>

                {/* Keranjang Biru (Banyak - Jawaban Benar) */}
                <button 
                  onClick={() => handleChooseBasket(true)}
                  className="flex flex-col items-center gap-4 active:scale-95 transition"
                >
                  <div className="relative">
                    <ShoppingBasket size={120} className="text-blue-500" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-wrap justify-center w-20 gap-1">
                      {[...Array(6)].map((_, i) => (
                        <Fish key={i} size={24} className="text-white fill-blue-300" style={{ transform: `rotate(${Math.random() * 60 - 30}deg)` }} />
                      ))}
                    </div>
                  </div>
                  <span className="bg-blue-500 text-white font-black text-xl py-2 px-8 rounded-full">Biru</span>
                </button>

              </div>

              {/* Umpan Balik (Feedback) Visual */}
              <div className="h-20 flex items-center justify-center">
                {showFeedback === true && (
                  <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 p-4 rounded-full border-2 border-green-200">
                    <CheckCircle2 size={36} /> Benar! Biru lebih banyak!
                  </div>
                )}
                {showFeedback === false && (
                  <div className="flex items-center gap-3 text-red-500 animate-in shake font-black text-xl bg-red-50 p-4 rounded-full border-2 border-red-200">
                    <RotateCcw size={28} /> Coba perhatikan lagi ya!
                  </div>
                )}
              </div>

            </div>

            {showFeedback === true && (
              <button 
                onClick={() => router.push('/stage1')}
                className="bg-[#18a7a2] text-white text-xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
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