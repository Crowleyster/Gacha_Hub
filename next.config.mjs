/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'gamespace.com' },
      { protocol: 'https', hostname: 'play-lh.googleusercontent.com' },
    ],
    unoptimized: true,
  },
};

};

export default nextConfig;
