// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              // primary: '#E1F0DA',
              // secondary: '#99BC85',
              // background: '#D4E7C5',
              // surface: '#BFD8AF',
            }
          }
        }
      }
    }
  }
})
