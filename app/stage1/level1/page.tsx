'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'

export default function Level1Page() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [fishCount, setFishCount] = useState(0)
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

  useEffect(() => {
    if (step === 1) speak("Mari berhitung ikan di atas perahu. Sentuh tombol untuk memunculkan ikan.")
    if (step === 2) speak("Wah, tangkapannya banyak! Mari hitung ikan di dalam jaring. Sentuh tombol tambah lima.")
    if (step === 3) speak("Keranjang mana yang lebih banyak ikannya? Merah atau biru?")
  }, [step])

  const handleAddFishStep1 = () => {
    if (fishCount < 5) {
      const newCount = fishCount + 1
      setFishCount(newCount)
      speak(newCount.toString())
    }
  }

  const handleAddFishStep2 = () => {
    if (fishCount < 15) {
      const newCount = fishCount + 5
      setFishCount(newCount)
      speak(newCount.toString())
    }
  }

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
      {/* HEADER Navigasi - Aksesibilitas Ditingkatkan */}
      <header className="bg-[#18a7a2] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage1')}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 border-2 border-transparent hover:bg-white/30 hover:border-white rounded-2xl transition-all focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 shadow-sm"
          aria-label="Kembali ke Menu Utama Stage 1"
          title="Kembali ke Menu Utama"
        >
          <ArrowLeft size={28} aria-hidden="true" />
          <span className="font-bold text-base md:text-lg">Kembali</span>
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 1: Kampung Nelayan Kenjeran</p>
          <h1 className="text-xl font-black">Bilangan</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        {/* AKTIVITAS 1 */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="bg-white border-4 border-[#18a7a2] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Sentuh tombol hijau untuk memunculkan ikan satu per satu di atas perahu.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full hover:bg-blue-200 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Hitung Ikan di Perahu</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Tekan tombol untuk memunculkan ikan (1-5)</p>

              <div className="relative w-full max-w-md mx-auto h-48 bg-blue-50 rounded-2xl border-b-8 border-[#123d75] flex items-end justify-center pb-4 gap-2 px-4" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`transition-all duration-500 transform ${i < fishCount ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10'}`}>
                    <Image src="/images/ikan.png" alt="" width={55} height={55} className="object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button 
                  onClick={handleAddFishStep1}
                  disabled={fishCount === 5}
                  className="bg-[#18a7a2] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg disabled:opacity-50 active:scale-95 transition focus:outline-none focus:ring-4 focus:ring-[#18a7a2]/50"
                  aria-label={fishCount < 5 ? `Munculkan Ikan, saat ini ada ${fishCount}` : 'Perahu sudah penuh'}
                >
                  {fishCount < 5 ? `Munculkan Ikan (${fishCount}/5)` : 'Bagus!'}
                </button>
              </div>
            </div>

            {fishCount === 5 && (
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce focus:outline-none focus:ring-4 focus:ring-[#f2bd3d]/50"
              >
                Lanjut ke Jaring <ArrowRight aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* AKTIVITAS 2 */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#7db348] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Hitung ikan di dalam jaring. Tambah kelompok isi lima ikan.")}
                className="mx-auto mb-4 bg-green-100 text-green-700 p-3 rounded-full hover:bg-green-200 transition focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Hitung Ikan di Jaring</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Mari berhitung dalam kelompok 5 (6-15)</p>

              <div className="relative w-full max-w-lg mx-auto min-h-[250px] bg-[radial-gradient(#7db348_2px,transparent_2px)] [background-size:16px_16px] bg-green-50 rounded-3xl border-4 border-[#7db348] p-4 flex flex-wrap justify-center content-start gap-4" aria-hidden="true">
                {[...Array(Math.floor(fishCount / 5))].map((_, groupIndex) => (
                  <div key={groupIndex} className="bg-white/80 p-2 rounded-xl border-2 border-green-300 flex gap-1 animate-in zoom-in duration-500">
                    {[...Array(5)].map((_, i) => (
                      <Image key={i} src="/images/ikan.png" alt="" width={40} height={40} className="object-contain drop-shadow-sm" />
                    ))}
                  </div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[120px] font-black text-green-700 opacity-20">{fishCount}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button 
                  onClick={handleAddFishStep2}
                  disabled={fishCount === 15}
                  className="bg-[#7db348] text-white text-xl font-black py-4 px-8 rounded-full shadow-lg disabled:opacity-50 active:scale-95 transition focus:outline-none focus:ring-4 focus:ring-[#7db348]/50"
                  aria-label={fishCount < 15 ? `Tambah 5 ikan, saat ini ada ${fishCount}` : 'Jaring sudah penuh'}
                >
                  + Tambah 5 Ikan
                </button>
              </div>
            </div>

            {fishCount === 15 && (
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce focus:outline-none focus:ring-4 focus:ring-[#f2bd3d]/50"
              >
                Lanjut ke Pasar <ArrowRight aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* AKTIVITAS 3 */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#f2a329] rounded-3xl p-6 w-full text-center shadow-lg mb-8">
              <button 
                onClick={() => speak("Keranjang mana yang lebih banyak ikannya? Sentuh keranjang yang ikannya paling banyak.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full hover:bg-orange-200 transition focus:outline-none focus:ring-4 focus:ring-orange-300"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Keranjang Mana yang Lebih Banyak?</h2>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-12 mb-8">
                <button 
                  onClick={() => handleChooseBasket(false)}
                  className="flex flex-col items-center gap-4 active:scale-95 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 rounded-3xl p-2"
                  aria-label="Pilih keranjang merah yang berisi sedikit ikan"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-red-300 shadow-lg" aria-hidden="true">
                    <Image src="/images/keranjangmerah.jpg" alt="Keranjang Sedikit" fill className="object-cover" />
                  </div>
                  <span className="bg-red-500 text-white font-black text-xl py-2 px-8 rounded-full shadow-md pointer-events-none">Merah</span>
                </button>

                <button 
                  onClick={() => handleChooseBasket(true)}
                  className="flex flex-col items-center gap-4 active:scale-95 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-3xl p-2"
                  aria-label="Pilih keranjang biru yang berisi banyak ikan"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-blue-400 shadow-lg" aria-hidden="true">
                    <Image src="/images/keranjangbiru.jpg" alt="Keranjang Banyak" fill className="object-cover" />
                  </div>
                  <span className="bg-blue-500 text-white font-black text-xl py-2 px-8 rounded-full shadow-md pointer-events-none">Biru</span>
                </button>
              </div>

              {/* Umpan Balik (Aria-live Polite agar dibaca otomatis) */}
              <div className="h-20 flex items-center justify-center" aria-live="polite" aria-atomic="true">
                {showFeedback === true && (
                  <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 p-4 rounded-full border-2 border-green-200">
                    <CheckCircle2 size={36} aria-hidden="true" /> Benar! Biru lebih banyak!
                  </div>
                )}
                {showFeedback === false && (
                  <div className="flex items-center gap-3 text-red-500 animate-in shake font-black text-xl bg-red-50 p-4 rounded-full border-2 border-red-200">
                    <RotateCcw size={28} aria-hidden="true" /> Coba perhatikan lagi ya!
                  </div>
                )}
              </div>
            </div>

            {showFeedback === true && (
              <button 
                onClick={() => router.push('/stage1')}
                className="bg-[#18a7a2] text-white text-xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce focus:outline-none focus:ring-4 focus:ring-[#18a7a2]/50"
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