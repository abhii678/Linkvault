/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow ngrok cross-origin requests (Next.js 14 compatible)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://boggle-dairy-pummel.ngrok-free.dev" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
