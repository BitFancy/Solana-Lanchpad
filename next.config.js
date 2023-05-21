/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/MyriadFlow',
  staticPageGenerationTimeout:  100,
 output:"standalone",
 images:{
  loader:'akamai',
  path:"",
 },
 assetPrefix: '/MyriadFlow',


}


module.exports = nextConfig
