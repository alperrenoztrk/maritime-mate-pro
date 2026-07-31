import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Marine Technologies Bridge Mate DP ailesi ve dağıtık mimari",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 27,
  estimatedPages: 20,
  intro: `DP teorisi üretici bağımsızdır; ancak köprüüstünde çalışan DPO, jenerik bir DP değil belirli bir üreticinin konsolunu kullanır. Marine Technologies LLC'nin Bridge Mate™ ürün ailesi, dağıtık (distributed) mimarisi ve "yedeklilik + ayrışma" felsefesiyle diğer DP sistemlerinden ayrışır. Bu bölüm, Bridge Mate DP'nin mimari mantığını, modül sınırlarını ve bu mimarinin operasyonel sonuçlarını ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "Marine Technologies Bridge Mate JX / DP 0 Brochure (MT-SAL-0005 v2.0)",
    "marine-technologies.com — ürün ve proje bilgileri",
    "IMO MSC/Circ.645",
    "IMCA M103",
  ],
  chapters: [
    {
      heading: "1. Marine Technologies ve Bridge Mate Konsepti",
      lead: `Bridge Mate, tek bir kutu değil; DP, itici kontrol, köprüüstü entegrasyonu ve sensörleri kapsayan bir ürün ailesidir.`,
      sections: [
        {
          subheading: "1.1 Üretici profili",
          paragraphs: [
            `Marine Technologies, LLC 2002'de kuruldu ve başlangıç hedefi IMO'nun DP 2 sınıfı için öngördüğü kılavuzlara uyan bir DP sistemi geliştirmekti. İlk MT donanımlı gemi 16 ay içinde ABS'den DP-2 sınıflandırması aldı. Şirket bugüne kadar 100'ün üzerinde DP sistemi teslim etti; ağırlık DP class 2 gemilerdedir.`,
            `Merkez Mandeville, Louisiana (ABD); ayrıca Egersund (Norveç) ve Singapur'da ofisleri bulunur. Bu üç bölgeli yapı, servis ve yedek parça desteğinin operasyon sahasına yakınlığı açısından planlamada dikkate alınır.`,
          ],
          bullets: [
            `Tüm IMO sınıflarında tip onaylı DP sistemleri`,
            `Daha basit DP ve joystick çözümleri (JX, DP 0)`,
            `24 m workboat'ta DP 0'dan en büyük offshore konstrüksiyon gemisinde DP 3'e kadar kapsam`,
          ],
        },
        {
          subheading: "1.2 Ürün ailesi",
          paragraphs: [
            `Bridge Mate ailesi DP'nin yanında itici kontrol, entegre köprüüstü ve konum referans sensörlerini de kapsar. Gemide hangi ürünlerin kurulu olduğunun bilinmesi, arıza değerlendirmesinde hangi katmanın etkilendiğini anlamak için gereklidir.`,
          ],
          table: {
            headers: ["Ürün", "İşlev", "DP ile ilişkisi"],
            rows: [
              ["Bridge Mate DP 1 / 2 / 3", "Otomatik mevki ve baş tutma", "Ana DP kontrol katmanı"],
              ["Bridge Mate JX / DP 0", "Joystick ve temel DP", "Alt seviye / yedek manevra"],
              ["Bridge Mate DP Chair", "Koltuğa entegre operatör istasyonu", "DP 1 ve DP 2 istasyonu olarak"],
              ["Bridge Mate TCS", "İtici ve pervane kontrolü", "DP komutunu iticiye taşır"],
              ["Bridge Mate IBS", "Entegre köprüüstü (MFW)", "Conning, ECDIS, autopilot ortak platform"],
              ["RadaScan / CyScan", "Lokal konum referansı", "DP'ye PRS girdisi"],
            ],
            caption: "Bridge Mate ürün ailesinin DP zincirindeki yeri",
          },
        },
      ],
    },
    {
      heading: "2. Dağıtık Mimarinin Mantığı",
      lead: `Bridge Mate DP konsepti, hem yedeklilik (redundancy) hem de ayrışma (segregation) felsefesini birlikte vurgulayan dağıtık bir mimariye dayanır.`,
      sections: [
        {
          subheading: "2.1 Merkezî değil, dağıtık",
          paragraphs: [
            `Klasik yaklaşımda tüm sinyaller köprüüstündeki merkezî bir kabine çekilir. Bridge Mate'te ise operatör istasyonları ve DP kontrol bilgisayarlarının yanı sıra itici ve sensör arayüz üniteleri de dağıtıktır. Bu üniteler, DP gemilerinde kullanılmak üzere özel tasarlanmış bağımsız (stand-alone) bir IO ünitesi üzerine kuruludur.`,
            `Her arayüz ünitesi, bağlandığı iticinin, referans sisteminin veya sensörün yakınına yerleştirilebilir. Sonuç, kablo tesisatında belirgin bir azalmadır — bu hem yeni inşada maliyet hem de retrofit'te uygulanabilirlik anlamına gelir.`,
          ],
        },
        {
          subheading: "2.2 Sağlamlık gerekçesi",
          paragraphs: [
            `MT, bu sağlam tasarımın özellikle servis ve sistem uzmanının günün her saati hazır bulunmadığı gemilerde önem taşıdığını vurgular. Offshore'da bir arıza anında üretici mühendisi çoğu zaman saatler ya da günler uzaktadır; sistemin kendi başına ayakta kalabilmesi kritiktir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `Dağıtık mimari, yedeklilik + ayrışma felsefesi ve stand-alone IO ünitesi tanımı Marine Technologies Bridge Mate DP broşüründe (MT-SAL-0004 v2.0) belirtilmiştir.`,
            },
          ],
        },
        {
          subheading: "2.3 Retrofit ve sınıf esnekliği",
          paragraphs: [
            `Arayüz ünitesinin tasarımı, Bridge Mate sistemini tüm ekipman sınıflarında retrofit ve modernizasyon için uygun kılar. Aynı donanım modülleri farklı sınıflarda kullanıldığından, sınıf yükseltmesi genellikle yeni tip donanım değil, aynı tip donanımdan daha fazlası anlamına gelir.`,
          ],
          bullets: [
            `IO ünitesi ekipmanın yanına → kablo güzergâhı kısalır`,
            `Aynı modül seti farklı sınıflarda → yedek parça çeşidi azalır`,
            `Mevcut gemide kademeli yükseltme mümkün`,
          ],
        },
      ],
    },
    {
      heading: "3. Mimarinin Operasyonel Sonuçları",
      sections: [
        {
          subheading: "3.1 DPO açısından ne değişir",
          paragraphs: [
            `Dağıtık mimari, arıza analizinde soruyu değiştirir. "Hangi kart bozuldu?" yerine "Hangi IO ünitesi düştü ve o ünite neyi besliyordu?" sorusu sorulur. Bu nedenle her IO ünitesinin hangi itici, referans sistemi, güç kaynağı ve sensör grubuna hizmet ettiği önceden çıkarılmış olmalıdır.`,
          ],
          bullets: [
            `IO ünitesi–ekipman eşleşme listesi köprüüstünde bulunmalı`,
            `Ünite kaybının hangi yedek grubu etkilediği FMEA ile örtüşmeli`,
            `Ağ kolu kaybı senaryosu WCF değerlendirmesine dahil edilmeli`,
          ],
        },
        {
          subheading: "3.2 Yoğunlaşma riski",
          callouts: [
            {
              type: "warning",
              title: "Az kablo, yoğun ünite",
              text: `Kablolamanın azalması, birden fazla ekipmanın tek bir IO ünitesinde toplanması pahasına gelebilir. O ünitenin kaybı beklenenden geniş bir ekipman grubunu düşürebilir; bu etki gemiye özel FMEA'de tek tek doğrulanmalıdır.`,
            },
            {
              type: "warning",
              title: "Broşür ≠ gemi",
              text: `Üreticinin genel mimari broşürü, gemiye özel FMEA'nin, devreye alma dokümanının ve Bridge Mate operatör el kitabının yerini tutmaz. Kesin konfigürasyon her zaman gemiden doğrulanır.`,
            },
          ],
        },
        {
          subheading: "3.3 Göreve başlamadan kontrol listesi",
          bullets: [
            `Sistemin Bridge Mate seviyesi (JX / DP 0 / DP 1 / DP 2 / DP 3) doğrulandı mı?`,
            `Operatör istasyonu, kontrol bilgisayarı ve IO ünitelerinin fiziksel yerleşimi biliniyor mu?`,
            `IO ünitesi–ekipman tahsis listesi güncel mi?`,
            `Yedeklilik ve ayrışma sınırları FMEA redundant group tanımıyla örtüşüyor mu?`,
            `Bir IO ünitesi veya ağ kolu kaybının etkisi WCF senaryosuna işlendi mi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
