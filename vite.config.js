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
        main: "scripts/bani.js"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
};
