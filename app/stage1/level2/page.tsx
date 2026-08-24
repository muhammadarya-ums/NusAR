'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, Fish, ShoppingBasket, CheckCircle2, RotateCcw, User, PlayCircle } from 'lucide-react'

export default function Level2Page() {
  const router = useRouter()
  // step 1: Penjumlahan, step 2: Pengurangan, step 3: Soal Cerita
  const [step, setStep] = useState(1)
  
  // State animasi
  // 0: Awal, 1: Proses animasi (2-3 detik), 2: Selesai (Simbol mat muncul)
  const [mergeState, setMergeState] = useState(0) 
  const [sellState, setSellState] = useState(0)
  const [storyState, setStoryState] = useState(0) 
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null)

  // Fungsi putar suara
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = 0.85 
      window.speechSynthesis.speak(utterance)
    }
  }

  // Narasi pembuka tiap step
  useEffect(() => {
    if (step === 1) speak("Mari belajar menggabungkan ikan. Sentuh tombol gabung.")
    if (step === 2) speak("Ada pembeli datang. Mari jual ikan kita. Sentuh tombol jual.")
    if (step === 3) speak("Mari dengarkan cerita Pak Nelayan. Sentuh tombol putar cerita.")
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Penjumlahan Konkret) ---
  const handleMerge = () => {
    setMergeState(1)
    speak("Menggabungkan ikan...")
    setTimeout(() => {
      setMergeState(2)
      speak("Tiga digabung dua, menjadi lima.")
    }, 2500) // Animasi berjalan 2.5 detik
  }

  const resetMerge = () => {
    setMergeState(0)
    speak("Mari ulangi menggabungkan ikan.")
  }

  // --- LOGIKA AKTIVITAS 2 (Pengurangan Konkret) ---
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

  // --- LOGIKA AKTIVITAS 3 (Soal Cerita) ---
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
      {/* HEADER Navigasi */}
      <header className="bg-[#18a7a2] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage1')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 2: Pasar Ikan Kenjeran</p>
          <h1 className="text-xl font-black">Operasi Hitung</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: PENJUMLAHAN KONKRET (3 + 2 = 5)
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="bg-white border-4 border-[#123d75] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak(mergeState === 0 ? "Ada tiga ikan di keranjang merah, dan dua ikan di keranjang biru. Sentuh Gabungkan!" : "Tiga ditambah dua, sama dengan lima.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Menggabungkan Ikan</h2>
              
              {/* AREA ANIMASI */}
              <div className="relative h-64 flex justify-center items-center overflow-hidden bg-blue-50 rounded-2xl border-2 border-blue-100 mb-8">
                
                {/* STATE 0 & 1: DUA KERANJANG TERPISAH LALU MENDEKAT */}
                {mergeState < 2 && (
                  <div className="flex w-full justify-center gap-12">
                    <div className={`flex flex-col items-center transition-transform duration-[2000ms] ${mergeState === 1 ? 'translate-x-16 opacity-0' : 'translate-x-0'}`}>
                      <div className="relative">
                        <ShoppingBasket size={100} className="text-red-500" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1">
                          <Fish size={24} className="text-white fill-red-300" /><Fish size={24} className="text-white fill-red-300" /><Fish size={24} className="text-white fill-red-300" />
                        </div>
                      </div>
                      <span className="text-4xl font-black text-red-500 mt-2">3</span>
                    </div>

                    <div className={`flex flex-col items-center transition-transform duration-[2000ms] ${mergeState === 1 ? '-translate-x-16 opacity-0' : 'translate-x-0'}`}>
                      <div className="relative">
                        <ShoppingBasket size={100} className="text-blue-500" />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                          <Fish size={24} className="text-white fill-blue-300" /><Fish size={24} className="text-white fill-blue-300" />
                        </div>
                      </div>
                      <span className="text-4xl font-black text-blue-500 mt-2">2</span>
                    </div>
                  </div>
                )}

                {/* STATE 2: SATU KERANJANG BESAR (HASIL) + SIMBOL MATEMATIKA */}
                {mergeState === 2 && (
                  <div className="flex items-center gap-6 animate-in zoom-in duration-500">
                    <span className="text-6xl font-black text-red-500">3</span>
                    <span className="text-6xl font-black text-gray-800">+</span>
                    <span className="text-6xl font-black text-blue-500">2</span>
                    <span className="text-6xl font-black text-gray-800">=</span>
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <ShoppingBasket size={120} className="text-green-600" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center w-24 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Fish key={i} size={28} className="text-white fill-green-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-7xl font-black text-green-600 mt-2">5</span>
                    </div>
                  </div>
                )}
              </div>

              {/* KONTROL */}
              <div>
                {mergeState === 0 && (
                  <button onClick={handleMerge} className="bg-[#123d75] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg active:scale-95 transition">
                    Gabungkan!
                  </button>
                )}
                {mergeState === 1 && (
                  <div className="text-xl font-bold text-gray-500 animate-pulse">Sedang menggabung...</div>
                )}
                {mergeState === 2 && (
                  <button onClick={resetMerge} className="flex items-center gap-2 mx-auto bg-gray-200 text-gray-700 text-lg font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition">
                    <RotateCcw /> Putar Ulang
                  </button>
                )}
              </div>
            </div>

            {mergeState === 2 && (
              <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce">
                Lanjut ke Pengurangan <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: PENGURANGAN KONKRET (6 - 2 = 4)
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak(sellState === 0 ? "Kita punya enam ikan. Mari jual dua ikan ke pembeli." : "Enam dikurangi dua, sisa empat.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-2">Menjual Ikan</h2>
              
              <div className="relative h-64 flex justify-between items-end overflow-hidden bg-orange-50 rounded-2xl border-2 border-orange-100 mb-8 px-8 pb-4">
                
                {/* KERANJANG UTAMA (6 Ikan Awal) */}
                <div className="flex flex-col items-center z-10">
                  <div className="relative">
                    <ShoppingBasket size={120} className="text-orange-500" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center w-24 gap-1">
                      {/* 4 Ikan yang menetap */}
                      {[...Array(4)].map((_, i) => (
                        <Fish key={i} size={28} className="text-white fill-orange-300" />
                      ))}
                      {/* 2 Ikan yang akan berpindah jika dijual */}
                      <div className={`absolute top-0 transition-all duration-[2000ms] z-20 ${sellState > 0 ? 'translate-x-[200px] -translate-y-10 opacity-0' : 'translate-x-0 opacity-100'} flex gap-1`}>
                        <Fish size={28} className="text-white fill-orange-300" />
                        <Fish size={28} className="text-white fill-orange-300" />
                      </div>
                    </div>
                  </div>
                  {/* Teks jumlah ikan di keranjang */}
                  {sellState === 0 && <span className="text-5xl font-black text-orange-500 mt-2">6</span>}
                  {sellState === 2 && <span className="text-5xl font-black text-orange-500 mt-2">4</span>}
                </div>

                {/* PEMBELI */}
                <div className="flex flex-col items-center">
                   <div className="relative mb-2">
                     <User size={100} className="text-gray-400" />
                     {sellState === 2 && (
                        <div className="absolute top-10 -left-12 flex gap-1 animate-in zoom-in">
                          <Fish size={24} className="text-white fill-gray-400" />
                          <Fish size={24} className="text-white fill-gray-400" />
                        </div>
                     )}
                   </div>
                   <span className="text-2xl font-bold text-gray-500">Pembeli</span>
                </div>

                {/* SIMBOL MATEMATIKA MUNCUL DI TENGAH HANYA SAAT SELESAI */}
                {sellState === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in">
                    <div className="bg-white/90 px-6 py-2 rounded-full border-4 border-orange-200 shadow-xl flex gap-4 items-center">
                      <span className="text-6xl font-black text-orange-500">6</span>
                      <span className="text-6xl font-black text-gray-800">-</span>
                      <span className="text-6xl font-black text-gray-500">2</span>
                      <span className="text-6xl font-black text-gray-800">=</span>
                      <span className="text-7xl font-black text-orange-500">4</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {sellState === 0 && (
                  <button onClick={handleSell} className="bg-[#e98608] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg active:scale-95 transition">
                    Jual 2 Ikan!
                  </button>
                )}
                {sellState === 1 && (
                  <div className="text-xl font-bold text-gray-500 animate-pulse">Sedang menjual ikan...</div>
                )}
                {sellState === 2 && (
                  <button onClick={resetSell} className="flex items-center gap-2 mx-auto bg-gray-200 text-gray-700 text-lg font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition">
                    <RotateCcw /> Putar Ulang
                  </button>
                )}
              </div>
            </div>

            {sellState === 2 && (
              <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce">
                Lanjut ke Soal Cerita <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 3: SOAL CERITA BERGAMBAR
        ========================================= */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#18a7a2] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <h2 className="text-2xl md:text-3xl font-black text-[#18a7a2] mb-6">Cerita Pak Nelayan</h2>
              
              {/* AREA BERCERITA */}
              <div className="relative h-64 flex justify-center items-center bg-teal-50 rounded-2xl border-2 border-teal-100 mb-8 overflow-hidden px-4">
                
                {storyState === 0 && (
                   <button onClick={handlePlayStory} className="flex flex-col items-center gap-2 text-teal-600 hover:scale-105 transition">
                      <PlayCircle size={80} />
                      <span className="text-2xl font-black">Putar Cerita</span>
                   </button>
                )}

                {/* ADEGAN 1: PUNYA 8 IKAN */}
                {storyState === 1 && (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <span className="text-2xl font-bold text-gray-700 mb-4">Pak Nelayan punya 8 ikan.</span>
                    <div className="flex gap-2">
                      {[...Array(8)].map((_, i) => <Fish key={i} size={40} className="text-white fill-teal-400" />)}
                    </div>
                  </div>
                )}

                {/* ADEGAN 2: TERJUAL 3 IKAN */}
                {storyState === 2 && (
                  <div className="flex flex-col items-center animate-in fade-in duration-500">
                    <span className="text-2xl font-bold text-gray-700 mb-4">Terjual 3 ikan.</span>
                    <div className="flex gap-2 relative">
                      {[...Array(5)].map((_, i) => <Fish key={i} size={40} className="text-white fill-teal-400" />)}
                      {/* 3 ikan memudar/pergi */}
                      {[...Array(3)].map((_, i) => <Fish key={`sold-${i}`} size={40} className="text-white fill-teal-400 opacity-20 -translate-y-8 transition-all duration-1000" />)}
                    </div>
                  </div>
                )}

                {/* ADEGAN 3: PERTANYAAN */}
                {storyState === 3 && (
                  <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <span className="text-3xl font-black text-[#123d75]">Berapa sisa ikannya?</span>
                    <div className="text-8xl font-black text-gray-300 mt-2">?</div>
                  </div>
                )}
              </div>

              {/* KONTROL JAWABAN (MUNCUL SETELAH CERITA SELESAI) */}
              {storyState === 3 && showFeedback !== true && (
                <div className="flex justify-center gap-4 md:gap-8 animate-in slide-in-from-bottom">
                  {[4, 5, 6].map((num) => (
                    <button 
                      key={num}
                      onClick={() => handleAnswerStory(num)}
                      className="bg-white border-4 border-[#18a7a2] text-[#18a7a2] text-5xl font-black w-24 h-24 rounded-2xl hover:bg-[#18a7a2] hover:text-white active:scale-95 transition"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}

              {/* FEEDBACK BENAR/SALAH */}
              <div className="mt-6 flex justify-center">
                {showFeedback === true && (
                  <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 px-8 py-4 rounded-full border-2 border-green-200">
                    <CheckCircle2 size={36} /> Hore! Sisa 5 ikan.
                  </div>
                )}
                {showFeedback === false && (
                  <div className="flex items-center gap-3 text-red-500 animate-in shake font-black text-xl bg-red-50 px-6 py-3 rounded-full border-2 border-red-200">
                    <RotateCcw size={28} /> Ups, coba hitung lagi ya.
                  </div>
                )}
              </div>
            </div>

            {/* TOMBOL SELESAI */}
            {showFeedback === true && (
              <button 
                onClick={() => router.push('/stage1')}
                className="bg-[#18a7a2] text-white text-xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
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