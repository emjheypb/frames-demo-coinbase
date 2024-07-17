/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/gotogithub",
        destination:
          "https://emjheypb-webgl-demo.vercel.app/prototype3/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
