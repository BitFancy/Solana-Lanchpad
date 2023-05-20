/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  staticPageGenerationTimeout:  100,
 output:"standalone",
 images:{
  loader:'akamai',
  path:"",
 },
 basePath:'/launchpad',
 assetPrefix:'/launchpad',


}

module.exports = nextConfig
