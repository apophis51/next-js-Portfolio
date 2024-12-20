/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    // swcPlugins: [["@preact-signals/safe-react/swc", {mode: "auto",
    // }]],
    reactCompiler: true,
    // ppr: 'incremental',

  },
  


  // experimental: {
  //   serverActions: true,
  // },
  // webpack: (config, { dev, isServer }) => {
  //   if (!isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: 'preact/compat',
  //       'react-dom/test-utils': 'preact/test-utils',
  //       'react-dom': 'preact/compat',
  //       "react/jsx-runtime": "preact/jsx-runtime"
  //     })
  //   }

  //   return config
  // },
  typescript: {            //added 2023 to prevent typescript build errors
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

//  swcMinify: true,   //end 20223 3dit
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
  reactStrictMode: false,
  
  
}

module.exports = nextConfig
