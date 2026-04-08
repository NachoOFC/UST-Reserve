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
    preset: "netlify", // o  'netlify_edge'  si quieres Edge Functions
  },
  devtools: { enabled: true },
  css: [
    "@/assets/css/tailwind.css",
    'vue-toastification/dist/index.css',
  ],
  
  // Experimental features to fix initialization issues
  experimental: {
    inlineSSRStyles: false,
    renderJsonPayloads: false
  },
  
  // Runtime config for environment variables
  runtimeConfig: {
    // Server-side environment variables
    NETLIFY_DATABASE_URL: process.env.NETLIFY_DATABASE_URL, // solo servidor
    
    // Public keys that will be exposed to the client
    public: {
      // Add any public environment variables here if needed
    }
  }
});