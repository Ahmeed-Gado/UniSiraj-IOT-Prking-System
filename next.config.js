/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
        domains: ['firebasestorage.googleapis.com'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'recharts'],
    },
}

module.exports = nextConfig
