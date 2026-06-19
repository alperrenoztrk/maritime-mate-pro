import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte bakım planlaması (PMS)",
  roleSlug: "birinci-zabit",
  taskIndex: 2,
  estimatedPages: 24,
  intro: `Birinci Zabit, güverte departmanının Planned Maintenance System (PMS) kapsamındaki tüm bakım faaliyetlerinin planlayıcısı ve denetçisidir. Vinçler, mooring winch'ler, hatch cover'lar, halat ve teller, boya sistemi ve güverte makinelerinin bakım takvimini hazırlamak, iş emirlerini dağıtmak, malzeme/parça temini ile koordine etmek ve tamamlanmayı kayıt altına almak bu görevin özüdür. Bakımdaki gecikme klas/PSC denetiminde doğrudan bulgu çıkardığı için PMS disiplini Birinci Zabit'in itibarının da ölçüsüdür. Bu bölüm, ISM çerçevesinde planlı bakım metodolojisini açıklar.`,
  sources: [
    "ISM Code — Element 10 (Maintenance of the Ship and Equipment)",
    "SOLAS Chapter II-1 — Construction (hull, machinery)",
    "Klas Kuralları (DNV, LR, ABS, BV vb.) — Survey & PMS schemes",
    "IACS Rec. No. 14 — Hatch Cover Maintenance & Operation",
    "Maritime Labour Convention 2006 — Accommodation & maintenance",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "Manufacturer Maintenance Manuals (vinç, winch OEM)",
    "ISGOTT 6 — Deck equipment maintenance (tankerler için)",
  ],
  chapters: [
    {
      heading: "1. PMS'in ISM Çerçevesindeki Yeri",
      lead: `Planlı bakım, ISM Element 10'un gemideki somut uygulamasıdır.`,
      sections: [
        {
          subheading: "1.1 ISM Element 10 ve şirket PMS politikası",
          paragraphs: [
            `ISM Code Element 10, şirketin gemi ve ekipmanı onaylı kurallara ve şirket prosedürlerine uygun durumda tutmasını şart koşar. Bu, kritik ekipmanların düzenli denetimi, ani arıza durumunda geri dönüş düzenlemeleri ve kayıt tutmayı içerir. PMS yazılımı (AMOS, ShipManager, BASSnet, TM Master vb.) bu gereksinimi job/component hiyerarşisiyle dijitalleştirir.`,
            `Birinci Zabit, güverte component ağacındaki her kalemi (vinç, winch, hatch, mast, deck crane) periyodik job'larla ilişkilendirir; calendar-based, running-hours-based ve condition-based bakım türlerini ayırır. Tamamlanan her job, parça/saat/personel kaydıyla kapatılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code 10.3 — Kritik ekipman",
              text: `Şirket, ani arızası tehlikeli duruma yol açabilecek ekipman ve sistemleri tanımlamalı; bunların güvenilirliğini sağlamak için özel önlemler (yedeklilik, fonksiyon testi) almalıdır. Steering gear, mooring winch'ler ve hatch cover'lar tipik kritik kalemlerdir.`,
            },
          ],
        },
        {
          subheading: "1.2 Klas survey döngüsü ile entegrasyon",
          paragraphs: [
            `PMS, klasın Annual, Intermediate ve Special (5 yıllık) survey döngüsüyle hizalanır. Bazı şirketler, klas onaylı "Planned Maintenance Scheme for Machinery" (PMS class notation) ile makine survey'lerinin bir kısmını gemide kendi mühendisleri eliyle yapma hakkı kazanır. Güverte tarafında ise hatch cover ultrasonic test, mooring equipment ve crane LOLER benzeri kayıtlar survey'de istenir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Güverte Ekipman Envanteri ve Component Ağacı",
      sections: [
        {
          subheading: "2.1 Ana güverte kalemleri",
          paragraphs: [
            `Birinci Zabit'in sorumluluk alanındaki temel kalemler; deck/cargo crane'ler, mooring/anchor winch'ler, windlass, capstan, hatch cover'lar (hidrolik/mekanik), hava firar (ventilation) sistemleri, sounding pipe'lar, freeing port'lar, accommodation ladder/gangway, pilot ladder, deck pipeline (tankerlerde) ve güverte makineleridir.`,
          ],
          table: {
            caption: `Tipik Güverte Bakım Aralıkları (Kılavuz)`,
            headers: ["Ekipman", "Bakım", "Aralık"],
            rows: [
              ["Mooring winch fren testi", "Brake holding test", "Yıllık / sefer öncesi"],
              ["Wire rope greasing", "Yağlama + muayene", "Aylık"],
              ["Hatch cover seal/cleat", "Hortum testi + ayar", "Yükleme öncesi / 3 aylık"],
              ["Deck crane SWL test", "Yük testi/muayene", "5 yıllık + yıllık muayene"],
              ["Anchor/windlass", "Greasing + brake", "Aylık / sefer öncesi"],
              ["Lifeboat davit (LSA ile)", "Yağlama + fonksiyon", "Aylık / yıllık servis"],
            ],
          },
        },
        {
          subheading: "2.2 Running hours ve condition monitoring",
          paragraphs: [
            `Vinç ve winch gibi kalemlerde running hours sayacı bakım tetikleyicisidir. Condition-based izleme ise; wire rope'ta kopan tel sayısı, halatta abrasion/UV degradation, hidrolik yağda kontaminasyon analizi ve hatch cover saclarında korozyon ölçümüyle yapılır. Birinci Zabit, bu gözlemleri PMS'e işleyerek erken müdahale sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. İş Emri (Work Order) Yönetimi",
      sections: [
        {
          subheading: "3.1 İş dağılımı ve planlama",
          paragraphs: [
            `Birinci Zabit, haftalık planlama toplantısında Reis (Bosun) ile birlikte iş emirlerini önceliklendirir ve dağıtır. Her iş emri; iş tanımı, gerekli PPE, risk değerlendirmesi referansı, gereken parça/malzeme ve tahmini süreyi içerir. Yüksek riskli işler (working aloft, overside, hot work, enclosed space) için ayrıca Permit to Work açılır.`,
            `Planlama, liman/sefer ritmiyle uyumlanır: gürültülü/tehlikeli işler liman dışında, boyama işleri uygun hava/nem koşulunda, vinç bakımı yük operasyonu olmayan pencerede yapılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İş ve dinlenme dengesi",
              text: `İş emri planlaması, MLC 2006 çalışma/dinlenme saatleriyle çakışmamalıdır. Aşırı planlama, yorgunluk kaynaklı kaza riskini artırır; planlama gerçekçi iş yüküyle yapılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Tamamlama, kayıt ve geri besleme",
          paragraphs: [
            `Tamamlanan iş emri, harcanan saat, kullanılan parça ve gözlemlerle kapatılır. Yarım kalan veya ertelenen işler "overdue" olarak işaretlenir ve gerekçesi yazılır; overdue kritik job'lar denetimde en sık bulgu sebebidir. Birinci Zabit, overdue listesini her hafta kaptana raporlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Halat, Tel ve Mooring Ekipmanı Bakımı",
      sections: [
        {
          subheading: "4.1 Mooring line ve wire muayenesi",
          paragraphs: [
            `Mooring halatları (HMPE, polyester, mixed) ve wire'lar düzenli muayene edilir: dış aşınma, internal abrasion, UV degradation, splice bütünlüğü ve uzama. Her halatın bir "line management plan" kapsamında retirement kriteri olmalıdır. OCIMF MEG4, halat ömrü ve LDBF (Line Design Break Force) yönetimi için endüstri standardıdır.`,
            `Wire rope'ta belirli uzunlukta izin verilen kopuk tel sayısı aşıldığında veya kink/birdcage görüldüğünde tel hizmet dışı bırakılır. Yağlama (greasing) ve doğru depolama ömrü uzatır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "OCIMF MEG4",
              text: `Mooring Equipment Guidelines 4. baskı; tail, line ve winch yönetimi, snap-back ve LDBF/WLL ilişkisi için referanstır. Halat değişim kriterleri buradan türetilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Winch fren testi",
          paragraphs: [
            `Mooring winch fren tutma kapasitesi, brake holding test ile doğrulanır; hedef genellikle wire/line MBL'inin %60'ı civarındadır (tasarıma göre). Fren kayması (rendering) doğru ayarlanmazsa ya halat kopar ya da fren tutmaz; ikisi de tehlikelidir. Test sonuçları kayıt altına alınır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Hatch Cover ve Su Geçirmezlik Bakımı",
      sections: [
        {
          subheading: "5.1 Seal, drainage ve cleat sistemi",
          paragraphs: [
            `Hatch cover su geçirmezliği; rubber packing (seal), compression bar, drainage channel/non-return valf ve cleat/quick-acting cleat sisteminin bütünlüğüne bağlıdır. Birinci Zabit, seal'lerin set permanenti, compression bar korozyonunu ve cleat ayarını düzenli kontrol eder. Bulk ve container gemilerinde su girişi yük hasarı ve stabilite riski demektir.`,
            `Su geçirmezlik; hose test, chalk test veya ultrasonic tightness test ile doğrulanır. Ultrasonic test, drain edilemeyen hold'larda en güvenilir yöntemdir ve survey öncesi tercih edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hatch cover su girişi",
              text: `Bozuk seal'den giren deniz suyu, tahıl/çelik gibi yüklerde büyük hasar ve cargo claim doğurur; ağır havada serbest yüzey ve flooding riski yaratır. Su geçirmezlik, yükleme öncesi her seferinde doğrulanır (IACS Rec. 14).`,
            },
          ],
        },
        {
          subheading: "5.2 Hidrolik sistem ve hareketli parçalar",
          paragraphs: [
            `Hidrolik açma/kapama sistemlerinde yağ seviyesi, sızıntı, hortum yaşlanması ve silindir pakedi izlenir. Roller, hinge ve wheel track'ler yağlanır; korozyon raspalanıp boyanır. Mekanik (folding) cover'larda chain/wire ve roller bakımı önceliklidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Boya Sistemi ve Korozyon Yönetimi",
      sections: [
        {
          subheading: "6.1 Yüzey hazırlığı ve boya rejimi",
          paragraphs: [
            `Korozyon yönetimi, güverte bakımının en büyük iş kalemidir. Doğru sıra; mekanik raspa/needle gun → wire brush → solvent temizliği → primer → ara kat → son kat. Boya üreticisinin data sheet'indeki nem, yüzey sıcaklığı (dew point + en az 3°C üzeri) ve film kalınlığı (DFT) şartlarına uyulur; aksi halde boya tutmaz.`,
            `Ballast tank ve void space'lerde PSPC (Performance Standard for Protective Coatings, SOLAS II-1/3-2) uygulanır; coating condition GOOD/FAIR/POOR olarak değerlendirilir ve survey'de kayıt istenir.`,
          ],
          table: {
            caption: `Boya Uygulama Çevresel Limitleri (Tipik)`,
            headers: ["Parametre", "Limit", "Risk (limit dışı)"],
            rows: [
              ["Relatif nem", "< %85", "Yüzeyde nem, kötü yapışma"],
              ["Çelik sıcaklığı", "≥ dew point + 3°C", "Yoğuşma, blistering"],
              ["DFT (kuru film)", "Spec'e göre", "Erken korozyon / sarkma"],
              ["Recoat aralığı", "Üreticiye göre", "Katmanlar arası ayrılma"],
            ],
          },
        },
        {
          subheading: "6.2 Anot ve katodik koruma",
          paragraphs: [
            `Su altı gövdesi ve ballast tanklarında sakrifisyel anot (zinc/aluminium) tüketimi izlenir; ICCP (Impressed Current Cathodic Protection) sistemli gemilerde akım/potansiyel okumaları kayıt altına alınır. Anot tükenmesi dock survey'inde değerlendirilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Stok, Yedek Parça ve Tedarik Koordinasyonu",
      sections: [
        {
          subheading: "7.1 Kritik yedek parça (critical spares)",
          paragraphs: [
            `Birinci Zabit, güverte için kritik yedek parça minimum stok seviyelerini belirler ve PMS üzerinden requisition açar. Hatch cover seal, hidrolik conta, anot, boya, wire/rope, twistlock/lashing ekipmanı ve greasing malzemesi tipik kalemlerdir. Tedarik, liman/agent ve şirket purchasing departmanıyla koordine edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Erken müdahale tasarrufu",
              text: `Düzenli wire muayenesiyle erken tespit edilen bir mooring wire degradasyonu, bir sonraki limanda planlı değişimle çözüldü; aksi halde bağlama sırasında kopma, snap-back kazası ve gecikme riski doğacaktı. PMS, reaktif değil proaktif yönetimi sağlar.`,
            },
          ],
        },
        {
          subheading: "7.2 Maliyet ve önceliklendirme",
          paragraphs: [
            `Bütçe sınırlıdır; Birinci Zabit, emniyet-kritik ve survey-kritik kalemleri kozmetik işlerin önüne koyar. Erteleme kararları gerekçeli olarak kaptanla ve gerekirse teknik departmanla paylaşılır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Denetim Hazırlığı ve Kayıt Disiplini",
      sections: [
        {
          subheading: "8.1 PMS kayıtlarının denetime hazır olması",
          paragraphs: [
            `PSC, vetting (SIRE/CDI) ve klas denetimlerinde PMS logları, overdue listesi, kritik ekipman fonksiyon test kayıtları ve boya/korozyon durum raporları istenir. Birinci Zabit, kayıtların güncel, izlenebilir ve gerçekçi olmasını sağlar; "kâğıt üzerinde tamam ama sahada eksik" durumu en ciddi bulgudur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sahte/geriye dönük kayıt",
              text: `Yapılmamış bir bakımı tamamlanmış göstermek (back-dating) ISM ihlali ve majör bulgudur; ayrıca kaza halinde hukuki sorumluluğu ağırlaştırır. Kayıt, fiili durumu yansıtmalıdır.`,
            },
          ],
        },
        {
          subheading: "8.2 Trend analizi ve sürekli iyileştirme",
          paragraphs: [
            `Birinci Zabit, tekrarlayan arızaları (recurring defect) trend olarak izler ve kök neden analizi yapar. Sürekli aynı kaleme müdahale gerekiyorsa tasarım/kullanım sorunu olabilir; bu, şirkete defect report ile bildirilir ve PMS aralığı revize edilir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 PMS haftalık kontrol listesi",
          bullets: [
            `Overdue kritik job var mı, gerekçeleri yazıldı mı?`,
            `Mooring winch brake test ve wire/rope muayene kayıtları güncel mi?`,
            `Hatch cover seal/cleat/drainage kontrolü yükleme öncesi yapıldı mı?`,
            `Boya işleri çevresel limitlere (nem, dew point, DFT) uygun mu?`,
            `Kritik yedek parça stoğu minimum seviyenin üzerinde mi?`,
            `Yüksek riskli işler için PTW + risk assessment açıldı mı?`,
            `İş planı MLC dinlenme saatleriyle uyumlu mu?`,
            `PMS kayıtları denetime hazır ve gerçekçi mi?`,
          ],
          paragraphs: [
            `İyi yönetilen bir PMS, arızaları kaza haline gelmeden yakalar; kötü yönetilen PMS ise denetim bulgusu, gecikme ve emniyet riski üretir. Birinci Zabit'in görevi, planlamayı sahadaki gerçeklikle ve kayıt disipliniyle birleştirmektir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
