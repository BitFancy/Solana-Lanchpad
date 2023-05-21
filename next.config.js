/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/launchpad',
  staticPageGenerationTimeout:  100,
 output:"standalone",
 images:{
  loader:'akamai',
  path:"",
 },
 assetPrefix: '/launchpad',


}


module.exports = nextConfig
