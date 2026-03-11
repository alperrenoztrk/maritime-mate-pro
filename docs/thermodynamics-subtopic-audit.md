# Thermodynamics Subtopic Audit

## 1) `machineTopicLessonData.ts` içindeki `thermodynamics` altındaki tüm `subTopics`

1. Termodinamik sistem ve sınıflandırması
2. Hal büyüklükleri: basınç, sıcaklık, hacim
3. İç enerji ve entalpi
4. Spesifik ısı kapasiteleri (Cp, Cv)
5. Termodinamiğin sıfırıncı yasası
6. Birinci yasa: enerji korunumu
7. Açık ve kapalı sistemlerde enerji dengesi
8. İkinci yasa: Kelvin–Planck ve Clausius ifadeleri
9. Entropi kavramı ve hesabı
10. Tersinir ve tersinmez süreçler
11. Exerji ve anergy kavramları
12. İdeal gaz denklemi (PV = mRT)
13. İzotermik süreç
14. İzobarik süreç
15. İzokorik süreç
16. Adyabatik (izentropik) süreç
17. Politropik süreç ve n üssü
18. Carnot çevrimi ve teorik verim
19. Otto çevrimi (benzinli motor)
20. Diesel çevrimi
21. Sabathe (ikili) çevrimi
22. Rankine çevrimi (buhar türbini)
23. Brayton çevrimi (gaz türbini)
24. Ters çevrimler: soğutma ve ısı pompası
25. Fourier iletim yasası
26. Çok katmanlı duvar ve silindirik iletim
27. Newton soğuma yasası (taşınım)
28. Doğal ve zorlanmış taşınım
29. Stefan–Boltzmann ışınım yasası
30. Toplam ısı geçiş katsayısı (U)
31. Paralel akış ve ters akış düzenlemeleri
32. LMTD (logaritmik ortalama sıcaklık farkı)
33. Plakalı ısı eşanjörleri
34. Kabuk–boru (shell & tube) eşanjörler
35. Fouling ve temizlik etkileri
36. Eşanjör verim hesapları
37. Egzoz gazı ekonomizeri
38. Atık ısı geri kazanım sistemi (WHRS)
39. Buhar jeneratörü ve türbin entegrasyonu
40. Kojenerasyon uygulamaları
41. Enerji dönüşüm verimi ve kayıp analizi

## 2) `machineTopicDetailContent.ts` ... `machineTopicDetailContent10.ts` karşılaştırması

- `thermodynamics` slug'ı altında tanımlı alt başlık anahtarları tarandı.
- Sonuç: **eksik başlık bulunmadı** (41/41 eşleşme).
- Bu nedenle yeni `MachineSubTopicContent` eklemesi gerekmemiştir.

## 3) `hasSubTopicContent(topicSlug, subTopicTitle)` doğrulama notu

- Doğrulama yöntemi, `hasSubTopicContent` fonksiyonundaki kontrol ile birebir aynı mantıktadır:
  - tüm içerik haritalarında `map[topicSlug]?.[subTopicTitle]` anahtarının varlığına bakılır.
- `thermodynamics` için tüm `subTopicTitle` değerleri bu kontrole göre geçmektedir.

