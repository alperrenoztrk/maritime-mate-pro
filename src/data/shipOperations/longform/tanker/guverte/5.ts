import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "COW (Crude Oil Washing) planı ve uygulaması",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 5,
  estimatedPages: 22,
  intro: `Crude Oil Washing (COW), boşaltma sırasında tank duvarındaki yağ tortusunu ham petrolün kendi jet'iyle yıkayan, hem ROB'u azaltan hem de slop oluşumunu düşüren MARPOL Annex I gereği zorunlu bir tekniktir. COW'un en kritik güvenlik şartı tank atmosferinin inert (O2 < %8) olmasıdır; bu sağlanmadan yapılan COW geçmişte ölümcül patlamalara (Mactra, Marpessa) yol açmıştır. Bu bölüm wash pattern planını ve güvenli uygulamayı ele alır.`,
  sources: [
    "MARPOL Annex I Reg. 33-35",
    "COW Manual (Class onaylı, gemiye özel)",
    "ISGOTT 6th edition",
  ],
  chapters: [
    {
      heading: "1. COW Prensibi ve Ön Şartlar",
      sections: [
        {
          subheading: "1.1 Neden COW?",
          paragraphs: [
            `COW; clingage (duvara yapışan yağ) miktarını azaltarak outturn'ı (boşaltılan miktarı) artırır, su ile yıkama ihtiyacını ve dolayısıyla slop'u düşürür. MARPOL belirli tonajdaki ham petrol tankerleri için COW'u zorunlu kılar.`,
          ],
        },
        {
          subheading: "1.2 Inert atmosfer şartı",
          paragraphs: [
            `COW yalnız tank O2'si %8'in altında iken yapılır. Yüksek O2 ile yapılan COW, statik elektrik kıvılcımıyla patlamaya yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Mactra/Marpessa dersi",
              text: `1969'da yüksek O2 ortamında tank yıkaması yapan tankerlerde patlamalar yaşandı; bu kazalar inert gaz ve COW kurallarının temelini oluşturdu. O2 < %8 doğrulanmadan COW yapılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Wash Pattern Planı",
      sections: [
        {
          subheading: "2.1 Single/multi-stage",
          paragraphs: [
            `COW Manual'a göre tank washing makineleri için tek aşamalı (single-stage) veya çok aşamalı (multi-stage) yıkama paterni seçilir; makine açıları (top/bottom wash) ve süreler tanka göre belirlenir. Bottom wash, dipteki tortunun stripping'e yönlendirilmesini sağlar.`,
          ],
          bullets: [
            `Makine sayısı ve konumu`,
            `Top/bottom wash açıları ve süreleri`,
            `Concurrent (boşaltma ile eşzamanlı) plan`,
            `Stripping ile koordinasyon (dip boşaltma)`,
          ],
        },
      ],
    },
    {
      heading: "3. Uygulama ve İzleme",
      sections: [
        {
          subheading: "3.1 Yıkama sırası",
          paragraphs: [
            `Yıkama, boşaltmanın uygun aşamasında başlatılır; her tank için yıkama öncesi, sırası ve sonrası kayıt tutulur. Hidrokarbon/oksijen seviyesi ve hat basıncı izlenir. Yıkama suyu yerine ham petrol kullanıldığından stripping ile dip sürekli boşaltılır.`,
          ],
        },
        {
          subheading: "3.2 Tıkanıklık ve kontrol",
          paragraphs: [
            `Makinelerin döndüğü (rotasyon kontrolü) ve nozzle'ların tıkanmadığı doğrulanır; düşük basınç veya dönmeyen makine etkin yıkamayı engeller.`,
          ],
        },
      ],
    },
    {
      heading: "4. Kayıt ve Kontrol Listesi",
      sections: [
        {
          subheading: "4.1 COW son kontrol",
          bullets: [
            `Tüm yıkanacak tanklarda O2 < %8 doğrulandı mı?`,
            `Wash pattern COW Manual'a uygun mu?`,
            `Stripping ile dip boşaltma koordineli mi?`,
            `Her tank için COW Record dolduruldu mu?`,
          ],
          paragraphs: [
            `COW, doğru yapıldığında çevresel ve ticari kazanç sağlar; ama inert atmosfer şartı tek istisnasız ön koşuldur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
