/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'recharts'],
    },
}

module.exports = nextConfig
