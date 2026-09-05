'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Paintbrush } from 'lucide-react'

// KOMPONEN CUSTOM: DAUN & MOTIF SEMANGGI
const Leaf = ({ active, rotate }: { active: boolean, rotate: string }) => (
  <div 
    className={`w-12 h-12 md:w-16 md:h-16 rounded-t-full rounded-bl-full transition-all duration-500 origin-bottom-right 
    ${active 
      ? 'bg-[#3b591b] scale-100 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(0,0,0,0.3)]' 
      : 'bg-[#d2b48c]/20 scale-90 opacity-60 border-2 border-dashed border-[#8b6038]/30'} 
    ${rotate}`} 
    aria-hidden="true"
  />
)

const MotifSemanggi = ({ count, spin = false }: { count: number, spin?: boolean }) => (
  <div className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-transform duration-1000 ${spin ? 'animate-[spin_10s_linear_infinite]' : ''}`} aria-hidden="true">
    <div className="absolute top-0 left-0"><Leaf active={count >= 1} rotate="rotate-0" /></div>
    <div className="absolute top-0 right-0"><Leaf active={count >= 2} rotate="rotate-90" /></div>
    <div className="absolute bottom-0 right-0"><Leaf active={count >= 3} rotate="rotate-180" /></div>
    <div className="absolute bottom-0 left-0"><Leaf active={count >= 4} rotate="-rotate-90" /></div>
  </div>
)

export default function Level3Page() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [leafCount, setLeafCount] = useState(0) 
  const [groupCount, setGroupCount] = useState(0) 
  const [motifCount, setMotifCount] = useState(0) 

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
    if (step === 1) speak("Satu motif Batik Semanggi memiliki empat helai daun. Sentuh tombol untuk mengecap daunnya.")
    if (step === 2) speak("Mari berhitung berkelompok. Satu motif isinya empat, kalau dua motif jadi berapa?")
    if (step === 3) speak("Mari menyusun kain batik. Tambahkan tiga motif agar jumlah daunnya jadi dua belas.")
  }, [step])

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

  const handleCountGroup = () => {
    if (groupCount === 0) {
      setGroupCount(1)
      speak("Satu motif, ada empat daun.")
    } else if (groupCount === 1) {
      setGroupCount(2)
      speak("Dua motif, menjadi delapan daun.")
    }
  }

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
    <main className="min-h-screen bg-[#fdfbf7] text-[#452b14] font-sans pb-24 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]">
      {/* HEADER Navigasi - Aksesibilitas Ditingkatkan */}
      <header className="bg-[#6b4c2a] text-[#fdfbf7] p-4 flex items-center gap-4 shadow-md sticky top-0 z-50">
        <button 
          onClick={() => router.push('/stage1')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 border-2 border-transparent hover:bg-white/20 hover:border-white rounded-2xl transition-all focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 shadow-sm"
          aria-label="Kembali ke Menu Utama Stage 1"
          title="Kembali ke Menu Utama"
        >
          <ArrowLeft size={28} aria-hidden="true" />
          <span className="font-bold text-base md:text-lg">Kembali</span>
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90 text-amber-200">Level 3: Batik Semanggi</p>
          <h1 className="text-xl font-black tracking-wide">Berhitung Berkelompok</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-4">
        {/* AKTIVITAS 1 */}
        {step === 1 && (
          <section className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="bg-white border-4 border-[#8b6038] rounded-3xl p-6 w-full text-center shadow-2xl mb-8 min-h-[450px]">
              <button 
                onClick={() => speak("Sentuh tombol Cap Daun untuk menghitung daun satu per satu.")}
                className="mx-auto mb-4 bg-amber-100 text-amber-800 p-3 rounded-full hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-amber-400"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#6b4c2a] mb-2">1 Motif = 4 Daun</h2>
              <p className="text-lg font-bold text-amber-700/80 mb-8">Cap daun pada pola Semanggi ini</p>
              
              <div className="relative w-full max-w-sm mx-auto h-64 bg-[#f4ebd8] rounded-2xl border-dashed border-4 border-[#d2b48c] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] mb-12">
                <MotifSemanggi count={leafCount} spin={leafCount === 4} />
              </div>

              <div className="mt-8 flex flex-col items-center">
                {leafCount < 4 ? (
                  <button 
                    onClick={handleCountLeaf} 
                    className="flex items-center gap-3 bg-[#4d7c0f] text-white text-2xl font-black py-4 px-12 rounded-full shadow-[0_6px_0_#274007] active:shadow-[0_0px_0_#274007] active:translate-y-[6px] transition-all focus:outline-none focus:ring-4 focus:ring-[#4d7c0f]/50"
                  >
                    <Paintbrush size={28} aria-hidden="true" /> Cap Daun ({leafCount}/4)
                  </button>
                ) : (
                  <div className="flex items-center gap-3 text-green-700 animate-in zoom-in font-black text-2xl bg-green-100 px-8 py-4 rounded-2xl border-4 border-green-400 shadow-lg">
                    <CheckCircle2 size={36} aria-hidden="true" /> Hebat! Ada 4 daun.
                  </div>
                )}
              </div>
            </div>

            {leafCount === 4 && (
              <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-[#f2bd3d]/50">
                Lanjut Hitung 2 Motif <ArrowRight aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* AKTIVITAS 2 */}
        {step === 2 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#d97706] rounded-3xl p-6 w-full text-center shadow-2xl mb-8 min-h-[450px]">
              <button 
                onClick={() => speak("Mari menghitung daun dari dua motif batik.")}
                className="mx-auto mb-4 bg-orange-100 text-orange-800 p-3 rounded-full hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-orange-400"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#b45309] mb-2">Menghitung 2 Kelompok</h2>
              <p className="text-lg font-bold text-orange-700/80 mb-8">1 Motif = 4. Kalau 2 Motif?</p>
              
              <div className="flex justify-center gap-6 md:gap-16 mb-12 bg-[#f4ebd8] p-8 rounded-3xl border-dashed border-4 border-[#d2b48c] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col items-center gap-4">
                  <MotifSemanggi count={groupCount >= 1 ? 4 : 0} />
                  <span className={`text-4xl font-black transition-colors duration-500 ${groupCount >= 1 ? 'text-[#3b591b]' : 'text-gray-400'}`}>
                    {groupCount >= 1 ? '4' : '?'}
                  </span>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <MotifSemanggi count={groupCount >= 2 ? 4 : 0} />
                  <span className={`text-4xl font-black transition-colors duration-500 ${groupCount >= 2 ? 'text-[#3b591b]' : 'text-gray-400'}`}>
                    {groupCount >= 2 ? '8' : '?'}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                {groupCount < 2 ? (
                  <button 
                    onClick={handleCountGroup} 
                    className="flex items-center gap-3 bg-[#d97706] text-white text-2xl font-black py-4 px-12 rounded-full shadow-[0_6px_0_#9a3412] active:shadow-[0_0px_0_#9a3412] active:translate-y-[6px] transition-all focus:outline-none focus:ring-4 focus:ring-[#d97706]/50"
                  >
                    <Paintbrush size={28} aria-hidden="true" /> Cap Motif ke-{groupCount + 1}
                  </button>
                ) : (
                  <div className="flex items-center gap-3 text-orange-700 animate-in zoom-in font-black text-2xl bg-orange-100 px-8 py-4 rounded-2xl border-4 border-orange-400 shadow-lg">
                    <CheckCircle2 size={36} aria-hidden="true" /> Benar! Dua motif jadi 8 daun.
                  </div>
                )}
              </div>
            </div>

            {groupCount === 2 && (
              <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-[#f2bd3d] text-[#123d75] text-xl font-black py-3 px-8 rounded-full shadow-md animate-bounce hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-[#f2bd3d]/50">
                Lanjut Menyusun Kain <ArrowRight aria-hidden="true" />
              </button>
            )}
          </section>
        )}

        {/* AKTIVITAS 3 */}
        {step === 3 && (
          <section className="flex flex-col items-center animate-in slide-in-from-right duration-500">
            <div className="bg-white border-4 border-[#6b4c2a] rounded-3xl p-6 w-full text-center shadow-2xl mb-8 min-h-[450px]">
              <button 
                onClick={() => speak("Tambahkan motif satu per satu sampai jumlah daunnya menjadi dua belas.")}
                className="mx-auto mb-4 bg-amber-100 text-amber-800 p-3 rounded-full hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-amber-400"
                aria-label="Putar Suara Instruksi"
              >
                <Volume2 size={32} aria-hidden="true" />
              </button>
              <h2 className="text-2xl md:text-3xl font-black text-[#6b4c2a] mb-2">Membuat Kain Batik Panjang</h2>
              <p className="text-lg font-bold text-amber-700/80 mb-8">Susun motif agar jumlah totalnya jadi <strong className="text-2xl text-[#3b591b] bg-green-100 px-3 py-1 rounded-md">12 daun</strong></p>
              
              <div className={`relative min-h-[220px] flex justify-center items-center gap-4 md:gap-12 p-8 rounded-3xl border-4 transition-all duration-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] ${motifCount === 3 ? 'bg-[#ffedc2] border-[#f2bd3d]' : 'bg-[#f4ebd8] border-dashed border-[#d2b48c]'}`}>
                <div className={`transition-all duration-500 ${motifCount >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}><MotifSemanggi count={4} /></div>
                <div className={`transition-all duration-500 ${motifCount >= 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}><MotifSemanggi count={4} /></div>
                <div className={`transition-all duration-500 ${motifCount >= 3 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}><MotifSemanggi count={4} /></div>

                {motifCount === 3 && (
                   <div className="absolute -bottom-6 bg-[#f2bd3d] text-[#123d75] px-8 py-3 rounded-full font-black text-2xl border-4 border-white shadow-xl animate-in zoom-in" aria-live="polite">
                     Kain Selesai! (12 Daun)
                   </div>
                )}
              </div>

              <div className="mt-14 flex justify-center">
                {motifCount < 3 ? (
                  <button 
                    onClick={handleAddMotif} 
                    className="flex items-center gap-3 bg-[#6b4c2a] text-[#fdfbf7] text-xl md:text-2xl font-black py-4 px-10 rounded-full shadow-[0_6px_0_#452b14] active:shadow-[0_0px_0_#452b14] active:translate-y-[6px] transition-all focus:outline-none focus:ring-4 focus:ring-[#6b4c2a]/50"
                  >
                    <Paintbrush size={28} aria-hidden="true" /> Tambah Motif (4 daun)
                  </button>
                ) : (
                  <button onClick={() => { setMotifCount(0); speak("Mari ulangi menyusun kain.") }} className="flex items-center gap-2 mx-auto bg-gray-200 text-gray-700 text-lg font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition focus:outline-none focus:ring-4 focus:ring-gray-400">
                    <RotateCcw aria-hidden="true" /> Buat Ulang
                  </button>
                )}
              </div>
            </div>

            {motifCount === 3 && (
              <button 
                onClick={() => router.push('/toc')} 
                className="bg-[#4d7c0f] text-white text-xl font-black py-4 px-12 rounded-full shadow-[0_6px_0_#274007] active:shadow-[0_0px_0_#274007] active:translate-y-[6px] animate-bounce hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[#4d7c0f]/50"
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