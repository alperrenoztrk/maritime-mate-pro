// vite.config.ts
import { defineConfig } from "file:///home/claude/maritime-mate-pro/node_modules/vite/dist/node/index.js";
import react from "file:///home/claude/maritime-mate-pro/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "fs";
import path from "path";
import { componentTagger } from "file:///home/claude/maritime-mate-pro/node_modules/lovable-tagger/dist/index.js";
import { VitePWA } from "file:///home/claude/maritime-mate-pro/node_modules/vite-plugin-pwa/dist/index.js";
import legacy, { cspHashes } from "file:///home/claude/maritime-mate-pro/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { mcpPlugin } from "file:///home/claude/maritime-mate-pro/node_modules/@lovable.dev/mcp-js/dist/stacks/supabase/vite.js";
var __vite_injected_original_dirname = "/home/claude/maritime-mate-pro";
var buildCsp = (isNative) => [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  isNative ? "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'" : `script-src 'self' 'wasm-unsafe-eval' ${cspHashes.map((h) => `'sha256-${h}'`).join(" ")}`,
  // Splash ekranı inline <style> + runtime CSS-in-JS için unsafe-inline gerekli.
  // Google Fonts kaynakları kaldırıldı: Inter ve JetBrains Mono artık
  // public/fonts altından self-host ediliyor, uygulama hiçbir yazı tipini
  // üçüncü taraftan çekmiyor.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  // Ders içerikleri onlarca farklı eğitim sitesinden görsel gösteriyor;
  // görseller pasif içerik olduğundan https: genelinde serbest bırakıldı.
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  // translate.googleapis.com: RouteTranslationGate'in çalışma zamanı makine
  // çevirisi (eksik sözlük girdileri) istemciden bu uca gider.
  // https://localhost: Capacitor Android'in kendi origin'i ve CapacitorHttp /
  // _capacitor_file_ köprü istekleri buradan geçer.
  `connect-src 'self'${isNative ? " https://localhost" : ""} https://*.supabase.co wss://*.supabase.co https://oauth.lovable.app https://*.lovable.app https://*.lovable.dev https://api.open-meteo.com https://geocoding-api.open-meteo.com https://ipapi.co https://api.bigdatacloud.net https://translate.googleapis.com`,
  "frame-src https://accounts.google.com https://www.youtube-nocookie.com https://www.youtube.com https://www.openstreetmap.org",
  "worker-src 'self' blob:",
  "manifest-src 'self'"
].join("; ");
function cspPlugin(isNative) {
  return {
    name: "inject-csp-meta",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: (html) => ({
        html,
        tags: [
          {
            tag: "meta",
            attrs: { "http-equiv": "Content-Security-Policy", content: buildCsp(isNative) },
            injectTo: "head-prepend"
          }
        ]
      })
    }
  };
}
function verifyPrecachePlugin() {
  let outDir = "dist";
  return {
    name: "verify-precache-manifest",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const swPath = path.resolve(__vite_injected_original_dirname, outDir, "sw.js");
      if (!fs.existsSync(swPath)) return;
      const sw = fs.readFileSync(swPath, "utf8");
      if (!sw.includes("createHandlerBoundToURL")) return;
      if (!/url:\s*"index\.html"/.test(sw)) {
        throw new Error(
          "Servis \xE7al\u0131\u015Fan\u0131 /index.html'e ba\u011Flan\u0131yor ama index.html precache manifestinde yok. Workbox globbing'i ba\u015Far\u0131s\u0131z olmu\u015F demektir (genellikle minimatch/brace-expansion s\xFCr\xFCm \xE7ak\u0131\u015Fmas\u0131). Bu build \xE7evrimd\u0131\u015F\u0131 a\xE7\u0131lmaz; yay\u0131nlanmamal\u0131."
        );
      }
    }
  };
}
var FALLBACK_SUPABASE_URL = "https://vrpbhguztsqakvjcezeb.supabase.co";
var FALLBACK_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycGJoZ3V6dHNxYWt2amNlemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTczNzcsImV4cCI6MjA4MTg3MzM3N30._RMAZAKoGsk9xmHAXCvITf8BW4f52WyHYdhJq4IEW4Y";
var FALLBACK_SUPABASE_PROJECT_ID = "vrpbhguztsqakvjcezeb";
var vite_config_default = defineConfig(({ mode }) => ({
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
      process.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL
    ),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY
    ),
    "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify(
      process.env.VITE_SUPABASE_PROJECT_ID || FALLBACK_SUPABASE_PROJECT_ID
    )
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    allowedHosts: true
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    allowedHosts: true
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    cspPlugin(mode === "native"),
    mcpPlugin(),
    mode !== "native" && VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      // CRITICAL: Disabled in dev to avoid breaking the Lovable preview iframe.
      // PWA / offline mode only activates in production builds (published app).
      devOptions: {
        enabled: false
      },
      includeAssets: [
        "favicon.png",
        "apple-touch-icon.png",
        "app-icon-192.png",
        "app-icon-512.png",
        "robots.txt",
        "maritime-logo.png",
        "maritime-background.svg",
        "maritime-home-background.svg",
        "nautical-chart-background.svg",
        "theme-prepaint.js"
      ],
      manifest: {
        name: "Mariner's Book",
        short_name: "Mariner's Book",
        description: "Professional tools for all mariners \u2014 calculators, lessons and references that work offline.",
        // Must match index.html theme-color and capacitor.config.ts StatusBar —
        // all three describe the same surface (top of the shell gradient).
        theme_color: "#111318",
        background_color: "#111318",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/app-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        // Don't cache OAuth/auth routes — they must always hit network
        navigateFallbackDenylist: [/^\/auth\//, /^\/api\//],
        // No individual shell asset should approach a locale/media payload.
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        // Precache only what is required to boot React. Route chunks are
        // content, not app-shell: forcing all ~1,600 lazy files into the
        // install transaction made a first update download ~36 MB before the
        // user could benefit from it. Hashed route chunks are cached on first
        // use by the immutable script rule below.
        globPatterns: ["**/*.{css,html,ico,woff2}", "assets/entry-*.js"],
        // Locale packs are route-independent 8–10 MB dictionaries. None may
        // block service-worker installation; each chosen language is cached by
        // the runtime rule below after the app shell is interactive.
        globIgnores: ["locales/**/*.json"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // HTML navigations must never be served cache-first, otherwise a
            // published update stays invisible until the SW happens to refresh.
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "app-shell-html",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 10 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Lazy route and feature chunks. Hashes make them immutable; once
            // a user opens a route it remains available offline without
            // blocking service-worker installation with every unused route.
            urlPattern: ({ request, sameOrigin }) => sameOrigin && request.destination === "script",
            handler: "CacheFirst",
            options: {
              cacheName: "app-route-chunks",
              expiration: { maxEntries: 900, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Per-language static translation dictionaries (public/locales/*.json)
            urlPattern: ({ url }) => url.pathname.includes("/locales/") && url.pathname.endsWith(".json"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "translation-locales-v2",
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" }
          },
          {
            // Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Local images / diagrams
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // PDFs (almanac, MARPOL, COLREG ders sunumu)
            urlPattern: /\.pdf$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "pdf-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // 3D simulator environment maps are large and optional.
            urlPattern: /\.hdr$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "environment-map-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    }),
    // Geniş Android uyumluluğu: Bu bir Capacitor (WebView) uygulaması olduğu için
    // çalıştığı Chromium sürümü cihazın Android/System WebView sürümüne bağlıdır.
    // WebView'i güncellenmemiş eski cihazlarda (Android 6-9, ~Chrome 44-74) modern
    // JS sözdizimi ve API'leri (?., ??, replaceAll, .at(), structuredClone, flatMap)
    // beyaz ekrana/çökmeye yol açar. @vitejs/plugin-legacy:
    //  - modern paket için eksik API'leri polyfill'ler (modernPolyfills),
    //  - modül desteği olmayan çok eski WebView'ler için ES5 + SystemJS legacy paket
    //    üretir (nomodule), böylece uygulama "çoğu Android sürümünde" açılır.
    mode !== "native" && legacy({
      // package.json "browserslist" ile hizalı en düşük hedefler.
      targets: [
        "Android >= 6",
        "Chrome >= 61",
        "iOS >= 12",
        "Safari >= 12",
        "Firefox >= 68",
        "Edge >= 79"
      ],
      // Modül destekleyen ama eski (Chrome 61-97) WebView'lerde eksik olan
      // çalışma zamanı API'lerini modern pakete de enjekte et.
      modernPolyfills: true,
      // async/await kullanan eski (ES5) legacy paket için gerekli.
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }),
    // VitePWA sw.js'i closeBundle'da ürettiği için doğrulama en sonda durmalı.
    mode !== "native" && verifyPrecachePlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // Capacitor bundles run in current WKWebView/Android WebView and already
    // package every asset locally. A dedicated native profile avoids shipping
    // the duplicate ES5/nomodule tree and a service worker that a WebView does
    // not need. The default web build keeps the existing legacy + PWA support.
    target: mode === "native" ? "es2020" : void 0,
    // NOT: Modern paketin hedefini (build.target) @vitejs/plugin-legacy yönetir
    // (modül + dynamic import destekleyen WebView tabanı, ~Chrome 64). Modülü
    // olup dynamic import'u olmayan "arada kalan" eski WebView'ler (Chrome 61-63)
    // plugin'in dynamic-import geri dönüş kontrolüyle otomatik olarak ES5 legacy
    // paketine düşer. Eski cihaz desteği legacy() eklentisinin "targets" seçeneğiyle
    // ayarlanır; burada elle build.target vermek plugin ile çakışırdı.
    rollupOptions: {
      output: {
        // Hash-only chunk names avoid S3 "same object" upload collisions caused
        // by many dynamic-import chunks sharing short numeric names like "1-*.js".
        chunkFileNames: "assets/chunk-[hash].js",
        entryFileNames: "assets/entry-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (!id.includes("node_modules")) return void 0;
          if (id.includes("/three/examples/")) return "vendor-three-extras";
          if (id.includes("@react-three/drei")) return "vendor-three-drei";
          if (id.includes("@react-three/fiber")) return "vendor-three-react";
          if (id.includes("/three/")) return "vendor-three-core";
          if (id.includes("recharts")) return "vendor-recharts";
          if (id.includes("d3-")) return "vendor-d3";
          if (id.includes("exceljs")) return "vendor-excel";
          if (id.includes("pdf-lib")) return "vendor-pdf";
          if (id.includes("html2canvas")) return "vendor-capture";
          if (id.includes("@supabase")) return "vendor-supabase";
          if (id.includes("@lovable.dev/cloud-auth")) return "vendor-cloud-auth";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("react") || id.includes("scheduler")) return "vendor-react";
          return void 0;
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9jbGF1ZGUvbWFyaXRpbWUtbWF0ZS1wcm9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2NsYXVkZS9tYXJpdGltZS1tYXRlLXByby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9jbGF1ZGUvbWFyaXRpbWUtbWF0ZS1wcm8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgUGx1Z2luIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5pbXBvcnQgbGVnYWN5LCB7IGNzcEhhc2hlcyB9IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1sZWdhY3lcIjtcbmltcG9ydCB7IG1jcFBsdWdpbiB9IGZyb20gXCJAbG92YWJsZS5kZXYvbWNwLWpzL3N0YWNrcy9zdXBhYmFzZS92aXRlXCI7XG5cbi8vIENvbnRlbnQtU2VjdXJpdHktUG9saWN5IFx1MjAxNCBcdTAwRkNyZXRpbSBidWlsZCdpbmUgPG1ldGE+IG9sYXJhayBlbmpla3RlIGVkaWxpci5cbi8vIEJhclx1MDEzMW5kXHUwMTMxcm1hIChMb3ZhYmxlKSB2ZSBDYXBhY2l0b3IgV2ViVmlldydpbmRlIEhUVFAgYmFcdTAxNUZsXHUwMTMxa2xhclx1MDEzMW5cdTAxMzEga29udHJvbFxuLy8gZWRlbWVkaVx1MDExRmltaXogaVx1MDBFN2luIENTUCduaW4gdGVrIGdcdTAwRkN2ZW5pbGlyIHRhXHUwMTVGXHUwMTMxeVx1MDEzMWNcdTAxMzFzXHUwMTMxIGluZGV4Lmh0bWwnZGlyLlxuLy8gWWFsblx1MDEzMXpjYSBidWlsZCdkZSB1eWd1bGFuXHUwMTMxcjsgZGV2IHN1bnVjdXN1IChITVIvUmVhY3QgcmVmcmVzaCBpbmxpbmVcbi8vIHNjcmlwdCdsZXJpKSBrXHUwMTMxc1x1MDEzMXRsYW5tYXouXG4vL1xuLy8gc2NyaXB0LXNyYzogJ3NlbGYnICsgQHZpdGVqcy9wbHVnaW4tbGVnYWN5J25pbiBlbmpla3RlIGV0dGlcdTAxMUZpIGRcdTAwRjZydCBpbmxpbmVcbi8vIHNuaXBwZXQnaW4gc2hhMjU2IGhhc2gnbGVyaSAoY3NwSGFzaGVzKSArIHBkZi5qcydpbiBXQVNNIGRlY29kZXInbGFyXHUwMTMxIGlcdTAwRTdpblxuLy8gJ3dhc20tdW5zYWZlLWV2YWwnLiBFbmpla3RlIGVkaWxlbiBoYXJpY2kgc2NyaXB0J2xlciAoWFNTJ2luIGFuYSB2ZWt0XHUwMEY2clx1MDBGQylcbi8vIHRhbWFtZW4gZW5nZWxsZW5pci4gUmVrbGFtL2FuYWxpdGlrIHdlYidkZSBldGtpbmxlXHUwMTVGdGlyaWxpcnNlIGlsZ2lsaSBHb29nbGVcbi8vIGFsYW4gYWRsYXJcdTAxMzFuXHUwMTMxbiBidXJheWEgZWtsZW5tZXNpIGdlcmVraXIgKEFuZHJvaWQnZGUgQWRNb2IgbmF0aXZlIFx1MDBFN2FsXHUwMTMxXHUwMTVGXHUwMTMxcixcbi8vIENTUCdkZW4gZXRraWxlbm1leikuXG4vL1xuLy8gTmF0aXZlIChDYXBhY2l0b3IpIHByb2ZpbGk6IEFuZHJvaWQgV2ViVmlldywga1x1MDBGNnByXHUwMEZDIHNjcmlwdCdpbmkgKHdpbmRvdy5DYXBhY2l0b3IsXG4vLyBwbHVnaW4gcHJveHknbGVyaSkgXHUwMEU3YWxcdTAxMzFcdTAxNUZtYSBhblx1MDEzMW5kYSBpbmxpbmUgPHNjcmlwdD4gb2xhcmFrIGVuamVrdGUgZWRlci4gQ1NQXG4vLyBMZXZlbCAyKyBrdXJhbFx1MDEzMSBnZXJlXHUwMTFGaSBzY3JpcHQtc3JjJ2RlIGhhc2ggdmFyc2EgJ3Vuc2FmZS1pbmxpbmUnIFlPSyBTQVlJTElSO1xuLy8gYnUgeVx1MDBGQ3pkZW4gbmF0aXZlIHByb2ZpbGRlIGxlZ2FjeSBwbHVnaW4gaGFzaCdsZXJpIChuYXRpdmUnZGUgcGx1Z2luIHphdGVuXG4vLyBkZXZyZSBkXHUwMTMxXHUwMTVGXHUwMTMxLCBoYXNoJ2xlciBcdTAwRjZsXHUwMEZDKSB0YW1hbWVuIFx1MDBFN1x1MDEzMWthclx1MDEzMWxcdTAxMzFyIHZlICd1bnNhZmUtaW5saW5lJyB2ZXJpbGlyLlxuLy8gRGlcdTAxMUZlciBkaXJla3RpZmxlciAob2JqZWN0LXNyYywgY29ubmVjdC1zcmMsIGZyYW1lLXNyYyAuLi4pIG5hdGl2ZSdkZSBkZSBrb3J1bnVyLlxuY29uc3QgYnVpbGRDc3AgPSAoaXNOYXRpdmU6IGJvb2xlYW4pID0+XG4gIFtcbiAgICBcImRlZmF1bHQtc3JjICdzZWxmJ1wiLFxuICAgIFwiYmFzZS11cmkgJ3NlbGYnXCIsXG4gICAgXCJvYmplY3Qtc3JjICdub25lJ1wiLFxuICAgIFwiZm9ybS1hY3Rpb24gJ3NlbGYnXCIsXG4gICAgaXNOYXRpdmVcbiAgICAgID8gXCJzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3dhc20tdW5zYWZlLWV2YWwnXCJcbiAgICAgIDogYHNjcmlwdC1zcmMgJ3NlbGYnICd3YXNtLXVuc2FmZS1ldmFsJyAke2NzcEhhc2hlcy5tYXAoKGgpID0+IGAnc2hhMjU2LSR7aH0nYCkuam9pbihcIiBcIil9YCxcbiAgICAvLyBTcGxhc2ggZWtyYW5cdTAxMzEgaW5saW5lIDxzdHlsZT4gKyBydW50aW1lIENTUy1pbi1KUyBpXHUwMEU3aW4gdW5zYWZlLWlubGluZSBnZXJla2xpLlxuICAgIC8vIEdvb2dsZSBGb250cyBrYXluYWtsYXJcdTAxMzEga2FsZFx1MDEzMXJcdTAxMzFsZFx1MDEzMTogSW50ZXIgdmUgSmV0QnJhaW5zIE1vbm8gYXJ0XHUwMTMxa1xuICAgIC8vIHB1YmxpYy9mb250cyBhbHRcdTAxMzFuZGFuIHNlbGYtaG9zdCBlZGlsaXlvciwgdXlndWxhbWEgaGlcdTAwRTdiaXIgeWF6XHUwMTMxIHRpcGluaVxuICAgIC8vIFx1MDBGQ1x1MDBFN1x1MDBGQ25jXHUwMEZDIHRhcmFmdGFuIFx1MDBFN2VrbWl5b3IuXG4gICAgXCJzdHlsZS1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJ1wiLFxuICAgIFwiZm9udC1zcmMgJ3NlbGYnIGRhdGE6XCIsXG4gICAgLy8gRGVycyBpXHUwMEU3ZXJpa2xlcmkgb25sYXJjYSBmYXJrbFx1MDEzMSBlXHUwMTFGaXRpbSBzaXRlc2luZGVuIGdcdTAwRjZyc2VsIGdcdTAwRjZzdGVyaXlvcjtcbiAgICAvLyBnXHUwMEY2cnNlbGxlciBwYXNpZiBpXHUwMEU3ZXJpayBvbGR1XHUwMTFGdW5kYW4gaHR0cHM6IGdlbmVsaW5kZSBzZXJiZXN0IGJcdTAxMzFyYWtcdTAxMzFsZFx1MDEzMS5cbiAgICBcImltZy1zcmMgJ3NlbGYnIGRhdGE6IGJsb2I6IGh0dHBzOlwiLFxuICAgIFwibWVkaWEtc3JjICdzZWxmJyBibG9iOiBodHRwczpcIixcbiAgICAvLyB0cmFuc2xhdGUuZ29vZ2xlYXBpcy5jb206IFJvdXRlVHJhbnNsYXRpb25HYXRlJ2luIFx1MDBFN2FsXHUwMTMxXHUwMTVGbWEgemFtYW5cdTAxMzEgbWFraW5lXG4gICAgLy8gXHUwMEU3ZXZpcmlzaSAoZWtzaWsgc1x1MDBGNnpsXHUwMEZDayBnaXJkaWxlcmkpIGlzdGVtY2lkZW4gYnUgdWNhIGdpZGVyLlxuICAgIC8vIGh0dHBzOi8vbG9jYWxob3N0OiBDYXBhY2l0b3IgQW5kcm9pZCdpbiBrZW5kaSBvcmlnaW4naSB2ZSBDYXBhY2l0b3JIdHRwIC9cbiAgICAvLyBfY2FwYWNpdG9yX2ZpbGVfIGtcdTAwRjZwclx1MDBGQyBpc3Rla2xlcmkgYnVyYWRhbiBnZVx1MDBFN2VyLlxuICAgIGBjb25uZWN0LXNyYyAnc2VsZicke2lzTmF0aXZlID8gXCIgaHR0cHM6Ly9sb2NhbGhvc3RcIiA6IFwiXCJ9IGh0dHBzOi8vKi5zdXBhYmFzZS5jbyB3c3M6Ly8qLnN1cGFiYXNlLmNvIGh0dHBzOi8vb2F1dGgubG92YWJsZS5hcHAgaHR0cHM6Ly8qLmxvdmFibGUuYXBwIGh0dHBzOi8vKi5sb3ZhYmxlLmRldiBodHRwczovL2FwaS5vcGVuLW1ldGVvLmNvbSBodHRwczovL2dlb2NvZGluZy1hcGkub3Blbi1tZXRlby5jb20gaHR0cHM6Ly9pcGFwaS5jbyBodHRwczovL2FwaS5iaWdkYXRhY2xvdWQubmV0IGh0dHBzOi8vdHJhbnNsYXRlLmdvb2dsZWFwaXMuY29tYCxcbiAgICBcImZyYW1lLXNyYyBodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20gaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20gaHR0cHM6Ly93d3cueW91dHViZS5jb20gaHR0cHM6Ly93d3cub3BlbnN0cmVldG1hcC5vcmdcIixcbiAgICBcIndvcmtlci1zcmMgJ3NlbGYnIGJsb2I6XCIsXG4gICAgXCJtYW5pZmVzdC1zcmMgJ3NlbGYnXCIsXG4gIF0uam9pbihcIjsgXCIpO1xuXG5mdW5jdGlvbiBjc3BQbHVnaW4oaXNOYXRpdmU6IGJvb2xlYW4pOiBQbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiaW5qZWN0LWNzcC1tZXRhXCIsXG4gICAgYXBwbHk6IFwiYnVpbGRcIixcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgIG9yZGVyOiBcInBvc3RcIixcbiAgICAgIGhhbmRsZXI6IChodG1sKSA9PiAoe1xuICAgICAgICBodG1sLFxuICAgICAgICB0YWdzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGFnOiBcIm1ldGFcIixcbiAgICAgICAgICAgIGF0dHJzOiB7IFwiaHR0cC1lcXVpdlwiOiBcIkNvbnRlbnQtU2VjdXJpdHktUG9saWN5XCIsIGNvbnRlbnQ6IGJ1aWxkQ3NwKGlzTmF0aXZlKSB9LFxuICAgICAgICAgICAgaW5qZWN0VG86IFwiaGVhZC1wcmVwZW5kXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIH0sXG4gIH07XG59XG5cblxuLy8gV29ya2JveCdcdTAxMzFuIHByZWNhY2hlIG1hbmlmZXN0aSBzZXNzaXpjZSBib1x1MDE1RmFsYWJpbGl5b3I6IGdsb2IgYmFcdTAxMUZcdTAxMzFtbFx1MDEzMWxcdTAxMzFrIHppbmNpcmlcbi8vIGJvenVsZHVcdTAxMUZ1bmRhIChcIkFuIGVycm9yIG9jY3VycmVkIHdoZW4gZ2xvYmJpbmcgZm9yIGZpbGVzXCIpIGJ1aWxkIHlhbG5cdTAxMzF6Y2EgdXlhclx1MDEzMVxuLy8gYmFzXHUwMTMxcCBiYVx1MDE1RmFyXHUwMTMxbFx1MDEzMSBzYXlcdTAxMzFsXHUwMTMxeW9yLiBCXHUwMEY2eWxlIGJpciBzdy5qcyBoaVx1MDBFN2JpciBhc3NldCdpIFx1MDBGNm5iZWxsZVx1MDExRmUgYWxtYXogYW1hXG4vLyB5aW5lIGRlIGBjcmVhdGVIYW5kbGVyQm91bmRUb1VSTChcIi9pbmRleC5odG1sXCIpYCBcdTAwRTdhXHUwMTFGXHUwMTMxclx1MDEzMXI7IGJ1IFx1MDBFN2FcdTAxMUZyXHUwMTMxIHByZWNhY2hlJ3RlXG4vLyBvbG1heWFuIFVSTCBpXHUwMEU3aW4gaGF0YSBmXHUwMTMxcmxhdHRcdTAxMzFcdTAxMUZcdTAxMzFuZGFuIHNlcnZpcyBcdTAwRTdhbFx1MDEzMVx1MDE1RmFuXHUwMTMxblx1MDEzMW4gbyBzYXRcdTAxMzFyZGFuIHNvbnJha2kgVFx1MDBEQ01cbi8vIHJvdXRlIGtheVx1MDEzMXRsYXJcdTAxMzEgaGlcdTAwRTcgXHUwMEU3YWxcdTAxMzFcdTAxNUZtYXogXHUyMDE0IHV5Z3VsYW1hIFx1MDBFN2V2cmltZFx1MDEzMVx1MDE1Rlx1MDEzMSBoaVx1MDBFNyBhXHUwMEU3XHUwMTMxbG1hei4gU2Vzc2l6IGthbG1hc1x1MDEzMVxuLy8geWVyaW5lIGJ1aWxkJ2kgZHVyZHVyLlxuZnVuY3Rpb24gdmVyaWZ5UHJlY2FjaGVQbHVnaW4oKTogUGx1Z2luIHtcbiAgbGV0IG91dERpciA9IFwiZGlzdFwiO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwidmVyaWZ5LXByZWNhY2hlLW1hbmlmZXN0XCIsXG4gICAgYXBwbHk6IFwiYnVpbGRcIixcbiAgICBjb25maWdSZXNvbHZlZChjb25maWcpIHtcbiAgICAgIG91dERpciA9IGNvbmZpZy5idWlsZC5vdXREaXI7XG4gICAgfSxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGNvbnN0IHN3UGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIG91dERpciwgXCJzdy5qc1wiKTtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhzd1BhdGgpKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHN3ID0gZnMucmVhZEZpbGVTeW5jKHN3UGF0aCwgXCJ1dGY4XCIpO1xuICAgICAgLy8gbmF2aWdhdGVGYWxsYmFjayBrdWxsYW5cdTAxMzFsbVx1MDEzMXlvcnNhIGRvXHUwMTFGcnVsYW5hY2FrIGJpciBiYVx1MDExRiBkYSB5b2suXG4gICAgICBpZiAoIXN3LmluY2x1ZGVzKFwiY3JlYXRlSGFuZGxlckJvdW5kVG9VUkxcIikpIHJldHVybjtcblxuICAgICAgaWYgKCEvdXJsOlxccypcImluZGV4XFwuaHRtbFwiLy50ZXN0KHN3KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJTZXJ2aXMgXHUwMEU3YWxcdTAxMzFcdTAxNUZhblx1MDEzMSAvaW5kZXguaHRtbCdlIGJhXHUwMTFGbGFuXHUwMTMxeW9yIGFtYSBpbmRleC5odG1sIHByZWNhY2hlIFwiICtcbiAgICAgICAgICAgIFwibWFuaWZlc3RpbmRlIHlvay4gV29ya2JveCBnbG9iYmluZydpIGJhXHUwMTVGYXJcdTAxMzFzXHUwMTMxeiBvbG11XHUwMTVGIGRlbWVrdGlyIFwiICtcbiAgICAgICAgICAgIFwiKGdlbmVsbGlrbGUgbWluaW1hdGNoL2JyYWNlLWV4cGFuc2lvbiBzXHUwMEZDclx1MDBGQ20gXHUwMEU3YWtcdTAxMzFcdTAxNUZtYXNcdTAxMzEpLiBCdSBidWlsZCBcIiArXG4gICAgICAgICAgICBcIlx1MDBFN2V2cmltZFx1MDEzMVx1MDE1Rlx1MDEzMSBhXHUwMEU3XHUwMTMxbG1hejsgeWF5XHUwMTMxbmxhbm1hbWFsXHUwMTMxLlwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG5cbi8vIFB1Ymxpc2hhYmxlIChwdWJsaWMpIExvdmFibGUgQ2xvdWQgY3JlZGVudGlhbHMuIFVzZWQgYXMgYSBidWlsZC10aW1lIGZhbGxiYWNrXG4vLyBzbyB0aGF0IGlmIGAuZW52YCBpcyBtaXNzaW5nIGR1cmluZyBhIHB1Ymxpc2gvYnVpbGQsIHRoZSBjbGllbnQgc3RpbGxcbi8vIGluaXRpYWxpemVzIHdpdGggYSB2YWxpZCBVUkwva2V5IGluc3RlYWQgb2YgY3Jhc2hpbmcgd2l0aFxuLy8gXCJzdXBhYmFzZVVybCBpcyByZXF1aXJlZFwiLiBCb3RoIHZhbHVlcyBhcmUgc2FmZSB0byBzaGlwIGluIHRoZSBicm93c2VyIGJ1bmRsZS5cbmNvbnN0IEZBTExCQUNLX1NVUEFCQVNFX1VSTCA9IFwiaHR0cHM6Ly92cnBiaGd1enRzcWFrdmpjZXplYi5zdXBhYmFzZS5jb1wiO1xuY29uc3QgRkFMTEJBQ0tfU1VQQUJBU0VfUFVCTElTSEFCTEVfS0VZID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJblp5Y0dKb1ozVjZkSE54WVd0MmFtTmxlbVZpSWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTNOall5T1Rjek56Y3NJbVY0Y0NJNk1qQTRNVGczTXpNM04zMC5fUk1BWkFLb0dzazl4bUhBWEN2SVRmOEJXNGY1Mld5SFlkaEpxNElFVzRZXCI7XG5jb25zdCBGQUxMQkFDS19TVVBBQkFTRV9QUk9KRUNUX0lEID0gXCJ2cnBiaGd1enRzcWFrdmpjZXplYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBkZWZpbmU6IHtcbiAgICBcImltcG9ydC5tZXRhLmVudi5WSVRFX1NVUEFCQVNFX1VSTFwiOiBKU09OLnN0cmluZ2lmeShcbiAgICAgIHByb2Nlc3MuZW52LlZJVEVfU1VQQUJBU0VfVVJMIHx8IEZBTExCQUNLX1NVUEFCQVNFX1VSTCxcbiAgICApLFxuICAgIFwiaW1wb3J0Lm1ldGEuZW52LlZJVEVfU1VQQUJBU0VfUFVCTElTSEFCTEVfS0VZXCI6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgcHJvY2Vzcy5lbnYuVklURV9TVVBBQkFTRV9QVUJMSVNIQUJMRV9LRVkgfHwgRkFMTEJBQ0tfU1VQQUJBU0VfUFVCTElTSEFCTEVfS0VZLFxuICAgICksXG4gICAgXCJpbXBvcnQubWV0YS5lbnYuVklURV9TVVBBQkFTRV9QUk9KRUNUX0lEXCI6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgcHJvY2Vzcy5lbnYuVklURV9TVVBBQkFTRV9QUk9KRUNUX0lEIHx8IEZBTExCQUNLX1NVUEFCQVNFX1BST0pFQ1RfSUQsXG4gICAgKSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGFsbG93ZWRIb3N0czogdHJ1ZSxcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IDgwODAsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICBhbGxvd2VkSG9zdHM6IHRydWUsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgY29tcG9uZW50VGFnZ2VyKCksXG4gICAgY3NwUGx1Z2luKG1vZGUgPT09IFwibmF0aXZlXCIpLFxuICAgIG1jcFBsdWdpbigpLFxuICAgIG1vZGUgIT09IFwibmF0aXZlXCIgJiYgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgaW5qZWN0UmVnaXN0ZXI6IGZhbHNlLFxuICAgICAgLy8gQ1JJVElDQUw6IERpc2FibGVkIGluIGRldiB0byBhdm9pZCBicmVha2luZyB0aGUgTG92YWJsZSBwcmV2aWV3IGlmcmFtZS5cbiAgICAgIC8vIFBXQSAvIG9mZmxpbmUgbW9kZSBvbmx5IGFjdGl2YXRlcyBpbiBwcm9kdWN0aW9uIGJ1aWxkcyAocHVibGlzaGVkIGFwcCkuXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcbiAgICAgICAgXCJmYXZpY29uLnBuZ1wiLFxuICAgICAgICBcImFwcGxlLXRvdWNoLWljb24ucG5nXCIsXG4gICAgICAgIFwiYXBwLWljb24tMTkyLnBuZ1wiLFxuICAgICAgICBcImFwcC1pY29uLTUxMi5wbmdcIixcbiAgICAgICAgXCJyb2JvdHMudHh0XCIsXG4gICAgICAgIFwibWFyaXRpbWUtbG9nby5wbmdcIixcbiAgICAgICAgXCJtYXJpdGltZS1iYWNrZ3JvdW5kLnN2Z1wiLFxuICAgICAgICBcIm1hcml0aW1lLWhvbWUtYmFja2dyb3VuZC5zdmdcIixcbiAgICAgICAgXCJuYXV0aWNhbC1jaGFydC1iYWNrZ3JvdW5kLnN2Z1wiLFxuICAgICAgICBcInRoZW1lLXByZXBhaW50LmpzXCIsXG4gICAgICBdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJNYXJpbmVyJ3MgQm9va1wiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIk1hcmluZXIncyBCb29rXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlByb2Zlc3Npb25hbCB0b29scyBmb3IgYWxsIG1hcmluZXJzIFx1MjAxNCBjYWxjdWxhdG9ycywgbGVzc29ucyBhbmQgcmVmZXJlbmNlcyB0aGF0IHdvcmsgb2ZmbGluZS5cIixcbiAgICAgICAgLy8gTXVzdCBtYXRjaCBpbmRleC5odG1sIHRoZW1lLWNvbG9yIGFuZCBjYXBhY2l0b3IuY29uZmlnLnRzIFN0YXR1c0JhciBcdTIwMTRcbiAgICAgICAgLy8gYWxsIHRocmVlIGRlc2NyaWJlIHRoZSBzYW1lIHN1cmZhY2UgKHRvcCBvZiB0aGUgc2hlbGwgZ3JhZGllbnQpLlxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjMTExMzE4XCIsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiIzExMTMxOFwiLFxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgb3JpZW50YXRpb246IFwicG9ydHJhaXRcIixcbiAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcbiAgICAgICAgc2NvcGU6IFwiL1wiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHsgc3JjOiBcIi9hcHAtaWNvbi0xOTIucG5nXCIsIHNpemVzOiBcIjE5MngxOTJcIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgcHVycG9zZTogXCJhbnlcIiB9LFxuICAgICAgICAgIHsgc3JjOiBcIi9hcHAtaWNvbi01MTIucG5nXCIsIHNpemVzOiBcIjUxMng1MTJcIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIiB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFjazogXCIvaW5kZXguaHRtbFwiLFxuICAgICAgICAvLyBEb24ndCBjYWNoZSBPQXV0aC9hdXRoIHJvdXRlcyBcdTIwMTQgdGhleSBtdXN0IGFsd2F5cyBoaXQgbmV0d29ya1xuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFsvXlxcL2F1dGhcXC8vLCAvXlxcL2FwaVxcLy9dLFxuICAgICAgICAvLyBObyBpbmRpdmlkdWFsIHNoZWxsIGFzc2V0IHNob3VsZCBhcHByb2FjaCBhIGxvY2FsZS9tZWRpYSBwYXlsb2FkLlxuICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogMyAqIDEwMjQgKiAxMDI0LFxuICAgICAgICAvLyBQcmVjYWNoZSBvbmx5IHdoYXQgaXMgcmVxdWlyZWQgdG8gYm9vdCBSZWFjdC4gUm91dGUgY2h1bmtzIGFyZVxuICAgICAgICAvLyBjb250ZW50LCBub3QgYXBwLXNoZWxsOiBmb3JjaW5nIGFsbCB+MSw2MDAgbGF6eSBmaWxlcyBpbnRvIHRoZVxuICAgICAgICAvLyBpbnN0YWxsIHRyYW5zYWN0aW9uIG1hZGUgYSBmaXJzdCB1cGRhdGUgZG93bmxvYWQgfjM2IE1CIGJlZm9yZSB0aGVcbiAgICAgICAgLy8gdXNlciBjb3VsZCBiZW5lZml0IGZyb20gaXQuIEhhc2hlZCByb3V0ZSBjaHVua3MgYXJlIGNhY2hlZCBvbiBmaXJzdFxuICAgICAgICAvLyB1c2UgYnkgdGhlIGltbXV0YWJsZSBzY3JpcHQgcnVsZSBiZWxvdy5cbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntjc3MsaHRtbCxpY28sd29mZjJ9XCIsIFwiYXNzZXRzL2VudHJ5LSouanNcIl0sXG4gICAgICAgIC8vIExvY2FsZSBwYWNrcyBhcmUgcm91dGUtaW5kZXBlbmRlbnQgOFx1MjAxMzEwIE1CIGRpY3Rpb25hcmllcy4gTm9uZSBtYXlcbiAgICAgICAgLy8gYmxvY2sgc2VydmljZS13b3JrZXIgaW5zdGFsbGF0aW9uOyBlYWNoIGNob3NlbiBsYW5ndWFnZSBpcyBjYWNoZWQgYnlcbiAgICAgICAgLy8gdGhlIHJ1bnRpbWUgcnVsZSBiZWxvdyBhZnRlciB0aGUgYXBwIHNoZWxsIGlzIGludGVyYWN0aXZlLlxuICAgICAgICBnbG9iSWdub3JlczogW1wibG9jYWxlcy8qKi8qLmpzb25cIl0sXG4gICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcbiAgICAgICAgcnVudGltZUNhY2hpbmc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBIVE1MIG5hdmlnYXRpb25zIG11c3QgbmV2ZXIgYmUgc2VydmVkIGNhY2hlLWZpcnN0LCBvdGhlcndpc2UgYVxuICAgICAgICAgICAgLy8gcHVibGlzaGVkIHVwZGF0ZSBzdGF5cyBpbnZpc2libGUgdW50aWwgdGhlIFNXIGhhcHBlbnMgdG8gcmVmcmVzaC5cbiAgICAgICAgICAgIHVybFBhdHRlcm46ICh7IHJlcXVlc3QgfSkgPT4gcmVxdWVzdC5tb2RlID09PSBcIm5hdmlnYXRlXCIsXG4gICAgICAgICAgICBoYW5kbGVyOiBcIk5ldHdvcmtGaXJzdFwiLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6IFwiYXBwLXNoZWxsLWh0bWxcIixcbiAgICAgICAgICAgICAgbmV0d29ya1RpbWVvdXRTZWNvbmRzOiAzLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7IG1heEVudHJpZXM6IDEwIH0sXG4gICAgICAgICAgICAgIGNhY2hlYWJsZVJlc3BvbnNlOiB7IHN0YXR1c2VzOiBbMCwgMjAwXSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIExhenkgcm91dGUgYW5kIGZlYXR1cmUgY2h1bmtzLiBIYXNoZXMgbWFrZSB0aGVtIGltbXV0YWJsZTsgb25jZVxuICAgICAgICAgICAgLy8gYSB1c2VyIG9wZW5zIGEgcm91dGUgaXQgcmVtYWlucyBhdmFpbGFibGUgb2ZmbGluZSB3aXRob3V0XG4gICAgICAgICAgICAvLyBibG9ja2luZyBzZXJ2aWNlLXdvcmtlciBpbnN0YWxsYXRpb24gd2l0aCBldmVyeSB1bnVzZWQgcm91dGUuXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAoeyByZXF1ZXN0LCBzYW1lT3JpZ2luIH0pID0+XG4gICAgICAgICAgICAgIHNhbWVPcmlnaW4gJiYgcmVxdWVzdC5kZXN0aW5hdGlvbiA9PT0gXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6IFwiYXBwLXJvdXRlLWNodW5rc1wiLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7IG1heEVudHJpZXM6IDkwMCwgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogOTAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHsgc3RhdHVzZXM6IFswLCAyMDBdIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBQZXItbGFuZ3VhZ2Ugc3RhdGljIHRyYW5zbGF0aW9uIGRpY3Rpb25hcmllcyAocHVibGljL2xvY2FsZXMvKi5qc29uKVxuICAgICAgICAgICAgdXJsUGF0dGVybjogKHsgdXJsIH0pID0+IHVybC5wYXRobmFtZS5pbmNsdWRlcyhcIi9sb2NhbGVzL1wiKSAmJiB1cmwucGF0aG5hbWUuZW5kc1dpdGgoXCIuanNvblwiKSxcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiU3RhbGVXaGlsZVJldmFsaWRhdGVcIixcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiBcInRyYW5zbGF0aW9uLWxvY2FsZXMtdjJcIixcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjogeyBtYXhFbnRyaWVzOiA0MCwgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogOTAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHsgc3RhdHVzZXM6IFswLCAyMDBdIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gR29vZ2xlIEZvbnRzIHN0eWxlc2hlZXRzXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ29vZ2xlYXBpc1xcLmNvbVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiBcIlN0YWxlV2hpbGVSZXZhbGlkYXRlXCIsXG4gICAgICAgICAgICBvcHRpb25zOiB7IGNhY2hlTmFtZTogXCJnb29nbGUtZm9udHMtc3R5bGVzaGVldHNcIiB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gR29vZ2xlIEZvbnRzIGZpbGVzXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ3N0YXRpY1xcLmNvbVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiBcIkNhY2hlRmlyc3RcIixcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiBcImdvb2dsZS1mb250cy13ZWJmb250c1wiLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7IG1heEVudHJpZXM6IDMwLCBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzNjUgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHsgc3RhdHVzZXM6IFswLCAyMDBdIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gTG9jYWwgaW1hZ2VzIC8gZGlhZ3JhbXNcbiAgICAgICAgICAgIHVybFBhdHRlcm46ICh7IHJlcXVlc3QgfSkgPT4gcmVxdWVzdC5kZXN0aW5hdGlvbiA9PT0gXCJpbWFnZVwiLFxuICAgICAgICAgICAgaGFuZGxlcjogXCJDYWNoZUZpcnN0XCIsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJpbWFnZS1jYWNoZVwiLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7IG1heEVudHJpZXM6IDIwMCwgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogNjAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHsgc3RhdHVzZXM6IFswLCAyMDBdIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gUERGcyAoYWxtYW5hYywgTUFSUE9MLCBDT0xSRUcgZGVycyBzdW51bXUpXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXFwucGRmJC9pLFxuICAgICAgICAgICAgaGFuZGxlcjogXCJDYWNoZUZpcnN0XCIsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogXCJwZGYtY2FjaGVcIixcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjogeyBtYXhFbnRyaWVzOiAyMCwgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogOTAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHsgc3RhdHVzZXM6IFswLCAyMDBdIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gM0Qgc2ltdWxhdG9yIGVudmlyb25tZW50IG1hcHMgYXJlIGxhcmdlIGFuZCBvcHRpb25hbC5cbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9cXC5oZHIkL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiBcIkNhY2hlRmlyc3RcIixcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiBcImVudmlyb25tZW50LW1hcC1jYWNoZVwiLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7IG1heEVudHJpZXM6IDEwLCBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiA5MCB9LFxuICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZTogeyBzdGF0dXNlczogWzAsIDIwMF0gfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgLy8gR2VuaVx1MDE1RiBBbmRyb2lkIHV5dW1sdWx1XHUwMTFGdTogQnUgYmlyIENhcGFjaXRvciAoV2ViVmlldykgdXlndWxhbWFzXHUwMTMxIG9sZHVcdTAxMUZ1IGlcdTAwRTdpblxuICAgIC8vIFx1MDBFN2FsXHUwMTMxXHUwMTVGdFx1MDEzMVx1MDExRlx1MDEzMSBDaHJvbWl1bSBzXHUwMEZDclx1MDBGQ21cdTAwRkMgY2loYXpcdTAxMzFuIEFuZHJvaWQvU3lzdGVtIFdlYlZpZXcgc1x1MDBGQ3JcdTAwRkNtXHUwMEZDbmUgYmFcdTAxMUZsXHUwMTMxZFx1MDEzMXIuXG4gICAgLy8gV2ViVmlldydpIGdcdTAwRkNuY2VsbGVubWVtaVx1MDE1RiBlc2tpIGNpaGF6bGFyZGEgKEFuZHJvaWQgNi05LCB+Q2hyb21lIDQ0LTc0KSBtb2Rlcm5cbiAgICAvLyBKUyBzXHUwMEY2emRpemltaSB2ZSBBUEknbGVyaSAoPy4sID8/LCByZXBsYWNlQWxsLCAuYXQoKSwgc3RydWN0dXJlZENsb25lLCBmbGF0TWFwKVxuICAgIC8vIGJleWF6IGVrcmFuYS9cdTAwRTdcdTAwRjZrbWV5ZSB5b2wgYVx1MDBFN2FyLiBAdml0ZWpzL3BsdWdpbi1sZWdhY3k6XG4gICAgLy8gIC0gbW9kZXJuIHBha2V0IGlcdTAwRTdpbiBla3NpayBBUEknbGVyaSBwb2x5ZmlsbCdsZXIgKG1vZGVyblBvbHlmaWxscyksXG4gICAgLy8gIC0gbW9kXHUwMEZDbCBkZXN0ZVx1MDExRmkgb2xtYXlhbiBcdTAwRTdvayBlc2tpIFdlYlZpZXcnbGVyIGlcdTAwRTdpbiBFUzUgKyBTeXN0ZW1KUyBsZWdhY3kgcGFrZXRcbiAgICAvLyAgICBcdTAwRkNyZXRpciAobm9tb2R1bGUpLCBiXHUwMEY2eWxlY2UgdXlndWxhbWEgXCJcdTAwRTdvXHUwMTFGdSBBbmRyb2lkIHNcdTAwRkNyXHUwMEZDbVx1MDBGQ25kZVwiIGFcdTAwRTdcdTAxMzFsXHUwMTMxci5cbiAgICBtb2RlICE9PSBcIm5hdGl2ZVwiICYmIGxlZ2FjeSh7XG4gICAgICAvLyBwYWNrYWdlLmpzb24gXCJicm93c2Vyc2xpc3RcIiBpbGUgaGl6YWxcdTAxMzEgZW4gZFx1MDBGQ1x1MDE1Rlx1MDBGQ2sgaGVkZWZsZXIuXG4gICAgICB0YXJnZXRzOiBbXG4gICAgICAgIFwiQW5kcm9pZCA+PSA2XCIsXG4gICAgICAgIFwiQ2hyb21lID49IDYxXCIsXG4gICAgICAgIFwiaU9TID49IDEyXCIsXG4gICAgICAgIFwiU2FmYXJpID49IDEyXCIsXG4gICAgICAgIFwiRmlyZWZveCA+PSA2OFwiLFxuICAgICAgICBcIkVkZ2UgPj0gNzlcIixcbiAgICAgIF0sXG4gICAgICAvLyBNb2RcdTAwRkNsIGRlc3Rla2xleWVuIGFtYSBlc2tpIChDaHJvbWUgNjEtOTcpIFdlYlZpZXcnbGVyZGUgZWtzaWsgb2xhblxuICAgICAgLy8gXHUwMEU3YWxcdTAxMzFcdTAxNUZtYSB6YW1hblx1MDEzMSBBUEknbGVyaW5pIG1vZGVybiBwYWtldGUgZGUgZW5qZWt0ZSBldC5cbiAgICAgIG1vZGVyblBvbHlmaWxsczogdHJ1ZSxcbiAgICAgIC8vIGFzeW5jL2F3YWl0IGt1bGxhbmFuIGVza2kgKEVTNSkgbGVnYWN5IHBha2V0IGlcdTAwRTdpbiBnZXJla2xpLlxuICAgICAgYWRkaXRpb25hbExlZ2FjeVBvbHlmaWxsczogW1wicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCJdLFxuICAgIH0pLFxuICAgIC8vIFZpdGVQV0Egc3cuanMnaSBjbG9zZUJ1bmRsZSdkYSBcdTAwRkNyZXR0aVx1MDExRmkgaVx1MDBFN2luIGRvXHUwMTFGcnVsYW1hIGVuIHNvbmRhIGR1cm1hbFx1MDEzMS5cbiAgICBtb2RlICE9PSBcIm5hdGl2ZVwiICYmIHZlcmlmeVByZWNhY2hlUGx1Z2luKCksXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gQ2FwYWNpdG9yIGJ1bmRsZXMgcnVuIGluIGN1cnJlbnQgV0tXZWJWaWV3L0FuZHJvaWQgV2ViVmlldyBhbmQgYWxyZWFkeVxuICAgIC8vIHBhY2thZ2UgZXZlcnkgYXNzZXQgbG9jYWxseS4gQSBkZWRpY2F0ZWQgbmF0aXZlIHByb2ZpbGUgYXZvaWRzIHNoaXBwaW5nXG4gICAgLy8gdGhlIGR1cGxpY2F0ZSBFUzUvbm9tb2R1bGUgdHJlZSBhbmQgYSBzZXJ2aWNlIHdvcmtlciB0aGF0IGEgV2ViVmlldyBkb2VzXG4gICAgLy8gbm90IG5lZWQuIFRoZSBkZWZhdWx0IHdlYiBidWlsZCBrZWVwcyB0aGUgZXhpc3RpbmcgbGVnYWN5ICsgUFdBIHN1cHBvcnQuXG4gICAgdGFyZ2V0OiBtb2RlID09PSBcIm5hdGl2ZVwiID8gXCJlczIwMjBcIiA6IHVuZGVmaW5lZCxcbiAgICAvLyBOT1Q6IE1vZGVybiBwYWtldGluIGhlZGVmaW5pIChidWlsZC50YXJnZXQpIEB2aXRlanMvcGx1Z2luLWxlZ2FjeSB5XHUwMEY2bmV0aXJcbiAgICAvLyAobW9kXHUwMEZDbCArIGR5bmFtaWMgaW1wb3J0IGRlc3Rla2xleWVuIFdlYlZpZXcgdGFiYW5cdTAxMzEsIH5DaHJvbWUgNjQpLiBNb2RcdTAwRkNsXHUwMEZDXG4gICAgLy8gb2x1cCBkeW5hbWljIGltcG9ydCd1IG9sbWF5YW4gXCJhcmFkYSBrYWxhblwiIGVza2kgV2ViVmlldydsZXIgKENocm9tZSA2MS02MylcbiAgICAvLyBwbHVnaW4naW4gZHluYW1pYy1pbXBvcnQgZ2VyaSBkXHUwMEY2blx1MDBGQ1x1MDE1RiBrb250cm9sXHUwMEZDeWxlIG90b21hdGlrIG9sYXJhayBFUzUgbGVnYWN5XG4gICAgLy8gcGFrZXRpbmUgZFx1MDBGQ1x1MDE1RmVyLiBFc2tpIGNpaGF6IGRlc3RlXHUwMTFGaSBsZWdhY3koKSBla2xlbnRpc2luaW4gXCJ0YXJnZXRzXCIgc2VcdTAwRTdlbmVcdTAxMUZpeWxlXG4gICAgLy8gYXlhcmxhblx1MDEzMXI7IGJ1cmFkYSBlbGxlIGJ1aWxkLnRhcmdldCB2ZXJtZWsgcGx1Z2luIGlsZSBcdTAwRTdha1x1MDEzMVx1MDE1Rlx1MDEzMXJkXHUwMTMxLlxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBIYXNoLW9ubHkgY2h1bmsgbmFtZXMgYXZvaWQgUzMgXCJzYW1lIG9iamVjdFwiIHVwbG9hZCBjb2xsaXNpb25zIGNhdXNlZFxuICAgICAgICAvLyBieSBtYW55IGR5bmFtaWMtaW1wb3J0IGNodW5rcyBzaGFyaW5nIHNob3J0IG51bWVyaWMgbmFtZXMgbGlrZSBcIjEtKi5qc1wiLlxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvY2h1bmstW2hhc2hdLmpzXCIsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9lbnRyeS1baGFzaF0uanNcIixcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwiYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV1cIixcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgaWYgKCFpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvdGhyZWUvZXhhbXBsZXMvXCIpKSByZXR1cm4gXCJ2ZW5kb3ItdGhyZWUtZXh0cmFzXCI7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHJlYWN0LXRocmVlL2RyZWlcIikpIHJldHVybiBcInZlbmRvci10aHJlZS1kcmVpXCI7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwiQHJlYWN0LXRocmVlL2ZpYmVyXCIpKSByZXR1cm4gXCJ2ZW5kb3ItdGhyZWUtcmVhY3RcIjtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIvdGhyZWUvXCIpKSByZXR1cm4gXCJ2ZW5kb3ItdGhyZWUtY29yZVwiO1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlY2hhcnRzXCIpKSByZXR1cm4gXCJ2ZW5kb3ItcmVjaGFydHNcIjtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJkMy1cIikpIHJldHVybiBcInZlbmRvci1kM1wiO1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImV4Y2VsanNcIikpIHJldHVybiBcInZlbmRvci1leGNlbFwiO1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInBkZi1saWJcIikpIHJldHVybiBcInZlbmRvci1wZGZcIjtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJodG1sMmNhbnZhc1wiKSkgcmV0dXJuIFwidmVuZG9yLWNhcHR1cmVcIjtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJAc3VwYWJhc2VcIikpIHJldHVybiBcInZlbmRvci1zdXBhYmFzZVwiO1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkBsb3ZhYmxlLmRldi9jbG91ZC1hdXRoXCIpKSByZXR1cm4gXCJ2ZW5kb3ItY2xvdWQtYXV0aFwiO1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImZyYW1lci1tb3Rpb25cIikpIHJldHVybiBcInZlbmRvci1tb3Rpb25cIjtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJyZWFjdFwiKSB8fCBpZC5pbmNsdWRlcyhcInNjaGVkdWxlclwiKSkgcmV0dXJuIFwidmVuZG9yLXJlYWN0XCI7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxvQkFBaUM7QUFDdFQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVLGlCQUFpQjtBQUNsQyxTQUFTLGlCQUFpQjtBQVAxQixJQUFNLG1DQUFtQztBQTRCekMsSUFBTSxXQUFXLENBQUMsYUFDaEI7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxF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
