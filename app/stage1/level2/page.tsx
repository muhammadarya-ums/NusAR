'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, User, PlayCircle } from 'lucide-react'

export default function Level2Page() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [mergeState, setMergeState] = useState(0) 
  const [sellState, setSellState] = useState(0)
  const [storyState, setStoryState] = useState(0) 
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
    if (step === 1) speak("Mari belajar menggabungkan ikan. Sentuh tombol gabung.")
    if (step === 2) speak("Ada pembeli datang. Mari jual ikan kita. Sentuh tombol jual.")
    if (step === 3) speak("Mari dengarkan cerita Pak Nelayan. Sentuh tombol putar cerita.")
  }, [step])

  const handleMerge = () => {
    setMergeState(1)
    speak("Menggabungkan ikan...")
    setTimeout(() => {
      setMergeState(2)
      speak("Tiga digabung dua, menjadi lima.")
    }, 2500)
  }

  const resetMerge = () => {
    setMergeState(0)
    speak("Mari ulangi menggabungkan ikan.")
  }

  const handleSell = () => {
    setSellState(1)
    speak("Menjual dua ikan ke pembeli...")
    setTimeout(() => {
      setSellState(2)
      speak("Enam diambil dua, sisa empat.")
    }, 2500)
  }

  const resetSell = () => {
    setSellState(0)
    speak("Mari ulangi menjual ikan.")
  }

  const handlePlayStory = () => {
    setStoryState(1)
    speak("Pak Nelayan punya delapan ikan.")
    setTimeout(() => {
      setStoryState(2)
      speak("Lalu, terjual tiga ikan ke pembeli.")
      setTimeout(() => {
        setStoryState(3)
        speak("Berapa sisa ikan Pak Nelayan? Pilih angka yang benar.")
      }, 3500)
    }, 3500)
  }

  const handleAnswerStory = (answer: number) => {
    if (answer === 5) {
      setShowFeedback(true)
      speak("Pintar sekali! Delapan diambil tiga, sisa lima.")
    } else {
      setShowFeedback(false)
      speak("Coba hitung lagi sisanya ya.")
      setTimeout(() => setShowFeedback(null), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#18333a] font-sans pb-24">
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
          <p className="text-sm font-bold opacity-90">Level 2: Pasar Ikan Kenjeran</p>
          <h1 className="text-xl font-black">Operasi Hitung</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        {/* AKTIVITAS 1 */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="bg-white border-4 border-[#123d75] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak(mergeState === 0 ? "Ada tiga ikan di keranjang pertama, dan dua ikan di keranjang kedua. Sentuh Gabungkan!" : "Tiga ditambah dua, sama dengan lima.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full hover:bg-blue-200 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Menggabungkan Ikan</h2>
              
              <div className="relative h-64 flex justify-center items-center overflow-hidden bg-blue-50 rounded-2xl border-2 border-blue-100 mb-8 py-4" aria-hidden="true">
                {mergeState < 2 && (
                  <div className="flex w-full justify-center gap-4 md:gap-12">
                    <div className={`flex flex-col items-center transition-transform duration-[2000ms] ${mergeState === 1 ? 'translate-x-16 opacity-0 scale-75' : 'translate-x-0 scale-100'}`}>
                      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-red-300 shadow-md">
                        <Image src="/images/3ikan.jpg" alt="" fill className="object-cover" />
                      </div>
                      <span className="text-4xl font-black text-red-500 mt-2">3</span>
                    </div>

                    <div className={`flex flex-col items-center transition-transform duration-[2000ms] ${mergeState === 1 ? '-translate-x-16 opacity-0 scale-75' : 'translate-x-0 scale-100'}`}>
                      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-blue-400 shadow-md">
                        <Image src="/images/keranjangmerah_2.jpg" alt="" fill className="object-cover" />
                      </div>
                      <span className="text-4xl font-black text-blue-500 mt-2">2</span>
                    </div>
                  </div>
                )}

                {mergeState === 2 && (
                  <div className="flex items-center gap-4 md:gap-8 animate-in zoom-in duration-500">
                    <span className="text-4xl md:text-6xl font-black text-red-500">3</span>
                    <span className="text-4xl md:text-6xl font-black text-gray-800">+</span>
                    <span className="text-4xl md:text-6xl font-black text-blue-500">2</span>
                    <span className="text-4xl md:text-6xl font-black text-gray-800">=</span>
                    <div className="flex flex-col items-center">
                      <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-green-400 shadow-xl">
                        <Image src="/images/keranjang5.png" alt="" fill className="object-cover" />
                      </div>
                      <span className="text-5xl md:text-7xl font-black text-green-600 mt-2">5</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {mergeState === 0 && (
                  <button onClick={handleMerge} className="bg-[#123d75] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg active:scale-95 transition hover:bg-[#1b55a0] focus:outline-none focus:ring-4 focus:ring-[#123d75]/50">
                    Gabungkan!
                  </button>
                )}
                {mergeState === 1 && (
                  <div className="text-xl font-bold text-gray-500 animate-pulse" aria-live="polite">Sedang menggabung...</div>
                )}
                {mergeState === 2 && (
                  <button onClick={resetMerge} className="flex items-center gap-2 mx-auto bg-gray-200 text-gray-700 text-lg font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition focus:outline-none focus:ring-4 focus:ring-gray-400">
                    <RotateCcw aria-hidden="true" /> Putar Ulang
                  </button>
                )}
              </div>
            </div>

            {mergeState === 2 && (
              <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-[#f2bd3d]/50">
                Lanjut ke Pengurangan <ArrowRight aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* AKTIVITAS 2 */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak(sellState === 0 ? "Kita punya enam ikan. Mari jual dua ikan ke pembeli." : "Enam dikurangi dua, sisa empat.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full hover:bg-orange-200 transition focus:outline-none focus:ring-4 focus:ring-orange-300"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-2">Menjual Ikan</h2>
              
              <div className="relative h-64 flex justify-between items-center overflow-hidden bg-orange-50 rounded-2xl border-2 border-orange-100 mb-8 px-6 md:px-16 pb-4" aria-hidden="true">
                <div className="flex flex-col items-center z-10">
                  <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden border-4 border-orange-400 shadow-md">
                    <Image src={sellState === 0 ? "/images/keranjangbiru_2.jpg" : "/images/keranjang4.png"} alt="" fill className="object-cover" />
                  </div>
                  <div className={`absolute top-1/2 left-20 md:left-32 -translate-y-1/2 transition-all duration-[2000ms] z-20 flex gap-2 ${sellState === 0 ? 'opacity-0 scale-50' : sellState === 1 ? 'translate-x-[150px] md:translate-x-[250px] -translate-y-10 opacity-100 scale-100' : 'hidden'}`}>
                    <Image src="/images/ikan_2.png" alt="" width={45} height={45} className="object-contain drop-shadow-lg" />
                    <Image src="/images/ikan_2.png" alt="" width={45} height={45} className="object-contain drop-shadow-lg" />
                  </div>
                  {sellState === 0 && <span className="text-4xl md:text-5xl font-black text-orange-500 mt-2">6</span>}
                  {sellState === 2 && <span className="text-4xl md:text-5xl font-black text-orange-500 mt-2">4</span>}
                </div>

                <div className="flex flex-col items-center">
                   <div className="relative mb-2">
                     <User size={100} className="text-gray-400" />
                     {sellState === 2 && (
                        <div className="absolute top-12 -left-10 flex flex-col gap-1 animate-in zoom-in">
                          <Image src="/images/ikan_2.png" alt="" width={40} height={40} className="object-contain drop-shadow-md" />
                          <Image src="/images/ikan_2.png" alt="" width={40} height={40} className="object-contain drop-shadow-md" />
                        </div>
                     )}
                   </div>
                   <span className="text-xl md:text-2xl font-bold text-gray-500">Pembeli</span>
                </div>

                {sellState === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in">
                    <div className="bg-white/95 px-4 md:px-8 py-2 md:py-4 rounded-full border-4 border-orange-200 shadow-2xl flex gap-2 md:gap-4 items-center">
                      <span className="text-4xl md:text-6xl font-black text-orange-500">6</span>
                      <span className="text-4xl md:text-6xl font-black text-gray-800">-</span>
                      <span className="text-4xl md:text-6xl font-black text-gray-500">2</span>
                      <span className="text-4xl md:text-6xl font-black text-gray-800">=</span>
                      <span className="text-5xl md:text-7xl font-black text-orange-500">4</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {sellState === 0 && (
                  <button onClick={handleSell} className="bg-[#e98608] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg active:scale-95 transition hover:bg-[#ff9d21] focus:outline-none focus:ring-4 focus:ring-[#e98608]/50">
                    Jual 2 Ikan!
                  </button>
                )}
                {sellState === 1 && (
                  <div className="text-xl font-bold text-gray-500 animate-pulse" aria-live="polite">Sedang menjual ikan...</div>
                )}
                {sellState === 2 && (
                  <button onClick={resetSell} className="flex items-center gap-2 mx-auto bg-gray-200 text-gray-700 text-lg font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition focus:outline-none focus:ring-4 focus:ring-gray-400">
                    <RotateCcw aria-hidden="true" /> Putar Ulang
                  </button>
                )}
              </div>
            </div>

            {sellState === 2 && (
              <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-[#f2bd3d]/50">
                Lanjut ke Soal Cerita <ArrowRight aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* AKTIVITAS 3 */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#18a7a2] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <h2 className="text-2xl md:text-3xl font-black text-[#18a7a2] mb-6">Cerita Pak Nelayan</h2>
              
              <div className="relative min-h-[250px] flex justify-center items-center bg-teal-50 rounded-2xl border-2 border-teal-100 mb-8 overflow-hidden px-4 py-8" aria-hidden="true">
                {storyState === 0 && (
                   <button onClick={handlePlayStory} className="flex flex-col items-center gap-4 text-teal-600 hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-teal-400 rounded-2xl p-4">
                      <PlayCircle size={80} className="drop-shadow-md" />
                      <span className="text-2xl font-black">Putar Cerita</span>
                   </button>
                )}
                {storyState === 1 && (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <span className="text-2xl font-bold text-gray-700 mb-6 bg-white px-6 py-2 rounded-full shadow-sm">Pak Nelayan punya 8 ikan.</span>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-md">
                      {[...Array(8)].map((_, i) => <Image key={i} src="/images/ikan_2.png" alt="" width={55} height={55} className="object-contain drop-shadow-md" />)}
                    </div>
                  </div>
                )}
                {storyState === 2 && (
                  <div className="flex flex-col items-center animate-in fade-in duration-500">
                    <span className="text-2xl font-bold text-gray-700 mb-6 bg-white px-6 py-2 rounded-full shadow-sm">Terjual 3 ikan.</span>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-md relative">
                      {[...Array(5)].map((_, i) => <Image key={i} src="/images/ikan_2.png" alt="" width={55} height={55} className="object-contain drop-shadow-md" />)}
                      {[...Array(3)].map((_, i) => <Image key={`sold-${i}`} src="/images/ikan_2.png" alt="" width={55} height={55} className="object-contain drop-shadow-md opacity-20 -translate-y-12 transition-all duration-[1500ms]" />)}
                    </div>
                  </div>
                )}
                {storyState === 3 && (
                  <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <span className="text-3xl font-black text-[#123d75]">Berapa sisa ikannya?</span>
                    <div className="text-8xl font-black text-gray-300 mt-2">?</div>
                  </div>
                )}
              </div>

              {storyState === 3 && showFeedback !== true && (
                <div className="flex justify-center gap-4 md:gap-8 animate-in slide-in-from-bottom">
                  {[4, 5, 6].map((num) => (
                    <button 
                      key={num}
                      onClick={() => handleAnswerStory(num)}
                      className="bg-white border-4 border-[#18a7a2] text-[#18a7a2] text-5xl font-black w-24 h-24 rounded-2xl hover:bg-[#18a7a2] hover:text-white active:scale-95 transition shadow-sm focus:outline-none focus:ring-4 focus:ring-[#18a7a2]/50"
                      aria-label={`Jawab ${num}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-center" aria-live="polite" aria-atomic="true">
                {showFeedback === true && (
                  <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 px-8 py-4 rounded-full border-2 border-green-200">
                    <CheckCircle2 size={36} aria-hidden="true" /> Hore! Sisa 5 ikan.
                  </div>
                )}
                {showFeedback === false && (
                  <div className="flex items-center gap-3 text-red-500 animate-in shake font-black text-xl bg-red-50 px-6 py-3 rounded-full border-2 border-red-200">
                    <RotateCcw size={28} aria-hidden="true" /> Ups, coba hitung lagi ya.
                  </div>
                )}
              </div>
            </div>

            {showFeedback === true && (
              <button 
                onClick={() => router.push('/stage1')}
                className="bg-[#18a7a2] text-white text-xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-[#18a7a2]/50"
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