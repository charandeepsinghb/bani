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
        gurbanis: "list.html",
        japjisahib: "japji-sahib.html",
        sukhmanisahib: "sukhmani-sahib.html"
      }
    },
    outDir: "gurbani"
  }
};
