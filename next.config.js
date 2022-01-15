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
        destination: 'http://localhost:4000/api/rest/:path*' // Proxy to Backend
      }
    ]
  }
}
