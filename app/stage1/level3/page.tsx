'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'

// ==========================================
// KOMPONEN CUSTOM: DAUN & MOTIF SEMANGGI
// ==========================================
const Leaf = ({ active, rotate }: { active: boolean, rotate: string }) => (
  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-t-full rounded-bl-full transition-all duration-300 ${active ? 'bg-green-600 scale-100 shadow-md' : 'bg-green-200 scale-95 opacity-60'} ${rotate}`} />
)

const MotifSemanggi = ({ count, spin = false }: { count: number, spin?: boolean }) => (
  <div className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center ${spin ? 'animate-[spin_20s_linear_infinite]' : ''}`}>
    {/* Kiri Atas */}
    <div className="absolute top-0 left-0 origin-bottom-right">
      <Leaf active={count >= 1} rotate="rotate-0" />
    </div>
    {/* Kanan Atas */}
    <div className="absolute top-0 right-0 origin-bottom-left">
      <Leaf active={count >= 2} rotate="rotate-90" />
    </div>
    {/* Kanan Bawah */}
    <div className="absolute bottom-0 right-0 origin-top-left">
      <Leaf active={count >= 3} rotate="rotate-180" />
    </div>
    {/* Kiri Bawah */}
    <div className="absolute bottom-0 left-0 origin-top-right">
      <Leaf active={count >= 4} rotate="-rotate-90" />
    </div>
  </div>
)

export default function Level3Page() {
  const router = useRouter()
  // step 1: Mengenal isi 4, step 2: Menghitung 2 kelompok, step 3: Menyusun kain (max 3 motif)
  const [step, setStep] = useState(1)
  
  const [leafCount, setLeafCount] = useState(0) // Untuk Step 1 (0-4)
  const [groupCount, setGroupCount] = useState(0) // Untuk Step 2 (0-2)
  const [motifCount, setMotifCount] = useState(0) // Untuk Step 3 (0-3)

  // Fungsi putar suara otomatis
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = 0.85 
      window.speechSynthesis.speak(utterance)
    }
  }

  // Narasi Pembuka Tiap Step
  useEffect(() => {
    if (step === 1) speak("Satu motif Batik Semanggi memiliki empat helai daun. Sentuh tombol untuk menghitung daunnya.")
    if (step === 2) speak("Mari berhitung berkelompok. Satu motif isinya empat, kalau dua motif jadi berapa?")
    if (step === 3) speak("Mari menyusun kain batik. Tambahkan tiga motif agar jumlah daunnya jadi dua belas.")
  }, [step])

  // --- LOGIKA AKTIVITAS 1 ---
  const handleCountLeaf = () => {
    if (leafCount < 4) {
      const newCount = leafCount + 1
      setLeafCount(newCount)
      speak(newCount.toString())
      if (newCount === 4) {
        setTimeout(() => speak("Bagus! Satu motif ada empat daun."), 1000)
      }
    }
  }

  // --- LOGIKA AKTIVITAS 2 ---
  const handleCountGroup = () => {
    if (groupCount === 0) {
      setGroupCount(1)
      speak("Satu motif, ada empat daun.")
    } else if (groupCount === 1) {
      setGroupCount(2)
      speak("Dua motif, menjadi delapan daun.")
    }
  }

  // --- LOGIKA AKTIVITAS 3 ---
  const handleAddMotif = () => {
    if (motifCount < 3) {
      const newMotif = motifCount + 1
      setMotifCount(newMotif)
      const totalDaun = newMotif * 4
      speak(`Tambah satu motif. Sekarang ada ${totalDaun} daun.`)
      
      if (newMotif === 3) {
        setTimeout(() => speak("Hore! Kain batikmu sudah jadi dengan dua belas helai daun."), 2500)
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f4faed] text-[#18333a] font-sans pb-24">
      {/* HEADER Navigasi */}
      <header className="bg-[#5ea138] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage1')}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">Level 3: Batik Semanggi</p>
          <h1 className="text-xl font-black">Berhitung Berkelompok</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            AKTIVITAS 1: MENGENAL KELOMPOK ISI 4
        ========================================= */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="bg-white border-4 border-[#5ea138] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak("Sentuh tombol hijau untuk menghitung daun satu per satu.")}
                className="mx-auto mb-4 bg-green-100 text-green-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#2f5c15] mb-2">1 Motif = 4 Daun</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Hitung daun pada motif Semanggi ini</p>
              
              <div className="flex justify-center mb-12">
                <MotifSemanggi count={leafCount} spin={leafCount === 4} />
              </div>

              <div className="mt-8 flex flex-col items-center">
                {leafCount < 4 ? (
                  <button onClick={handleCountLeaf} className="bg-[#5ea138] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg active:scale-95 transition">
                    Hitung Daun ({leafCount}/4)
                  </button>
                ) : (
                  <div className="flex items-center gap-3 text-green-600 animate-in zoom-in font-black text-2xl bg-green-50 px-8 py-4 rounded-full border-2 border-green-200">
                    <CheckCircle2 size={36} /> Hebat! Ada 4 daun.
                  </div>
                )}
              </div>
            </div>

            {leafCount === 4 && (
              <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce">
                Lanjut Hitung 2 Motif <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 2: MENGHITUNG 2 MOTIF (8 DAUN)
        ========================================= */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#e98608] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak("Mari menghitung daun dari dua motif batik.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#e98608] mb-2">Menghitung 2 Kelompok</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">1 Motif = 4. Kalau 2 Motif?</p>
              
              <div className="flex justify-center gap-6 md:gap-16 mb-12 bg-orange-50 p-8 rounded-3xl border-2 border-orange-100">
                {/* Motif 1 */}
                <div className="flex flex-col items-center gap-4">
                  <MotifSemanggi count={groupCount >= 1 ? 4 : 0} />
                  <span className="text-3xl font-black text-green-700">{groupCount >= 1 ? '4' : '?'}</span>
                </div>
                
                {/* Motif 2 */}
                <div className="flex flex-col items-center gap-4">
                  <MotifSemanggi count={groupCount >= 2 ? 4 : 0} />
                  <span className="text-3xl font-black text-green-700">{groupCount >= 2 ? '8' : '?'}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                {groupCount < 2 ? (
                  <button onClick={handleCountGroup} className="bg-[#e98608] text-white text-2xl font-black py-4 px-12 rounded-full shadow-lg active:scale-95 transition">
                    Hitung Motif ke-{groupCount + 1}
                  </button>
                ) : (
                  <div className="flex items-center gap-3 text-orange-600 animate-in zoom-in font-black text-2xl bg-orange-50 px-8 py-4 rounded-full border-2 border-orange-200">
                    <CheckCircle2 size={36} /> Benar! Dua motif jadi 8 daun.
                  </div>
                )}
              </div>
            </div>

            {groupCount === 2 && (
              <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce">
                Lanjut Menyusun Kain <ArrowRight />
              </button>
            )}
          </section>
        )}

        {/* =========================================
            AKTIVITAS 3: MENYUSUN KAIN (TARGET 12 DAUN)
        ========================================= */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#123d75] rounded-3xl p-6 w-full text-center shadow-lg mb-8 min-h-[450px]">
              <button 
                onClick={() => speak("Tambahkan motif satu per satu sampai jumlah daunnya menjadi dua belas.")}
                className="mx-auto mb-4 bg-blue-100 text-blue-700 p-3 rounded-full"
              >
                <Volume2 size={32} />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#123d75] mb-2">Membuat Kain Batik</h2>
              <p className="text-lg font-bold text-gray-600 mb-8">Susun motif agar jumlah totalnya jadi <strong className="text-2xl text-blue-600">12 daun</strong></p>
              
              {/* AREA KAIN */}
              <div className={`relative min-h-[200px] flex justify-center items-center gap-4 md:gap-8 p-6 rounded-3xl border-4 transition-all duration-700 ${motifCount === 3 ? 'bg-[#ffedc2] border-[#f2bd3d]' : 'bg-gray-50 border-dashed border-gray-300'}`}>
                
                {/* Tempat Motif 1 */}
                <div className={`transition-all duration-500 ${motifCount >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                   <MotifSemanggi count={4} />
                </div>
                {/* Tempat Motif 2 */}
                <div className={`transition-all duration-500 ${motifCount >= 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                   <MotifSemanggi count={4} />
                </div>
                {/* Tempat Motif 3 */}
                <div className={`transition-all duration-500 ${motifCount >= 3 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                   <MotifSemanggi count={4} />
                </div>

                {motifCount === 3 && (
                   <span className="absolute -bottom-5 bg-[#f2bd3d] text-[#123d75] px-6 py-2 rounded-full font-black text-xl border-4 border-white shadow-md animate-in zoom-in">
                     Kain Selesai! (12 Daun)
                   </span>
                )}
              </div>

              <div className="mt-12 flex justify-center">
                {motifCount < 3 ? (
                  <button onClick={handleAddMotif} className="bg-[#123d75] text-white text-xl md:text-2xl font-black py-4 px-10 rounded-full shadow-lg active:scale-95 transition">
                    + Tambah Motif (4 daun)
                  </button>
                ) : (
                  <button onClick={() => { setMotifCount(0); speak("Mari ulangi menyusun kain.") }} className="flex items-center gap-2 mx-auto bg-gray-200 text-gray-700 text-lg font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition">
                    <RotateCcw /> Buat Ulang
                  </button>
                )}
              </div>
            </div>

            {motifCount === 3 && (
              <button 
                onClick={() => router.push('/toc')} // Kembali ke Daftar Isi karena Stage 1 selesai
                className="bg-[#18a7a2] text-white text-xl font-black py-4 px-12 rounded-full shadow-lg animate-bounce"
              >
                Selesai Unit 1!
              </button>
            )}
          </section>
        )}

      </div>
    </main>
  )
}