// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-icon", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      baseApi: process.env.BASE_API,
    },
  },
});
