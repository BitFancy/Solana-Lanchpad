/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/launchpad',
  staticPageGenerationTimeout: 100,
  output: "standalone",
  images: {
    loader: "akamai",
    domains: ["ipfs.io", "unsplash.com", "nftstorage.link"],
    path: "",
  },
};
module.exports = nextConfig;
