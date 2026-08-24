'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, CheckCircle2, RotateCcw, Flag, Megaphone, Landmark, ArrowRight, PlayCircle } from 'lucide-react'

// Data 3 Peristiwa 10 November (Sederhana)
// Urutan benar: 1 -> 2 -> 3
const storyCards = [
  { id: 1, label: 'Bendera Dirobek', icon: Flag, color: 'text-red-600', bg: 'bg-red-100', desc: 'Pahlawan merobek warna biru pada bendera.' },
  { id: 2, label: 'Pidato Pahlawan', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Bung Tomo berpidato membakar semangat.' },
  { id: 3, label: 'Tugu Pahlawan', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Tugu dibangun untuk mengingat pahlawan.' },
]

export default function Level3Page() {
  const router = useRouter()
  // step 1: Menyusun, step 2: Mendengarkan cerita (Review)
  const [step, setStep] = useState(1)
  
  // State untuk menyimpan urutan jawaban siswa
  const [selectedOrder, setSelectedOrder] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState<boolean | null>(null)
  
  // State animasi cerita di step 2
  const [playingStory, setPlayingStory] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

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
      speak("Mari menyusun cerita Hari Pahlawan. Sentuh gambar yang terjadi lebih dulu, sampai ke yang terakhir.")
    } else if (step === 2 && !playingStory) {
      speak("Hore! Urutannya benar. Sentuh tombol putar untuk mendengar ceritanya.")
    }
  }, [step, playingStory])

  // --- LOGIKA AKTIVITAS 1 (Menyusun Kartu) ---
  const handleSelectCard = (id: number) => {
    if (selectedOrder.includes(id) || selectedOrder.length >= 3) return
    
    speak(storyCards.find(c => c.id === id)?.label || '')
    const newOrder = [...selectedOrder, id]
    setSelectedOrder(newOrder)

    // Jika sudah 3 kartu dipilih, langsung cek jawaban
    if (newOrder.length === 3) {
      const isCorrect = newOrder.join('') === '123'
      
      if (isCorrect) {
        setShowFeedback(true)
        speak("Pintar sekali! Susunan ceritamu benar.")
        setTimeout(() => {
          setShowFeedback(null)
          setStep(2) // Lanjut ke sesi mendengarkan cerita
        }, 3000)
      } else {
        setShowFeedback(false)
        speak("Urutannya belum pas. Yuk, coba susun lagi dari awal.")
        setTimeout(() => {
          setShowFeedback(null)
          setSelectedOrder([]) // Reset otomatis
        }, 3000)
      }
    }
  }

  const handleReset = () => {
    setSelectedOrder([])
    speak("Mari susun ulang.")
  }

  // --- LOGIKA AKTIVITAS 2 (Menceritakan Ulang) ---
  const handlePlayStory = () => {
    setPlayingStory(true)
    setHighlightIndex(0)
    speak("Pertama. " + storyCards[0].desc, 0.8)
    
    setTimeout(() => {
      setHighlightIndex(1)
      speak("Kedua. " + storyCards[1].desc, 0.8)
      
      setTimeout(() => {
        setHighlightIndex(2)
        speak("Ketiga. " + storyCards[2].desc, 0.8)
        
        setTimeout(() => {
          setHighlightIndex(-1)
          setPlayingStory(false)
        }, 4500)
      }, 4500)
    }, 4500)
  }

  return (
    <main className="min-h-screen bg-[#f9f5f0] text-[#18333a] font-sans pb-24">
      
      {/* HEADER Navigasi (Tema Merah Heroik) */}
      <header className="bg-[#d9484c] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage2')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 3: Hari Pahlawan</p>
          <h1 className="text-xl font-black">Mengurutkan Peristiwa</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: MENYUSUN URUTAN 1-2-3
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-700">
            <div className="bg-white border-4 border-[#d9484c] rounded-3xl p-6 w-full text-center shadow-xl mb-8">
              
              <button 
                onClick={() => speak("Sentuh gambar untuk menyusun urutan cerita dari awal sampai akhir.")}
                className="mx-auto mb-4 bg-red-100 text-red-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#d9484c] mb-2">Cerita 10 November</h2>
              <p className="text-lg font-bold text-gray-600 mb-6">Susun 3 gambar ini agar menjadi cerita yang benar</p>

              {/* SLOT JAWABAN KOSONG */}
              <div className="flex justify-center gap-4 mb-10">
                {[0, 1, 2].map((index) => {
                  const cardId = selectedOrder[index]
                  const card = storyCards.find(c => c.id === cardId)
                  
                  return (
                    <div key={`slot-${index}`} className={`w-24 h-28 md:w-32 md:h-36 rounded-2xl border-4 flex flex-col items-center justify-center transition-all duration-300 ${card ? card.bg + ' border-' + card.color.split('-')[1] + '-500 scale-100' : 'bg-gray-100 border-dashed border-gray-300 scale-95'}`}>
                      {card ? (
                        <div className="animate-in zoom-in flex flex-col items-center">
                          <card.icon size={48} className={`${card.color} mb-2`} />
                          <span className="font-black text-sm md:text-base px-1">{index + 1}</span>
                        </div>
                      ) : (
                        <span className="text-4xl text-gray-300 font-black">{index + 1}</span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* PILIHAN KARTU ACAK (Disusun manual: 2, 3, 1 agar acak) */}
              <div className="grid grid-cols-3 gap-3">
                {[storyCards[1], storyCards[2], storyCards[0]].map((card) => {
                  const isSelected = selectedOrder.includes(card.id)
                  return (
                    <button
                      key={`choice-${card.id}`}
                      onClick={() => handleSelectCard(card.id)}
                      disabled={isSelected || selectedOrder.length >= 3}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-4 transition-all duration-300 ${isSelected ? 'bg-gray-100 border-gray-200 opacity-30 scale-95' : 'bg-white border-gray-300 shadow-md hover:scale-105 active:scale-95'}`}
                    >
                      <card.icon size={48} className={`${isSelected ? 'text-gray-400' : card.color} mb-2`} />
                      <span className="font-black text-sm md:text-base leading-tight text-gray-700">{card.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* TOMBOL RESET */}
              <div className="mt-8 flex items-center justify-center h-16">
                {selectedOrder.length > 0 && showFeedback === null && (
                  <button onClick={handleReset} className="flex items-center gap-2 bg-gray-200 text-gray-700 font-black py-2 px-6 rounded-full hover:bg-gray-300 active:scale-95 transition">
                    <RotateCcw size={20} /> Ulangi
                  </button>
                )}

                {/* FEEDBACK BENAR/SALAH */}
                {showFeedback === true && (
                  <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 px-8 py-3 rounded-full border-2 border-green-200">
                    <CheckCircle2 size={36} /> Urutanmu Benar!
                  </div>
                )}
                {showFeedback === false && (
                  <div className="flex items-center gap-3 text-red-500 animate-in shake font-black text-xl bg-red-50 px-6 py-3 rounded-full border-2 border-red-200">
                    <RotateCcw size={28} /> Ups, masih kurang pas!
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: MENDENGARKAN CERITA ULANG
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#18a7a2] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <h2 className="text-2xl md:text-3xl font-black text-[#18a7a2] mb-2">Kisah Pahlawan</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Dengarkan urutan ceritanya baik-baik</p>

              {/* TAMPILAN 3 KARTU BERURUTAN */}
              <div className="flex flex-col gap-4 mb-8">
                {storyCards.map((card, index) => (
                  <div 
                    key={`story-${card.id}`} 
                    className={`flex items-center gap-4 p-4 rounded-2xl border-4 transition-all duration-500 ${highlightIndex === index ? card.bg + ' border-' + card.color.split('-')[1] + '-500 scale-105 shadow-lg' : 'bg-gray-50 border-gray-200 opacity-60'}`}
                  >
                    <div className={`p-4 rounded-xl bg-white shadow-sm ${highlightIndex === index ? 'animate-bounce' : ''}`}>
                      <card.icon size={48} className={card.color} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-xl text-gray-800">{index + 1}. {card.label}</h3>
                      <p className={`font-bold mt-1 ${highlightIndex === index ? 'text-gray-800' : 'text-gray-500'}`}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* KONTROL AUDIO CERITA */}
              <div className="mt-8">
                {!playingStory && highlightIndex === -1 && (
                  <button onClick={handlePlayStory} className="flex items-center gap-2 mx-auto bg-teal-500 text-white text-xl font-black py-4 px-10 rounded-full shadow-md hover:bg-teal-600 active:scale-95 transition animate-pulse">
                    <PlayCircle size={28} /> Putar Cerita
                  </button>
                )}
                {playingStory && (
                  <div className="text-teal-600 font-black text-xl animate-pulse">Sedang bercerita...</div>
                )}
              </div>
            </div>

            {/* Tombol Selesai Muncul Setelah Cerita Diputar Minimal 1x */}
            {highlightIndex === -1 && (
              <button 
                onClick={() => {
                  // Stage 2 resmi tamat, kita balik ke menu Daftar Isi (TOC) 
                  router.push('/toc')
                }}
                className="flex items-center gap-2 bg-[#d9484c] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
              >
                Selesai Unit 2!
              </button>
            )}
          </section>
        )}

      </div>
    </main>
  )
}