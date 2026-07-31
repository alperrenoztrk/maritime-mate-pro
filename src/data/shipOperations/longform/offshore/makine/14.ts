import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate Thruster Control System (TCS) ve itici entegrasyonu",
  shipType: "offshore",
  dept: "makine",
  opIndex: 14,
  estimatedPages: 20,
  intro: `DP sisteminin ürettiği komut, iticiye ulaşamazsa hiçbir işe yaramaz. Bu zinciri kuran katman itici kontrol sistemidir. Marine Technologies'in Bridge Mate Thruster Control System'i, üç kontrol bilgisayarı ve yedekli haberleşme ağıyla bu katmanı DP'nin yedeklilik seviyesine taşımayı hedefler. Bu bölüm, TCS'in mimarisini, kapsamını ve makine tarafındaki doğrulama sorumluluğunu ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate Thruster Control System Brochure (MT-SAL-0095 v1.0)",
    "marine-technologies.com — TCS ve proje bilgileri",
    "IMCA M103",
    "IMCA M206",
    "Vessel FMEA",
  ],
  chapters: [
    {
      heading: "1. TCS Mimarisi",
      lead: `TCS, DP ile itici arasındaki komut yolunu kuran ve kendisi de yedekli olan bağımsız bir kontrol katmanıdır.`,
      sections: [
        {
          subheading: "1.1 Üç bilgisayar, yedekli ağ",
          paragraphs: [
            `Bridge Mate Thruster Control System, üç kontrol bilgisayarı ve yedekli haberleşme ağları kullanır. Çoğu itici tipi, makine ve dümenle uyumludur; autopilot ve joystick sistemleriyle entegre çalışır.`,
            `Bu mimari, itici kontrol katmanının DP kontrol katmanıyla benzer bir yedeklilik seviyesine sahip olmasını sağlar. Tek bir kontrol bilgisayarının kaybı sevk kontrolünü düşürmemelidir; bu durum FMEA testleriyle kanıtlanır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `Üç kontrol bilgisayarı, yedekli haberleşme ağları ve autopilot/joystick entegrasyonu MT Bridge Mate TCS broşüründe (MT-SAL-0095 v1.0) belirtilmiştir.`,
            },
          ],
        },
        {
          subheading: "1.2 Desteklenen itici ve pervane tipleri",
          paragraphs: [
            `TCS motor markasından bağımsız çalışır ve tunnel thruster, Voith sevk sistemleri, azimuth podlar, retractable üniteler ve waterjetler dahil olmak üzere her tür sevk cihazını kontrol edebilir.`,
          ],
          table: {
            headers: ["Sevk tipi", "Kontrol özelliği", "DP açısından dikkat"],
            rows: [
              ["Tunnel thruster", "Yalnız enine kuvvet", "Hızda verim düşer"],
              ["Azimuth pod", "360° yönlendirilebilir", "Yasak açı ve etkileşim"],
              ["Retractable", "İndirilebilir, 360°", "İndirme/kaldırma süresi"],
              ["Voith", "Sürekli değişken vektör", "Hızlı tepki, farklı derating"],
              ["Waterjet", "Yüksek hızda etkin", "Düşük hızda sınırlı itki"],
            ],
            caption: "TCS kapsamındaki itici tipleri ve DP açısından öne çıkan özellikleri",
          },
        },
        {
          subheading: "1.3 Kablolama azalması",
          paragraphs: [
            `Dağıtık mimarinin en somut çıktılarından biri itici başına çekilen iletken sayısındaki azalmadır. Geleneksel yaklaşımda her itici için DP, TCS, yedek TCS, VDR, autopilot, conning, bağımsız joystick ve otomasyon sistemlerine ayrı ayrı kablo çekilir. Bridge Mate düzeninde bu, ortak yollar üzerinden belirgin biçimde azalır.`,
          ],
          table: {
            headers: ["Yaklaşım", "İtici başına iletken", "Yol sayısı"],
            rows: [
              ["Geleneksel", "28+28+18+2+8+10+18+8", "8 ayrı sistem yolu"],
              ["Bridge Mate", "8 + 8", "Backup TCS/IND JS + TCS/DP/IBS"],
            ],
            caption: "MT-SAL-0095 broşüründeki kablolama karşılaştırması (Şekil 1 → Şekil 2)",
          },
        },
      ],
    },
    {
      heading: "2. Makine Tarafında Doğrulama",
      sections: [
        {
          subheading: "2.1 Devreye alma kayıtları",
          paragraphs: [
            `TCS motor markasından bağımsız çalışsa da, arayüz parametreleri her üniteye göre ayrı ayarlanır. Pitch/rpm/azimuth ölçek faktörleri, rampa süreleri, yasak açılar ve derating eğrileri devreye alma sırasında belirlenir ve kayıt altına alınır. Bu kayıtlar, sonraki her değişiklikte referans noktasıdır.`,
          ],
          bullets: [
            `Her ünite için parametre sayfası mevcut mu?`,
            `Rampa süreleri ve ölçek faktörleri kayıtlı mı?`,
            `Yasak açı tanımları güncel mi?`,
            `Derating eğrileri gerçek ünite verisiyle uyumlu mu?`,
          ],
        },
        {
          subheading: "2.2 Yedek kontrol yolu",
          paragraphs: [
            `Backup thruster kontrolü ve bağımsız joystick yolu, DP/TCS ana yolundan ayrı olmalıdır. Bu ayrılık yalnızca şema üzerinde değil, fiziksel kablo güzergâhı ve besleme kaynağı düzeyinde de doğrulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Test edilmeyen yedek",
              text: `Yedek kontrol yolu düzenli test edilmezse, arıza yalnızca ana yol kaybedildiğinde — yani en kötü anda — ortaya çıkar. Bu, DP gemilerinde gizli arızanın en klasik biçimidir.`,
            },
          ],
          bullets: [
            `Yedek yol testi PMS'de tanımlı mı ve süresi geçmemiş mi?`,
            `Test gerçek devir koşullarında mı yapılıyor?`,
            `Test sonucu ve tarihi kayıtlı mı?`,
            `Yedek yol besleme kaynağı ana yoldan bağımsız mı?`,
          ],
        },
        {
          subheading: "2.3 Komut önceliği",
          paragraphs: [
            `Autopilot ve joystick entegrasyonunda komut önceliğinin ve kontrol devrinin nasıl çözüldüğü FMEA ile karşılaştırılmalıdır. Birden fazla kaynağın aynı anda komut verebildiği bir konfigürasyon, tasarımca engellenmiş olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Operasyonel Etkiler",
      sections: [
        {
          subheading: "3.1 Tepki farklılıkları",
          callouts: [
            {
              type: "warning",
              title: "Tek genel ayar yetmez",
              text: `Sevk cihazı tipine göre tepki süresi ve derating farklıdır. Tüm ünitelere uygulanan tek bir genel ayar, bazı ünitelerde aşırı agresif, bazılarında ise yetersiz tepkiye yol açar; bu da DP'nin sürekli düzeltme yapmasına ve yakıt/aşınma artışına neden olur.`,
            },
          ],
        },
        {
          subheading: "3.2 Etkileşim ve yasak açılar",
          paragraphs: [
            `İtici akıntısının gövdeye veya başka bir iticiye çarpması net itkiyi düşürür. TCS'de tanımlı yasak açılar ve etkileşim düzeltmeleri, DP'nin gerçekte elde edeceği itkiyi doğru tahmin etmesi için gereklidir. Bu tanımlar hatalıysa capability plot da yanıltıcı olur.`,
          ],
          bullets: [
            `Yasak açılar mekanik ve hidrodinamik gerekçeleriyle belgeli mi?`,
            `Etkileşim düzeltmeleri model/deneme verisiyle doğrulandı mı?`,
            `Beklenen net itki kaybı capability plot'a yansıtıldı mı?`,
          ],
        },
        {
          subheading: "3.3 ECR–köprüüstü koordinasyonu",
          paragraphs: [
            `TCS üzerinde yapılacak her müdahale — parametre değişikliği, kart değişimi, yazılım güncellemesi — DP kabiliyetini doğrudan etkiler. İşlem öncesinde köprüüstü ile ortak değerlendirme yapılır, etkilenecek yedek grup belirlenir ve gerekiyorsa ASOG durumu değiştirilir.`,
          ],
          bullets: [
            `Müdahale öncesi DPO bilgilendirildi mi?`,
            `Etkilenen yedek grup ve süre tanımlandı mı?`,
            `ASOG durumu güncellendi mi?`,
            `İşlem sonrası return-to-service testi yapıldı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
