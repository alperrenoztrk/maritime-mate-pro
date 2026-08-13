import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yük operasyonlarının planlanması ve yönetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Birinci Zabit (Chief Officer / Chief Mate), gemideki yük operasyonlarının planlamasından, sahada yürütülmesinden ve sonlandırılmasından doğrudan sorumlu kişidir. Bu sorumluluk; cargo plan hazırlığı, stabilite ve trim hesaplamaları, tank/hold hazırlığı, lashing/securing denetimi, IMO sınıfı tehlikeli yük prosedürleri, ballast yönetimi, terminal koordinasyonu ve yük belgelerinin doğruluğunu kapsar. Bu bölüm, Birinci Zabit'in günlük yük yönetiminde takip etmesi gereken metodolojiyi adım adım açıklar.`,
  sources: [
    "SOLAS Chapter VI — Carriage of Cargoes",
    "SOLAS Chapter VII — Carriage of Dangerous Goods",
    "IMSBC Code (International Maritime Solid Bulk Cargoes Code)",
    "IMDG Code (International Maritime Dangerous Goods Code)",
    "CSS Code (Code of Safe Practice for Cargo Stowage and Securing)",
    "MARPOL Annex II (Noxious Liquid Substances)",
    "ISGOTT 6 (International Safety Guide for Oil Tankers and Terminals)",
    "Thomas' Stowage and Cargo Work for Tomorrow's Mariners",
  ],
  chapters: [
    {
      heading: "1. Cargo Plan: Hazırlık ve Onay Süreci",
      sections: [
        {
          subheading: "1.1 Pre-stowage plan'ın değerlendirilmesi",
          paragraphs: [
            `Yükleme öncesinde charterer veya terminal operatörü tarafından gönderilen pre-stowage plan, Birinci Zabit'in ilk kontrol noktasıdır. Konteyner gemilerinde bay-row-tier formatında, dökme yük gemilerinde hold-by-hold tonnage olarak, tankerlerde ise tank-by-tank parsel dağılımı şeklinde gelir. Plan, gemi tipine özgü stabilite/trim/strength yazılımına (örn. LoadMaster, BluePrint, Cargomax) yüklenir; bending moment, shear force, torsion (containerlar için), draught at FP/AP/Mid, GM ve liste değerleri kontrol edilir.`,
            `Bu aşamada Birinci Zabit, yükleme sırasının ve kademelerinin (loading sequence) gemi mukavemet limitlerine uygun olduğunu doğrular. Bulk gemilerinde "alternate hold loading" yapılacaksa CSR (Cargo Securing Manual) ve Loading Manual'in onayladığı şartlar mutlaka kontrol edilir. Aksi halde gemi mukavemet sınırlarının dışına çıkabilir; bu, MOL Comfort 2013 vakasında olduğu gibi gemi kaybına yol açabilir.`,
          ],
          bullets: [
            `Kargo türü, miktarı, density (stowage factor)`,
            `Yük sıralaması ve discharge port sırasına göre stowage`,
            `IMO sınıfı tehlikeli yük segregation kontrolü`,
            `Reefer container sayısı ve plug pozisyonları`,
            `Balast değişim/transfer planı (BWMP uyumlu)`,
          ],
        },
        {
          subheading: "1.2 Final stowage plan ve onay",
          paragraphs: [
            `Final cargo plan, Birinci Zabit tarafından imzalanır ve Kaptan onayına sunulur. Onaylı plan; chief stevedore'a, terminal'e ve duty officer'a teslim edilir. Plan üzerinde son dakika değişiklikleri olursa (örn. ramp damage olan trailer ro-ro'da, kontamine yük tankerde) stabilite yazılımı yeniden çalıştırılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI/2 — Cargo Information",
              text: `Shipper, yüklemeden önce yük hakkında doğru ve yeterli bilgi vermek zorundadır (BLU Code, IMSBC Group A/B/C tanımı, MSDS, VGM dahil). Bu bilgi olmadan yükleme yapılamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Stabilite ve Mukavemet Yönetimi",
      sections: [
        {
          subheading: "2.1 GM (Metacentric Height) ve dengeli yükleme",
          paragraphs: [
            `GM değerinin yükleme süresince intact stability kriterlerinin altına düşmemesi temel prensiptir. IMO 2008 IS Code, minimum GM değerlerini gemi tipine göre belirler (genel kargo için ≥0.15 m, container için ≥0.15 m + correction, tanker için sıvı yük free surface dahil hesap). Aşırı GM ise "stiff" gemi yaratır; kısa periyotlu sert yalpa lashing kuvvetlerini aşırı yükler ve container yığınlarında parametric rolling riskini artırır.`,
            `Çok yumuşak GM ise "tender" gemi yaratır; yalpa periyodu uzar, listing riski artar. Birinci Zabit, GM'yi optimum aralıkta tutarak hem güvenlik hem de yolcu/mürettebat konforu hem de yük emniyeti dengesini kurar.`,
          ],
          table: {
            caption: `Tipik GM Aralıkları (Kılavuz Değerler)`,
            headers: ["Gemi Tipi", "Min. GM", "Önerilen Aralık", "Risk Üstü"],
            rows: [
              ["Container", "0.15 m + corr.", "0.50 - 1.50 m", ">2.0 m (parametric)"],
              ["Bulk carrier", "0.15 m", "1.0 - 2.0 m", ">3.0 m (stiff)"],
              ["Crude tanker", "0.15 m + FSC", "1.5 - 3.0 m", ">4.0 m"],
              ["Ro-Ro / PCC", "0.15 m + door open", "0.30 - 1.0 m", ">1.5 m"],
            ],
          },
        },
        {
          subheading: "2.2 Bending moment, shear force ve torsion",
          paragraphs: [
            `Yükleme yazılımı her loading kademesinde bending moment (longitudinal), shear force ve container gemilerinde torsion değerlerini gösterir. Bu değerler %100 limitin altında tutulmalıdır; %85 üzerine çıkıldığında alarm verir ve loading sequence revize edilir.`,
            `Aşırı sagging (boğum çökmesi) durumu, hold ortalarına ağır yük + uçlara hafif yük yüklemekten kaynaklanır. Hogging ise tam tersidir. İkisi de gemi gövdesinde yorulmaya ve uzun vadede çatlaklara yol açar. Bulk gemilerinde "alternate hold" yüklemesi sırasında shear force kritik noktaya ulaşabilir; bu yüzden CSR onaylı sıraya bağlı kalmak zorunludur.`,
          ],
        },
        {
          subheading: "2.3 Trim ve list yönetimi",
          paragraphs: [
            `İdeal trim, gemi tipine ve hız profiline göre değişir; modern container gemilerinde "trim optimization" yazılımları %2-5 yakıt tasarrufu sağlar. Birinci Zabit, charterer talebine göre arrival trim'i ayarlar (genelde even keel veya hafif by-stern). List 0.5° altında tutulmaya çalışılır; aksi halde lashing kuvvetleri eşit dağılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "3. Tank ve Hold Hazırlığı",
      sections: [
        {
          subheading: "3.1 Bulk carrier hold hazırlığı (4 standart seviye)",
          paragraphs: [
            `Hold hazırlığı; previous cargo'ya, sonraki cargo'ya ve charter party şartlarına göre 4 seviyede tanımlanır: load-ready (sweepup), shovel-clean, grain-clean, hospital-clean. Grain charter'ları için NCB (National Cargo Bureau) inspection gerekir.`,
            `Hold hazırlığı; sweeping, washing (sea water + fresh water rinse), drying, paint touch-up, smell removal, bilge well cleaning ve hatch cover seal kontrolünü kapsar. Birinci Zabit, hold inspection'ı bizzat yapar ve fotoğraf/video kayıt tutar.`,
          ],
          bullets: [
            `Load-ready: süpürme, görünür kalıntı yok`,
            `Shovel-clean: kalıntı yok, gözle temiz`,
            `Grain-clean: tahıl yüklemeye uygun, koku yok, kuru, paint hasarsız`,
            `Hospital-clean: laboratuvar standardında, hassas yükler için`,
          ],
        },
        {
          subheading: "3.2 Tanker tank hazırlığı (COW, inert gas, gas-free)",
          paragraphs: [
            `Crude oil tankerlerde COW (Crude Oil Washing) MARPOL Annex I gereği zorunludur; %20 ham petrol ile yıkama yağ kalıntısını minimize eder. Inert Gas System (IGS) sürekli çalışır; tank atmosferi O2 < %8 tutulur. Tank temizliği sonrası gas-free certificate alınmadan kapalı alana giriş yasaktır.`,
            `Product tankerlerde "compatibility table" kontrolü yapılır; yağ kalitesini bozacak previous cargo varsa wall-wash test yapılır (kerosene+UV ışık altında saflık testi). MARPOL Annex II (NLS) için P&A (Procedures and Arrangements) Manual rehberdir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Enclosed space entry",
              text: `Hold ve tank içine giriş enclosed space entry permit ile yapılır. O2, LEL, H2S, CO ölçümleri sürekli yapılır. Standby personel ve rescue plan zorunludur. SOLAS III/19.3.3 kapsamında en az iki ayda bir enclosed space entry ve rescue drill yapılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Lashing ve Securing",
      sections: [
        {
          subheading: "4.1 CSS Code ve CSM (Cargo Securing Manual)",
          paragraphs: [
            `Her gemi, klas onaylı bir Cargo Securing Manual taşımak zorundadır. Bu manuel; lashing ekipmanlarının MSL (Maximum Securing Load) değerlerini, lashing pattern örneklerini ve hesap yöntemlerini içerir. Container, ro-ro, project cargo ve heavy lift için ayrı bölümler vardır.`,
            `CSS Code Annex 13, "Methods to assess the efficiency of securing arrangements for non-standardised cargoes" bölümüyle pratik hesap yöntemi sunar. Beaufort 9 koşullarında transverse, longitudinal ve vertical kuvvetlerin lashing tarafından karşılanabildiği matematiksel olarak gösterilir.`,
          ],
        },
        {
          subheading: "4.2 Container lashing pratiği",
          paragraphs: [
            `Twist lock + lashing rod + turnbuckle kombinasyonu standarttır. Tier sınırları (genelde tier 4 veya 5'in üzerinde tek lashing yetmez), hatch cover üstü stowage, on-deck heavy reefer pozisyonları ve hatch cover lashing'i Birinci Zabit'in denetimindedir. Lashing failure container kayıplarının başlıca sebebidir (Maersk Essen 2021, ONE Apus 2020).`,
          ],
          callouts: [
            {
              type: "example",
              title: "ONE Apus (2020)",
              text: `Pasifik'te ağır parametric rolling sonucu 1816 container kayboldu. Soruşturma; lashing tightness, mevcut lashing pattern'in ekstrem koşullara yeterli olmaması ve weather routing'in göz ardı edilmesini başlıca neden gösterdi.`,
            },
          ],
        },
        {
          subheading: "4.3 Ro-Ro ve heavy lift lashing",
          paragraphs: [
            `Ro-Ro'da trailer ve self-propelled units, en az 4 noktadan deck pad-eye'lara web/chain ile bağlanır. Heavy lift cargo (transformator, üreteç, vinç gövdesi vb.) için detaylı lashing plan ve mühendislik hesabı (genelde shipper + 1/C koordinasyonu) yapılır. Plan kaptan ve klas onayı ister.`,
          ],
        },
      ],
    },
    {
      heading: "5. IMDG Code ve Tehlikeli Yük",
      sections: [
        {
          subheading: "5.1 Sınıflandırma ve segregation",
          paragraphs: [
            `IMDG Code 9 ana sınıf + alt sınıf kullanır (1 patlayıcı, 2 gaz, 3 yanıcı sıvı, 4 yanıcı katı, 5 oksitleyici, 6 zehirli, 7 radyoaktif, 8 korozif, 9 muhtelif). Segregation table, hangi sınıfların yan yana, üst üste veya komşu hold'da yer alabileceğini düzenler.`,
            `Birinci Zabit; DG manifest, packing certificate, CTU (Cargo Transport Unit) packing inspection, stowage position ve emergency response plan (EmS) hazırlığını denetler. DG yükleme sırasında özel PPE, yangın hortumu hazır, area cordon ve yetkili supervisor zorunludur.`,
          ],
        },
        {
          subheading: "5.2 IMSBC Code — Group A, B, C kategorileri",
          paragraphs: [
            `Group A (sıvılaşabilir yükler — nickel ore, iron ore fines, bauxite fines): TML (Transportable Moisture Limit) testleri, Flow Moisture Point ve cargo declaration kritiktir. TML aşılırsa yükleme reddedilir; aksi halde liquefaction nedeniyle gemi alabora olur (MV Bulk Jupiter 2015).`,
            `Group B (kimyasal tehlike — DRI, sulphur, coal): self-heating, off-gassing ve CO emisyon riski. Hold ventilation, surface temperature monitoring, gas detection ve fixed CO2 hazır olmak zorundadır. Group C ise düşük riskli (cement, sand, salt) yükleri kapsar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Ballast Yönetimi (BWMP ve D-2 Standard)",
      sections: [
        {
          subheading: "6.1 Ballast Water Management Plan",
          paragraphs: [
            `BWM Convention, geminin ballast water'ını boşalttığı limanın ekosistemini koruma amacıyla D-2 biological standard uyumluluğunu zorunlu kılar. Modern gemiler IMO type-approved BWMS (UV, electrochlorination, ozone vb.) ile donatılır. Birinci Zabit; BWMS operation, sample sampling port, BWRB (Ballast Water Record Book) ve SDC kalibrasyonunu denetler.`,
            `Tankerlerde COW + ballast yönetimi paralel yürür; bunkering, loading ve discharging operasyonları arasında ballast değişimi titiz bir senaryoyla planlanır. Hatalı ballast yönetimi listing, bending moment aşımı veya hold flooding gibi büyük risklere yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "7. Terminal ile Koordinasyon",
      sections: [
        {
          subheading: "7.1 Pre-arrival ve berthing",
          paragraphs: [
            `Pre-arrival 72/24/12 saat öncesinden hold/tank durumu, planlanan loading sequence, kullanılacak crane sayısı, ballast plan ve bunkering ihtiyacı terminal'e iletilir. ISGOTT'a göre tankerlerde Ship-Shore Safety Checklist berthing sonrası mutlaka doldurulur ve her vardiyada teyit edilir.`,
          ],
        },
        {
          subheading: "7.2 Loading/discharging operasyonu sırasında izleme",
          paragraphs: [
            `Operasyon süresince Birinci Zabit (veya cargo officer) kademeli draft, list ve trim ölçümlerini yapar; loading rate, ballast rate, ullage ölçümleri kayıt altına alınır. Sapma fark edilirse operasyon yavaşlatılır veya durdurulur. Drips, spillage, hose/pipe kaçaklarına karşı sürekli gözlem yapılır; deniz kirliliği derhal raporlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL — Anti-pollution",
              text: `Yükleme/boşaltmada deniz yüzeyine bir damla petrol bile dökülürse SOPEP (Shipboard Oil Pollution Emergency Plan) devreye sokulur, terminal ve liman otoritesi anında bilgilendirilir. Cezalar ülkeden ülkeye değişir; ABD'de USD milyonlarla ifade edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Yük Belgeleri ve Hukuki Sorumluluk",
      sections: [
        {
          subheading: "8.1 Mate's Receipt, Bill of Lading, Manifest",
          paragraphs: [
            `Mate's Receipt, yükün gemiye fiilen alındığını ve kondisyonunu (apparent order and condition) belgeleyen dahili kayıttır. Üzerinden Bill of Lading hazırlanır. Yükte hasar veya eksiklik varsa "clausing" yapılır; aksi halde clean B/L imzalanır ve gemi/şirket o kondisyondan sorumlu olur.`,
            `Cargo manifest, custom ve liman otoriteleri için gerekli resmi belgedir. Birinci Zabit, manifest ile gerçek yük arasındaki uyumu denetler. NOR (Notice of Readiness), gemi yüke hazır olduğunda charterer'e verilir; laytime sayacı bu andan itibaren çalışır.`,
          ],
        },
        {
          subheading: "8.2 SOF (Statement of Facts) ve Letter of Protest",
          paragraphs: [
            `SOF, terminal/charterer ile birlikte tutulan operasyon zaman çizelgesidir. Anlaşmazlık çıkarsa demurrage hesabı bu belgeden yapılır. Birinci Zabit, gerekli her olayda Letter of Protest (LOP) düzenler: yavaş loading rate, ekipman arızası, hava bekletmesi vb.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Bulk Jupiter (2015) — liquefaction",
          paragraphs: [
            `Bauxite yükü TML'in üzerinde yüklendi, Vietnam açıklarında alabora oldu. 18 ölü. Ders: shipper'ın TML beyanına körü körüne güvenilmez; can test yapılır, gerekirse yükleme reddedilir.`,
          ],
        },
        {
          subheading: "9.2 Maersk Honam (2018) — DG yangını",
          paragraphs: [
            `Yanlış declared DG (calcium hypochlorite) hold içinde yangın çıkardı, 5 mürettebat öldü. Ders: DG declaration güvensizdir; CINS sirkülerleri takip edilmelidir, mis-declared DG industry-wide bir tehlikedir.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Birinci Zabit'in günlük checklist'i",
          bullets: [
            `Cargo plan onaylı ve loading sequence stabilite limitleri içinde mi?`,
            `Hold/tank hazırlığı doğrulandı mı?`,
            `IMDG/IMSBC sınıflandırma + segregation doğru mu?`,
            `Lashing pattern + tightness denetlendi mi?`,
            `Ballast plan operasyonel ve BWRB güncel mi?`,
            `Stability software output saklandı mı (PSC sorabilir)?`,
            `Mate's Receipt + LOP + SOF zamanında düzenlendi mi?`,
            `Enclosed space entry permit ve gas test kayıtları mevcut mu?`,
          ],
          paragraphs: [
            `Birinci Zabit'in yük operasyonundaki başarısı, "her şey yolunda gittiğinde" görünmez kalan ama "bir şey ters gittiğinde" tek savunma hattı olan disiplinli kayıtlardan, çapraz kontrollerden ve mevzuat bilgisinden gelir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
