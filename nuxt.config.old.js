
module.exports = {
  srcDir: "./client/",
  telemetry: false,
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Nuxt-test",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/checkRoute.js",
    // {src: "~/plugins/checkRoute.js" ,mode: 'server'}
    {
      src: "~/plugins/vueSocket.js",
      ssr: false
    }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */

  // serverMiddleware: ["~/api/index.js"],

  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    "@nuxtjs/bulma",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
    ['~/io']
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000/"
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  env: {
    // WS_URL: process.env.WS_URL || 'http://localhost:3000'
    WS_URL: process.env.WS_URL
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
};