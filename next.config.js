/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/rest/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL_API}/rest/:path*` // Proxy to Backend
      }
    ]
  }
}
