'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Flame, Cable, Droplets, Square, Backpack, Flashlight, Pill, Bell, Check } from 'lucide-react'

// Data Barang Tas Siaga
const emergencyItems = [
  { id: 'senter', label: 'Senter', icon: Flashlight, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { id: 'air', label: 'Air Minum', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 'obat', label: 'Obat', icon: Pill, color: 'text-red-600', bg: 'bg-red-100' },
  { id: 'peluit', label: 'Peluit', icon: Bell, color: 'text-purple-600', bg: 'bg-purple-100' },
]

export default function Level3Page() {
  const router = useRouter()
  // step 1: Bahaya Kebakaran, step 2: Padamkan Api, step 3: Tas Siaga
  const [step, setStep] = useState(1)
  
  // State Aktivitas 1 (Mengamankan)
  const [securedItems, setSecuredItems] = useState<string[]>([])
  
  // State Aktivitas 2 (Memadamkan Api Kecil)
  // 0: Awal, 1: Kain Dibasahi, 2: Api Ditutup (Selesai)
  const [fireStep, setFireStep] = useState(0)

  // State Aktivitas 3 (Tas Siaga)
  const [packedItems, setPackedItems] = useState<string[]>([])

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
      speak("Mari periksa dapur. Sentuh kompor yang menyala dan kabel terkelupas untuk mengamankannya.")
    } else if (step === 2) {
      speak("Ada api kecil di lantai. Mari padamkan dengan aman. Pertama, basahi kain tebal.")
    } else if (step === 3) {
      speak("Mari siapkan tas siaga bencana. Masukkan senter, air minum, obat, dan peluit ke dalam tas.")
    }
  }, [step])

  // --- LOGIKA AKTIVITAS 1 (Sumber Bahaya) ---
  const handleSecure = (item: string) => {
    if (!securedItems.includes(item)) {
      const newItems = [...securedItems, item]
      setSecuredItems(newItems)
      
      if (item === 'kompor') speak("Kompor sudah dimatikan. Aman!")
      if (item === 'kabel') speak("Kabel sudah dicabut dan diperbaiki. Aman!")

      if (newItems.length === 2) {
        setTimeout(() => speak("Hebat! Dapur sekarang sudah aman dari bahaya kebakaran."), 2000)
      }
    }
  }

  // --- LOGIKA AKTIVITAS 2 (Langkah Tunggal Padamkan Api) ---
  const handleFireAction = (actionStep: number) => {
    if (fireStep === 0 && actionStep === 1) {
      setFireStep(1)
      speak("Kain sudah basah. Sekarang, tutupkan kain ke atas api dengan hati-hati.")
    } else if (fireStep === 1 && actionStep === 2) {
      setFireStep(2)
      speak("Pintar sekali! Api kecil sudah padam karena ditutup kain basah.")
    }
  }

  // --- LOGIKA AKTIVITAS 3 (Tas Siaga) ---
  const handlePack = (id: string) => {
    if (!packedItems.includes(id)) {
      const newPacked = [...packedItems, id]
      setPackedItems(newPacked)
      
      const itemName = emergencyItems.find(i => i.id === id)?.label
      speak(`${itemName} dimasukkan ke tas.`)

      if (newPacked.length === 4) {
        setTimeout(() => speak("Luar biasa! Tas siaga bencana sudah siap. Kamu sangat hebat!"), 2000)
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#fff5f5] text-[#18333a] font-sans pb-24">
      
      {/* HEADER Navigasi (Tema Merah Preventif) */}
      <header className="bg-[#d9484c] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage3')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 3: Kebakaran & Siaga</p>
          <h1 className="text-xl font-black">Respon Preventif</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: MENGAMANKAN DAPUR
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-700">
            <div className="bg-white border-4 border-[#d9484c] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[450px]">
              
              <button 
                onClick={() => speak("Amankan kompor dan kabel terkelupas agar tidak terjadi kebakaran.")}
                className="mx-auto mb-4 bg-red-100 text-red-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#d9484c] mb-2">Cegah Kebakaran</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Sentuh 2 benda berbahaya di bawah ini untuk mematikannya</p>

              <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
                
                {/* Bahaya 1: Kompor */}
                <button 
                  onClick={() => handleSecure('kompor')}
                  disabled={securedItems.includes('kompor')}
                  className={`flex flex-col items-center justify-center p-6 w-48 h-48 rounded-3xl border-4 transition-all duration-500 ${securedItems.includes('kompor') ? 'bg-green-100 border-green-500' : 'bg-red-50 border-red-300 hover:border-red-500 active:scale-95 shadow-md'}`}
                >
                  {securedItems.includes('kompor') ? (
                    <div className="flex flex-col items-center animate-in zoom-in">
                      <CheckCircle2 size={60} className="text-green-500 mb-2" />
                      <span className="font-black text-green-700">Kompor Mati</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center animate-pulse">
                      <Flame size={70} className="text-orange-500 fill-yellow-400 mb-2" />
                      <span className="font-black text-red-600">Kompor Menyala!</span>
                    </div>
                  )}
                </button>

                {/* Bahaya 2: Kabel */}
                <button 
                  onClick={() => handleSecure('kabel')}
                  disabled={securedItems.includes('kabel')}
                  className={`flex flex-col items-center justify-center p-6 w-48 h-48 rounded-3xl border-4 transition-all duration-500 ${securedItems.includes('kabel') ? 'bg-green-100 border-green-500' : 'bg-red-50 border-red-300 hover:border-red-500 active:scale-95 shadow-md'}`}
                >
                  {securedItems.includes('kabel') ? (
                    <div className="flex flex-col items-center animate-in zoom-in">
                      <CheckCircle2 size={60} className="text-green-500 mb-2" />
                      <span className="font-black text-green-700">Kabel Aman</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Cable size={60} className="text-gray-700 mb-2 relative" />
                      <div className="absolute animate-ping w-4 h-4 bg-yellow-400 rounded-full mt-4"></div>
                      <span className="font-black text-red-600">Kabel Terkelupas!</span>
                    </div>
                  )}
                </button>

              </div>
            </div>

            {/* Tombol Lanjut */}
            {securedItems.length === 2 && (
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#d9484c] text-white text-xl font-black py-4 px-10 rounded-full shadow-lg animate-bounce"
              >
                Lanjut Praktik Padamkan Api <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: MEMADAMKAN API KECIL
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <button 
                onClick={() => speak(fireStep === 0 ? "Basahi kain tebal terlebih dahulu." : "Tutupkan kain basah ke atas api.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-2">Memadamkan Api Kecil</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Lakukan langkah ini satu per satu</p>

              {/* VISUALISASI API (Kecil dan Terkendali) */}
              <div className="relative w-full max-w-sm mx-auto h-48 bg-gray-100 border-4 border-gray-300 rounded-2xl flex items-end justify-center pb-4 mb-8">
                
                {/* Tampilan Api */}
                {fireStep < 2 && (
                  <div className="flex flex-col items-center">
                    <Flame size={60} className="text-orange-500 fill-orange-300 animate-pulse mb-2" />
                    <div className="w-16 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                )}

                {/* Tampilan Kain Menutup */}
                {fireStep === 2 && (
                  <div className="flex flex-col items-center animate-in slide-in-from-top duration-500">
                    <Square size={80} className="text-blue-600 fill-blue-400 drop-shadow-md mb-2" />
                    <div className="w-24 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* TOMBOL TINDAKAN BERTAHAP */}
              <div className="flex justify-center gap-4">
                
                {/* Tombol 1: Basahi Kain */}
                <button 
                  onClick={() => handleFireAction(1)}
                  disabled={fireStep > 0}
                  className={`flex flex-col items-center p-4 rounded-2xl border-4 transition-all w-40 ${fireStep > 0 ? 'bg-green-100 border-green-500 text-green-700' : 'bg-blue-50 border-blue-400 hover:bg-blue-100 active:scale-95 shadow-md'}`}
                >
                  <Droplets size={40} className="mb-2" />
                  <span className="font-black">1. Basahi Kain</span>
                </button>

                {/* Tombol 2: Tutup Api (Hanya aktif jika step 1 selesai) */}
                <button 
                  onClick={() => handleFireAction(2)}
                  disabled={fireStep !== 1}
                  className={`flex flex-col items-center p-4 rounded-2xl border-4 transition-all w-40 ${fireStep === 2 ? 'bg-green-100 border-green-500 text-green-700' : fireStep === 1 ? 'bg-orange-50 border-orange-400 hover:bg-orange-100 active:scale-95 shadow-md animate-pulse' : 'bg-gray-100 border-gray-300 text-gray-400 opacity-50'}`}
                >
                  <Square size={40} className="mb-2" />
                  <span className="font-black">2. Tutup Api</span>
                </button>
              </div>

              {fireStep === 2 && (
                <div className="mt-6 text-green-600 font-black text-xl animate-in zoom-in">
                  Api berhasil dipadamkan dengan aman!
                </div>
              )}
            </div>

            {/* Tombol Lanjut */}
            {fireStep === 2 && (
              <button 
                onClick={() => setStep(3)}
                className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-4 px-10 rounded-full shadow-lg animate-bounce"
              >
                Lanjut Siapkan Tas <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 3: TAS SIAGA BENCANA
        ========================================= */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#18a7a2] rounded-3xl p-6 w-full text-center shadow-xl mb-8 min-h-[480px]">
              
              <button 
                onClick={() => speak("Sentuh barang-barang di bawah ini untuk memasukkannya ke dalam tas siaga.")}
                className="mx-auto mb-4 bg-teal-100 text-teal-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              
              <h2 className="text-2xl md:text-3xl font-black text-[#18a7a2] mb-2">Tas Siaga Bencana</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Pilih dan masukkan semua barang ke dalam tas</p>

              {/* VISUALISASI TAS */}
              <div className="relative flex justify-center mb-10">
                <div className={`transition-all duration-300 ${packedItems.length === 4 ? 'scale-110 animate-bounce' : 'scale-100'}`}>
                  <Backpack size={120} className={packedItems.length === 4 ? 'text-green-600 fill-green-100' : 'text-teal-600'} />
                </div>
                
                {/* Counter Indikator Barang (0/4) */}
                <div className="absolute -bottom-4 bg-white border-4 border-teal-500 text-teal-700 font-black px-6 py-2 rounded-full text-xl shadow-md">
                  {packedItems.length} / 4
                </div>
              </div>

              {/* BARANG YANG HARUS DIPILIH */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emergencyItems.map((item) => {
                  const isPacked = packedItems.includes(item.id)
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePack(item.id)}
                      disabled={isPacked}
                      className={`flex flex-col items-center p-4 rounded-2xl border-4 transition-all duration-500 ${isPacked ? 'bg-gray-100 border-gray-200 opacity-40 scale-95' : `bg-white border-gray-300 hover:${item.bg} hover:border-teal-400 active:scale-95 shadow-sm`}`}
                    >
                      <div className="relative">
                        <Icon size={40} className={`${isPacked ? 'text-gray-400' : item.color} mb-2`} />
                        {isPacked && <Check className="absolute top-0 right-0 text-green-500" strokeWidth={4} />}
                      </div>
                      <span className="font-black text-gray-700">{item.label}</span>
                    </button>
                  )
                })}
              </div>

            </div>

            {/* Tombol Selesai Tamat */}
            {packedItems.length === 4 && (
              <button 
                onClick={() => {
                  localStorage.setItem('nusar_stage3_progress', '4') // 4 = Unit Selesai Total
                  // Karena ini level terakhir dari unit terakhir, kita kembalikan ke menu utama (Daftar Isi)
                  router.push('/toc') 
                }}
                className="flex items-center gap-2 bg-[#18a7a2] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
              >
                Selesai Unit 3!
              </button>
            )}
          </section>
        )}

      </div>
    </main>
  )
}