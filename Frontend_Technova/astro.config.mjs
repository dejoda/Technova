// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['gsap'],
      exclude: ['gsap/ScrollTrigger'] // ScrollTrigger se debe cargar dinámicamente
    },
    ssr: {
      noExternal: ['gsap'] // Importante para SSR
    }
    ,
    // Dev proxy: redirige peticiones a /api hacia el backend en http://localhost:8080
    // Evita problemas de CORS en el navegador durante el desarrollo.
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
});