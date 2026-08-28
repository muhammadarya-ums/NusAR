'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, CameraOff, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

export default function ScanPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [scannedResult, setScannedResult] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(true)

  // 1. Hook menyalakan kamera
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    const startCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasPermission(false);
        setErrorMsg('Akses kamera diblokir. Pastikan Anda menggunakan koneksi HTTPS.');
        return;
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        activeStream = mediaStream;
        setStream(mediaStream);
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

  // 2. Hook memasukkan stream ke video element
  useEffect(() => {
    if (hasPermission && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error("Gagal auto-play di iOS:", err);
      });
    }
  }, [hasPermission, stream]);

  // 3. Hook proses decoding Barcode / QR Code
  useEffect(() => {
    if (!hasPermission || !stream || !videoRef.current || !isScanning) return;

    const codeReader = new BrowserMultiFormatReader();
    let active = true;

    const startScanning = async () => {
      // Pastikan elemen video menyala kembali ketika scanning diaktifkan
      if (videoRef.current) {
        if (!videoRef.current.srcObject) {
          videoRef.current.srcObject = stream;
        }
        try {
          await videoRef.current.play();
        } catch (e) {
          // Mengabaikan error play interrupter
        }
      }

      while (active && isScanning && videoRef.current) {
        try {
          const result = await codeReader.decodeFromVideoElement(videoRef.current);

          if (result && active) {
            const text = result.getText();
            setScannedResult(text);
            setIsScanning(false);

            if (navigator.vibrate) navigator.vibrate(200);

            // Logika Auto-Redirect jika hasil scan berupa Link/URL
            if (text.startsWith('http://') || text.startsWith('https://')) {
              window.location.href = text;
            } else if (text.startsWith('/')) {
              router.push(text);
            }
            break;
          }
        } catch (err) {
          if (!(err instanceof NotFoundException)) {
            console.error("Scan error:", err);
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };

    startScanning();

    return () => {
      // Cukup matikan loop scanning tanpa memanggil codeReader.reset() agar video tidak terputus
      active = false;
    };
  }, [hasPermission, stream, isScanning, router]);

  // Fungsi untuk reset state agar bisa scan ulang tanpa membuat kamera blank
  const handleResetScan = () => {
    setScannedResult(null);
    setIsScanning(true);

    if (videoRef.current) {
      if (!videoRef.current.srcObject && stream) {
        videoRef.current.srcObject = stream;
      }
      videoRef.current.play().catch(console.error);
    }
  };

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

          {/* UI VIEWFINDER */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-black/40" />

            <div className={`relative w-70 h-70 md:w-100 md:h-100 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden transition-colors ${scannedResult ? 'border-4 border-green-500' : ''}`}>
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-400 rounded-br-2xl" />
              {isScanning && (
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/80 shadow-[0_0_8px_2px_rgba(59,130,246,0.6)] animate-[scan_3s_ease-in-out_infinite]" />
              )}
            </div>
          </div>

          {/* OVERLAY HASIL SCAN & OPSI ACTION */}
          <div className="absolute bottom-12 z-20 text-center flex flex-col items-center gap-3 px-6 w-full max-w-md">
            {scannedResult ? (
              <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white w-full flex flex-col items-center gap-3 shadow-2xl">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Teks / Link Terdeteksi</p>
                <p className="font-bold text-sm break-all line-clamp-2">{scannedResult}</p>
                
                <div className="flex gap-2 w-full mt-1">
                  <button
                    onClick={handleResetScan}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition text-xs"
                  >
                    <RefreshCw size={16} /> Scan Lagi
                  </button>

                  {(scannedResult.startsWith('http://') || scannedResult.startsWith('https://')) && (
                    <a
                      href={scannedResult}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition text-xs"
                    >
                      <ExternalLink size={16} /> Buka Link
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-white font-bold bg-black/50 px-6 py-3 rounded-full backdrop-blur-sm animate-pulse">
                Arahkan kamera ke Barcode / QR Code
              </p>
            )}
          </div>
        </>
      )}

      {/* TAMPILAN ERROR PERMISSION */}
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

      {/* CSS ANIMASI */}
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