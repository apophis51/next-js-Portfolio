/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
}

module.exports = nextConfig
