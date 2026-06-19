import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bilge, sludge ve çevresel deşarj yönetimi",
  roleSlug: "ikinci-muhendis",
  taskIndex: 6,
  estimatedPages: 25,
  intro: `Makine dairesinden kaynaklanan yağlı su (bilge) ve yağlı atık (sludge) yönetimi, MARPOL Annex I'in en sıkı denetlenen ve ihlali en ağır cezalandırılan alanıdır; "magic pipe" (yasa dışı bypass) vakaları milyonlarca dolarlık cezalara ve hapis cezalarına yol açmıştır. İkinci Mühendis; OWS (Oily Water Separator) operasyonu, 15 ppm bilge alarmı, sludge tank yönetimi, shore reception koordinasyonu ve ORB Part I kayıtlarının doğruluğundan sorumludur. Bu bölüm bilge/sludge ve çevresel deşarj yönetimini ele alır.`,
  sources: [
    "MARPOL Annex I — yağ kirliliğinin önlenmesi",
    "MARPOL — Oil Record Book Part I (makine dairesi)",
    "IMO 15 ppm OWS ve oil content meter standartları",
    "SOPEP — Shipboard Oil Pollution Emergency Plan",
    "USCG/PSC — magic pipe ve ORB denetimleri",
  ],
  chapters: [
    {
      heading: "1. Çevresel Sorumluluğun Ağırlığı",
      sections: [
        {
          subheading: "1.1 Sıfır tolerans",
          paragraphs: [
            `Denize yağlı su deşarjı çok katı kurallara tabidir ve ihlali en ağır şekilde cezalandırılır. İkinci Mühendis, bu alanda hiçbir kısa yolun kabul edilemez olduğunu bilir; "magic pipe" gibi bypass'lar hem suç hem de geminin/şirketin itibarını yok eden eylemlerdir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Magic pipe = suç",
              text: `OWS'i baypas ederek yağlı suyu denize basmak (magic pipe) ve ORB'yi sahte tutmak, ABD ve diğer ülkelerde milyonlarca dolar ceza ve hapisle sonuçlanmıştır. Bu, kariyer biten ve gemiyi/şirketi yıkan bir ihlaldir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. OWS ve 15 ppm Alarm",
      sections: [
        {
          subheading: "2.1 Oily Water Separator operasyonu",
          paragraphs: [
            `OWS, bilge suyundaki yağı ayırarak yalnızca 15 ppm altındaki suyun (izinli koşullarda) denize verilmesini sağlar. 15 ppm oil content meter, eşik aşılırsa otomatik olarak deşarjı durdurup suyu bilge tankına geri yönlendirir (three-way valve). İkinci Mühendis, OWS ve alarmın doğru, baypassız çalıştığını güvence altına alır.`,
          ],
          bullets: [
            `OWS doğru ve baypassız çalışıyor`,
            `15 ppm oil content meter kalibrasyonlu`,
            `Three-way valve doğru yönlendiriyor`,
            `Deşarj koşulları (bölge/mesafe) uygun`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I deşarj kriterleri",
              text: `Makine dairesi bilge suyu ancak; gemi seyir halinde, 15 ppm altında, onaylı ekipmandan ve özel alan kısıtlamalarına uygun şekilde deşarj edilebilir. Aksi her durum yasaktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Sludge Yönetimi",
      sections: [
        {
          subheading: "3.1 Sludge tank ve bertaraf",
          paragraphs: [
            `Yakıt/yağ arıtımından ve kaçaklardan oluşan sludge, sludge tankında toplanır ve ya onaylı incinerator'da yakılır ya da limanda shore reception facility'ye verilir. İkinci Mühendis, sludge üretimini, tank seviyesini ve bertarafı izler; sludge'ın denize asla karışmadığını güvence altına alır.`,
          ],
          table: {
            caption: "Yağlı atık yolları",
            headers: ["Atık", "Bertaraf"],
            rows: [
              ["Bilge suyu", "OWS → 15 ppm altında deşarj veya tank"],
              ["Sludge", "Incinerator veya shore reception"],
              ["Atık yağ", "Tank → shore reception"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Oil Record Book Part I",
      sections: [
        {
          subheading: "4.1 Doğru ve güncel kayıt",
          paragraphs: [
            `Her yağ işlemi (bilge transfer, OWS deşarjı, sludge yakma/verme, iç transfer) ORB Part I'e doğru, zamanında ve gerçeği yansıtır biçimde işlenir. İkinci Mühendis, ORB'nin fiziksel işlemlerle (tank seviyeleri, meter kayıtları) tutarlı olmasını sağlar. ORB tutarsızlığı, PSC'de en sık ceza/detention sebeplerindendir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "ORB tutarsızlığı",
              text: `Denetçi, ORB kayıtlarını tank seviyeleri ve OWS sayaçlarıyla karşılaştırır. Uyumsuzluk, bypass şüphesi doğurur ve ciddi soruşturmaya yol açar. ORB dürüstlüğü pazarlık konusu değildir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. SOPEP ve Acil Durum",
      sections: [
        {
          subheading: "5.1 Kirlilik müdahalesi",
          paragraphs: [
            `Bir yağ kaçağı/dökülmesi durumunda SOPEP devreye sokulur; müdahale ekipmanı (emici, boom), bildirim listesi (kıyı devleti, şirket, P&I) ve ilk müdahale adımları uygulanır. İkinci Mühendis, makine dairesi kaynaklı kaçaklarda hızlı müdahale ve bildirimde rol alır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Çevresel deşarj kontrolü",
          bullets: [
            `OWS baypassız ve doğru çalışıyor mu?`,
            `15 ppm meter kalibrasyonlu, three-way valve doğru mu?`,
            `Deşarj koşulları (seyir/bölge/mesafe) uygun mu?`,
            `Sludge tank seviyesi izleniyor, bertaraf kayıtlı mı?`,
            `ORB Part I doğru, güncel ve tank/meter ile tutarlı mı?`,
            `SOPEP ekipmanı ve bildirim listesi hazır mı?`,
          ],
          paragraphs: [
            `Bilge, sludge ve çevresel deşarj yönetimi, İkinci Mühendisin hem yasal hem etik açıdan en hassas sorumluluğudur. Baypassız OWS, dürüst ORB ve doğru sludge bertarafı; denizi korur, gemiyi ağır cezalardan uzak tutar ve denizciliğin çevresel bütünlüğünü savunur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
