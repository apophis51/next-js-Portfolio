import type { MetadataRoute } from 'next'
 


let myLandingPages = [ 
  '', '/ProgrammingBlogs', '/FiringRange','/Crypto/Crypto-Predictions','/Crypto/Crypto-Games-and-Predictions','/Web-Apps'
]

let myProducts = [
  '/girlfriend-ai-chat-new','/Web-Apps/ai-article-generator','/Web-Apps/ai-playground','/Work-Search-App'
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...myLandingPages.map((url) => ({
      url: `https://malcmind.com${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })),
    ...myProducts.map((url) => ({
      url: `https://malcmind.com${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }))
  ];
}
