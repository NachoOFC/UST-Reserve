// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  
  app: {
    head: {
      title: 'TomasinoSpace',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Sistema integral de gestión de salas de estudio para la Universidad Santo Tomás.'
        },
        { property: 'og:title', content: 'TomasinoSpace' },
        {
          property: 'og:description',
          content: 'Sistema integral de gestión de salas de estudio para la Universidad Santo Tomás.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/santotomas1.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/santotomas1.jpg' }
      ]
    }
  },
   
  nitro: {
    preset: "netlify",
  },
  devtools: { enabled: true },
  css: [
    "@/assets/css/tailwind.css",
    'vue-toastification/dist/index.css',
  ],
  
  // Experimental features to fix initialization issues
  experimental: {
    renderJsonPayloads: false
  },
  
  runtimeConfig: {
    NETLIFY_DATABASE_URL: process.env.DATABASE_URL,
    public: {}
  }
});