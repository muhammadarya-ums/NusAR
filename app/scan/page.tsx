'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, CameraOff, AlertCircle } from 'lucide-react'

export default function ScanPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')
  // STATE BARU: Untuk menyimpan aliran video dari kamera
  const [stream, setStream] = useState<MediaStream | null>(null)

  // 1. Hook untuk menyalakan kamera dan menyimpan stream-nya
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        activeStream = mediaStream;
        setStream(mediaStream); // Simpan stream ke state
        setHasPermission(true);
      } catch (err: any) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
        if (err.name === 'NotAllowedError') {
          setErrorMsg('Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda.');
        } else if (err.name === 'NotFoundError') {
          setErrorMsg('Kamera tidak ditemukan pada perangkat ini.');
        } else {
          setErrorMsg('Terjadi kesalahan saat mengakses kamera.');
        }
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 2. Hook BARU: Memasukkan stream ke tag <video> SETELAH tag-nya di-render oleh React
  useEffect(() => {
    if (hasPermission && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      
      // Auto-play paksa untuk iOS (wajib setelah srcObject terisi)
      videoRef.current.play().catch(err => {
        console.error("Gagal auto-play di iOS:", err);
      });
    }
  }, [hasPermission, stream]);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* HEADER NAVIGASI */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
        <button 
          onClick={() => router.push('/')}
          className="p-3 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-white/20 transition"
          aria-label="Kembali"
        >
          <X size={28} />
        </button>
        <div className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md font-bold text-sm tracking-wide">
          AR SCANNER
        </div>
        <div className="w-12" />
      </header>

      {/* RENDER VIDEO KAMERA */}
      {hasPermission === true && (
        <>
          <video 
            ref={videoRef} 
            autoPlay={true}
            playsInline={true} 
            muted={true}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* UI VIEWFINDER (Garis Kotak Scanner & Laser Animasi) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-400 rounded-br-2xl" />
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/80 shadow-[0_0_8px_2px_rgba(59,130,246,0.6)] animate-[scan_3s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="absolute bottom-12 z-20 text-center">
            <p className="text-white font-bold bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm animate-pulse">
              Arahkan kamera ke gambar E-Modul
            </p>
          </div>
        </>
      )}

      {/* TAMPILAN JIKA IZIN DITOLAK / KAMERA ERROR */}
      {hasPermission === false && (
        <div className="flex flex-col items-center justify-center p-8 text-center z-20">
          <div className="bg-red-500/20 p-6 rounded-full mb-6">
            <CameraOff size={64} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" /> Akses Terhalang
          </h2>
          <p className="text-gray-300 font-medium max-w-md leading-relaxed">
            {errorMsg}
          </p>
          <button 
            onClick={() => router.push('/')}
            className="mt-8 bg-white text-black font-black px-8 py-4 rounded-full hover:bg-gray-200 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      )}

      {/* CSS KHUSUS UNTUK ANIMASI LASER SCANNER */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(276px); } 
        }
        @media (min-width: 768px) {
          @keyframes scan {
            0%, 100% { transform: translateY(0); opacity: 0; }
            10%, 90% { opacity: 1; }
            50% { transform: translateY(396px); }
          }
        }
      `}} />
    </main>
  )
}