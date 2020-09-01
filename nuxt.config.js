module.exports = {
  srcDir: "./client/",
  telemetry: false,
  mode: "universal",

  plugins: [
    {
      src: "~/plugins/socket.io",
      ssr: false,
    },
  ],
  head: {
    title: "Nuxt-test",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  components: true,
  modules: ["~/io"],
  env: {
    WS_URL: process.env.WS_URL || "http://localhost:3000",
  },
};