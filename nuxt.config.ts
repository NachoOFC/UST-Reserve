// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
   
  nitro: {
    preset: "netlify", // o  'netlify_edge'  si quieres Edge Functions
  },
  devtools: { enabled: true },
  css: [
    "@/assets/css/tailwind.css",
  ],
  
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