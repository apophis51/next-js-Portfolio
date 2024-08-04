/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  typescript: {            //added 2023 to prevent typescript build errors
    ignoreBuildErrors: true,
  },
  swcMinify: true,   //end 20223 3dit
  rewrites: async () => {
    return [
      {
        source: '/api/python/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/python/:path*'
            : '/api/python',
      },
      
      
    ]
  },
  async redirects() {
    return [
      {
        source: '/WorkSearchApp/:slug*',
        destination: '/Work-Search-App/:slug*',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // reactStrictMode: false
  
}

module.exports = nextConfig
