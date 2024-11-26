import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Smart Money Saver PWA',
    short_name: 'SMAPWA',
    description: 'A Progressive Web App Smart Money Saver with gemini AI',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icon512_maskable.png",
        type: "image/png"
      },
      {
        purpose: "any",
        src: '/icon512_rounded.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}