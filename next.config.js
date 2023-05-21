/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout:  100,
 output:"standalone",
 images:{
  loader:'akamai',
  path:"",
 },

}


module.exports = nextConfig
