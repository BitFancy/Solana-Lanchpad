/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/launchpad',
  staticPageGenerationTimeout:  100,
 output:"standalone",
 experimental: {
  outputStandalone: true,
},   
 images:{
  loader:'akamai',
  path:"",
 },
}
module.exports = nextConfig
