/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- Tambahan wajib untuk Capacitor
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['172.20.10.5'],
}

export default nextConfig