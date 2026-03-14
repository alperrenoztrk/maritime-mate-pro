

## Eksik Konu Anlatımlarını Tamamlama Planı

### Mevcut Durum Analizi

**Güverte (Deck) Tarafı:**
- Seyir, Stabilite, Kargo, Meteoroloji, Gemicilik, Güvenlik kategorilerinde içerik büyük ölçüde tamamlanmış durumda (memory notlarına göre).
- **Akışkanlar Mekaniği** (`FluidMechanicsTopicsPage.tsx`) sayfasında 14 alt başlık `hasContent: false` olarak işaretli — bu tek eksik güverte alanı.

**Makine Tarafı:**
- `machineTopicLessonData.ts` dosyasında 16 ana konu, toplam ~350 alt başlık tanımlı.
- 10 adet content dosyası (`machineTopicDetailContent.ts` + `content2-10`) mevcut ve önemli miktarda içerik yazılmış.
- `hasSubTopicContent()` fonksiyonu dinamik olarak kontrol ediyor — yani hangi alt başlıkların içeriği eksik olduğunu runtime'da belirliyor.
- Eksik alt başlıklar tahminen her konuda birkaç tane olmak üzere toplam ~80-120 adet olabilir.

### Uygulama Planı

Bu iş çok büyük olduğundan aşamalı olarak yapılmalıdır. Her aşamada birden fazla content dosyası oluşturulacak veya mevcut dosyalara ekleme yapılacaktır.

---

**Aşama 1 — Güverte: Akışkanlar Mekaniği (14 alt başlık)**

`FluidMechanicsTopicsPage.tsx` dosyasındaki `topicContents` nesnesine 14 eksik alt başlığın içeriğini ekle ve `hasContent: false` → `true` olarak güncelle:

Eksik başlıklar:
- Akışkan tanımı ve sınıflandırma
- Yoğunluk, özgül ağırlık ve viskozite
- Enerji çizgisi ve kayıp terimleri
- Laminer ve türbülanslı akış
- Hız profilleri
- Sürtünme faktörü ve Moody diyagramı
- Lokal kayıplar
- Pompa karakteristik eğrileri
- Pitot tüpü ile hız ölçümü
- Debi ölçer seçimi
- Balast ve sintine devreleri
- Soğutma suyu devreleri
- Yangın hattı hidrolikleri

---

**Aşama 2 — Makine: Eksik alt başlıkların tespiti ve tamamlanması**

Her 16 konu için `machineTopicLessonData.ts`'deki alt başlık listesini content dosyalarındaki anahtarlarla karşılaştırıp eksikleri tespit et. Sonra yeni content dosyaları (`machineTopicDetailContent11.ts`, `12.ts`, vb.) oluşturarak eksikleri doldur.

Konular ve tahmini kapsam:
1. **Termodinamik** — Isı eşanjörleri ve enerji sistemleri alt başlıkları
2. **Akışkanlar Mekaniği** — Boru akışı, pompa, gemi boru sistemleri
3. **Makine Elemanları** — Mil/yatak, dişli, yorulma, kaynak
4. **Dizel Motorlar** — Motor bileşenleri, enjeksiyon, performans, arıza
5. **Gemi Sistemleri** — Dümen, pervane, güverte makineleri, hidrolik, pnömatik
6. **Yardımcı Makineler** — Kazan, su üretimi, separatör, kompresör
7. **Yakıt Teknolojisi** — Kalite, işleme, bunker
8. **Soğutma/Klima** — Soğutucu akışkan, gemi soğutma, klima
9. **Elektrik** — (content8 ile büyük ölçüde tamamlanmış)
10. **Otomasyon** — (content9 ile büyük ölçüde tamamlanmış)
11. **Makine Dairesi Operasyonları** — Seyir hazırlığı, vardiya, manevra, acil durum
12. **Bakım** — (content10 ile büyük ölçüde tamamlanmış)
13. **Makine Dairesi Güvenliği** — KKD, yangın, kapalı alan, tehlikeli madde, İSG
14. **Çevre/MARPOL** — Yağ kirliliği, emisyon, balast su, atık
15. **ERM** — Liderlik, karar verme, takım, kaza analizi
16. **Enerji Verimliliği** — Operasyonel verimlilik, teknik çözümler, raporlama

Her alt başlık için zorunlu içerik standardı:
- Teknik anlatım (kitap dili, madde işareti/emoji yok)
- Çerçevelenmiş formüller (alt çizgi yok)
- En az 1 adım adım sayısal örnek
- Sonuç yorumu
- keyPoints dizisi

---

**Teknik Detaylar:**

- Yeni dosyalar: `machineTopicDetailContent11.ts`, `machineTopicDetailContent12.ts`, vb. oluşturulacak
- `machineTopicDetailContent.ts` dosyasının sonundaki `allContentMaps` dizisine yeni dosyalar import edilip eklenecek
- `FluidMechanicsTopicsPage.tsx` dosyasındaki `topicContents` nesnesine ve `hasContent` bayraklarına güncelleme yapılacak
- Dosya boyutu sınırlaması nedeniyle her content dosyası ~30-40 alt başlık içerecek

---

**Ölçek Notu:** Bu işlem toplam ~100+ alt başlık içermekte olup, her biri ortalama 40-60 satır teknik içerik gerektirmektedir. Birden fazla mesajda aşamalı olarak tamamlanacaktır. İlk mesajda Akışkanlar Mekaniği + Makine tarafından en eksik 2-3 konu ile başlanacaktır.

