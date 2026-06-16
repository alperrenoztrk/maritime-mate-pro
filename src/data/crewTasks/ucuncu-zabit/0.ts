import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "LSA kontrolü, bakım takibi ve kayıt",
  roleSlug: "ucuncu-zabit",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Üçüncü Zabit (Third Officer / Safety Officer), gemideki can kurtarma araçlarının (LSA — Life-Saving Appliances) eksiksiz, sağlam, erişilebilir ve kayıt altına alınmış olmasından doğrudan sorumlu zabittir. Bu görev, "ekipmana bakıldı" demekten çok daha derindir: filika, can salı, can yeleği, can simidi, pyrotechnics, immersion suit, EPIRB ve SART gibi abandon ship ekipmanlarının yerinde, mühürlü, son kullanma tarihi geçmemiş, serbest erişilebilir, servis sertifikası geçerli ve kayıtlarla fizikî durumu tutarlı olmasını teyit etmeyi kapsar. En sık karşılaşılan kusur, ekipmanın yerinde olması ama kaydının eksik olmasıdır; PSC bunu yakaladığında "bakım yapılmamış" muamelesi yapar.`,
  sources: [
    "SOLAS Chapter III — Life-Saving Appliances and Arrangements",
    "LSA Code (International Life-Saving Appliance Code, Res. MSC.48(66))",
    "IMO Res. MSC.402(96) — Maintenance, thorough examination, operational testing of LSA",
    "SOLAS III/20 — Operational readiness, maintenance and inspections",
    "MSC.1/Circ.1206/Rev.1 — Measures to prevent accidents with lifeboats",
    "MSC/Circ.1047 — Inventory of liferaft and lifejacket equipment",
    "IMO Assembly Res. A.760(18) — Symbols related to LSA",
    "Company SMS / Planned Maintenance System (PMS) LSA modülü",
  ],
  chapters: [
    {
      heading: "1. LSA Envanteri ve Sorumluluk Çerçevesi",
      lead: `Safety Officer'ın ilk işi, geminin LSA envanterini eksiksiz tanımak ve her kalemin nerede, ne miktarda, hangi sertifika ile bulunduğunu bilmektir.`,
      sections: [
        {
          subheading: "1.1 LSA kalemlerinin sınıflandırılması",
          paragraphs: [
            `LSA ekipmanları; personal (bireysel), survival craft (hayatta kalma aracı), launching appliance (indirme donanımı), ve distress/locating (imdat/yer bulma) olarak gruplanır. Bireysel grup can yeleği, immersion suit, anti-exposure suit, thermal protective aid (TPA) ve can simidini; survival craft grubu filika ve can sallarını; launching grubu davit, vinç ve release gear'ı; distress grubu pyrotechnics, EPIRB, SART, line-throwing apparatus ve two-way VHF'leri içerir.`,
            `Safety Officer, geminin SOLAS Record of Equipment (Form E/C) belgesindeki LSA listesi ile fizikî envanteri birebir karşılaştırır. Belgede yazan miktar (örn. 100% + 100% kapasiteli filika, %25 ek can salı, kişi başı immersion suit) ile gemideki gerçek sayı arasında fark olmamalıdır.`,
          ],
          bullets: [
            `Filika sayısı/kapasitesi ve davit tipi (gravity/free-fall)`,
            `Can salı sayısı, HRU'lu/HRU'suz, throw-over/davit-launched`,
            `Can yeleği (yetişkin/çocuk/bebek + bridge/muster yedeği)`,
            `Immersion suit / TPA sayısı`,
            `EPIRB (406 MHz), SART (9 GHz), line-throwing apparatus`,
            `Pyrotechnics: rocket parachute, hand flare, buoyant smoke`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/20.6 — Periyodik bakım",
              text: `LSA ekipmanları üreticinin talimatlarına ve IMO Res. MSC.402(96)'ya göre haftalık, aylık ve yıllık periyotlarda denetlenmeli; tüm bulgular maintenance log'a kaydedilmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Kayıt sistemi: log defteri ve PMS",
          paragraphs: [
            `Modern gemilerde LSA kayıtları hem fizikî logbook hem de elektronik PMS (Planned Maintenance System) içinde tutulur. Her inspection bir job olarak açılır, yapıldığında kapatılır; expiry date'ler ayrı bir "expiry tracker" tablosunda izlenir. Safety Officer'ın altın kuralı: yapılmayan iş kaydedilmez, kaydedilmeyen iş yapılmamış sayılır.`,
            `Kayıt tutarlılığı, denetimin en kırılgan noktasıdır. Bir filika motoru çalıştırıldıysa logbook'ta tarih, süre, çalıştıran kişi ve gözlem yer almalıdır. Kayıt ile fizikî durum arasında çelişki (örn. logbook "test edildi" diyor ama HRU expiry geçmiş) PSC için doğrudan deficiency üretir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Filika (Lifeboat) Kontrol ve Bakımı",
      sections: [
        {
          subheading: "2.1 Haftalık ve aylık filika kontrolleri",
          paragraphs: [
            `SOLAS III/20.6 ve MSC.402(96) gereği filikalar haftalık görsel kontrol, aylık detaylı kontrol ve aylık motor çalıştırmaya tabidir. Haftalık kontrolde filika ve launching appliance gözle muayene edilir, motor su soğutmalı değilse 3 dakika çalıştırılır. Aylık kontrolde envanter tamlığı, motorun en az 3 dakika çalışması, davit ve halat durumu denetlenir.`,
            `Safety Officer; filika içi inventory'i (sea anchor, paddle, baltacık, first-aid kit, ration, su, fishing kit, signaling mirror, whistle, bailer) MSC/Circ.1047 listesine göre kontrol eder. Eksik veya expired kalem (örn. su tableti, ration) listeye işlenir ve ikmal talebi açılır.`,
          ],
          bullets: [
            `Motor: yakıt seviyesi, yağ, soğutma, battery şarjı, kolay start`,
            `Hull: çatlak, korozyon, drain plug, dış kabuk bütünlüğü`,
            `Release gear: hydrostatic interlock, hook bağlantısı, maintenance pin`,
            `Falls (halatlar): aşınma, korozyon, end-for-end turn tarihi`,
            `Davit limit switch, brake test, embarkation ladder`,
          ],
          callouts: [
            {
              type: "warning",
              title: "On-load release gear riski",
              text: `Filika kazalarının büyük kısmı on-load release gear'ın yanlışlıkla açılmasından kaynaklanır. Bakım/test sırasında mutlaka maintenance/safety pin takılı olmalı; personel filikadayken hook üzerinde test yapılmamalıdır (MSC.1/Circ.1206/Rev.1).`,
            },
          ],
        },
        {
          subheading: "2.2 Yıllık ve 5-yıllık servisler",
          paragraphs: [
            `Filika launching appliance ve on-load release gear yıllık thorough examination ve operational test'e tabidir; 5 yılda bir dinamik yük testi (winch brake'in 1.1x yükle test edilmesi, release gear'ın overload test'i) yetkili servis tarafından yapılır. Davit falls 5 yılda bir end-for-end çevrilir veya yenilenir.`,
            `Safety Officer, bu servislerin geçerlilik tarihlerini izler ve survey window'una uygun planlar. Servis raporu (certificate) gemide saklanır; PSC ve class survey bu sertifikaları sorar. Free-fall filikalarda yıllık serbest düşüş testi veya simulated launch alternatifi (MSC.1/Circ.1206) uygulanır.`,
          ],
          table: {
            caption: `Filika Kontrol Periyotları (LSA / MSC.402(96))`,
            headers: ["Kontrol", "Periyot", "Sorumlu", "Kayıt"],
            rows: [
              ["Görsel kontrol + motor", "Haftalık", "Safety Officer", "Logbook"],
              ["Detaylı inspection + inventory", "Aylık", "Safety Officer", "PMS job"],
              ["Thorough exam + operational test", "Yıllık", "Yetkili servis", "Sertifika"],
              ["Dinamik yük + release gear overload", "5 yıllık", "Yetkili servis", "Sertifika"],
              ["Falls end-for-end / yenileme", "≤5 yıl", "Servis/Gemi", "Logbook"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Can Salı (Liferaft) ve HRU",
      sections: [
        {
          subheading: "3.1 Liferaft servis ve yerleşim kontrolü",
          paragraphs: [
            `Can salları yılda bir kez (bazı tiplerde extended 30 ay onayı ile) IMO onaylı bir servis istasyonunda açılıp kontrol edilir. Safety Officer, gemideki her salın servis due date'ini izler; geçmiş tarihli sal kullanılamaz ve doğrudan deficiency'dir. Sal cradle'a güvenli yerleştirilmeli, painter (bağlama halatı) sabit noktaya bağlı olmalıdır.`,
            `Safety Officer ayrıca salın throw-over edilebileceği boş bir manevra alanı olduğunu, lashings'in serbest açılabildiğini ve hydrostatic release unit (HRU) bağlantısının doğru kurulduğunu denetler. Boyalı lashing veya pasla sıkışmış raf, gerçek acilde salın serbest kalmasını engeller — bu sık görülen, ölümcül bir kusurdur.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: boyanmış can salı lashing'i",
              text: `Bir PSC denetiminde, can salı lashing'inin defalarca boyandığı ve HRU weak link'inin paslandığı tespit edildi. Salın acil durumda serbest yüzmesi imkânsızdı. Detention'a yol açan ana bulgu buydu. Ders: lashing ve HRU asla boyanmaz, periyodik gözle kontrol edilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Hydrostatic Release Unit (HRU)",
          paragraphs: [
            `HRU, gemi battığında yaklaşık 1.5–4 m derinlikte su basıncıyla weak link'i keserek can salının serbest yüzmesini sağlayan basınç-aktif düzenektir. Çoğu HRU (örn. Hammar H20) disposable tiptir ve 2 yılda bir değiştirilir; üzerinde basılı expiry tarihi vardır. Safety Officer her HRU'nun expiry date'ini envantere kaydeder.`,
            `HRU değişimi, sal servisine denk getirilebilir ama bağımsız olarak da takip edilmelidir. Yanlış kurulum (weak link ile strong point'in karışması, painter'ın HRU'ya yanlış bağlanması) salın ya hiç açılmamasına ya da batan gemiyle birlikte sürüklenmesine yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bireysel Ekipman: Can Yeleği, Immersion Suit, Can Simidi",
      sections: [
        {
          subheading: "4.1 Can yeleği ve immersion suit",
          paragraphs: [
            `Her mürettebat üyesi için bir adet can yeleği (kabinde + muster station yedeği + bridge/engine room watch yedeği) bulunmalıdır. Safety Officer; light (otomatik/manuel), whistle, retro-reflective tape, beden bandı ve kapsül durumunu kontrol eder. Şişme tipli (inflatable) yelekler periyodik servise tabidir.`,
            `Immersion suit (mağdur su geçirmez kurtarma elbisesi), soğuk sularda hipotermiyi geciktirir. Yıllık olarak seam (dikiş) air pressure test ve görsel kontrole tabidir; fermuar parafinlenir, neopren çatlakları aranır. SOLAS, belirli bölgelerde her kişi için immersion suit zorunlu kılar.`,
          ],
          bullets: [
            `Lifejacket light battery expiry kontrolü`,
            `Immersion suit zip fonksiyonu + seam test tarihi`,
            `Beden/çocuk/bebek yeleği oranı uygunluğu`,
            `Muster station yedek yelek sayısı (toplam %5 veya gerekli kadar)`,
          ],
        },
        {
          subheading: "4.2 Can simidi (Lifebuoy) yerleşimi ve teçhizatı",
          paragraphs: [
            `Can simitleri gemi boyutuna göre belirli sayıda, köprüüstü kanatlarında ve güvertelerde dengeli dağıtılır. En az yarısı self-igniting light ile, bazıları self-activating smoke signal ile, bazıları buoyant lifeline ile, en az ikisi quick-release MOB (man-overboard) marker düzeneğiyle donatılır.`,
            `Safety Officer; light battery expiry'lerini, smoke signal expiry'lerini, halat durumunu ve simidin asılı olduğu bracket'in serbest açılabilirliğini kontrol eder. MOB simitleri köprü kanadından bir hareketle bırakılabilmeli; bracket pasla sıkışmamalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/7 & LSA Code",
              text: `Self-igniting light'lı can simitleri en az 2 saat yanmalı; buoyant lifeline'lı simitler line-throwing için kullanılır; MOB marker'lı simitler gece light + smoke kombinasyonu taşır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Distress ve Locating Ekipmanı",
      sections: [
        {
          subheading: "5.1 EPIRB ve SART",
          paragraphs: [
            `406 MHz EPIRB (Emergency Position-Indicating Radio Beacon), gemi battığında HRU ile serbest yüzer ve COSPAS-SARSAT uydularına gemi kimliği + GPS pozisyonunu iletir. Safety Officer; EPIRB'in battery expiry'sini, HRU expiry'sini, self-test fonksiyonunu (haftalık), MMSI registration güncelliğini ve yıllık shore-based veya onboard test gerekliliğini izler.`,
            `SART (Search and Rescue Transponder), 9 GHz X-band radar sinyaline yanıt vererek kurtarma gemisinin radarında 12 nokta dizisi oluşturur. Battery expiry ve self-test kontrol edilir. EPIRB battery ve HRU değişimi servis kayıtlarıyla belgelendirilir.`,
          ],
          table: {
            caption: `Distress Ekipmanı Kontrol Özeti`,
            headers: ["Ekipman", "Test Periyodu", "Battery/HRU", "Kritik Nokta"],
            rows: [
              ["EPIRB 406 MHz", "Haftalık self-test", "Battery ~5 yıl / HRU 2 yıl", "MMSI kayıt güncel"],
              ["SART 9 GHz", "Haftalık self-test", "Battery ~5 yıl", "Radar yanıt mesafesi"],
              ["Two-way VHF (GMDSS)", "Aylık fonksiyon", "Primary battery seal'li", "En az 3 adet"],
              ["Line-throwing apparatus", "Görsel + expiry", "Roket expiry", "4 atış + 4 line"],
            ],
          },
        },
        {
          subheading: "5.2 Pyrotechnics: roket, el fişeği, duman",
          paragraphs: [
            `Pyrotechnics; rocket parachute flare (en az 12 adet köprüüstünde), hand flare ve buoyant smoke signal'dan oluşur; filika ve can sallarında ayrıca kendi setleri bulunur. Hepsinin üzerinde basılı expiry date vardır (genelde imalat + 3-4 yıl) ve süresi geçen pyrotechnics kullanılamaz, doğrudan PSC bulgusu üretir.`,
            `Safety Officer, tüm pyrotechnics'in expiry listesini tutar ve süre dolmadan önce yeni stoku temin eder. Süresi geçen pyrotechnics gelişigüzel atılmaz; uygun bertaraf (liman tesisi veya yetkili imha) ile elden çıkarılır. Bu kalemler nemden korunmuş, kolay erişilir watertight kutularda saklanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Expiry — sessiz katil",
              text: `Pyrotechnics, immersion suit, EPIRB battery ve HRU gibi tarihli kalemlerden tek birinin kaçması bile denetimde doğrudan bulgu çıkarır. Expiry takibi gevşetildiğinde aynı anda onlarca kalem birden geçersiz hale gelebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Erişilebilirlik ve Operasyonel Hazırlık",
      sections: [
        {
          subheading: "6.1 Serbest erişim ve işaretleme",
          paragraphs: [
            `LSA ekipmanının "yerinde olması" yetmez; gerçek acilde serbest erişilebilir ve kullanıma hazır olması gerekir. Embarkation deck temiz tutulur, filika önü boş olur, davit alanına malzeme istiflenmez. Safety Officer rutin safety round'larda bu erişimi denetler.`,
            `Tüm LSA istasyonları IMO Res. A.760(18) sembolleriyle işaretlenir; muster station, lifejacket locker, embarkation point ve liferaft pozisyonları aydınlatmalı tabela ile gösterilir. Emergency lighting ve photoluminescent escape işaretleri çalışır durumda olmalıdır.`,
          ],
        },
        {
          subheading: "6.2 Operasyonel readiness denetimi",
          paragraphs: [
            `Operasyonel hazırlık; ekipmanın hem çalışır hem de personelce kullanılabilir olmasıdır. Safety Officer; davit motoru, winch brake, limit switch, embarkation ladder, emergency lighting ve general alarm'ın bütünleşik çalışmasını periyodik test eder. Bir filikanın indirilebilmesi, sadece motorun çalışmasına değil, davit-brake-halat zincirinin tümüne bağlıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. PSC ve Survey Açısından LSA Kayıtları",
      sections: [
        {
          subheading: "7.1 Denetimde sorulan tipik sorular",
          paragraphs: [
            `PSC ve flag/class survey'de LSA denetiminin üç ayağı vardır: ekipmanın fizikî durumu, kayıtların tutarlılığı ve crew'un kullanma yetkinliği. Denetçi sıklıkla bir kalemi (örn. immersion suit) çıkartıp expiry/test tarihini sorar, ardından logbook'taki kayıtla karşılaştırır.`,
            `En sık deficiency'ler: expired pyrotechnics, geçmiş liferaft servis tarihi, expired/eksik HRU, boyalı lashing, çalışmayan filika motoru, eksik filika inventory ve "kayıt-fizik" tutarsızlığı. Safety Officer bu kalemleri proaktif takip ederek denetime kayıpsız girer.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Denetim öncesi self-audit",
              text: `Survey/PSC öncesi LSA için iç denetim yapın: her tarihli kalemi tek tek expiry tablosuyla karşılaştırın, logbook girişlerinin kesintisiz olduğundan emin olun ve birkaç mürettebata "muster station'ın nerede, yelek nasıl giyilir" diye sorun.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 Safety Officer LSA kontrol listesi",
          bullets: [
            `Filika: haftalık görsel + aylık motor + inventory tamlığı kaydedildi mi?`,
            `Liferaft: servis due date ileride mi, lashing/HRU serbest ve boyasız mı?`,
            `Can yeleği/immersion suit: sayı, light battery, seam test tarihleri tamam mı?`,
            `Can simidi: light/smoke expiry, MOB bracket serbest mi?`,
            `EPIRB/SART: self-test, battery & HRU expiry, MMSI kaydı güncel mi?`,
            `Pyrotechnics: tüm expiry'ler geçerli, stok yeterli mi?`,
            `Embarkation deck ve LSA istasyonları erişilir, işaretli, aydınlatmalı mı?`,
            `Logbook ↔ fizikî durum tam tutarlı mı, açık defect var mı?`,
          ],
          paragraphs: [
            `Safety Officer'ın LSA yönetimindeki başarısı, hiçbir abandon ship senaryosu yaşanmadığında görünmez kalır; ama gerçek bir terk durumunda mürettebatın hayatı tam da bu disiplinli, kayıtlı ve tarih-takipli rutine bağlıdır. "Ekipman yerinde" demek başlangıçtır; "çalışıyor, erişilebilir, geçerli ve belgeli" demek görevin tamamlanmış halidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
