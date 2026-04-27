## Goal
Add a "Google Play Yayın Kontrol Listesi" (Android Release Checklist) section inside the existing Settings page so the project's release readiness (version, build, permissions, privacy text) is visible in-app.

## Scope
- Pure UI addition. No native code changes, no Capacitor config changes.
- Read-only informational panel + a copy/expand surface for privacy text.

## Where it goes
File: `src/pages/Settings.tsx`
- Add a new `Card` block at the bottom of the existing settings grid, after the language card.
- Keep the existing styling tokens (`shadow-lg`, dark/nature variants) and `data-translatable` spans for i18n consistency.

## What the checklist card contains

1. **Sürüm Bilgileri (Version & Build)**
   - App name: `Marine Expert Pro` (from branding memory)
   - Version: read from `package.json` via Vite `import.meta.env` — expose with a small `src/lib/appVersion.ts` constant (`APP_VERSION = "2.5.70"`, `BUILD_NUMBER = 1`, `PACKAGE_ID` from capacitor config `appId`).
   - Min Android SDK: 23, Target SDK: 34 (Play Console 2024 requirement).

2. **İzinler (Permissions declared / used)**
   Static list rendered from a typed array. Items reflect what the app actually uses:
   - INTERNET — maritime news, AI, weather
   - ACCESS_NETWORK_STATE — offline detection
   - VIBRATE — Haptics plugin
   - POST_NOTIFICATIONS — PushNotifications plugin
   - (No camera / location / contacts — explicitly noted as "kullanılmıyor" so the reviewer-facing checklist is honest)

   Each row: icon + permission name + short Turkish purpose + a green/red status dot for "kullanılıyor / kullanılmıyor".

3. **Gizlilik Metni (Privacy text for Play Console)**
   Collapsible block (`Accordion` from `@/components/ui/accordion`) containing the Turkish + English short privacy statement, ready to paste into Play Console "Data safety" form. Includes:
   - Veri toplama: hesap (e-posta, ad), kullanım analitiği yok
   - Üçüncü taraf servisler: Lovable Cloud (Supabase) – auth & content storage; Lovable AI Gateway – soru/cevap
   - Verilerin şifrelenmesi: HTTPS + Supabase RLS
   - Veri silme talebi: in-app + e-posta adresi
   - Çocuklar için uygun mu: 13+
   - "Kopyala" button using `navigator.clipboard.writeText` + `toast.success`.

4. **Yayın Hazırlık Kontrol Listesi (Pre-submission checklist)**
   Static check list (read-only, not user-toggleable) showing items already done vs pending, each as `<CheckCircle2 />` (done) or `<Circle />` (todo):
   - Capacitor Android platformu eklenmiş
   - Uygulama ikonu ve splash ekranı
   - `appId` benzersiz (`app.lovable.c91ef2fa…`)
   - Release keystore yapılandırması (capacitor.config – şu an boş, todo işaretli)
   - ProGuard / R8 (todo)
   - Privacy Policy URL (todo — not yet hosted)
   - Play Store ekran görüntüleri (todo)
   - İçerik derecelendirmesi formu (todo)

## Technical notes
- New helper file: `src/lib/appVersion.ts` exporting constants — avoids importing `package.json` directly into the bundle.
- New component (optional, kept inline if small): `src/components/settings/ReleaseChecklistCard.tsx` to keep `Settings.tsx` tidy.
- Uses existing icons from `lucide-react`: `Smartphone`, `ShieldCheck`, `FileText`, `CheckCircle2`, `Circle`, `Copy`.
- No new dependencies. No backend changes. No translations file changes — relies on `data-translatable` spans like the rest of the page.
- Does NOT modify `capacitor.config.ts` or any native Android files (out of scope for in-app surface).

## Out of scope (explicit)
- Generating Play Store assets, signing keys, or uploading to Play Console.
- Editing AndroidManifest.xml.
- Hosting a real Privacy Policy URL.
