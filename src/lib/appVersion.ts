// App version & build metadata for the in-app Release Checklist.
// Bump these together with package.json when preparing a Play Store release.
// BUILD_NUMBER must match android versionCode (android/app/build.gradle)
// and the iOS build number (CFBundleVersion).

export const APP_NAME = "Mariner's Book";
export const APP_VERSION = "2.5.70";
export const BUILD_NUMBER = 20570;
export const PACKAGE_ID = "com.marinersbook.app";
export const MIN_SDK = 23;
// android/variables.gradle ile eşleşmeli. Play, 31 Ağustos 2026'dan itibaren
// yeni sürümlerden API 36 hedeflemesini istiyor; gradle tarafı 36'ya çekildiği
// hâlde burası 35'te kalmıştı ve uygulama içi Sürüm Kontrol Listesi yanlış
// değer gösteriyordu.
export const TARGET_SDK = 36;
