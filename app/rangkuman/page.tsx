'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Printer, BookOpen, ClipboardList, Info } from 'lucide-react'

// Data Rubrik Observasi sesuai dokumen E-Modul NusAR
const rubricData = [
  { unit: 1, level: 1, indicator: 'Mampu membilang benda konkret hingga 15' },
  { unit: 1, level: 1, indicator: 'Mampu membandingkan dua kuantitas dengan benar' },
  { unit: 1, level: 2, indicator: 'Mampu menunjukkan hasil penjumlahan/pengurangan konkret' },
  { unit: 1, level: 2, indicator: 'Mampu menjawab soal cerita bergambar sederhana' },
  { unit: 1, level: 3, indicator: 'Mampu menghitung total dua kelompok isi 4 (Batik Semanggi)' },
  { unit: 1, level: 3, indicator: 'Mampu menyusun kain AR sesuai jumlah motif yang diminta' },
  { unit: 2, level: 1, indicator: 'Mampu mengikuti instruksi arah sederhana' },
  { unit: 2, level: 1, indicator: 'Mampu menemukan lokasi/rumah sesuai penanda' },
  { unit: 2, level: 2, indicator: 'Mampu mengenali bagian hari (pagi/siang/sore/malam)' },
  { unit: 2, level: 2, indicator: 'Mampu mencocokkan aktivitas dengan bagian hari yang sesuai' },
  { unit: 2, level: 3, indicator: 'Mampu menyusun 3–4 kartu peristiwa secara berurutan' },
  { unit: 2, level: 3, indicator: 'Mampu menceritakan ulang urutan dengan bantuan gambar' },
  { unit: 3, level: 1, indicator: 'Mampu menunjukkan sikap aman saat simulasi gempa' },
  { unit: 3, level: 1, indicator: 'Mampu memilih jalur menuju titik kumpul dengan benar' },
  { unit: 3, level: 2, indicator: 'Mampu menunjukkan titik berbahaya saat banjir rob' },
  { unit: 3, level: 2, indicator: 'Mampu memilih jalur aman dengan benar' },
  { unit: 3, level: 3, indicator: 'Mampu menunjukkan minimal 2 sumber bahaya kebakaran' },
  { unit: 3, level: 3, indicator: 'Mampu menyusun isi tas siaga bencana dengan bantuan visual' },
]

export default function SummaryPage() {
  const router = useRouter()

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24 print:bg-white print:pb-0">
      
      {/* HEADER: Disembunyikan saat di-print (print:hidden) */}
      <header className="bg-[#123d75] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-50 print:hidden">
        <button 
          onClick={() => router.push('/toc')} // Kembali ke Daftar Isi
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="Kembali ke menu"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold opacity-90">E-Modul NusAR</p>
          <h1 className="text-xl font-black">Rangkuman & Rubrik</h1>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white text-[#123d75] px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-sm"
        >
          <Printer size={20} /> <span className="hidden md:inline">Cetak</span>
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-4 md:p-8 mt-4">
        
        {/* =========================================
            BAGIAN I: RANGKUMAN
        ========================================= */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-t-8 border-[#18a7a2] mb-10 print:shadow-none print:border-none print:p-0 print:mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#18a7a2] text-white p-3 rounded-2xl">
              <BookOpen size={32} />
            </div>
            <h2 className="text-3xl font-black text-[#123d75]">I. Rangkuman</h2>
          </div>
          
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed text-justify">
            <p>
              E-Modul NusAR menghadirkan tiga unit pembelajaran dalam satu aplikasi berbasis AR. Unit 1 (Numerasi Dasar) dan Unit 2 (Ruang & Waktu) mengajak siswa menjelajahi konsep matematika dasar melalui konteks budaya Surabaya seperti Kampung Nelayan Kenjeran, Batik Semanggi, Kampung Peneleh, dan Tugu Pahlawan. Unit 3 (Mitigasi Bencana) mengajak siswa memahami langkah evakuasi, identifikasi jalur aman, dan tindakan preventif terhadap potensi bencana nyata di kawasan pesisir Kenjeran (gempa bumi, tsunami, banjir rob, dan kebakaran).
            </p>
            <p>
              Ketiga unit dirancang dengan metode yang sama: pembelajaran bertahap (<em>deep learning</em>) dalam 3 level berjenjang, visualisasi konkret dan multisensori (AR), serta adaptasi penuh terhadap karakteristik belajar siswa tunagrahita — instruksi sederhana, pengulangan tanpa batas, dan umpan balik yang selalu membesarkan hati.
            </p>
          </div>
        </section>

        {/* =========================================
            BAGIAN II: LEMBAR OBSERVASI / RUBRIK
        ========================================= */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-t-8 border-[#e98608] print:shadow-none print:border-none print:p-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#e98608] text-white p-3 rounded-2xl print:hidden">
              <ClipboardList size={32} />
            </div>
            <h2 className="text-3xl font-black text-[#123d75]">J. Lembar Observasi / Rubrik Pendampingan</h2>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 flex items-start gap-3 rounded-r-xl print:border-l-2 print:bg-transparent print:p-2">
            <Info className="text-orange-600 mt-1 shrink-0" size={24} />
            <p className="text-gray-700 font-medium">
              (Digunakan oleh guru/pendamping untuk mencatat perkembangan siswa di setiap level — menggantikan Lembar Kerja Siswa konvensional, karena siswa tunagrahita dinilai melalui observasi performa, bukan soal tertulis)
            </p>
          </div>

          {/* Skala Penilaian */}
          <div className="mb-6 flex flex-wrap gap-3 md:gap-6 items-center justify-center bg-gray-100 py-3 rounded-xl print:bg-transparent print:justify-start">
            <span className="font-bold text-gray-800">Skala Penilaian:</span>
            <span className="bg-white px-3 py-1 rounded-md shadow-sm border print:shadow-none"><strong>0</strong> = Belum bisa</span>
            <span className="bg-white px-3 py-1 rounded-md shadow-sm border print:shadow-none"><strong>1</strong> = Bantuan penuh</span>
            <span className="bg-white px-3 py-1 rounded-md shadow-sm border print:shadow-none"><strong>2</strong> = Bantuan sebagian</span>
            <span className="bg-white px-3 py-1 rounded-md shadow-sm border print:shadow-none"><strong>3</strong> = Mandiri</span>
          </div>

          {/* Tabel Rubrik */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 rounded-lg print:border-gray-800">
              <thead>
                <tr className="bg-[#2c3e50] text-white print:bg-gray-200 print:text-black">
                  <th className="p-3 border border-gray-300 w-16 text-center font-bold">Unit</th>
                  <th className="p-3 border border-gray-300 w-16 text-center font-bold">Level</th>
                  <th className="p-3 border border-gray-300 font-bold">Indikator yang Diamati</th>
                  <th className="p-3 border border-gray-300 w-32 text-center font-bold">Skor (0-3)</th>
                  <th className="p-3 border border-gray-300 w-48 font-bold">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {rubricData.map((item, index) => (
                  <tr 
                    key={index} 
                    className="even:bg-gray-50 hover:bg-blue-50 transition-colors print:even:bg-transparent print:border-b print:border-gray-800"
                  >
                    <td className="p-3 border border-gray-300 text-center font-bold text-gray-600 print:text-black">{item.unit}</td>
                    <td className="p-3 border border-gray-300 text-center font-bold text-gray-600 print:text-black">{item.level}</td>
                    <td className="p-3 border border-gray-300 text-gray-800">{item.indicator}</td>
                    {/* Kolom kosong untuk diisi tulisan tangan */}
                    <td className="p-3 border border-gray-300"></td>
                    <td className="p-3 border border-gray-300"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </div>

      {/* Style kustom untuk print (CSS) agar margin halaman bagus saat dicetak */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 2cm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />
    </main>
  )
}