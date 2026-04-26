## Hedef
1. Gemi Operasyonları kart listesinde **emoji yerine her gemi tipinin gerçek fotoğrafı** gözüksün (Konteyner, Ro-Ro, Tanker, Dökme, Yolcu).
2. Her gemi tipinin **Güverte ve Makine** sekmelerindeki ~150 operasyon başlığı için **uzun, detaylı içerik** açılsın (basit liste yerine açılabilir kartlar).

---

## 1. Gerçek Gemi Fotoğrafları

5 gemi tipi için yüksek kaliteli, gerçekçi görseller AI ile (`google/gemini-3.1-flash-image-preview`) üretilecek:
- `src/assets/ships/container-ship.jpg` — büyük konteyner gemisi, denizde, yandan görünüm
- `src/assets/ships/roro-ship.jpg` — Ro-Ro gemisi, rampa açık, liman
- `src/assets/ships/tanker-ship.jpg` — ham petrol tankeri, manifold görünür
- `src/assets/ships/bulk-carrier.jpg` — dökme yük gemisi, ambar kapakları
- `src/assets/ships/passenger-ship.jpg` — kruvaziyer/yolcu gemisi

`shipOperationsData.ts` içine `image` alanı eklenecek. `ShipOperationsPage.tsx` kartlarında emoji kutusu yerine 64×64 yuvarlak köşeli foto thumbnail; `ShipOperationsDetail.tsx` başlığında küçük thumbnail veya hero kullanılacak (emoji fallback olarak kalır).

---

## 2. Operasyon Başlıkları için Detaylı İçerik

### Veri yapısı genişletmesi
`ShipOperationDepartment.operations` `string[]` yerine yapılı tipe dönüşecek:

```ts
interface ShipOperation {
  title: string;          // mevcut başlık
  purpose: string;        // operasyonun amacı (1-2 cümle)
  procedure: string[];    // adım adım uygulama (5-10 madde)
  regulations?: string[]; // SOLAS/MARPOL/STCW/IMDG/ISM atıfları
  safety?: string[];      // güvenlik notları, riskler
  records?: string[];     // tutulacak kayıt/checklist (ORB, deck log vb.)
}
```

Mevcut `string[]` operasyonlar otomatik olarak yeni şemaya migrate edilecek; başlık korunacak, geri kalan alanlar her bir operasyon için **uygulamayla uyumlu, doğru ve detaylı** şekilde elle yazılacak.

### İçerik standardı (her operasyon için)
- **Amaç**: 1–2 cümlelik özet
- **Prosedür**: 6–10 numaralı/adımlı uygulama akışı
- **İlgili Mevzuat**: en az 1, mümkünse 2–3 atıf (örn. *MARPOL Annex I Reg. 17 — ORB I*, *SOLAS V/34*, *STCW Reg. VIII/2*, *IMDG Code Part 7*, *ISM Code Element 7*, *MLC 2006*, *BWM D-2*)
- **Güvenlik & Risk**: kritik uyarılar (örn. enclosed space, hot work permit, IGS oksijen %)
- **Kayıt/Checklist**: hangi defter/forma işleneceği (ORB I/II, Deck Log, Cargo Record Book, Garbage Record Book, Bunker Delivery Note vb.)

Toplam ~150 operasyon × ~15–20 satır = **çok geniş içerik**. Boyut yönetimi için içerik gemi tipi bazında ayrı dosyalara bölünecek:

```
src/data/shipOperations/
  konteyner.ts
  roRo.ts
  tanker.ts
  dokme.ts
  yolcu.ts
  index.ts        // shipTypes export
  types.ts
```

### UI değişikliği — `ShipOperationsDetail.tsx`
- Operasyon listesi `Accordion` (shadcn) olarak render edilecek.
- Kapalı durumda: mevcut görünüm (check ikon + başlık).
- Açık durumda: 5 bölüm halinde (`Amaç`, `Prosedür`, `Mevzuat`, `Güvenlik`, `Kayıt`) ikon + chip + tipografi ile gösterim. Mevcut maritime tema ve `bg-card/60`, `border-border/30` gibi tokenlar korunur.
- Üst bölüme küçük gemi foto thumbnail’i eklenir.

---

## Doğruluk Notları
- IMO/IMDG/SOLAS/MARPOL/STCW/MLC/COLREG atıfları yürürlükteki konsolide metinlere göre yazılacak.
- Tanker özelinde IGS, COW, tank cleaning, ISGOTT 6th edition referansları.
- Dökme yük için IMSBC Code, Group A/B/C ve TML ölçümleri.
- Yolcu gemisi için SOLAS Ch. II-2 Reg. 21 (safe return to port), ISPS, MARPOL Annex IV (STP).
- Ro-Ro için SOLAS Ch. II-1 Part B-2 (watertight integrity), CSS Code, lashing manual.

---

## Teknik Adımlar
1. `src/assets/ships/` altında 5 gerçek gemi fotoğrafı üret.
2. `src/data/shipOperations/` klasörü oluştur, `types.ts` + 5 gemi dosyası + `index.ts` yaz.
3. Tüm operasyonları yeni şemaya genişletilmiş içerikle taşı (titleler birebir korunur).
4. `ShipOperationsPage.tsx` — emoji kutusu yerine `image` thumbnail.
5. `ShipOperationsDetail.tsx` — Accordion ile detay gösterimi + üst başlıkta foto.
6. `shipOperationsData.ts` re-export shim (geri uyumluluk).
7. TS build kontrolü.

## Kapsam Dışı
- Operasyon başlıklarının kendisi değişmeyecek (sadece içerik eklenecek).
- Quiz, görsel galeri, video gibi ek özellikler bu görevde yok.