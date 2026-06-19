import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yük operasyonlarının gözetimi",
  roleSlug: "kaptan",
  taskIndex: 3,
  estimatedPages: 26,
  intro: `Yük operasyonu, geminin ticari varlık sebebi olduğu kadar emniyet açısından da en yoğun risk taşıyan operasyondur. Kaptan, yük operasyonunun günlük yürütülmesini Birinci Zabit'e devreder; ancak yükleme planının onaylanması, stabilite ve mukavemet limitlerinin doğrulanması, tehlikeli yük prosedürlerinin uygulanması ve gerektiğinde operasyonu durdurma yetkisinin kullanılması doğrudan kaptanın sorumluluğundadır. Bu bölüm; bulk, tanker ve container gemilerinde farklılaşan yük risklerini, shipper beyanlarının sorgulanmasını, VGM ve MSDS kontrollerini ve "stop work authority"nin pratik kullanımını Master seviyesinde ele alır.`,
  sources: [
    "SOLAS Chapter VI — Carriage of Cargoes and Oil Fuels (Reg. 2, 5, 5-1, 7)",
    "SOLAS Chapter VII — Carriage of Dangerous Goods",
    "IMSBC Code (International Maritime Solid Bulk Cargoes Code)",
    "IMDG Code (International Maritime Dangerous Goods Code)",
    "CSS Code ve Cargo Securing Manual (klas onaylı)",
    "MARPOL Annex I & II — Yağ ve Zararlı Sıvı Maddeler",
    "ISGOTT 6 (International Safety Guide for Oil Tankers and Terminals)",
    "BLU Code (Code of Practice for the Safe Loading and Unloading of Bulk Carriers)",
    "SOLAS VI/2 ve MSC.1/Circ.1475 — Verified Gross Mass (VGM)",
  ],
  chapters: [
    {
      heading: "1. Kaptanın Yük Gözetimindeki Hukuki Konumu",
      lead: `Kaptan yükü kendi eliyle istiflemez; ancak yük kaynaklı her kazada birincil sorumlu olarak görülür. Bu bölüm gözetim sorumluluğunun sınırlarını çizer.`,
      sections: [
        {
          subheading: "1.1 Delegasyon ile sorumluluğun ayrımı",
          paragraphs: [
            `Yük operasyonunun sahada yürütülmesi Birinci Zabit'in (Chief Officer) görevidir; fakat ISM Code madde 5 ve SOLAS VI hükümleri uyarınca operasyonun emniyetli planlandığını ve mukavemet/stabilite limitleri içinde yürütüldüğünü doğrulamak kaptanın sorumluluğudur. Kaptan görevi devredebilir ama hesap verebilirliği (accountability) devredemez. Bir loading kazasında PSC, klas ve P&I her zaman önce kaptana sorar.`,
            `Kaptan, cargo plan'ı imzasıyla onaylar. Bu imza biçimsel değildir; planın gemi tipi, charter party şartı ve mukavemet eğrileri ile tutarlı olduğunu fiilen gözden geçirdiğine dair yazılı kanıttır. İhtilaf halinde "kaptan planı gördü ve onayladı" kaydı, hem koruyucu hem de yükleyici bir kanıt olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI/5-1 — Material Safety Data Sheets",
              text: `MARPOL Annex I yük taşıyan veya yakıt olarak kullanılan tüm gemiler, yükleme öncesi ilgili MSDS belgelerini gemide bulundurmak zorundadır. Kaptan bu belgelerin mevcudiyetini denetler.`,
            },
          ],
        },
        {
          subheading: "1.2 Gemi tipine göre risk profili",
          paragraphs: [
            `Bulk carrier'larda ana risk liquefaction, structural overstress ve hold flooding'tir. Tankerlerde yangın/patlama, statik elektrik, inert gas yetersizliği ve kirlilik öne çıkar. Container gemilerinde ise lashing failure, mis-declared DG ve parametric rolling temel tehlikedir. Kaptan, gemi tipinin risk imzasını bilir ve gözetimini buna göre yoğunlaştırır.`,
            `Ro-Ro ve PCC (Pure Car Carrier) gemilerinde su giriş yolları (bow/stern door), düşük GM ve araç lashing'i kritiktir. Estonia (1994) ve Golden Ray (2019) vakaları, bu gemi tipinde stabilite ve kapı emniyetinin önemini gösterir.`,
          ],
          table: {
            caption: `Gemi Tipine Göre Birincil Yük Riskleri ve Kaptan Odağı`,
            headers: ["Gemi Tipi", "Birincil Risk", "Kaptanın Kritik Kontrolü"],
            rows: [
              ["Bulk carrier", "Liquefaction / overstress", "TML beyanı, loading sequence, shear force"],
              ["Crude/Product tanker", "Yangın / kirlilik", "IGS O2 < %8, SSSCL, COW kayıtları"],
              ["Container", "Lashing failure / DG", "VGM, DG manifest, lashing tightness"],
              ["Ro-Ro / PCC", "Stabilite / kapı", "GM marjı, bow door interlock, lashing"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Yükleme Planının Onaylanması",
      sections: [
        {
          subheading: "2.1 Pre-stowage plan'ın stabilite yazılımı ile doğrulanması",
          paragraphs: [
            `Pre-stowage plan, stabilite/mukavemet yazılımına (LoadMaster, Cargomax, BluePrint) yüklenir. Kaptan; her loading kademesinde GM, draught FP/AP/Mid, list, bending moment, shear force ve container gemilerinde torsion değerlerinin sınır içinde olduğunu gözden geçirir. Limitin %85'ini aşan kademeler revize edilir.`,
            `Bulk gemilerinde "alternate hold loading" yapılacaksa Loading Manual ve CSR (Cargo Securing Record) tarafından onaylanan kombinasyonlara sıkı sıkıya bağlı kalınır. MOL Comfort (2013) vakası, yanlış yük dağılımının gövde kırılmasıyla gemi kaybına yol açtığı klasik örnektir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Loading sequence disiplini",
              text: `Yükleme sırası (sequence) stabilite kadar önemlidir. Doğru final değerlere yanlış bir ara kademe ile ulaşmak gemiyi geçici olarak overstress edebilir. Kaptan ara kademe değerlerini de denetler.`,
            },
          ],
        },
        {
          subheading: "2.2 Final plan onayı ve dağıtımı",
          paragraphs: [
            `Final cargo plan Birinci Zabit tarafından imzalanır, kaptan tarafından onaylanır ve chief stevedore, terminal ve duty officer'a teslim edilir. Son dakika değişikliklerinde (kontamine yük, hasarlı trailer, reefer arızası) yazılım yeniden çalıştırılır ve plan güncellenir. Onaylı çıktılar saklanır; PSC ve vetting denetimi bu çıktıyı isteyebilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Stabilite ve Mukavemet Limitlerinin Kontrolü",
      sections: [
        {
          subheading: "3.1 Intact stability kriterleri ve GM yönetimi",
          paragraphs: [
            `2008 IS Code minimum intact stability kriterlerini belirler: GZ eğrisi altındaki alan, maksimum GZ açısı, başlangıç GM (≥0.15 m) ve gemi tipine özgü hava kriteri (weather criterion). Kaptan, yükleme süresince bu kriterlerin korunduğunu doğrular. Aşırı yumuşak GM "tender" (listing riski), aşırı sert GM "stiff" (sert yalpa, lashing aşırı yükü) gemi yaratır.`,
            `Free surface effect (FSC), kısmen dolu tank ve hold'larda görünür GM'yi düşürür. Tankerlerde ve ballast operasyonlarında slack tank sayısı minimize edilir. Kaptan, FSC düzeltmesinin yazılıma doğru girildiğini denetler.`,
          ],
        },
        {
          subheading: "3.2 Longitudinal strength: hogging ve sagging",
          paragraphs: [
            `Bending moment ve shear force, hold'lar arası yük dağılımına bağlıdır. Uçlara ağır + ortaya hafif yük "hogging", tersine "sagging" yaratır; ikisi de gövde yorulmasına ve çatlaklara yol açar. Bulk gemilerinde grab discharge sırasında kademeli boşaltma overstress riski taşır; kaptan discharge sequence'i de denetler.`,
          ],
          table: {
            caption: `Mukavemet Parametreleri ve İzin Limitleri (Tipik)`,
            headers: ["Parametre", "Çalışma Limiti", "Alarm Eşiği", "Aksiyon"],
            rows: [
              ["Bending moment", "≤ %100 izin", "%85", "Sequence revize"],
              ["Shear force", "≤ %100 izin", "%85", "Hold dağılımı düzelt"],
              ["Torsion (container)", "≤ %100 izin", "%90", "Bay yük dağılımı"],
              ["GM (intact)", "≥ 0.15 m + corr.", "0.30 m yakını", "Ballast/yük düzenle"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Lashing ve Securing Gözetimi",
      sections: [
        {
          subheading: "4.1 Cargo Securing Manual ve MSL",
          paragraphs: [
            `Her gemi klas onaylı bir Cargo Securing Manual taşır; bu manuel lashing ekipmanlarının MSL (Maximum Securing Load) değerlerini ve onaylı lashing pattern'lerini içerir. CSS Code Annex 13, standart dışı yükler için kuvvet hesabı yöntemi sunar. Kaptan, lashing planının manuel ile uyumlu ve beklenen hava koşullarına yeterli olduğunu denetler.`,
            `Container gemilerinde twist lock + lashing rod + turnbuckle kombinasyonu, tier limitleri ve hatch cover üstü stowage kuralları gözetilir. Lashing failure container kayıplarının başlıca sebebidir (ONE Apus 2020, Maersk Essen 2021).`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — ONE Apus (2020)",
              text: `Pasifik'te ağır parametric rolling sonucu 1816 container kayboldu. Soruşturma; lashing tightness eksikliğini, ekstrem koşullara yetersiz lashing pattern'i ve weather routing'in göz ardı edilmesini başlıca neden gösterdi. Kaptanın hem lashing hem hava gözetimi sorgulandı.`,
            },
          ],
        },
        {
          subheading: "4.2 Operasyon sırasında ve sefer öncesi denetim",
          paragraphs: [
            `Kaptan, sefer çıkışından önce lashing tightness'ın tamamlandığını ve "lashing certificate"ın (uygulanabilirse) hazır olduğunu teyit eder. Kötü hava beklenen seferlerde ek lashing talimatı verir. Heavy lift ve project cargo için mühendislik hesabı ve klas onayı aranır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Tehlikeli Yük: IMDG ve IMSBC",
      sections: [
        {
          subheading: "5.1 IMDG Code sınıflandırma ve segregation",
          paragraphs: [
            `IMDG Code 9 ana sınıf kullanır (1 patlayıcı … 9 muhtelif). Segregation table hangi sınıfların yan yana, üstte veya komşu hold'da bulunabileceğini düzenler. Kaptan; DG manifest, packing certificate, EmS (Emergency Schedules) ve stowage pozisyonunun segregation kurallarına uyduğunu denetler. Mis-declared DG sektörel bir tehlikedir; CINS sirkülerleri takip edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Maersk Honam (2018)",
              text: `Yanlış beyan edilen DG (calcium hypochlorite) hold içinde yangına yol açtı, 5 mürettebat öldü. Ders: DG declaration güvensizdir; kaptan riskli sınıflarda ekstra doğrulama ve uygun stowage talep etmelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 IMSBC Code — Group A/B/C ve liquefaction",
          paragraphs: [
            `Group A yükler (nickel ore, iron ore fines, bauxite fines) sıvılaşabilir; TML (Transportable Moisture Limit) ve cargo declaration kritiktir. TML aşılırsa kaptan yüklemeyi reddeder; aksi halde gemi liquefaction nedeniyle alabora olabilir. Group B yükler (DRI, sulphur, coal) self-heating, off-gassing ve CO riski taşır; hold ventilasyonu ve gaz ölçümü gerekir. Group C düşük risklidir.`,
            `Kaptan, gerektiğinde "can test" (kompleman test) yaptırır ve shipper'ın TML beyanına körü körüne güvenmez. Bulk Jupiter (2015) vakasında bauxite TML üzerinde yüklendi, gemi alabora oldu, 18 kişi öldü.`,
          ],
        },
      ],
    },
    {
      heading: "6. Shipper Beyanının Sorgulanması: VGM, MSDS, Cargo Declaration",
      sections: [
        {
          subheading: "6.1 Verified Gross Mass (VGM)",
          paragraphs: [
            `SOLAS VI/2 ve MSC.1/Circ.1475, her dolu container için VGM beyanını zorunlu kılar. VGM olmadan container gemiye yüklenemez. VGM ya tartı (Method 1) ya da onaylı hesap (Method 2) ile elde edilir. Kaptan, VGM eksikliğinin veya makul olmayan değerlerin yüklemeyi durdurma sebebi olduğunu bilir; mis-declared ağırlık lashing ve stabilite hesabını bozar (MSC Napoli 2007 referanslı).`,
          ],
        },
        {
          subheading: "6.2 Cargo Information ve doğruluk sorgusu",
          paragraphs: [
            `SOLAS VI/2 uyarınca shipper, yüklemeden önce doğru ve yeterli yük bilgisi vermek zorundadır (IMSBC grubu, TML, MSDS, density/stowage factor, DG sınıfı). Kaptan bu bilgiyi pasif kabul etmez; tutarsızlık, eksik belge veya şüpheli beyan halinde ek doğrulama ister, Letter of Protest düzenletir ve gerekirse yüklemeyi durdurur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Şüphe halinde durdur",
              text: `Cargo declaration ile gözlemlenen yük arasında uyumsuzluk (örn. nemli görünen Group A yük, beyan edilenden ağır container) tespit edilirse kaptan operasyonu durdurur ve şirket/charterer'i yazılı bilgilendirir. "Beklemek pahalı" değil; "batmak" pahalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Operasyonu Durdurma Yetkisi (Stop Work Authority)",
      sections: [
        {
          subheading: "7.1 Ne zaman durdurulur?",
          paragraphs: [
            `Kaptan; TML aşımı şüphesi, mis-declared DG, VGM eksikliği, stabilite/mukavemet limit aşımı, terminal kaynaklı emniyetsiz uygulama, kirlilik riski veya hava nedeniyle yük operasyonunu durdurabilir. Bu yetki SOLAS V/34-1 ve ISM 5.2'deki "overriding authority"nin yük operasyonundaki yansımasıdır.`,
            `Durdurma kararı her zaman gerekçeli ve yazılı yapılır: log book, Letter of Protest, şirkete (DPA) e-posta ve charterer'a SOF/NOR üzerinden bildirim. Bu üçlü kayıt, demurrage ihtilaflarında ve hukuki süreçlerde hem gemiyi hem şirketi korur.`,
          ],
        },
        {
          subheading: "7.2 Terminal koordinasyonu ve BLU Code",
          paragraphs: [
            `Bulk gemilerinde BLU Code, ship-shore checklist ve loading/unloading plan'ın terminal ile mutabık imzalanmasını şart koşar. Yüksek loading rate'ler kısa sürede overstress yaratabilir; kaptan, terminalin plan dışı hızlanmasında operasyonu yavaşlatma veya durdurma yetkisini kullanır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kirlilik ve Enclosed Space Gözetimi",
      sections: [
        {
          subheading: "8.1 Operasyon sırasında kirlilik önleme",
          paragraphs: [
            `Yükleme/boşaltmada hose/manifold kaçakları, overflow ve drip riski sürekli izlenir. Tek damla petrol dökülmesi bile SOPEP'i devreye sokar; terminal ve liman otoritesi anında bilgilendirilir. ISGOTT, tankerlerde Ship-Shore Safety Checklist'in her vardiyada teyidini şart koşar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL — Sıfır deşarj toleransı",
              text: `Liman içinde yük operasyonu sırasında deniz yüzeyine yağ deşarjı yasaktır. İhlal, ABD gibi yargı bölgelerinde milyon dolarlık cezalar ve kaptana cezai sorumluluk doğurabilir.`,
            },
          ],
        },
        {
          subheading: "8.2 Enclosed space entry disiplini",
          paragraphs: [
            `Hold, tank ve kofferdam gibi kapalı alanlara giriş enclosed space entry permit ile yapılır. O2, LEL, H2S, CO ölçümleri sürekli yapılır; standby personel ve rescue plan zorunludur. SOLAS III/19 kapsamında yıllık enclosed space drill yapılır. Kaptan permit sisteminin işlediğini denetler.`,
          ],
        },
      ],
    },
    {
      heading: "9. Vaka Çalışmaları",
      sections: [
        {
          subheading: "9.1 Bulk Jupiter (2015) ve MOL Comfort (2013)",
          paragraphs: [
            `Bulk Jupiter, bauxite'in TML üzerinde yüklenmesiyle liquefaction sonucu alabora oldu (18 ölü). MOL Comfort, yük dağılımı ve mukavemet sorunlarıyla gövde kırılması yaşadı. İki ders: shipper beyanı sorgulanır; mukavemet limitleri ödün verilmez sınırdır.`,
          ],
        },
        {
          subheading: "9.2 Golden Ray (2019)",
          paragraphs: [
            `PCC gemisi, ballast/yük dağılımı kaynaklı yetersiz stabilite ile dönüş manevrasında devrildi. Ders: araç taşıyıcılarda GM marjı ve ballast hesabı kaptanın doğrudan gözetim alanıdır; yazılım çıktısı sefer öncesi imzayla saklanır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kaptanın yük gözetim checklist'i",
          bullets: [
            `Cargo plan onaylandı mı; loading sequence stabilite/mukavemet limitleri içinde mi?`,
            `VGM tüm container'lar için mevcut ve makul mü?`,
            `IMSBC grup/TML ve IMDG segregation doğrulandı mı?`,
            `MSDS / cargo declaration / packing certificate eksiksiz mi?`,
            `Lashing pattern manuel ile uyumlu ve tightness tamam mı?`,
            `Tanker ise IGS O2 < %8, SSSCL her vardiya teyitli mi?`,
            `Enclosed space entry permit ve gaz ölçümleri kayıtlı mı?`,
            `Stop work kullanıldıysa log + LOP + DPA bildirimi yapıldı mı?`,
          ],
          paragraphs: [
            `Yük operasyonunda kaptanın başarısı, "her şey yolunda gittiğinde" görünmeyen ama "bir şey ters gittiğinde" tek savunma hattı olan disiplinli onay, çapraz doğrulama ve durdurma kararlarından gelir. Kaptan yükü istiflemez; ama yükün gemiyi ve mürettebatı tehlikeye atmamasını garanti eder.`,
          ],
        },
      ],
    },
  ],
};

export default content;
