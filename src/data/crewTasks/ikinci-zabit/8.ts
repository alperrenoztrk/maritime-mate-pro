import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Revir (sick bay) ve tıbbi malzeme sorumluluğu",
  roleSlug: "ikinci-zabit",
  taskIndex: 8,
  estimatedPages: 25,
  intro: `Çoğu ticari gemide doktor yoktur; tıbbi sorumluluk eğitimli bir zabite verilir ve uluslararası pratikte bu görev genellikle İkinci Zabit'e (Medical Officer) düşer. SOLAS ve MLC 2006 gereğince gemide yeterli tıbbi ekipman, ilaç ve revir bulundurulması zorunludur. İkinci Zabit; tıbbi sandık (medical chest) envanterini güncel tutmak, son kullanma tarihlerini izlemek, medical log tutmak, hasta değerlendirmek, TMAS (kıyı tıbbi danışma) ile iletişim kurmak ve gerektiğinde medevac koordine etmekle yükümlüdür. Bu bölüm gemideki tıbbi sorumluluğu kapsamlı biçimde ele alır.`,
  sources: [
    "MLC 2006 Regulation 4.1 — Medical care on board",
    "SOLAS Chapter III — life-saving ve ilk yardım",
    "International Medical Guide for Ships (WHO, IMGS)",
    "Ship Captain's Medical Guide / IMGS medical chest listeleri",
    "MFAG — Medical First Aid Guide (IMDG ek)",
    "STCW A-VI/4 — medical first aid & medical care",
  ],
  chapters: [
    {
      heading: "1. Gemide Tıbbi Sorumluluk Çerçevesi",
      sections: [
        {
          subheading: "1.1 Medical Officer rolü",
          paragraphs: [
            `Doktorsuz bir gemide tıbbi bakım; eğitimli zabit (genelde İkinci Zabit), tıbbi rehberler, gemi tıbbi sandığı ve kıyıdan telsiz tıbbi danışma (TMAS) üçgenine dayanır. İkinci Zabit STCW A-VI/4 kapsamında "medical care" yetkinliğine sahip olmalı ve bu rolü ciddiyetle taşımalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 Reg. 4.1",
              text: `Gemide mürettebatın sağlığını koruyacak tıbbi bakım, ekipman, ilaç ve rehber bulundurulması zorunludur. Belirli büyüklük/sefer tipine göre revir (sick bay) ve eğitimli sorumlu personel şartı vardır. PSC bu uyumu denetler.`,
            },
          ],
        },
        {
          subheading: "1.2 Revir (sick bay)",
          paragraphs: [
            `Revir; hasta/yaralı bakımı için ayrılmış, hijyenik, ısıtmalı/havalandırılmalı ve gerekli ekipmanı bulunan bir alandır. İkinci Zabit revirin temiz, düzenli ve kullanıma hazır olmasını sağlar; yatak, oksijen, sedye, ilk yardım ekipmanı erişilebilir tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Tıbbi Sandık (Medical Chest) Yönetimi",
      sections: [
        {
          subheading: "2.1 Envanter ve son kullanma tarihi",
          paragraphs: [
            `Tıbbi sandık, bayrak devleti/IMGS listelerine göre belirli ilaç ve malzemeleri içerir. İkinci Zabit envanteri güncel tutar, son kullanma tarihlerini izler, biten/yaklaşan kalemleri liman ikmaline ekler ve kontrollü ilaçların (narkotik) kayıt ve kilit altında tutulmasını sağlar.`,
          ],
          table: {
            caption: "Tıbbi sandık kontrol başlıkları (örnek)",
            headers: ["Kategori", "Örnek", "İzlenen"],
            rows: [
              ["Analjezik/ateş", "Parasetamol", "Miktar, SKT"],
              ["Antibiyotik", "Geniş spektrum", "Miktar, SKT, reçete kaydı"],
              ["Yara bakım", "Gazlı bez, sütur", "Steril, miktar"],
              ["Kontrollü ilaç", "Morfin", "Kilit, ikili kayıt, miktar"],
              ["Ekipman", "Oksijen, AED, atel", "Çalışır, dolu, SKT"],
            ],
          },
        },
        {
          subheading: "2.2 Kontrollü ilaçlar",
          paragraphs: [
            `Narkotik/kontrollü ilaçlar kilitli, ayrı kayıtlı (controlled drugs register) ve genelde iki kişi gözetiminde kullanılır. Kullanım, miktar ve gerekçe kaydedilir; eksik veya kayıtsız kullanım ciddi hukuki sorundur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Süresi geçmiş ilaç",
              text: `Son kullanma tarihi geçmiş ilaç ya etkisiz ya tehlikelidir. Düzenli SKT taraması ve zamanında ikmal, acil bir durumda elinizdeki ilacın işe yaramasını güvence altına alır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Hasta Değerlendirme ve İlk Yaklaşım",
      sections: [
        {
          subheading: "3.1 Sistematik değerlendirme",
          paragraphs: [
            `İkinci Zabit, ilk yardımda ABCDE (Airway-Breathing-Circulation-Disability-Exposure) yaklaşımıyla hastayı sistematik değerlendirir; vital bulguları (nabız, solunum, tansiyon, ateş, bilinç) ölçer ve kaydeder. Rehber (IMGS) semptomdan tanıya yönlendirir; ancak ciddi durumlarda mutlaka TMAS'a danışılır.`,
          ],
          bullets: [
            `Olay/şikâyet ve öykü`,
            `Vital bulgular ve seyri`,
            `IMGS rehberiyle değerlendirme`,
            `TMAS danışması ve talimatların uygulanması`,
          ],
        },
      ],
    },
    {
      heading: "4. TMAS ve Kıyı Tıbbi Danışma",
      sections: [
        {
          subheading: "4.1 Telsiz tıbbi yardım",
          paragraphs: [
            `TMAS (Telemedical Assistance Service), gemilere ücretsiz 7/24 tıbbi danışma sağlayan kıyı merkezleridir. İkinci Zabit, hasta verisini (vital bulgular, semptom, öykü, mevcut ilaç) net biçimde iletir ve doktorun talimatlarını uygular. İyi bir TMAS görüşmesi, doğru tedaviyle medevac arasındaki kararı belirler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Veriyi hazırla",
              text: `TMAS'ı aramadan önce vital bulgular, semptom zaman çizelgesi, alerji ve uygulanan ilaçları hazır tutun. Net veri, kıyıdaki doktorun doğru ve hızlı yönlendirme yapmasını sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Medevac ve Tahliye Koordinasyonu",
      sections: [
        {
          subheading: "5.1 Tahliye kararı",
          paragraphs: [
            `Hastanın gemide tedavi edilemeyeceği durumda, TMAS önerisiyle medevac (helikopter veya en yakın limana sapma) planlanır. İkinci Zabit; MRCC ile koordinasyon, hasta hazırlığı, dokümantasyon ve helikopter operasyonu (varsa) için güverte hazırlığına katkı verir. Karar kaptanındır; koordinasyon ekiple birlikte yürür.`,
          ],
        },
      ],
    },
    {
      heading: "6. Tıbbi Kayıt ve Tatbikat",
      sections: [
        {
          subheading: "6.1 Medical log ve drill",
          paragraphs: [
            `Her tıbbi olay, tedavi ve ilaç kullanımı medical log book'a kaydedilir. İkinci Zabit ayrıca ilk yardım ve medical emergency tatbikatlarını organize eder; CPR, kanama kontrolü, kırık tespiti ve sedye taşıma gibi beceriler düzenli tazelenir.`,
          ],
          bullets: [
            `Medical log: olay, tedavi, ilaç, sonuç`,
            `Kontrollü ilaç register güncel`,
            `İlk yardım/medical drill kayıtları`,
            `Mürettebat sağlık beyanı ve aşı kayıtları`,
          ],
        },
      ],
    },
    {
      heading: "7. Bulaşıcı Hastalık ve Hijyen",
      sections: [
        {
          subheading: "7.1 IHR ve karantina",
          paragraphs: [
            `Bulaşıcı hastalık şüphesinde IHR 2005 kapsamında izolasyon, hijyen ve liman sağlık otoritesine bildirim gerekir. İkinci Zabit, hasta izolasyonu, temas takibi ve hijyen önlemlerinde kaptanı ve sağlık otoritesini destekler.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Tıbbi sorumluluk kontrolü",
          bullets: [
            `Medical chest envanteri güncel, SKT'ler kontrol edildi mi?`,
            `Kontrollü ilaçlar kilitli ve kayıtlı mı?`,
            `Revir temiz, ekipman (oksijen/AED/sedye) hazır mı?`,
            `Vital ölçüm cihazları çalışıyor mu?`,
            `TMAS iletişim bilgileri ve prosedürü hazır mı?`,
            `Medical log ve drill kayıtları güncel mi?`,
            `Eksik kalemler liman ikmal listesine eklendi mi?`,
          ],
          paragraphs: [
            `Gemide tıbbi sorumluluk, nadiren kullanılan ama kullanıldığında hayat kurtaran bir hazırlıktır. İkinci Zabitin güncel sandığı, tazelenmiş becerisi ve TMAS'ı etkin kullanması, denizin ortasında bir mürettebatın tek tıbbi güvencesidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
