export default {
  assetPrefix: '/admin',
  basePath: '/admin',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        search: ''
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};
