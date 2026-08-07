# Çeviri kalitesi + formül doğruluğu

## 1. "KG Hesabı → KG Account" sorununun kalıcı çözümü

Doğrulanan durum: uygulamanın kaynak dili Türkçe, İngilizce dahil tüm diller çalışma anında/önceden makine çevirisiyle üretiliyor. Bu iki sistematik hataya yol açıyor:

- `Hesabı` → `Account` (banka hesabı anlamı). `public/locales/en.json` içinde onlarca örnek var: "KG Account", "CII Account", "Draft Account", "EEDI Account", "Free Surface Effect Account", "DLat Account"…
- Formül metinleri de çevriliyor: `atan2` → `tane2` (18 locale dosyasının tamamında; cs, da, de … hepsinde `tane2(Dep, dLat)` yazıyor). Yani ekrandaki formüller İngilizce/yabancı dillerde matematiksel olarak bozuk.

Üç katmanlı kalıcı çözüm:

**a) Formüller asla çevrilmeyecek**
- `pageTranslator`'a "teknik metin" tespiti eklenecek: `=`, `√`, `Σ`, `∆/Δ`, `°`, alt/üst simge karakterleri ya da `atan2|asin|acos|sin|cos|tan|ln|log|sinh|exp|arccos` gibi token içeren, ağırlıklı olarak sembolden oluşan diziler çeviri kuyruğuna hiç girmeyecek.
- Karışık cümlelerde (örn. "Gerçek iz (COG) = atan2(Rx, Ry).") matematik token'ları maskelenecek: mevcut `maskGlossaryTerms` altyapısındaki `<span translate="no">` mekanizması matematik sözlüğü için de kullanılacak.
- Formülü ekrana basan ortak bileşenler (`FormulaCard`, ders/konu formül blokları, `CalculationStep.formula`) kök öğede `translate="no"` + `notranslate` alacak — hem uygulama içi çevirmen hem tarayıcı/Chrome çevirisi devre dışı kalır.

**b) "Hesap" belirsizliği kaynağa bakılarak çözülecek**
- Bugünkü düzeltme listesi yalnızca ticari terimlerle sınırlı (`demurrage account` → `calculation`). Bunun yerine kaynak metin de düzeltme adımına taşınacak: Türkçe kaynak `… Hesabı / Hesaplaması / Hesaplama` ile bitiyorsa çıktıdaki `Account/Konto/Compte/Cuenta…` karşılığı hedef dilin "hesaplama" terimiyle değiştirilecek.
- Aynı mantık `oran`, `süre`, `gider`, `yük` (cargo vs. load) için de genişletilebilir yapıda tanımlanacak.
- Kural hem edge function'da (`supabase/functions/_shared/maritimeGlossary.ts` + `translate/index.ts`) hem çalışma anındaki istemci düzeltmesinde ortak kod olarak kullanılacak.

**c) Mevcut 18 locale dosyası onarılacak**
- Tek seferlik bir onarım script'i (`scripts/i18n/`) tüm `public/locales/*.json` dosyalarını tarayacak: `tane2` → `atan2` gibi bozulmuş matematik token'larını kaynak metinle karşılaştırarak geri yazacak ve `… Account` kalıplarını kaynağı `Hesabı` olan kayıtlarda düzeltecek.
- Böylece yeniden çeviri maliyeti olmadan yayındaki metinler anında düzelir; (a) ve (b) katmanları da hatanın tekrar üretilmesini engeller.

## 2. Formül doğruluğu

Sorulan formül **doğru**: düzlem seyirde `Kurs = atan2(Dep, dLat)`, `Mesafe = √(dLat² + Dep²)`. Uygulamada da bu şekilde yazılı (`src/data/courseContent/navigation.ts`); ekranda "tane2" görünmesinin tek nedeni yukarıdaki çeviri hatası.

Kapsamlı formül denetimi şu kaynaklar üzerinde yapılacak:
- `src/data/courseContent/*.ts` (seyir, stabilite, meteoroloji, termodinamik, dizel, yük, ekonomi, emniyet, gemicilik…)
- `src/pages/*Formulas.tsx` (Navigation, Stability, Machine, Meteorology, Safety, Seamanship, Emission, Course)
- `src/data/formulas/*.json` ve hesaplama bileşenlerindeki `FormulaCard` blokları

Her formül için: birim tutarlılığı, sembol tanımı, hesaplama motorundaki kodla (interaktif hesaplayıcı) birebir eşleşme ve referans standart (IMO/SOLAS/MARPOL, klas kuralları, standart ders kitapları) kontrol edilir. Uyuşmayanlar düzeltilir; şüpheli/basitleştirilmiş olanlara açıklayıcı not eklenir.

İlk bakışta doğrulanması gereken adaylar (denetimde teyit edilecek, gerekiyorsa düzeltilecek):
- `SafetyFormulas.tsx` – CO₂ miktarı `M = 1.5 × V × (ρgas/ρliq)` ve pratik notu
- `SeamanshipFormulas.tsx` – römorkör bollard pull `(Δ × V²)/K`, katener `T = W × sinh(s/a)`, demir tutma katsayıları
- `Engine.tsx` – `EHP = SHP × ηprop` ve `SOx = FC × S% × 2` katsayıları
- Emisyon/EEDI/EEXI/CII sayfalarındaki güncel IMO katsayıları

Denetim sonunda hangi formülün neden değiştiğini listeleyen kısa bir rapor (`docs/formula-audit.md`) bırakılır.

## Teknik notlar

- Değişecek dosyalar: `src/utils/pageTranslator.ts`, `src/contexts/LanguageContext.tsx`, `supabase/functions/_shared/maritimeGlossary.ts`, `supabase/functions/translate/index.ts`, `src/components/ui/formula-card.tsx` ve formül gösteren ders/hesaplama bileşenleri, `public/locales/*.json`, yeni `scripts/i18n/repair-locales.mjs`, `docs/formula-audit.md`.
- Edge function yeniden deploy edilecek; çeviri önbelleği (localStorage) sürüm anahtarıyla geçersiz kılınacak ki eski bozuk çeviriler cihazlarda kalmasın.
