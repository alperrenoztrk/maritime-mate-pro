import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    VitePWA({
      registerType: "autoUpdate",
      // CRITICAL: Disabled in dev to avoid breaking the Lovable preview iframe.
      // PWA / offline mode only activates in production builds (published app).
      devOptions: {
        enabled: false,
      },
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "maritime-logo.svg",
        "maritime-background.svg",
        "maritime-home-background.svg",
        "nautical-chart-background.svg",
      ],
      manifest: {
        name: "Marine Expert Pro",
        short_name: "Marine Expert",
        description: "Professional tools for all mariners — calculators, lessons and references that work offline.",
        theme_color: "#0b3d91",
        background_color: "#020a14",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/maritime-logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "/lovable-uploads/6600febe-17ab-46d7-b124-c43116e375e6.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
      workbox: {
        // Don't cache OAuth/auth routes — they must always hit network
        navigateFallbackDenylist: [/^\/~oauth/, /^\/auth\//, /^\/api\//],
        // Allow large assets (diagrams, PDFs, images)
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,ico,woff2,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
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
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
