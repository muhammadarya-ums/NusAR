'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, ChevronRight, ArrowLeft, Info, ListChecks, Map, Target, Flag, FileText } from 'lucide-react'

// ==========================================
// DATA MENU BAGIAN 1
// ==========================================
const menuItems = [
  { id: 1, title: 'Kata Pengantar', desc: 'Pengenalan E-Modul NusAR', icon: FileText },
  { id: 2, title: 'Pendahuluan & Identitas', desc: 'Sasaran dan pendekatan modul', icon: Info },
  { id: 3, title: 'Petunjuk Penggunaan', desc: 'Panduan untuk guru & orang tua', icon: ListChecks },
  { id: 4, title: 'Peta Konsep', desc: 'Alur 3 unit pembelajaran', icon: Map },
  { id: 5, title: 'Capaian Pembelajaran', desc: 'Target kompetensi tiap level', icon: Target },
  { id: 6, title: 'Tujuan Pembelajaran', desc: 'Manfaat literasi & mitigasi', icon: Flag },
]

export default function PendahuluanPage() {
  const router = useRouter()
  // view: 'menu' (tampil daftar 6 item) | 'content' (tampil isi bacaan)
  const [view, setView] = useState<'menu' | 'content'>('menu')
  const [activeId, setActiveId] = useState<number>(1)

  const handleOpenContent = (id: number) => {
    setActiveId(id)
    setView('content')
  }

  const activeItem = menuItems.find(item => item.id === activeId)

  return (
    <main className="min-h-screen bg-[#f0f4f8] font-sans flex flex-col md:flex-row">
      
      {/* =========================================
          SIDEBAR KIRI (Biru - Konstan)
      ========================================= */}
      <aside className="bg-[#3b91ca] text-white w-full md:w-64 lg:w-80 p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-xl z-10 shrink-0 md:min-h-screen">
        {/* Tombol Kembali ke Daftar Isi Utama */}
        <button 
          onClick={() => router.push('/toc')} 
          className="absolute top-4 left-4 md:static md:mb-12 p-2 bg-white/20 rounded-full hover:bg-white/30 transition self-start"
          aria-label="Kembali ke Daftar Isi"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="bg-white/20 p-4 rounded-2xl mb-4 mt-8 md:mt-0">
          <BookOpen size={48} className="text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Bagian 1</h1>
        <p className="text-blue-100 text-lg font-medium tracking-wide">Pendahuluan</p>
      </aside>

      {/* =========================================
          KONTEN KANAN (Dinamis: Menu atau Isi)
      ========================================= */}
      <section className="flex-1 p-4 md:p-8 overflow-y-auto h-screen relative">
        
        {view === 'menu' && (
          <div className="max-w-3xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-[#173b63] mb-6 hidden md:block">Daftar Materi Pendahuluan</h2>
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleOpenContent(item.id)}
                  className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all active:scale-[0.98] flex items-center gap-4 md:gap-6 group text-left"
                >
                  <span className="text-2xl md:text-3xl font-black text-[#173b63] w-8 md:w-12 text-center group-hover:text-[#3b91ca] transition-colors">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-500 font-medium">{item.desc}</p>
                  </div>
                  <div className="text-gray-300 group-hover:text-[#3b91ca] transition-colors">
                    <ChevronRight size={28} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'content' && (
          <div className="max-w-4xl mx-auto py-4 md:py-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
            
            <button 
              onClick={() => setView('menu')}
              className="flex items-center gap-2 text-[#3b91ca] font-bold mb-6 hover:text-[#173b63] transition-colors bg-white px-4 py-2 rounded-full shadow-sm w-fit"
            >
              <ArrowLeft size={20} /> Kembali ke Menu Bagian 1
            </button>

            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-t-8 border-[#3b91ca]">
              <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-100 pb-6">
                <div className="bg-blue-50 text-[#3b91ca] p-3 rounded-2xl">
                  {activeItem && <activeItem.icon size={32} />}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#173b63]">{activeItem?.title}</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                
                {/* 1. KATA PENGANTAR */}
                {activeId === 1 && (
                  <div className="space-y-4">
                    <p>Puji syukur kami panjatkan atas terselesaikannya penyusunan E-Modul Ethno-STEAM Berbasis Augmented Reality ini, yang didesain sebagai bagian dari program pengabdian kepada masyarakat berjudul "Penguatan Kompetensi Literasi Digital Numerasi Siswa Tunagrahita melalui Pendekatan <em>Deep Learning</em> dengan E-Modul Ethno-STEAM Berbasis Augmented Reality (AR)".</p>
                    <p>E-Modul ini lahir dari keprihatinan bersama terhadap dua kebutuhan mendasar siswa tunagrahita yang selama ini belum banyak tersentuh media pembelajaran adaptif, yaitu penguatan literasi digital-numerasi dan kesiapsiagaan menghadapi bencana. Keduanya kami padukan dalam satu aplikasi bernama <strong>NusAR</strong>, yang menghadirkan konsep matematika dan mitigasi bencana secara konkret, multisensori, dan menyenangkan melalui teknologi AR.</p>
                    <p>Sebagai kota dengan kekayaan sejarah dan budaya pesisir, Surabaya kami jadikan latar utama pembelajaran, mulai dari kehidupan nelayan Kampung Kenjeran, motif Batik Semanggi, lorong bersejarah Kampung Peneleh, hingga Tugu Pahlawan. Kami berharap kedekatan konteks lokal ini membantu siswa memahami materi bukan sebagai sesuatu yang asing, melainkan bagian dari lingkungan dan identitas mereka sendiri. Untuk materi mitigasi bencana, kami secara khusus menyesuaikan konten dengan potensi bencana nyata di kawasan pesisir Kenjeran, seperti gempa bumi, tsunami, banjir rob, dan kebakaran, agar pengetahuan yang diperoleh siswa benar-benar relevan dengan risiko di lingkungan tempat tinggal mereka.</p>
                    <p>Penyusunan E-Modul ini menggunakan pendekatan <em>deep learning</em>, yang menekankan pembelajaran bermakna, bertahap, dan disesuaikan dengan kemampuan masing-masing siswa, bukan sekadar transfer informasi satu arah. Kami menyadari bahwa siswa tunagrahita memiliki karakteristik belajar yang unik, sehingga E-Modul ini disusun dalam 3 unit pembelajaran yang masing-masing terdiri atas 3 level bertahap, dengan prinsip instruksi sederhana, pengulangan tanpa batas, dan umpan balik yang selalu membesarkan hati, bukan menghakimi.</p>
                    <p>Kami menyampaikan terima kasih kepada Hibah BIMA Kemdiktisaintek, sekolah, guru, orang tua, dan seluruh pemangku kepentingan yang telah bersedia menjadi mitra dalam proses identifikasi kebutuhan, uji coba, dan penyempurnaan E-Modul ini. Tanpa keterlibatan aktif mereka, penyusunan modul yang benar-benar sesuai kebutuhan lapangan tidak akan tercapai.</p>
                    <p>Kami menyadari bahwa E-Modul ini masih jauh dari sempurna dan akan terus disempurnakan seiring masukan dari lapangan. Besar harapan kami, E-Modul Ethno-STEAM Berbasis AR ini dapat menjadi jembatan yang mempermudah siswa tunagrahita dalam memahami numerasi dan kesiapsiagaan bencana, sekaligus memperkuat rasa bangga mereka terhadap kekayaan budaya lokal Surabaya.</p>
                    <div className="mt-8 text-right font-bold">
                      <p>Surabaya, 2026</p>
                      <p>Tim Penyusun</p>
                    </div>
                  </div>
                )}

                {/* 2. PENDAHULUAN & IDENTITAS */}
                {activeId === 2 && (
                  <div className="space-y-6">
                    <p>Siswa tunagrahita menghadapi dua tantangan utama dalam konteks pendidikan dan kehidupan sehari-hari, yaitu rendahnya pemahaman literasi digital-numerasi dasar, dan minimnya kesiapsiagaan menghadapi potensi bencana di lingkungan tempat tinggal mereka. Media pembelajaran konvensional yang bersifat satu arah dan berbasis teks seringkali kurang efektif bagi karakteristik belajar siswa tunagrahita yang membutuhkan pendekatan konkret, berulang, dan multisensori.</p>
                    <p>E-Modul ini disusun untuk menjawab kedua tantangan tersebut melalui empat pilar pendekatan yang saling terintegrasi:</p>
                    <ol className="list-decimal pl-6 space-y-2 font-medium">
                      <li><strong>Deep Learning:</strong> pendekatan pembelajaran yang menekankan tujuan pembelajaran yang jelas, aktivitas bermakna, diferensiasi sesuai kemampuan siswa, dan asesmen berkelanjutan di setiap tahap.</li>
                      <li><strong>Ethno-STEAM:</strong> materi dibungkus dalam konteks kearifan lokal Surabaya, mengintegrasikan unsur <em>Science, Technology, Engineering, Arts, dan Mathematics</em> secara alami lewat cerita dan budaya setempat.</li>
                      <li><strong>Augmented Reality (AR):</strong> visualisasi konkret dan multisensori, karena siswa tunagrahita lebih mudah memahami konsep abstrak lewat objek yang bisa "dilihat" dan disentuh, bukan simbol tertulis semata.</li>
                      <li><strong>Adaptasi Tunagrahita:</strong> instruksi singkat satu langkah per layar, umpan balik instan tanpa unsur menghukum, pengulangan tanpa batas, dan durasi sesi pendek yang disesuaikan rentang atensi siswa.</li>
                    </ol>

                    <h3 className="text-xl font-black text-[#173b63] mt-8 mb-4">A. Identitas Modul</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-gray-300 rounded-lg text-sm md:text-base">
                        <tbody>
                          {[
                            ['Nama Aplikasi/E-Modul', 'NusAR — E-Modul Ethno-STEAM Berbasis Augmented Reality'],
                            ['Jenjang', 'Sekolah Dasar (SD) di Sekolah Luar Biasa (SLB)'],
                            ['Target Pengguna', 'Siswa tunagrahita ringan–sedang'],
                            ['Struktur', '3 unit pembelajaran, masing-masing terdiri atas 3 level bertahap (total 9 level)'],
                            ['Pendekatan', 'Deep Learning, Ethno-STEAM, Augmented Reality'],
                            ['Konteks Budaya', 'Kampung Nelayan Kenjeran, Batik Semanggi, Kampung Peneleh, Tugu Pahlawan (Surabaya)'],
                            ['Alokasi Waktu', 'Disesuaikan kebutuhan siswa; disarankan 1 level per 1–2 sesi pertemuan (3–7 menit aktif per level, dengan pendampingan)'],
                            ['Perangkat yang Dibutuhkan', 'Ponsel pintar/tablet berkamera, marker/kartu penanda AR'],
                          ].map(([title, desc], idx) => (
                            <tr key={idx} className="even:bg-gray-50 hover:bg-blue-50 transition-colors">
                              <td className="p-3 border border-gray-300 font-bold text-gray-700 w-1/3 align-top">{title}</td>
                              <td className="p-3 border border-gray-300 text-gray-600">{desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. PETUNJUK PENGGUNAAN */}
                {activeId === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-black text-[#3b91ca] mb-4 flex items-center gap-2">
                        <span className="bg-[#3b91ca] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                        Untuk Guru / Pendamping
                      </h3>
                      <ol className="list-decimal pl-6 space-y-3">
                        <li>Pastikan perangkat (ponsel/tablet) telah terpasang aplikasi NusAR dan marker/kartu penanda tersedia dalam kondisi baik (tidak terlipat/rusak).</li>
                        <li>Dampingi siswa pada percobaan pertama di setiap level baru — perkenalkan cara menyentuh layar dan mengarahkan kamera ke marker.</li>
                        <li>Biarkan siswa mengulang level sesuai kebutuhan; jangan terburu-buru memindahkan ke level berikutnya, apalagi ke unit berikutnya.</li>
                        <li>Gunakan <strong>Lembar Observasi/Rubrik Pendampingan</strong> (Bagian J) untuk mencatat perkembangan siswa di setiap level.</li>
                        <li>Sesi belajar sebaiknya dilakukan dalam durasi singkat (maksimal 10–15 menit per pertemuan) untuk menjaga fokus siswa.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#e98608] mb-4 flex items-center gap-2 mt-8">
                        <span className="bg-[#e98608] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                        Untuk Orang Tua
                      </h3>
                      <ol className="list-decimal pl-6 space-y-3">
                        <li>E-Modul dapat digunakan di rumah sebagai pengulangan dari yang telah dipelajari di sekolah.</li>
                        <li>Dampingi anak, terutama pada <strong>Unit 3</strong> yang melibatkan simulasi mitigasi bencana, agar pemahaman yang diperoleh dapat dikaitkan dengan kondisi nyata di rumah.</li>
                        <li>Berikan pujian dan dukungan tanpa tekanan; hindari membandingkan capaian anak dengan anak lain.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* 4. PETA KONSEP */}
                {activeId === 4 && (
                  <div className="space-y-6">
                    <p>Kerangka E-Modul NusAR disusun atas 3 unit pembelajaran yang saling melengkapi, masing-masing terdiri atas 3 level bertahap:</p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-gray-300 rounded-lg text-sm md:text-base">
                        <thead className="bg-[#123d75] text-white">
                          <tr>
                            <th className="p-3 border border-gray-300 font-bold text-center w-20">Unit</th>
                            <th className="p-3 border border-gray-300 font-bold w-48">Judul Unit</th>
                            <th className="p-3 border border-gray-300 font-bold bg-[#3b91ca] text-center w-1/4">Level 1</th>
                            <th className="p-3 border border-gray-300 font-bold bg-[#e98608] text-center w-1/4">Level 2</th>
                            <th className="p-3 border border-gray-300 font-bold bg-[#5ea138] text-center w-1/4">Level 3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            <td className="p-3 border border-gray-300 text-center font-black text-xl">1</td>
                            <td className="p-3 border border-gray-300 font-bold text-blue-900">Numerasi Dasar<br/><span className="text-xs font-normal text-gray-500">"Bilangan & Berhitung di Kenjeran"</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Bilangan</strong><br/><span className="text-xs text-gray-500">(Kampung Nelayan Kenjeran)</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Operasi Hitung</strong><br/><span className="text-xs text-gray-500">(Pasar Ikan Kenjeran)</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Berhitung Berkelompok</strong><br/><span className="text-xs text-gray-500">(Batik Semanggi)</span></td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-3 border border-gray-300 text-center font-black text-xl">2</td>
                            <td className="p-3 border border-gray-300 font-bold text-blue-900">Ruang & Waktu<br/><span className="text-xs font-normal text-gray-500">"Menyusuri Peneleh, Menuju Tugu Pahlawan"</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Konsep Ruang</strong><br/><span className="text-xs text-gray-500">(Kampung Peneleh)</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Konsep Waktu</strong><br/><span className="text-xs text-gray-500">(Tugu Pahlawan)</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Mengurutkan Peristiwa</strong><br/><span className="text-xs text-gray-500">(Tugu Pahlawan)</span></td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="p-3 border border-gray-300 text-center font-black text-xl">3</td>
                            <td className="p-3 border border-gray-300 font-bold text-blue-900">Mitigasi Bencana<br/><span className="text-xs font-normal text-gray-500">"Siaga Bencana Pesisir Kenjeran"</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Evakuasi Virtual</strong><br/><span className="text-xs text-gray-500">(Gempa & Tsunami)</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Jalur Aman</strong><br/><span className="text-xs text-gray-500">(Banjir Rob)</span></td>
                            <td className="p-3 border border-gray-300 text-center"><strong>Respon Preventif</strong><br/><span className="text-xs text-gray-500">(Kebakaran)</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <p className="text-sm bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400 mt-4">
                      Setiap level dibangun di atas tiga lapisan yang sama: konten Ethno-STEAM (materi + konteks budaya), pendekatan <em>deep learning</em> (aktivitas bermakna & bertahap), dan visualisasi AR (objek 3D interaktif). Siswa disarankan menyelesaikan level secara berurutan dalam satu unit sebelum berpindah ke unit berikutnya.
                    </p>
                  </div>
                )}

                {/* 5. CAPAIAN PEMBELAJARAN */}
                {activeId === 5 && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse border border-gray-300 rounded-lg text-sm md:text-base">
                        <thead className="bg-[#123d75] text-white">
                          <tr>
                            <th className="p-3 border border-gray-300 font-bold text-center w-24">Unit</th>
                            <th className="p-3 border border-gray-300 font-bold text-center w-24">Level</th>
                            <th className="p-3 border border-gray-300 font-bold">Capaian Pembelajaran</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            [1, 1, 'Siswa mampu membilang benda konkret 1–15 dan membandingkan dua kuantitas', 'bg-blue-50'],
                            [1, 2, 'Siswa memahami penjumlahan dan pengurangan sebagai proses konkret', 'bg-blue-50'],
                            [1, 3, 'Siswa mengenal konsep berhitung berkelompok (kelompok isi 4) sebagai dasar penjumlahan berulang', 'bg-blue-50'],
                            
                            [2, 1, 'Siswa mengenal konsep ruang (arah, posisi) dan mampu mengikuti navigasi sederhana', 'bg-orange-50'],
                            [2, 2, 'Siswa mengenal konsep waktu (bagian hari: pagi–siang–sore–malam)', 'bg-orange-50'],
                            [2, 3, 'Siswa mampu mengurutkan peristiwa (sebelum–sesudah) menggunakan kartu bergambar', 'bg-orange-50'],
                            
                            [3, 1, 'Siswa mampu mengenali tanda bahaya gempa/tsunami dan mempraktikkan langkah evakuasi dasar', 'bg-green-50'],
                            [3, 2, 'Siswa mampu mengidentifikasi jalur aman saat banjir rob dan menghindari titik berbahaya', 'bg-green-50'],
                            [3, 3, 'Siswa mengenal tindakan pencegahan kebakaran dan langkah kesiapsiagaan umum', 'bg-green-50'],
                          ].map(([unit, level, text, bgClass], idx) => (
                            <tr key={idx} className={`${bgClass} hover:brightness-95 transition-all`}>
                              <td className="p-3 border border-gray-300 text-center font-black text-gray-700">Unit {unit}</td>
                              <td className="p-3 border border-gray-300 text-center font-bold text-gray-600">Lvl {level}</td>
                              <td className="p-3 border border-gray-300 font-medium text-gray-800">{text}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 6. TUJUAN PEMBELAJARAN */}
                {activeId === 6 && (
                  <div className="space-y-4">
                    <p>Secara umum, E-Modul ini bertujuan agar siswa tunagrahita:</p>
                    <ol className="list-decimal pl-6 space-y-4 font-medium text-lg">
                      <li className="pl-2">Memiliki kemampuan literasi digital-numerasi dasar yang dapat diterapkan dalam kehidupan sehari-hari.</li>
                      <li className="pl-2">Memiliki kesiapsiagaan dan pengetahuan dasar mitigasi bencana yang relevan dengan lingkungan tempat tinggalnya.</li>
                      <li className="pl-2">Mengenal dan menghargai kekayaan budaya lokal Surabaya sebagai bagian dari proses belajar.</li>
                      <li className="pl-2">Belajar melalui pengalaman yang konkret, menyenangkan, dan bebas dari tekanan atau rasa gagal.</li>
                      <li className="pl-2">Mendapatkan pendampingan yang terukur dari guru dan orang tua berdasarkan data perkembangan yang tercatat di setiap level.</li>
                    </ol>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}