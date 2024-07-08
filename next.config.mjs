/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/gotogithub",
        destination: "https://github.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
