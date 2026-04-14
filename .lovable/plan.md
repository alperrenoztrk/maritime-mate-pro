

# Gemi Personeli İçerik Yeniden Yapılandırma Planı

## Mevcut Durum
Şu an `CrewRole` tipi sadece `alwaysDuties: string[]` ve `generalTasks: string[]` içeriyor — kısa maddeler halinde. Kullanıcının istediği format ise her rol için kapsamlı, profesyonel denizcilik pratiğine dayanan detaylı içerik: giriş paragrafı, sorumluluk ağacı, her görevin açıklaması, ekipman listesi ve kontrol noktaları.

## Yapılacaklar

### 1. Veri Modelini Genişlet (`CrewRole` tipi)
Mevcut basit string dizilerine ek olarak zengin içerik alanları ekle:

```typescript
type CrewRoleDetail = {
  // mevcut alanlar korunur (slug, rank, responsibility, reportsTo, alwaysDuties, generalTasks)
  intro: string;                    // Giriş paragrafı
  tasks: { title: string; description: string }[];    // A) İşler — her biri başlık + açıklama
  equipment: { title: string; checkpoints: string[] }[];  // B) Ekipmanlar — kontrol listeleri
  coreSummary: string;              // Net çekirdek tanım
  criticalNotes?: string[];         // Yaşlı gemi / pratik uyarılar
};
```

### 2. 16 Rol İçin Kapsamlı İçerik Yaz
Her rol için kullanıcının verdiği 4. Kaptan şablonuna uygun, profesyonel gemi pratiğine dayanan detaylı içerik hazırla. Roller:

**Güverte (8 rol):** Kaptan, Birinci Zabit, İkinci Zabit, Üçüncü Zabit, Dördüncü Zabit, Reis/Bosun, Usta Gemici/Gemiciler, Güverte Stajyeri

**Makine (6 rol):** Baş Mühendis, İkinci Mühendis, Üçüncü/Dördüncü Mühendis, ETO, Yağcı/Fitter/Silici, Makine Stajyeri

**İkmal (2 rol):** Aşçı, Kamarot/Steward

Her rol için:
- Rolün gerçek sorumluluğunu açıklayan giriş paragrafı (SOLAS, ISM, MARPOL referanslarıyla)
- A) İşler: 8-12 madde, her biri başlık + detaylı açıklama paragrafı
- B) Ekipmanlar: Rolün sorumlu olduğu ekipmanlar + her biri için kontrol noktaları
- Net çekirdek tanım (tek cümle özet)
- Pratik uyarılar

İçerik boyutu nedeniyle veri ayrı bir dosyaya taşınacak: `src/data/crewRoleDetails.ts`

### 3. Detay Sayfasını Yeniden Tasarla (`CrewRoleDetail.tsx`)
Mevcut basit iki sütunlu görünüm yerine zengin içerik formatını render eden yeni layout:

- **Giriş kartı**: Rol tanımı + intro paragrafı
- **A) İşler bölümü**: Accordion veya genişletilebilir kartlar — her görev başlık + açıklama
- **B) Ekipmanlar bölümü**: Ekipman kartları, her biri altında kontrol noktaları listesi
- **Çekirdek tanım**: Vurgulu özet kartı
- **Pratik uyarılar**: Uyarı kutusu formatında

### 4. Mevcut Yapıyı Koru
`crewHierarchy.ts`'deki mevcut `alwaysDuties` ve `generalTasks` alanları liste sayfası (`CrewHierarchyPage`) için korunur. Yeni detay verileri ayrı dosyada tutulur ve sadece detay sayfasında kullanılır.

## Teknik Detaylar
- Yeni dosya: `src/data/crewRoleDetails.ts` (~3000-4000 satır statik veri)
- Güncellenecek: `src/pages/CrewRoleDetail.tsx` (yeni layout)
- Güncellenecek: `src/data/crewHierarchy.ts` (tip genişletme)
- İçerik büyüklüğü nedeniyle birden fazla adımda uygulanacak

## İçerik büyük — aşamalı teslim
Bu çok büyük bir içerik işi (16 rol × ortalama 200 satır = ~3200+ satır). Tüm rolleri tek seferde yazacağım ama dosya boyutu nedeniyle birkaç adımda commit edilebilir.

