# Mariner's Book — Freemium Model Önerisi

Not: Bu bir analiz + ticari model önerisidir. Hiçbir kod değişikliği yapılmayacaktır. Onaylarsanız, bir sonraki adım paywall altyapısı (Lovable Payments + kota tabloları) planlaması olur.

## 1. Uygulamanın Mevcut Yetenek Envanteri

Kod tabanı taraması sonucu tespit edilen ana yetenek kümeleri:

**Eğitim çekirdeği**
- Dersler: Navigation, Stability, Cargo, Meteorology, Seamanship, Safety, Environment, Communication, Economics + Makine kolu (Thermodynamics, Fluid Mechanics, Diesel Engines, Ship Systems, Auxiliary, Fuel, Cooling/HVAC, Electrical, Automation, ERM, Maintenance, Energy Efficiency, vb. ~16 makine konusu)
- Konu anlatımı zenginleştirmeleri (`lessonTopicEnhancements`, diagram SVG'leri, book-style formüller)
- Quizler: her konuda ~50 soru (deniz + makine bankaları)
- Beta dersler, `LessonAITutor` (AI eğitmen paneli, adaptif seviye)

**Hesaplayıcılar / Referanslar**
- Stability (GM, GZ, free surface, trim, damage), Cargo (draft survey, density, bunker, ballast), Navigation (great-circle, rhumb, DR, speed/time/distance, compass CDMVT), Engine, Tank, Hydrodynamics, Structural, Special Ships, Emissions (CII/EEXI), Safety, Economics
- Formül referans sayfaları + validation golden dataset
- PDF export (pdf-lib, A4 landscape)

**Operasyonel araçlar**
- Passage Plan, Ship Operations (mooring/anchoring/departure), Ship Systems, Bridge Equipment, Crew & Personnel hiyerarşisi, Ship Tasks, Work Hours (STCW + Excel export)
- COLREG sunumları, SOLAS 2024, MARPOL PDF, Nautical Almanac 2025

**Denizde-değer katan modüller**
- Hava durumu widget'ları, hourly weather, tide forecast (edge fn), live GPS, maritime news (16 kaynak, importance scoring, in-app reader)
- Celestial Navigation (celnav Python paketi, AR overlay dokümanları, star walk, satellite channels)

**AI özellikleri (Lovable AI Gateway / Gemini)**
- `LessonAITutor` konu bazlı eğitmen
- `agent-code-gen` (kod üretimi, DANGEROUS_PATTERNS ile korumalı)
- `wolfram-calc`, `gemini-chat`, `translate` (Google Cloud Translation), `extract-work-hours`, `parse-file`, `fetch-article` (Jina Reader), `batch-content-writer`, `maritime-news`

**Platform / yatay**
- Auth (Email + Google/Apple; Google butonu şu an gizli), Supabase-backed, RLS + safeClient
- 11 dil paketi + runtime route harvester
- MCP server (public OAuth), 3 maritime tool
- Global search (CMD+K), Glossary, offline data meta, Screen Protection plugin
- Capacitor iOS/Android build (Google Play + App Store hazırlığı)

## 2. Freemium Tasarım Prensipleri

Bu projeye özel 4 kural:
1. **Öğrenci kazanımı ölmemeli.** Denizcilik öğrencisi ilk açılışta "işe yarar" hissetmeli — tüm ders okuma + temel hesaplayıcılar ücretsiz kalmalı.
2. **Sınav baskısı = ödeme motoru.** Quiz istatistikleri, deneme sınavı modu, hata defteri Premium için doğal upsell.
3. **Denizde-değer = ödeme motoru.** Gerçek seferde kullanılan araçlar (passage plan kaydetme, offline pack, tide/weather push, celestial fix, PDF rapor) Premium.
4. **AI = kotalı.** AI maliyeti değişken; ücretsizde küçük ama gerçek bir kota, Premium'da yüksek kota + gelişmiş modeller.

## 3. Katman Katman Özellik Ayrımı

### 🟢 Ücretsiz (Free) — süresiz, tam erişim
Amaç: öğrenci ve meraklıyı bağlamak.
- Tüm ders **okuma** içeriği (Navigation, Stability, Cargo, Meteorology, Seamanship, Safety, Environment, Communication, Economics + Makine 16 konu)
- Tüm formül referans sayfaları, diagram SVG'leri, book-style anlatım
- Glossary (sözlük), COLREG sunumları, SOLAS/MARPOL PDF görüntüleme, Nautical Almanac 2025 görüntüleme
- Crew & Personnel hiyerarşisi, Ship Systems / Bridge Equipment / Ship Operations **okuma**
- Temel hesaplayıcılar (tek seferlik hesap, kayıt yok): great-circle, speed/time/distance, compass CDMVT, basit GM/GZ, basit draft survey, temel bunker
- Maritime News (feed + in-app reader) — reklamsız kalabilir, marka değeri
- Global search, 11 dil desteği
- Auth (Email), profil, ayarlar
- Splash / genel UX
- Quiz: konu başına **10 soru** ücretsiz örneklem (50'nin tamamı Premium)

### 🟡 Sınırlı Ücretsiz (kota / feature gate)
- **AI Eğitmen (LessonAITutor)**: günde **5 mesaj**, sadece "normal" seviye, sadece kısa yanıt
- **Wolfram-calc / gemini-chat serbest sorgu**: günde **3 sorgu**
- **PDF export**: ayda **2 PDF** (filigranlı "Mariner's Book Free")
- **Passage Plan**: 1 aktif plan kaydı, offline sync yok
- **Quiz**: konu başına 10 soru; istatistik/hata defteri yok
- **Weather widget**: mevcut konum + manuel konum, geçmiş yok, saatlik 24 saate kadar
- **Tide forecast**: 1 istasyon, 24 saat
- **Translate (kullanıcı içeriği)**: günde 20 çağrı
- **Ship Tasks / Work Hours**: görüntüleme + tekli giriş; Excel/STCW export yok

### 🟣 Premium
Amaç: aktif zabit / kaptan / öğretim üyesi / sınava hazırlanan öğrenciye net değer.

**Sınav & Öğrenme Pro**
- Konu başına tam **50 soru** quiz bankası (tüm bankalar)
- Deneme sınavı modu (karma, süreli, geçme notu), hata defteri, tekrar kuyruğu
- Quiz istatistikleri, ilerleme grafiği, zayıf konu ısı haritası
- AI Eğitmen: sınırsız (adil kullanım), "basit / normal / ileri" seviyeler, uzun yanıt, konu-topraklı derin sohbet
- Beta lessons erken erişim

**Denizde-değer Pro**
- Sınırsız Passage Plan, çoklu cihaz senkron, offline pack indir
- Tide forecast: çoklu istasyon, 7 gün
- Weather: 7 gün + saatlik, uyarılar
- Celestial Navigation / AR overlay tam erişim (star walk, altitude/azimuth, sight reduction)
- Live GPS log, seyir defteri (voyage log) kaydı ve dışa aktarım
- Ship Tasks & Work Hours: tam Excel + STCW rapor export, çoklu gemi profili

**Profesyonel çıktı**
- Sınırsız, filigransız PDF export (draft survey raporu, stability booklet özeti, passage plan)
- Tüm hesaplayıcılarda kaydetme + geçmiş + karşılaştırma
- Emissions (CII/EEXI), Special Ships, Structural, Hydrodynamics ileri hesaplayıcılar
- Wolfram-calc / gemini-chat: yüksek kota (örn. 200/gün) + dosya yükleme (parse-file), work-hours OCR (extract-work-hours)

**Platform ayrıcalıkları**
- Reklamsız (ücretsizde reklam gösteriliyorsa)
- Erken erişim (yeni ders/kalkülatör)
- Öncelikli destek
- Ekran koruma (screenshot engelleme) — kurumsal kullanıcı talebi

## 4. Paket Yapısı Önerisi

**Öneri: 2 paket + eğitim indirimi + kurumsal.** Tek paket yeterli görünse de denizcilik pazarında "öğrenci" ve "aktif zabit" ödeme gücü farkı büyük.

| Paket | Hedef | Fiyat aralığı (öneri) |
|---|---|---|
| **Free** | Öğrenci ilk temas, meraklı | 0 |
| **Student** (yıllık, .edu / okul kartı doğrulaması) | Denizcilik öğrencisi | ~$2.99/ay veya $19/yıl |
| **Pro** | Aktif zabit/kaptan/mühendis | $8.99/ay veya $69/yıl |
| **Fleet** (opsiyonel, faz 2) | Armatör / eğitim kurumu, seat bazlı | Özel fiyat, ≥5 seat |

Neden 2 paket + öğrenci: proje DNA'sı "denizcilik öğrencisi + aktif denizci". Tek paket koyarsak ya öğrenciyi dışlarız ya da profesyonel geliri düşürürüz. Student ve Pro **aynı özellik setine** sahip; ayrım sadece fiyat + doğrulama. Bu, karar felcini önler.

Fleet paketi ilk sürümde gerekmez; MVP'de sadece Student + Pro yayınlayın.

## 5. Ücretsiz Deneme

- **Pro için 7 gün ücretsiz deneme**, kredi kartı zorunlu (Paddle/Stripe standart). Denizcilik uygulamalarında 14 gün churn'ü artırıyor; 7 gün "sefer öncesi test" için yeterli.
- Deneme sırasında tüm Pro özellikler açık, PDF filigransız, AI kotası Pro seviyesinde.
- Deneme bitiminde otomatik Pro; kullanıcı iptal ederse Free'ye düşer, kayıtlı verisi 60 gün saklanır (sonra passage plan / voyage log okunur ama düzenlenemez — "arşiv modu").
- Öğrenci paketinde deneme yok (fiyat zaten düşük); onun yerine ilk ay %50 kampanyası.

## 6. AI Kullanım Kotası Önerisi

Lovable AI Gateway kredi tabanlı; kota tasarımı doğrudan marjı belirler.

| Özellik | Free | Student | Pro |
|---|---|---|---|
| LessonAITutor mesaj | 5 / gün | 50 / gün | 300 / gün |
| gemini-chat serbest sorgu | 3 / gün | 30 / gün | 200 / gün |
| wolfram-calc | 3 / gün | 20 / gün | 100 / gün |
| translate (kullanıcı içeriği) | 20 çağrı / gün | 200 / gün | 1000 / gün |
| parse-file (PDF/doküman) | yok | 5 / gün | 30 / gün |
| extract-work-hours (OCR) | yok | 3 / gün | 20 / gün |
| Model | Gemini Flash | Gemini Flash | Flash + Pro seçilebilir |

Kota mantığı: kullanıcı başına günlük sayaç (Supabase tablosu), edge function girişinde kontrol, aşımda 429 + upsell modalı. Aylık üst limit de eklenmeli (Pro için ~3000 AI mesaj/ay) ki tek kullanıcı marjı yakmasın.

**Adil kullanım**: Pro "sınırsız" olarak pazarlanan yerlerde kullanıcı başına gerçek üst sınır (soft cap) kalır; aşıldığında model küçültme veya yavaşlatma.

## 7. Kritik Ayrım Kararları (neden bu tarafta?)

- **Ders okuma neden hep ücretsiz?** Projenin özü öğretim; okuma ücretlendirilirse SEO/organik büyüme ölür ve rakiplerden ayrışan "doğru içerik" savı zayıflar.
- **Quiz neden Premium?** Sınav baskısı en yüksek ödeme motivasyonu; içerik zaten mevcut (bankalar hazır), marjinal maliyet sıfır, algılanan değer yüksek.
- **PDF/rapor neden Premium?** Gerçek işte kullanılan çıktı = ödeme yapılan çıktı. Filigranlı ücretsiz sürüm hem viral hem upsell.
- **AI neden kotalı, kapalı değil?** Kullanıcı AI'ı deneyip değerini görmeli; ilk günden kapalı olursa dönüşüm düşer. Ama açık bırakırsak kredi yakar — kota şart.
- **Passage plan / voyage log neden Premium?** Denizde tekrar tekrar açılan, veri biriktikçe değer katan özellikler = düşük churn.
- **Celestial / AR neden Premium?** Niş ama tutkulu kullanıcı; premium algısı yüksek.
- **Weather/Tide neden kısıtlı ücretsiz?** Bedava alternatifleri çok; tamamen kapatırsak kullanıcı başka uygulama açar. Kısıtlı tutup "genişlet" upsell'i doğru yol.

## 8. Uygulama Sırası (öneri, sonraki plan için)

1. `payments--recommend_payment_provider` çalıştır, Stripe seamless payments (dijital SaaS, MOR) ile başla.
2. Supabase'de `subscriptions`, `ai_usage_daily`, `feature_flags` tabloları + RLS.
3. `useEntitlements()` hook + `<PremiumGate>` bileşeni; her Premium özelliğin girişine tak.
4. Edge function'lara (gemini-chat, wolfram-calc, translate, parse-file, extract-work-hours) kota middleware.
5. Paywall ekranı + upsell modalı (quiz sonu, PDF export, AI kota aşımı, passage plan 2. kayıt).
6. Stripe checkout + webhook (mevcut `stripe-checkout` fn genişletilir).
7. Student doğrulama (SheerID veya manuel .edu e-posta) — 2. faz.

## 9. Riskler / Dikkat

- Google Play & App Store: dijital abonelik in-app billing zorunlu (Stripe web checkout tek başına reddedilebilir). Mobil için IAP entegrasyonu gerekir → 2. faz.
- KVKK/GDPR: AI kullanım logları kişisel veri; retention politikası yazılmalı.
- Kota bypass'ı: rate limit + user_id server-side; client'a güvenme.
- Ücretsiz kullanıcıya reklam **önerilmiyor** — marka premium, denizcilik profesyoneli reklamdan kaçar.

---

Onaylarsanız sonraki adımda: (a) `payments--recommend_payment_provider` çağırırım, (b) entitlement şeması + paywall bileşen planını `plan--create` ile öneririm.