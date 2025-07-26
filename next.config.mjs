/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // ou o tamanho que precisar
    },
  },
};

export default nextConfig;
