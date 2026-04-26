## Hedef

`Gemi Sistemleri ve Ekipmanları` modülünü, gemideki **tüm** cihaz ve ekipmanları kapsayacak şekilde genişletmek. Her ekipman için **çalışma prensibi, kullanım, olası arızalar, arıza durumunda yapılacaklar ve önlemler** standart olarak eklenecek.

İçerik çok geniş olduğu için **5 parçalı (faz) teslim** önerilir. Bu plan onaylandığında **Faz 1** uygulanır; sonraki fazlar için onayınızı tek tek alırım.

## Mevcut Durum (Tespit)

`src/data/shipSystemsData.ts` içindeki 4 kategoride şu konular var:

- **Güverte Makineleri (5):** Windlass, Yük Vinçleri, Mooring Vinçleri, Hatch Cover, Capstan
- **Seyir Sistemleri (6):** Radar, ECDIS, AIS, GPS, Pusula, Echo Sounder
- **Ana Makine (5):** 2-zamanlı, 4-zamanlı, Şaft Hattı, Pervane, Dümen Sistemi
- **Yardımcı Makineler (6):** Jeneratör, Kazan, Separatör, Kompresör, Pompa, Tatlı Su Üretici

Eksikler çok geniş (yangın, yük, soğutma, atık, IGS, balast, OWS, emniyet, telsiz, vb.).

## Yeni Standart İçerik Şablonu

`ShipSystemTopic` arayüzüne 3 yeni opsiyonel section tipi eklenecek (mevcut alanlar korunur — geriye dönük uyumlu):

```ts
workingPrinciple?: string[];   // Çalışma prensibi
operation?: string[];          // Kullanım / işletme adımları
faults?: { fault: string; cause: string; action: string }[];  // Arıza tablosu
precautions?: string[];        // Önlemler / emniyet tedbirleri
```

`ShipSystemDetailPage.tsx` bu yeni alanları renderlayacak (kart + tablo + liste, mevcut tasarım dilinde, açıklama metni eklemeden — sadece terim ve içerik).

## Faz Planı

### Faz 1 — Şablon altyapısı + mevcut 22 konunun zenginleştirilmesi
- `shipSystemsData.ts` içindeki tüm mevcut 22 topic'e `workingPrinciple`, `operation`, `faults`, `precautions` alanları eklenir.
- `ShipSystemDetailPage.tsx` yeni alanları renderlayacak şekilde güncellenir.

### Faz 2 — Yeni Kategori: Yangın & Emniyet Sistemleri
- CO₂ sistemi, Köpük sistemi (foam), Sprinkler, Su sisi (water mist), Yangın devriye/dedektörler, Yangın pompası & emergency fire pump, EEBD, SCBA, Fireman's outfit, Hyper-mist, Fixed gas detection.

### Faz 3 — Yeni Kategori: Yük Sistemleri (gemi tipine göre)
- Tanker: IGS (Inert Gas), COW, Cargo pumps, P/V valves, Vapour return, Ullage/temp/pressure system.
- Bulk: Hold ventilation, Bilge wells, Hatch sealing.
- Konteyner: Lashing, Reefer plug, Twist locks.
- Ro-Ro: Stern/bow ramp, ventilation, deck drains.

### Faz 4 — Yeni Kategori: Çevre & Yardımcı Sistemler
- Balast (BWMS), OWS (15 ppm), Sewage treatment plant, Insinerator, Garbage compactor, MARPOL ekipmanları, Sıkıştırılmış hava sistemi (start air/control air/working air), Hidrofor, Soğuk depo (provision refrigeration), HVAC, Klima, Buhar/kondens hattı.

### Faz 5 — Yeni Kategori: Köprüüstü & Telsiz/Can Kurtarma
- GMDSS: MF/HF, Inmarsat-C, EPIRB, SART, Two-way VHF.
- Köprü: BNWAS, VDR, Speed log, Anemometer, Rate of turn, Course recorder, Sound reception, Whistle/Daylight signal.
- Can kurtarma: Lifeboat & davits, Liferaft & HRU, Rescue boat, MOB, LSA aydınlatma.

## Faz 1 Teknik Detay (bu onaydan sonra uygulanacak)

**1. `src/data/shipSystemsData.ts`**
- `ShipSystemTopic` arayüzüne 4 yeni opsiyonel alan eklenir.
- Her 22 topic'e ortalama:
  - `workingPrinciple`: 3-5 madde (sade teknik, AI dili yok)
  - `operation`: 4-6 madde (start/stop/normal işletme)
  - `faults`: 5-8 satırlık tablo (Arıza | Sebep | Yapılacak)
  - `precautions`: 4-6 madde (PPE, kilitleme, izolasyon vb.)

**2. `src/pages/ShipSystemDetailPage.tsx`**
- Mevcut `topic.sections.map` bloğunun altına 4 yeni blok eklenir:
  - "Çalışma Prensibi" — madde listesi
  - "Kullanım" — madde listesi
  - "Olası Arızalar" — 3 sütunlu tablo
  - "Önlemler" — madde listesi
- Var olan tasarım tokenları kullanılır (`bg-card/60`, `border-border/30`, `text-primary` vb.). Yeni stil eklenmez.
- Hiçbir alan yoksa o blok render edilmez (boş "içerik yok" yazısı yazılmaz — kullanıcı tercihi).

## Dosya Etkisi (Faz 1)
- `src/data/shipSystemsData.ts` — interface + 22 topic veri eklemesi (~+800 satır)
- `src/pages/ShipSystemDetailPage.tsx` — render bloğu eklemesi

## Kapsam Dışı (bu fazda)
- Yeni kategoriler (Faz 2-5'te).
- Görsel asset eklemesi (mevcut `shipSystemImages` korunur; yeni görseller sonraki fazlarda).
- Bridge devices (`bridgeDevices.ts`) ayrı modül olduğundan dokunulmaz; Faz 5'te ele alınacak.
