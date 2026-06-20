import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "İki Zamanlı Düşük Devirli Motorlar",
  sectionId: "main-engine",
  topicIndex: 0,
  estimatedPages: 28,
  intro: `İki zamanlı (2-stroke) düşük devirli dizel motorlar, büyük ticari gemilerin ana tahrik makinesidir; pervaneyi dişli kutusu olmadan doğrudan (direct drive) çevirir, ağır yakıt (HFO) yakar ve yüksek termal verimle uzun mesafe taşımacılığa uygundur. MAN B&W ve WinGD (Sulzer) bu pazarın başlıca üreticileridir. Bu bölüm; iki zamanlı çevrimi ve uniflow süpürmeyi, motor ana parçalarını (gömlek, piston, krank, kruvasil), yakıt enjeksiyonu ve elektronik kontrolü (ME/RT-flex common rail), turboşarj ve süpürme havasını, yağlama (silindir/sistem yağı) ve emisyon (Tier III) konularını mühendislik derinliğinde ele alır.`,
  sources: [
    "MAN Energy Solutions — two-stroke project guides",
    "WinGD (Wärtsilä/Sulzer) engine manuals",
    "MARPOL Annex VI — NOx/SOx (Tier I-III)",
    "IACS UR M — machinery requirements",
    "Pounder's Marine Diesel Engines",
  ],
  chapters: [
    {
      heading: "1. İki Zamanlı Çevrim",
      sections: [
        {
          subheading: "1.1 Çevrim ve uniflow süpürme",
          paragraphs: [
            `İki zamanlı çevrimde her krank dönüşünde bir güç stroku üretilir: piston yukarı çıkarken sıkıştırma, üstte yakıt püskürtme/yanma, aşağı inerken güç ve alt bölgede süpürme/egzoz gerçekleşir. Modern büyük motorlar uniflow süpürme kullanır: süpürme havası gömlek altındaki portlardan girer, egzoz silindir başındaki tek egzoz supabından çıkar; bu, temiz dolum ve yüksek verim sağlar.`,
          ],
          bullets: [
            `Her devirde bir güç stroku → yüksek tork, düşük devir`,
            `Uniflow: alttan hava, üstten egzoz supabı`,
            `Düşük devir (~70-120 rpm) pervaneye doğrudan uyar`,
          ],
        },
        {
          subheading: "1.2 Neden düşük devir?",
          paragraphs: [
            `Pervane verimi düşük devirde ve büyük çapta yüksektir. İki zamanlı motor doğrudan bu devirde çalışarak dişli kutusu kayıplarını ortadan kaldırır. Büyük strok/çap oranı (ultra-long stroke) termal verimi %50'nin üzerine çıkarır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Ana Parçalar",
      sections: [
        {
          subheading: "2.1 Silindir, piston ve yürüyen aksam",
          paragraphs: [
            `Ana parçalar: silindir gömleği (liner), piston ve segmanlar, piston kolu (piston rod), kruvasil (crosshead), biyel (connecting rod), krank mili ve ana yataklar. Crosshead tasarımı yanal kuvveti gömlekten ayırır; böylece gömlek aşınması azalır ve silindir yağlaması ayrı yönetilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Crosshead avantajı",
              text: `Crosshead, piston yan kuvvetini kızak (guide) üzerinden alır; bu sayede gömlek yalnızca dikey aşınmaya maruz kalır ve ayrı silindir yağlaması mümkün olur.`,
            },
          ],
        },
        {
          subheading: "2.2 Stuffing box ve ayrı yağlama",
          paragraphs: [
            `Piston rod, silindir alanı ile karter (crankcase) arasından stuffing box (salmastra kutusu) ile geçer. Bu, kirli silindir yağının temiz karter yağına karışmasını önler. Silindir yağı (yüksek BN, ayrı sistem) ile sistem/karter yağı bağımsızdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Yakıt Enjeksiyonu ve Elektronik Kontrol",
      sections: [
        {
          subheading: "3.1 Mekanik kam vs elektronik (ME/RT-flex)",
          paragraphs: [
            `Geleneksel motorlarda yakıt pompası ve egzoz supabı kam mili ile sürülür. Modern elektronik kontrollü motorlarda (MAN ME, WinGD RT-flex) common rail yüksek basınçlı yakıt ve hidrolik servo, enjeksiyon zamanlaması ve supap hareketini her yük/devir için optimize eder; kam mili kalkar.`,
          ],
          table: {
            headers: ["Özellik", "Mekanik (MC)", "Elektronik (ME/flex)"],
            rows: [
              ["Enjeksiyon zamanı", "Kam ile sabit", "Yüke göre ayarlı"],
              ["Yakıt verimi", "İyi", "Daha iyi (kısmi yükte)"],
              ["Emisyon kontrolü", "Sınırlı", "Esnek (Tier ayarı)"],
              ["Bakım", "Kam/pompa", "Servo/hidrolik + yazılım"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Turboşarj, Süpürme ve Yağlama",
      sections: [
        {
          subheading: "4.1 Turboşarj ve süpürme havası",
          paragraphs: [
            `Egzoz gazı turboşarjı çevirir; kompresör süpürme havasını basar, hava soğutucusu (air cooler) sıkışan havayı soğutarak yoğunlaştırır ve scavenge receiver üzerinden silindire verilir. Düşük yükte yeterli hava için auxiliary blower (yardımcı üfleyici) devreye girer.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Scavenge fire",
              text: `Süpürme hava kanalında biriken yağ ve kalıntı tutuşabilir (scavenge fire). Yüksek egzoz sıcaklığı ve baca dumanı uyarı işaretidir; drenaj ve temizlik düzenli yapılır.`,
            },
          ],
        },
        {
          subheading: "4.2 Silindir yağlaması ve emisyon",
          paragraphs: [
            `Silindir yağı, gömleğe ölçülü dozlarla (cylinder lubricators / Alpha lubrication) verilir; yakıt kükürdünü nötralize etmek için yağın baz sayısı (BN) yakıt kükürdüne göre seçilir. MARPOL Annex VI Tier III bölgelerinde NOx için EGR veya SCR; SOx için düşük kükürtlü yakıt veya scrubber kullanılır.`,
          ],
          bullets: [
            `Düşük kükürtlü yakıtta düşük BN yağ (aşırı baz birikimini önle)`,
            `Yüksek kükürtte yüksek BN (asit nötralizasyonu)`,
            `Tier III: EGR/SCR ile NOx azaltımı`,
          ],
        },
      ],
    },
    {
      heading: "5. İşletme ve Arıza Teşhisi",
      sections: [
        {
          subheading: "5.1 İzleme parametreleri",
          paragraphs: [
            `Silindir başına egzoz sıcaklığı, maksimum yanma basıncı (Pmax), süpürme hava basıncı/sıcaklığı, turboşarj devri ve yatak sıcaklıkları sürekli izlenir. Dengesizlik (bir silindirin sapması) enjektör, supap veya yük dağılımı sorununa işaret eder.`,
          ],
        },
        {
          subheading: "5.2 Arıza tablosu",
          paragraphs: [`Yaygın arızalar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Bir silindir düşük egzoz sıc.", "Enjektör/yakıt pompası", "Enjektör test/değişim"],
              ["Yüksek egzoz + duman", "Turboşarj kirli, hava az", "TC temizlik, air cooler kontrol"],
              ["Yatak sıcaklığı yüksek", "Yağ basıncı/açıklık", "Yağ basıncı ve yatak kontrolü"],
              ["Crankcase oil mist alarmı", "Sıcak nokta/yatak sürtmesi", "Derhal yavaşla, OMD ve yatak muayenesi"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "Crankcase patlaması",
              text: `Oil mist detector (OMD) yağ buharı alarmı verirse karter patlaması riski vardır; motor derhal yavaşlatılır, karter kapağı yeterince soğumadan açılmaz.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
