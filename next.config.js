/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/MyriadFlow/launchpad',
  staticPageGenerationTimeout:  100,
 output:"standalone",
 images:{
  loader:'akamai',
  path:"",
 },
 assetPrefix: '/MyriadFlow/launchpad',


}


module.exports = nextConfig
