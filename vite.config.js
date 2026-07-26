import { defineConfig } from "vite";

function cssInjectedByJs() {
  return {
    name: "css-injected-by-js",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      let cssCode = "";
      let cssFileName = "";

      for (const fileName in bundle) {
        const item = bundle[fileName];
        if (item.type === "asset" && fileName.endsWith(".css")) {
          cssCode = item.source;
          cssFileName = fileName;
        }
      }

      if (!cssCode) return;

      for (const fileName in bundle) {
        const item = bundle[fileName];
        if (item.type === "chunk" && item.isEntry) {
          item.code =
            `(function(){var s=document.createElement("style");s.textContent=${JSON.stringify(cssCode)};document.head.appendChild(s);})();\n` +
            item.code;
        }
        if (item.type === "asset" && fileName.endsWith(".html")) {
          item.source = item.source.replace(
            /<link rel="stylesheet"[^>]*>\s*/g,
            "",
          );
        }
      }

      delete bundle[cssFileName];
    },
  };
}

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Book_catalog/" : "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    codeSplitting: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  plugins: [cssInjectedByJs()],
}));
