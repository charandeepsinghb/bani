/** @type {import('vite').UserConfig} */
export default {
  // ...
  server: {
    host: "127.0.0.1",
    port: 8090
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        gurbanis: "gurbani/index.html",
        japjisahib: "gurbani/japji-sahib.html",
        sukhmanisahib: "gurbani/sukhmani-sahib.html"
      }
    }
  }
};
