# Inspections: PSC yerine bütün denetimler

## Ne değişecek
Beta'daki PSC Checklist sayfası **Inspection Checklists** olur. Açılışta denetim türü seçilir, sonra o denetimin kendi listesi gelir. Her listede şunlar olur: OK / Deficiency / N/A işareti, not, ilerleme çubuğu ve Excel'e aktarma. Bunlar bugünkü PSC ekranında zaten var.

## Denetim türleri
1. **Port State Control**: mevcut liste (Paris/Tokyo MoU alanları), İngilizceye çevrilir.
2. **SIRE 2.0 (OCIMF)**: tanker vetting, VIQ bölüm başlıklarına göre.
3. **CDI**: kimyasal ve gaz tankerleri.
4. **Flag State Inspection**
5. **Class Annual Survey**: gövde, makine ve teçhizat.
6. **ISM Audit**: iç ve dış denetim, SMS maddeleri.
7. **ISPS Audit**: SSP, erişim kontrolü, kayıtlar.
8. **MLC 2006 Inspection**: DMLC, çalışma ve dinlenme saatleri, yaşam mahalleri.
9. **RightShip Inspection**: dökme yük gemisi vetting.
10. **Terminal Inspection**: yanaşma öncesi gemi/terminal emniyet kontrolü (ISGOTT SSSCL).

Her madde kendi kural kaynağını gösterir (SOLAS, MARPOL, ISM, ISPS, MLC, ISGOTT, VIQ bölümü). Doğruluk kuralı geçerli: kaynağından emin olunmayan madde eklenmez. OCIMF ve RightShip'in telifli soru metinleri birebir kopyalanmaz; maddeler aynı denetim alanlarını kapsayan özgün hazırlık maddeleri olarak yazılır.

## Diğer
- Library'deki kart "Inspection Checklists" olur ve aynı sayfayı açar.
- Her denetimin işaretleri cihazda ayrı ayrı saklanır. Mevcut PSC işaretleri kaybolmaz.

## Teknik
- `pscChecklist.ts` → denetim tanımları dizisi (`id, title, scope, categories`), veriler `src/data/inspections/*.ts` dosyalarında.
- Sayfa: türü seçme görünümü + `?type=` parametresi. `/beta/psc-checklist` aynı kalır, varsayılan PSC.
- localStorage anahtarı türe göre ayrılır, eski PSC anahtarı taşınır.
- Test: her denetimde benzersiz madde id'leri ve boş olmayan `ref`, Library bağlantısı.
- Lint, typecheck, i18n ve tasarım kontrolleri; telefon boyutunda Playwright ile doğrulama.
