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
});