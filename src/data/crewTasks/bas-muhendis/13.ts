import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "EEDI / EEXI / CII karbon performans yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 13,
  estimatedPages: 27,
  intro: `Baş Mühendis (Chief Engineer), MARPOL Annex VI Bölüm 4 kapsamında geminin EEXI (Energy Efficiency Existing Ship Index), CII (Carbon Intensity Indicator) ve SEEMP Part III uyumluluğunun teknik sorumlusudur. Hız ve trim optimizasyonu, hull/propeller temizliği, atık ısı geri kazanımı ve alternatif yakıt seçeneklerinin teknik değerlendirmesini yapar; CII rating'in korunmasını ve gerektiğinde corrective action plan hazırlanmasını yönetir. Bu bölüm; karbon yoğunluğu rejimini, EEXI/CII hesabını, enerji verimliliği önlemlerini ve uyum stratejilerini detaylı ele alır.`,
  sources: [
    "MARPOL Annex VI Bölüm 4 — Energy efficiency for ships",
    "IMO MEPC.328(76) — EEXI ve CII düzenlemeleri",
    "IMO MEPC.336(76)/352(78) — CII reference lines ve reduction factors",
    "IMO MEPC.346(78) — SEEMP (Part I/II/III) kılavuzu",
    "EU ETS ve FuelEU Maritime — AB karbon düzenlemeleri",
    "IMO 2023 GHG Strategy — Net-zero hedefleri",
    "Class guidance (DNV/LR/ABS) — EEXI/CII verification",
  ],
  chapters: [
    {
      heading: "1. Karbon Yoğunluğu Rejiminin Temelleri",
      lead: `Denizcilik dekarbonizasyonu artık bir gelecek senaryosu değil, günlük operasyonel bir gerçektir. Baş Mühendis bu rejimin teknik yükünü taşır.`,
      sections: [
        {
          subheading: "1.1 EEDI, EEXI ve CII farkı",
          paragraphs: [
            `EEDI (Energy Efficiency Design Index) yeni inşa gemilere uygulanan bir tasarım indeksidir; gemi tasarımının enerji verimliliğini g CO2/ton-mil cinsinden ölçer. EEXI ise mevcut gemilere uygulanan eşdeğer bir indekstir; geminin teknik/tasarım verimliliğini değerlendirir ve tek seferlik bir uyum gerektirir.`,
            `CII (Carbon Intensity Indicator) ise operasyonel bir göstergedir: geminin yıllık gerçek yakıt tüketimine ve kat ettiği mesafeye dayanır. EEXI "gemi ne kadar verimli tasarlandı", CII "gemi pratikte ne kadar verimli işletiliyor" sorusunu yanıtlar.`,
          ],
          table: {
            caption: `EEDI / EEXI / CII karşılaştırması`,
            headers: ["İndeks", "Kapsam", "Tip", "Sıklık"],
            rows: [
              ["EEDI", "Yeni inşa", "Tasarım", "İnşada bir kez"],
              ["EEXI", "Mevcut gemiler", "Tasarım/teknik", "Tek seferlik uyum"],
              ["CII", "Mevcut gemiler", "Operasyonel", "Yıllık (rating A-E)"],
              ["SEEMP III", "Mevcut gemiler", "Yönetim planı", "Sürekli/yıllık"],
            ],
          },
        },
        {
          subheading: "1.2 Baş Mühendisin rolü",
          paragraphs: [
            `Baş Mühendis, bu indekslerin teknik tarafını yönetir: yakıt tüketim verisinin doğru toplanması, enerji verimliliği önlemlerinin uygulanması ve makine/propulsion sistemlerinin optimum çalıştırılması. CII operasyonel olduğundan, Baş Mühendis'in günlük kararları rating'i doğrudan etkiler.`,
            `Bu rol; mevzuat bilgisi, veri yönetimi ve mühendislik optimizasyonunu birleştirir. Baş Mühendis, Kaptan ve karadaki yönetimle birlikte uyum stratejisini uygular.`,
          ],
        },
      ],
    },
    {
      heading: "2. EEXI Hesabı ve Uyum",
      sections: [
        {
          subheading: "2.1 EEXI parametreleri",
          paragraphs: [
            `EEXI; ana ve yardımcı makine gücüne, SFC'ye (specific fuel consumption), yakıt karbon faktörüne, gemi DWT/kapasitesine ve referans hıza dayanan bir formülle hesaplanır. Hesaplanan EEXI, gemi tipi/büyüklüğüne göre belirlenen required EEXI'nin altında olmalıdır.`,
            `EEXI uyumu, gemi inşa edildiğinden bağımsız olarak mevcut filoya getirilen tek seferlik bir gerekliliktir. Uyum sağlanamazsa teknik önlem alınır.`,
          ],
        },
        {
          subheading: "2.2 EEXI uyum önlemleri (EPL / ShaPoLi)",
          paragraphs: [
            `En yaygın EEXI uyum yöntemi, Engine Power Limitation (EPL) veya Shaft Power Limitation (ShaPoLi) ile maksimum kullanılabilir gücün sınırlanmasıdır. Bu, motorun MCR'ını yazılımsal/mekanik olarak kısıtlayarak hesaplanan EEXI'yi düşürür.`,
            `EPL/ShaPoLi'de, acil durumda (kötü hava, manevra emniyeti) sınırın aşılabilmesi için override imkânı bulunur; ancak bu override kayıt altına alınmalı ve gerekçelendirilmelidir. Baş Mühendis bu sistemin doğru çalışmasından ve override disiplininden sorumludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "EPL override ve kayıt",
              text: `Engine/Shaft Power Limitation override (limit aşımı) yalnızca emniyet gerekçesiyle (örn. ağır havada manevra) kullanılmalı ve kayıt altına alınmalıdır. Kötüye kullanım, EEXI uyumunu geçersiz kılar ve denetimde sorun yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. CII Hesabı ve Rating",
      sections: [
        {
          subheading: "3.1 Attained CII ve rating sınırları",
          paragraphs: [
            `Attained CII, geminin bir yıldaki toplam CO2 emisyonunun (yakıt tüketimi × karbon faktörü) taşıma işine (kapasite × kat edilen mesafe) bölünmesiyle hesaplanır. Bu değer, gemi tipi/büyüklüğüne özgü required CII reference line ile karşılaştırılır.`,
            `Sonuç, A (çok iyi) ile E (kötü) arasında bir rating'e dönüşür. Reduction factor her yıl sıkılaştığından, aynı performansla bile rating zamanla düşebilir; bu, sürekli iyileştirmeyi zorunlu kılar.`,
          ],
          table: {
            caption: `CII rating ve sonuçları`,
            headers: ["Rating", "Anlamı", "Sonuç"],
            rows: [
              ["A", "Üstün performans", "Teşvik / tercih edilir"],
              ["B", "İyi", "Uyumlu"],
              ["C", "Orta (eşik)", "Asgari kabul"],
              ["D", "Zayıf", "3 yıl üst üste → CAP"],
              ["E", "Çok zayıf", "Bir yıl bile → CAP"],
            ],
          },
        },
        {
          subheading: "3.2 Corrective Action Plan (CAP)",
          paragraphs: [
            `Bir gemi üst üste üç yıl D veya bir yıl E rating alırsa, SEEMP'e dahil edilecek bir Corrective Action Plan (CAP) hazırlamak ve onaylatmak zorundadır. CAP, rating'i C veya üstüne çıkaracak somut önlemleri içerir.`,
            `Baş Mühendis, CAP'in teknik içeriğini (hız profili, hull/propeller temizliği, enerji verimliliği yatırımları) hazırlar ve uygulamayı yönetir. CAP yalnızca bir belge değil, uygulanabilir bir eylem planı olmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kötü CII rating'in ticari etkisi",
              text: `Düşük CII rating, sadece bir uyum sorunu değildir; charterer'lar ve finansçılar (Poseidon Principles) artık gemi seçiminde rating'e bakar. D/E gemi, charter bulmakta ve finansman almakta dezavantajlıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Enerji Verimliliği Önlemleri — Operasyonel",
      sections: [
        {
          subheading: "4.1 Hız (slow steaming) ve voyage optimizasyonu",
          paragraphs: [
            `Hız, CII üzerinde en güçlü operasyonel kaldıraçtır; tüketim hızın yaklaşık küpüyle değiştiğinden, küçük hız düşüşü büyük emisyon azalması sağlar. Slow steaming, charter party ve ETA kısıtları çerçevesinde Kaptan ile birlikte planlanır.`,
            `Just-in-time arrival (limanda demir bekleme yerine optimum hızla varış) hem yakıt hem emisyon tasarrufu sağlar. Baş Mühendis, ana makinenin düşük yük verimliliğini (de-rating, tuning) bu profile uyarlar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Hız düşüşü rating'i yükseltti",
              text: `Bir bulk carrier, ortalama hızını yaklaşık %10 düşürüp just-in-time arrival uygulayarak yıllık yakıt tüketimini ve CO2 emisyonunu belirgin azalttı; CII rating'i D'den C'ye çıktı. En güçlü kaldıraç, çoğu zaman hızdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Trim ve draft optimizasyonu",
          paragraphs: [
            `Optimum trim, gövde direncini azaltarak yakıt tüketimini düşürür. Trim optimization yazılımları, yük/draft koşuluna göre en verimli trim'i önerir. Baş Mühendis, ballast yönetimi ve yük dağılımıyla bu optimuma yaklaşılmasını destekler.`,
            `Küçük trim değişiklikleri bile, uzun seferlerde anlamlı tasarruf sağlar. Bu, sıfır yatırımlı bir verimlilik önlemidir ve düzenli uygulanmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Enerji Verimliliği Önlemleri — Teknik",
      sections: [
        {
          subheading: "5.1 Hull ve propeller bakımı",
          paragraphs: [
            `Gövde ve pervane fouling (kabuklanma), direnci dramatik artırır ve tüketimi yükseltir. Düzenli hull cleaning ve propeller polishing, %3-8 yakıt tasarrufu sağlayabilir. Baş Mühendis, performans trend'ine (artan SFOC, düşen hız) bakarak temizlik zamanlamasını planlar.`,
            `Düşük sürtünmeli (anti-fouling / foul-release) boya seçimi de uzun vadeli verimliliği etkiler; bu, drydock planlamasında değerlendirilir. Hull performance monitoring (ISO 19030) bu kararları objektifleştirir.`,
          ],
          bullets: [
            "Periyodik propeller polishing (in-water survey ile)",
            "Hull cleaning (fouling derecesine göre)",
            "Anti-fouling / foul-release coating seçimi (drydock)",
            "Hull performance monitoring (ISO 19030 trend)",
            "Air lubrication system (uygunsa) değerlendirmesi",
          ],
        },
        {
          subheading: "5.2 Waste heat recovery ve yardımcı yük yönetimi",
          paragraphs: [
            `Atık ısı geri kazanımı (Waste Heat Recovery System — WHRS), egzoz gazı ısısından buhar/elektrik üreterek toplam verimliliği artırır. Baş Mühendis, varsa WHRS'in optimum çalışmasını ve exhaust gas economizer bakımını yönetir.`,
            `Yardımcı yük (auxiliary load) yönetimi de önemlidir: gereksiz pompa/fan çalışmasının önlenmesi, frekans kontrollü sürücülerin (VFD) kullanımı ve doğru sayıda jeneratör paralelleme, jeneratör yakıt tüketimini düşürür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Jeneratör yük optimizasyonu",
              text: `Jeneratörleri optimum yük bandında (genelde %60-85) çalıştırmak, düşük yükte verimsiz çalışmadan kaçınmak yakıt tasarrufu sağlar. Doğru sayıda makine paralellemek, hem yakıt hem bakım maliyetini düşürür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Alternatif Yakıtlar ve Geleceğe Hazırlık",
      sections: [
        {
          subheading: "6.1 LNG, metanol, biyoyakıt ve amonyak",
          paragraphs: [
            `Dekarbonizasyon yolunda LNG (düşük CO2, metan kaçağı riski), metanol (depolama kolaylığı), biyoyakıt (drop-in, sınırlı arz) ve amonyak/hidrojen (sıfır karbon, yüksek teknik zorluk) seçenekleri değerlendirilir. Her birinin emisyon, depolama ve emniyet profili farklıdır.`,
            `Baş Mühendis, geminin mevcut/planlanan yakıt esnekliğini (dual-fuel, biofuel-ready) ve bunun karbon yoğunluğuna etkisini değerlendirir. Biyoyakıt karışımı, mevcut motorlarda CII'yi düşürebilen pratik bir geçiş seçeneğidir.`,
          ],
          table: {
            caption: `Alternatif yakıt karşılaştırması (genel eğilim)`,
            headers: ["Yakıt", "CO2 azaltma", "Temel zorluk"],
            rows: [
              ["LNG", "Orta", "Metan kaçağı (methane slip)"],
              ["Metanol", "Orta-yüksek (yeşil ise)", "Düşük flash point, hacim"],
              ["Biyoyakıt", "Yüksek (lifecycle)", "Arz ve maliyet"],
              ["Amonyak", "Çok yüksek", "Toksisite, NOx, teknoloji"],
              ["Hidrojen", "Çok yüksek", "Depolama, emniyet, altyapı"],
            ],
          },
        },
        {
          subheading: "6.2 AB düzenlemeleri (ETS, FuelEU Maritime)",
          paragraphs: [
            `AB ETS, denizcilik CO2 emisyonlarına karbon fiyatı getirdi; FuelEU Maritime ise kullanılan yakıtın yaşam döngüsü GHG yoğunluğuna giderek sıkılaşan limit koyar. Bu düzenlemeler, yakıt seçimine doğrudan finansal boyut ekler.`,
            `Baş Mühendis, bu düzenlemelerin gemi operasyonuna teknik ve maliyet etkisini anlar; veri toplama ve raporlamanın doğruluğu, doğru maliyet hesabı için kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Veri Toplama, SEEMP ve Doğrulama",
      sections: [
        {
          subheading: "7.1 SEEMP Part II ve III",
          paragraphs: [
            `SEEMP Part II, yakıt tüketim verisinin (IMO DCS) toplanma yöntemini tanımlar; Part III ise CII hedeflerini ve bunlara ulaşmak için uygulama planını içerir. Baş Mühendis, verinin onaylı plana uygun, tutarlı ve eksiksiz toplanmasını sağlar.`,
            `Veri kalitesi, CII hesabının ve dolayısıyla rating'in doğruluğunu belirler. Noon report, bunker kayıtları ve DCS verisi birbiriyle tutarlı olmalıdır; tutarsızlık, doğrulamada (verification) sorun yaratır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Veri tutarlılığı = doğru rating",
              text: `CII rating'i ham veriden hesaplandığından, hatalı veya tutarsız tüketim/mesafe verisi yanlış rating'e yol açar. Baş Mühendis için veri disiplini, mühendislik önlemleri kadar önemlidir.`,
            },
          ],
        },
        {
          subheading: "7.2 Doğrulama ve SoC",
          paragraphs: [
            `Yıllık DCS verisi, yetkili bir doğrulayıcı (verifier/RO) tarafından kontrol edilir ve uyumlu gemiye Statement of Compliance (SoC) düzenlenir. Baş Mühendis, doğrulama için tüm kayıt ve kanıtı hazır tutar.`,
            `Doğrulama süreci, verinin izlenebilir ve tutarlı olmasını gerektirir; eksik kanıt, SoC'nin gecikmesine yol açar. Bu da gemi sertifikasyon durumunu etkileyebilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "8.1 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, karbon performans yönetiminin temel unsurlarını özetler.`,
          ],
          bullets: [
            "EEXI uyumu sağlandı ve EPL/ShaPoLi doğru çalışıyor mu?",
            "EPL override'lar emniyet gerekçeli ve kayıtlı mı?",
            "Yıllık CII rating izleniyor ve trend biliniyor mu?",
            "D/E rating riskinde CAP planı hazır mı?",
            "Hız ve trim optimizasyonu uygulanıyor mu?",
            "Hull/propeller temizlik performans trend'ine göre planlandı mı?",
            "WHRS ve jeneratör yük optimizasyonu yönetiliyor mu?",
            "Alternatif/biyoyakıt seçenekleri değerlendiriliyor mu?",
            "DCS/SEEMP verisi onaylı plana uygun ve tutarlı toplanıyor mu?",
            "Doğrulama (verification) için kanıtlar hazır mı?",
          ],
        },
        {
          subheading: "8.2 Sonuç",
          paragraphs: [
            `EEDI/EEXI/CII karbon performans yönetimi, modern Baş Mühendis'in en hızlı büyüyen sorumluluk alanıdır. Teknik optimizasyon (hız, trim, hull, WHRS), doğru veri toplama ve mevzuat bilgisi bir arada yürütülmelidir. Karbon performansı artık yalnızca bir uyum konusu değil; geminin ticari rekabet gücünü ve filonun geleceğini belirleyen stratejik bir parametredir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
