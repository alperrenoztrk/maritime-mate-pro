import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import legacy, { cspHashes } from "@vitejs/plugin-legacy";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// Content-Security-Policy — üretim build'ine <meta> olarak enjekte edilir.
// Barındırma (Lovable) ve Capacitor WebView'inde HTTP başlıklarını kontrol
// edemediğimiz için CSP'nin tek güvenilir taşıyıcısı index.html'dir.
// Yalnızca build'de uygulanır; dev sunucusu (HMR/React refresh inline
// script'leri) kısıtlanmaz.
//
// script-src: 'self' + @vitejs/plugin-legacy'nin enjekte ettiği dört inline
// snippet'in sha256 hash'leri (cspHashes) + pdf.js'in WASM decoder'ları için
// 'wasm-unsafe-eval'. Enjekte edilen harici script'ler (XSS'in ana vektörü)
// tamamen engellenir. Reklam/analitik web'de etkinleştirilirse ilgili Google
// alan adlarının buraya eklenmesi gerekir (Android'de AdMob native çalışır,
// CSP'den etkilenmez).
const PRODUCTION_CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  `script-src 'self' 'wasm-unsafe-eval' ${cspHashes.map((h) => `'sha256-${h}'`).join(" ")}`,
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
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://oauth.lovable.app https://*.lovable.app https://*.lovable.dev https://api.open-meteo.com https://geocoding-api.open-meteo.com https://ipapi.co https://api.bigdatacloud.net https://translate.googleapis.com",
  "frame-src https://accounts.google.com https://www.youtube-nocookie.com https://www.youtube.com https://www.openstreetmap.org",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

function cspPlugin(): Plugin {
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
            attrs: { "http-equiv": "Content-Security-Policy", content: PRODUCTION_CSP },
            injectTo: "head-prepend",
          },
        ],
      }),
    },
  };
}

// Workbox'ın precache manifesti sessizce boşalabiliyor: glob bağımlılık zinciri
// bozulduğunda ("An error occurred when globbing for files") build yalnızca uyarı
// basıp başarılı sayılıyor. Böyle bir sw.js hiçbir asset'i önbelleğe almaz ama
// yine de `createHandlerBoundToURL("/index.html")` çağırır; bu çağrı precache'te
// olmayan URL için hata fırlattığından servis çalışanının o satırdan sonraki TÜM
// route kayıtları hiç çalışmaz — uygulama çevrimdışı hiç açılmaz. Sessiz kalması
// yerine build'i durdur.
function verifyPrecachePlugin(): Plugin {
  let outDir = "dist";
  return {
    name: "verify-precache-manifest",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const swPath = path.resolve(__dirname, outDir, "sw.js");
      if (!fs.existsSync(swPath)) return;

      const sw = fs.readFileSync(swPath, "utf8");
      // navigateFallback kullanılmıyorsa doğrulanacak bir bağ da yok.
      if (!sw.includes("createHandlerBoundToURL")) return;

      if (!/url:\s*"index\.html"/.test(sw)) {
        throw new Error(
          "Servis çalışanı /index.html'e bağlanıyor ama index.html precache " +
            "manifestinde yok. Workbox globbing'i başarısız olmuş demektir " +
            "(genellikle minimatch/brace-expansion sürüm çakışması). Bu build " +
            "çevrimdışı açılmaz; yayınlanmamalı.",
        );
      }
    },
  };
}

// Publishable (public) Lovable Cloud credentials. Used as a build-time fallback
// so that if `.env` is missing during a publish/build, the client still
// initializes with a valid URL/key instead of crashing with
// "supabaseUrl is required". Both values are safe to ship in the browser bundle.
const FALLBACK_SUPABASE_URL = "https://vrpbhguztsqakvjcezeb.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycGJoZ3V6dHNxYWt2amNlemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTczNzcsImV4cCI6MjA4MTg3MzM3N30._RMAZAKoGsk9xmHAXCvITf8BW4f52WyHYdhJq4IEW4Y";
const FALLBACK_SUPABASE_PROJECT_ID = "vrpbhguztsqakvjcezeb";

export default defineConfig(({ mode }) => ({
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
      process.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL,
    ),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY,
    ),
    "import.meta.env.VITE_SUPABASE_PROJECT_ID": JSON.stringify(
      process.env.VITE_SUPABASE_PROJECT_ID || FALLBACK_SUPABASE_PROJECT_ID,
    ),
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    allowedHosts: true,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    cspPlugin(),
    mcpPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      // CRITICAL: Disabled in dev to avoid breaking the Lovable preview iframe.
      // PWA / offline mode only activates in production builds (published app).
      devOptions: {
        enabled: false,
      },
      includeAssets: [
        "favicon.png",
        "apple-touch-icon.png",
        "app-icon-192.png",
        "app-icon-512.png",
        "robots.txt",
        "maritime-logo.svg",
        "maritime-background.svg",
        "maritime-home-background.svg",
        "nautical-chart-background.svg",
      ],
      manifest: {
        name: "Mariner's Book",
        short_name: "Mariner's Book",
        description: "Professional tools for all mariners — calculators, lessons and references that work offline.",
        // Must match index.html theme-color and capacitor.config.ts StatusBar —
        // all three describe the same surface (top of the shell gradient).
        theme_color: "#031226",
        background_color: "#031226",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/maritime-logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "/app-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/app-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        // Don't cache OAuth/auth routes — they must always hit network
        navigateFallbackDenylist: [/^\/auth\//, /^\/api\//],
        // The default English locale is large; keep enough headroom for it.
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
        // Precache the executable shell, not the entire media library. The old
        // pattern eagerly downloaded every diagram, store graphic and HDR at
        // service-worker install (2k+ files / ~80 MB). Images, diagrams, PDFs
        // and HDR environments are cached on first use by runtime rules below.
        globPatterns: ["**/*.{js,css,html,ico,woff2,json}"],
        // Every language now ships a FULL translation dictionary (~8 MB each,
        // 24 languages ≈ 190 MB total), so precaching them all at install is no
        // longer viable. Only the default language's pack (en) is precached;
        // any other language is fetched once on first selection and then kept
        // for offline use by the translation-locales runtime cache below.
        // Locale packs are route-independent 8–10 MB dictionaries. None may
        // block service-worker installation; each chosen language is cached by
        // the runtime rule below after the app shell is interactive.
        globIgnores: ["locales/**/*.json"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Per-language static translation dictionaries (public/locales/*.json)
            urlPattern: ({ url }) => url.pathname.includes("/locales/") && url.pathname.endsWith(".json"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "translation-locales",
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" },
          },
          {
            // Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Local images / diagrams
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // PDFs (almanac, MARPOL, COLREG ders sunumu)
            urlPattern: /\.pdf$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "pdf-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // 3D simulator environment maps are large and optional.
            urlPattern: /\.hdr$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "environment-map-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
    // Geniş Android uyumluluğu: Bu bir Capacitor (WebView) uygulaması olduğu için
    // çalıştığı Chromium sürümü cihazın Android/System WebView sürümüne bağlıdır.
    // WebView'i güncellenmemiş eski cihazlarda (Android 6-9, ~Chrome 44-74) modern
    // JS sözdizimi ve API'leri (?., ??, replaceAll, .at(), structuredClone, flatMap)
    // beyaz ekrana/çökmeye yol açar. @vitejs/plugin-legacy:
    //  - modern paket için eksik API'leri polyfill'ler (modernPolyfills),
    //  - modül desteği olmayan çok eski WebView'ler için ES5 + SystemJS legacy paket
    //    üretir (nomodule), böylece uygulama "çoğu Android sürümünde" açılır.
    legacy({
      // package.json "browserslist" ile hizalı en düşük hedefler.
      targets: [
        "Android >= 6",
        "Chrome >= 61",
        "iOS >= 12",
        "Safari >= 12",
        "Firefox >= 68",
        "Edge >= 79",
      ],
      // Modül destekleyen ama eski (Chrome 61-97) WebView'lerde eksik olan
      // çalışma zamanı API'lerini modern pakete de enjekte et.
      modernPolyfills: true,
      // async/await kullanan eski (ES5) legacy paket için gerekli.
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    // VitePWA sw.js'i closeBundle'da ürettiği için doğrulama en sonda durmalı.
    verifyPrecachePlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
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
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("three") || id.includes("@react-three")) return "vendor-three";
          if (id.includes("recharts") || id.includes("d3-")) return "vendor-charts";
          if (id.includes("pdf-lib") || id.includes("exceljs") || id.includes("html2canvas")) return "vendor-export";
          if (id.includes("@supabase") || id.includes("@lovable.dev/cloud-auth")) return "vendor-data";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("react") || id.includes("scheduler")) return "vendor-react";
          return undefined;
        },
      },
    },
  },
}));
