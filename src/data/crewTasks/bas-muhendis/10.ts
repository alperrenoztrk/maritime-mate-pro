import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "ECA bölgelerinde düşük kükürtlü yakıt (LSFO/MGO) geçişi yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 10,
  estimatedPages: 24,
  intro: `Baş Mühendis (Chief Engineer), MARPOL Annex VI Regulation 14 gereği ECA (Emission Control Area) bölgelerine giriş ve çıkışlarda yakıt geçiş (fuel changeover) sürecinin teknik tasarımcısı ve denetçisidir. Geçişin zamanlaması, purging süresi hesabı, viskozite ve sıcaklık kontrolü ile changeover logbook disiplini, hem uyumluluk hem de makine emniyeti açısından kritiktir. Bu bölüm; sülfür rejimini, changeover prosedürünü, purging hesabını, ekipman risklerini ve PSC denetimini detaylı ele alır.`,
  sources: [
    "MARPOL Annex VI Regulation 14 — Sulphur oxides (SOx)",
    "IMO 2020 Global Sulphur Cap (%0.50) ve ECA limiti (%0.10)",
    "IMO MEPC.1/Circ.878 — Fuel oil changeover guidance",
    "ISO 8217 — Marine fuel specifications",
    "Engine maker guidelines (MAN ES / WinGD / Wärtsilä) — Fuel changeover",
    "Paris/Tokyo MoU — Sulphur compliance CIC",
    "ICS / INTERTANKO — Low sulphur operations guidance",
  ],
  chapters: [
    {
      heading: "1. Sülfür Rejimi ve ECA Düzenlemesi",
      lead: `Yakıt geçişi, yasal bir zorunluluk olduğu kadar bir makine emniyeti meselesidir. Önce neden ve hangi limitlerin geçerli olduğunu anlamak gerekir.`,
      sections: [
        {
          subheading: "1.1 Global cap ve ECA limitleri",
          paragraphs: [
            `IMO 2020 global sülfür cap'i, gemi yakıtında sülfür içeriğini %0.50 m/m ile sınırlar. ECA bölgelerinde (Baltık, Kuzey Denizi, Kuzey Amerika ve ABD Karayip ECA) limit çok daha katıdır: %0.10 m/m. Bu limitleri karşılamanın iki yolu vardır: uyumlu düşük sülfürlü yakıt kullanmak ya da onaylı bir scrubber (EGCS) ile yüksek sülfürlü yakıt kullanmak.`,
            `Scrubber'sız gemiler ECA'ya girmeden önce %0.10 uyumlu yakıta (LSMGO/MGO veya çok düşük sülfürlü distilat) geçiş yapmak zorundadır. Baş Mühendis, geminin uyum stratejisine (changeover veya scrubber) göre prosedürü tasarlar.`,
          ],
          table: {
            caption: `Sülfür limitleri ve uygulama alanı`,
            headers: ["Alan", "Sülfür limiti (m/m)", "Tipik yakıt"],
            rows: [
              ["Global (ECA dışı)", "%0.50", "VLSFO / HFO+scrubber"],
              ["ECA (genel)", "%0.10", "LSMGO / MGO / ULSFO"],
              ["AB liman kalışı (at berth)", "%0.10", "MGO (>2 saat yanaşık)"],
              ["Scrubber'lı gemi (ECA)", "Eşdeğer emisyon", "HFO + EGCS"],
            ],
          },
        },
        {
          subheading: "1.2 Regulation 14 ve uyum kanıtı",
          paragraphs: [
            `MARPOL Annex VI Reg. 14, kullanılan yakıtın sülfür içeriğinin limit dahilinde olmasını ve bunun BDN, yakıt numunesi ve changeover kaydıyla kanıtlanmasını gerektirir. PSC denetiminde sülfür uyumu, numune analizi ve kayıt incelemesiyle doğrulanır.`,
            `Uyumsuzluk (non-compliance), gemi tutmaya, yüksek cezalara ve charterer ile sorunlara yol açar. Bu nedenle changeover'ın doğru zamanlanması ve kayıt altına alınması Baş Mühendis'in birincil görevidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI Reg. 14",
              text: `Gemi, ECA'da seyrederken kullanılan yakıtın sülfür içeriği %0.10'u aşamaz. ECA dışı sularda kullanılan yakıt da %0.50 limitine uymalıdır. Uyum, BDN, representative sample ve changeover kaydıyla belgelenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Changeover Prosedürünün Tasarımı",
      sections: [
        {
          subheading: "2.1 Geçişin zamanlaması ve başlatılması",
          paragraphs: [
            `Changeover, ECA sınırına ulaşmadan ÖNCE tamamlanmalıdır. Baş Mühendis, geminin hızını, sistemdeki HFO/VLSFO hacmini ve purging süresini hesaba katarak geçişi yeterince erken başlatır. Tipik olarak ECA sınırından saatler önce başlanır.`,
            `Geçiş ECA içinde tamamlanırsa, gemi bir süre limit üstü sülfürle seyretmiş olur — bu bir ihlaldir. Bu nedenle "ECA'ya uyumlu yakıtla girilir" ilkesi mutlaktır ve emniyet payıyla planlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Geç changeover = ihlal",
              text: `Geçiş ECA sınırına girildikten sonra tamamlanırsa, gemi bir süre limit üstü yakıtla seyretmiş sayılır. Bu, PSC tarafından numune analiziyle tespit edilebilen net bir MARPOL ihlalidir. Geçiş daima sınırdan önce bitmelidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Kademeli geçiş ve termal şok kontrolü",
          paragraphs: [
            `HFO yaklaşık 130-150 °C'de servis edilir; MGO/LSMGO ise çok daha düşük sıcaklıkta. Ani sıcaklık değişimi, fuel pump ve injector'larda termal şok, seizing (sıkışma) ve sızıntı riski yaratır. Bu nedenle geçiş kademeli ve kontrollü yapılır.`,
            `Geçiş sırasında fuel oil sıcaklık değişim hızı, engine maker'ın belirttiği limitin (tipik 2 °C/dakika civarı) altında tutulur. Bu, fuel system bileşenlerinin kademeli adaptasyonunu sağlar ve mekanik hasarı önler.`,
          ],
        },
      ],
    },
    {
      heading: "3. Purging (Sistem Arındırma) Süresi Hesabı",
      sections: [
        {
          subheading: "3.1 Sistem hacmi ve purging mantığı",
          paragraphs: [
            `Changeover gerçek anlamda, fuel sistemindeki (service tank, supply/booster line, fuel pump, injector) tüm yüksek sülfürlü yakıtın düşük sülfürlü yakıtla yer değiştirmesiyle tamamlanır. Sistemde kalan HFO, yeni yakıtla "purge" edilene kadar emisyon limiti aşılır.`,
            `Purging süresi; sistem hacmine ve yakıt debisine bağlıdır. Baş Mühendis, sistemdeki toplam hacmi (boru + ısıtıcı + filtre + pompa) ve tüketim debisini kullanarak gereken geçiş süresini hesaplar ve emniyet payı ekler.`,
          ],
          table: {
            caption: `Örnek purging süresi hesap mantığı (gösterim amaçlı)`,
            headers: ["Parametre", "Örnek değer", "Açıklama"],
            rows: [
              ["Sistem hacmi (line+heater+pump)", "~1.5 m³", "Gemiye özgü ölçülür"],
              ["Yakıt debisi (ME yükü)", "~1.0 m³/saat", "Yüke bağlı"],
              ["Teorik purge süresi", "~1.5 saat", "Hacim / debi"],
              ["Emniyet payı", "+%50-100", "Karışım/ölü hacim"],
              ["Planlanan geçiş başlangıcı", "ECA'dan ~3+ saat önce", "Toplam + marj"],
            ],
          },
        },
        {
          subheading: "3.2 Changeover calculator ve doğrulama",
          paragraphs: [
            `Birçok gemide otomatik veya yarı-otomatik changeover sistemi ve "changeover calculator" yazılımı bulunur; bu, geçiş süresini ve zamanlamasını sistem parametrelerine göre hesaplar. Baş Mühendis sonucu mühendislik mantığıyla doğrular, körü körüne güvenmez.`,
            `Geçiş, sülfür içeriğinin %0.10 altına indiğinin teyidiyle tamamlanmış sayılır. Doğrulama için karışım oranı ve sistem yenileme süresi izlenir; şüphe varsa ek pay verilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Karışım (commingling) yönetimi",
              text: `Geçiş sırasında HFO ve MGO bir süre karışır. Bu kaçınılmazdır, ancak uyumsuz yakıtların karışması (incompatibility) sediment/asfalten çökelmesine yol açabilir. Mümkünse uyumlu yakıtlar seçilir ve karışım minimumda tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Viskozite, Sıcaklık ve Yağlama Kontrolü",
      sections: [
        {
          subheading: "4.1 Düşük viskozite ve cooler kullanımı",
          paragraphs: [
            `MGO/LSMGO viskozitesi HFO'dan çok düşüktür. Injection viscosity, fuel pump ve injector'ların yağlanması için minimum bir değerin (genelde ~2 cSt) altına düşmemelidir; aksi halde pump seizing ve injector aşınması olur. Bu yüzden bazı gemilerde fuel cooler / chiller kullanılır.`,
            `Viscotherm, HFO'da yakıtı ısıtırken; düşük viskoziteli distilatta gerekirse soğutma sağlar. Baş Mühendis viskozite kontrol modunu (heating vs. cooling) geçişte doğru yönetir.`,
          ],
        },
        {
          subheading: "4.2 Cylinder oil ve TBN uyumu",
          paragraphs: [
            `Düşük sülfürlü yakıt kullanımında, yüksek TBN cylinder oil kullanmaya devam etmek deposit (kül birikimi) sorununa yol açar. Baş Mühendis, yakıt sülfür içeriğine uygun TBN'li cylinder oil (düşük sülfür için ~25-40 TBN) ve feed rate ayarını planlar.`,
            `Geçiş süresince geçici TBN uyumsuzluğu kabul edilebilir, ancak uzun ECA seyirlerinde doğru cylinder oil seçimi şarttır. Yanlış TBN, cold corrosion veya deposit problemlerini tetikler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Düşük viskozite — fuel pump seizing riski",
              text: `MGO'nun düşük viskozitesi, fuel pump plunger/barrel arasındaki yağlama filmini zayıflatır. Injection viscosity minimum limitin altına düşerse seizing, sızıntı ve güç kaybı olur. Cooler/chiller ile viskozite minimum sınırın üstünde tutulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Changeover Logbook ve Belgeleme",
      sections: [
        {
          subheading: "5.1 Fuel changeover record",
          paragraphs: [
            `MARPOL, her changeover için yazılı kayıt zorunlu kılar: geçişin başlangıç ve bitiş tarih/saati, gemi pozisyonu (lat/long), her tankın yakıt hacmi ve kullanılan yakıt türü. Bu kayıt, ECA'ya uyumlu yakıtla girildiğinin yasal kanıtıdır.`,
            `Baş Mühendis, kaydın gerçek operasyonla tutarlı ve eksiksiz olmasını sağlar. ECA giriş/çıkış pozisyonları köprü ile çapraz kontrol edilir; kayıt tutarsızlığı denetimde sorun yaratır.`,
          ],
          bullets: [
            "Changeover başlangıç tarih/saat ve pozisyon (lat/long)",
            "Changeover bitiş tarih/saat ve pozisyon",
            "Geçiş öncesi/sonrası kullanılan yakıt türü ve sülfür içeriği",
            "İlgili tankların hacmi ve ROB",
            "ECA giriş/çıkış noktası ile tutarlılık",
          ],
        },
        {
          subheading: "5.2 BDN ve numune saklama",
          paragraphs: [
            `Her yakıt için BDN (Bunker Delivery Note) ve representative sample, MARPOL gereği belirli süre (BDN 3 yıl, sample 12 ay) saklanır. PSC denetimi, kullanılan yakıtın BDN'sini ve gerekiyorsa numunesini ister.`,
            `Sülfür uyumu şüphesinde, gemide saklanan numune (MARPOL sample) ve in-use/onboard sample analizi belirleyicidir. Numune zinciri (chain of custody) titizlikle korunur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Acil Durum ve Risk Yönetimi",
      sections: [
        {
          subheading: "6.1 Yakıt uyumsuzluğu ve sistem tıkanması",
          paragraphs: [
            `Uyumsuz yakıtların karışması, asfalten çökelmesi ve filtre/separator tıkanmasına yol açabilir; bu da ECA içinde güç kaybı riski yaratır. Baş Mühendis, mümkünse uyumlu yakıtlar seçer ve geçiş sırasında filtre fark basıncını izler.`,
            `Sistem tıkanması veya viskozite sorunu nedeniyle güç kaybı, ECA içinde hem emniyet hem uyum açısından kritiktir. Bu nedenle geçiş sırasında ekstra izleme ve hazır müdahale (yedek filtre, geri dönüş planı) gereklidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Uyumsuz yakıt geçişte güç kaybettirdi",
              text: `Bir gemide farklı supplier'lardan alınan iki distilat geçişte karıştı; asfalten benzeri çökelme filtreleri tıkadı ve ECA yaklaşımında ana makine güç kaybetti. Ders: uyumluluk testi yapılmalı, geçişte fark basıncı yakından izlenmeli ve yedek filtre hazır bulundurulmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 FONAR (Fuel Oil Non-Availability Report)",
          paragraphs: [
            `Uyumlu yakıt temin edilemediğinde, gemi gerekli özeni gösterdiğini (best efforts) belgeleyen bir FONAR sunar. FONAR bir muafiyet değil, beyandır; ilgili otorite ve bayrak devletine bildirilir ve denetime tabidir.`,
            `Baş Mühendis, FONAR'a yol açan koşulları (bunker planlaması, temin çabaları) titizlikle belgeler. FONAR rutin bir kaçış yolu değil, gerçek istisna içindir; kötüye kullanımı yaptırım doğurur.`,
          ],
        },
      ],
    },
    {
      heading: "7. PSC Denetimi ve Uyum Doğrulama",
      sections: [
        {
          subheading: "7.1 Sülfür uyum denetimi",
          paragraphs: [
            `PSC inspector; changeover kaydını, BDN'leri, in-use yakıt numunesini ve gerekirse sistemden alınan spot sample'ı kontrol eder. Sülfür CIC (Concentrated Inspection Campaign) dönemlerinde bu denetim yoğunlaşır.`,
            `Portable sülfür analizörü ile hızlı tarama yapılabilir; şüpheli durumda laboratuvar analizi istenir. Baş Mühendis, kayıt ve numune zincirini denetime hazır tutar.`,
          ],
        },
        {
          subheading: "7.2 AB özel kuralları (at-berth ve ETS)",
          paragraphs: [
            `AB limanlarında 2 saatten uzun yanaşık kalan gemiler %0.10 yakıt kullanmak zorundadır (alternatif: onaysız shore power/scrubber durumuna göre). Ayrıca AB ETS, emisyon maliyeti getirdiğinden yakıt seçimi finansal boyut da kazanır.`,
            `Baş Mühendis, AB sularındaki bu ek gereklilikleri changeover planına entegre eder ve liman kalış süresine göre yakıt yönetimini ayarlar.`,
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
            `Aşağıdaki kontrol listesi, ECA yakıt geçişi yönetiminin temel adımlarını özetler ve her ECA yaklaşımında uygulanmalıdır.`,
          ],
          bullets: [
            "ECA giriş noktası ve ETA köprü ile teyit edildi mi?",
            "Purging süresi hesaplandı ve emniyet payı eklendi mi?",
            "Changeover ECA sınırından yeterince önce başlatıldı mı?",
            "Sıcaklık değişim hızı maker limiti içinde tutuldu mu?",
            "Injection viscosity minimum sınırın üstünde mi (cooler kullanımı)?",
            "Cylinder oil TBN ve feed rate düşük sülfüre uyarlandı mı?",
            "Filtre fark basıncı geçiş boyunca izlendi mi?",
            "Changeover logbook (tarih/saat/pozisyon/hacim) eksiksiz mi?",
            "BDN ve MARPOL sample'lar saklanıyor mu?",
            "FONAR gereken durum için prosedür biliniyor mu?",
          ],
        },
        {
          subheading: "8.2 Sonuç",
          paragraphs: [
            `ECA yakıt geçişi, mevzuat uyumu ile makine emniyetinin kesiştiği hassas bir operasyondur. Doğru zamanlama, isabetli purging hesabı, viskozite kontrolü ve titiz kayıt; hem cezadan hem güç kaybından korur. Modern Baş Mühendis, bu geçişi rutin değil, her seferinde dikkatle planlanan bir teknik süreç olarak yönetir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
