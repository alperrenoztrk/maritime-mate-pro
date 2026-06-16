import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet ekipmanlarının yönetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Birinci Zabit, gemideki tüm LSA (Life-Saving Appliances) ve FFE (Fire-Fighting Equipment) ekipmanlarının envanter kontrolü, bakım takibi, servis tarihlerinin izlenmesi ve kayıtlarının tutulmasından nihai olarak sorumludur. Fiili yürütmeyi çoğu zaman 3. veya 4. Zabite devretse de, can salları, filikalar, can yelekleri, yangın söndürme sistemleri, muster list güncellemeleri ve drill organizasyonu Birinci Zabit'in koordinasyonundadır. Bu bölüm, SOLAS ile LSA/FSS Code çerçevesinde emniyet ekipmanı yönetimini sistematik olarak ele alır.`,
  sources: [
    "SOLAS Chapter III — Life-Saving Appliances and Arrangements",
    "LSA Code (International Life-Saving Appliance Code)",
    "SOLAS Chapter II-2 — Fire Protection, Detection, Extinction",
    "FSS Code (International Code for Fire Safety Systems)",
    "MSC.1/Circ.1206 — Maintenance of lifeboats & launching",
    "MSC.402(96) — Maintenance, testing of LSA",
    "MSC.1/Circ.1318 — Maintenance of fixed CO2 systems",
    "MGN / Flag State LSA-FFE inspection guidance",
  ],
  chapters: [
    {
      heading: "1. Yasal Çerçeve ve Sorumluluk Zinciri",
      lead: `Emniyet ekipmanı yönetimi, SOLAS III ve II-2'nin gemideki günlük uygulamasıdır.`,
      sections: [
        {
          subheading: "1.1 Birinci Zabit'in nihai sorumluluğu",
          paragraphs: [
            `SOLAS III ve II-2, geminin can kurtarma ve yangın ekipmanını her an kullanıma hazır tutmasını şart koşar. Birinci Zabit, görev dağılımında LSA/FFE'nin günlük kontrolünü genç zabitlere verse de hazır bulunurluk, kayıt doğruluğu ve servis takvimi uyumundan nihai olarak sorumludur. Denetimde bulgu çıktığında muhatap Birinci Zabit'tir.`,
            `Bu sorumluluk; aylık/haftalık kontrol rutinleri, yıllık/sertifikalı servisler, defekt kayıtları ve eksik/expired kalemlerin tedariki olarak işler. Emniyet ekipmanı, "ne zaman gerekeceği belli olmayan ama gerektiğinde %100 çalışması gereken" ekipmandır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/20 — Operational readiness",
              text: `LSA ve düzenlemeleri her an kullanıma hazır olmalı; gemi limandan ayrılmadan önce ve sefer boyunca düzenli denetimden geçmelidir. Haftalık, aylık ve yıllık muayene/test programı SOLAS III/20'de tanımlıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Servis ve sertifika rejimi",
          paragraphs: [
            `Can salları, hydrostatic release unit'ler (HRU), şişme can yelekleri, EPIRB, SART ve sabit yangın sistemleri, üretici onaylı servis istasyonlarında periyodik servise tabidir. Birinci Zabit, servis tarihlerini (next due date) takip ederek geminin sertifika dışı (expired) ekipmanla sefere çıkmasını önler; expired LSA/FFE PSC detention sebebidir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Filika ve Davit Sistemleri",
      sections: [
        {
          subheading: "2.1 Lifeboat bakımı ve test rejimi",
          paragraphs: [
            `Filikalar; haftalık görsel/fonksiyonel kontrol, aylık çalıştırma (motor start, davit hareketi), her 3 ayda eğitimde indirme/yüzdürme ve yıllık tam fonksiyon testine tabidir. On-load release gear, 5 yılda bir overhaul ve dynamic load test gerektirir; bu mekanizma geçmişte birçok ölümcül kazaya neden olduğundan özel dikkat ister.`,
            `Davit fren testi, wire/fall yenileme (genellikle 5 yıl veya kondisyona göre) ve limit switch kontrolü kritik kalemlerdir. Free-fall filikalarda release simülasyon testi ve ray sistem kontrolü ayrıca yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "On-load release gear",
              text: `Filika indirme/test sırasında en ölümcül kazalar on-load release gear'ın yanlış kullanımı veya bakımsızlığından kaynaklanır. MSC.1/Circ.1206 ve MSC.402(96) prosedürlerine harfiyen uyulmalı; test sırasında kimse filika altında bulunmamalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Rescue boat ve fast rescue boat",
          paragraphs: [
            `Kurtarma botu, her ay denize indirilip manevra yapılacak şekilde test edilir (hava elverirse). Motor, dümen, şişme bot bütünlüğü ve davit/launch sistemi kontrol edilir. Fast rescue boat'lar daha sık test ister. Bu testler MOB (Man Overboard) müdahale yeteneğinin doğrulamasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Can Salları, HRU ve Bireysel Can Kurtarma",
      sections: [
        {
          subheading: "3.1 Liferaft ve hydrostatic release unit",
          paragraphs: [
            `Can salları yıllık olarak (bazı tiplerde uzatılmış aralıkla) onaylı servis istasyonunda açılır, muayene edilir ve yeniden paketlenir. HRU (hydrostatic release), 2 metre derinlikte otomatik serbest bırakma sağlar; HRU'nun expiry tarihi (genellikle 2 yıl) takip edilir ve lashing/weak link doğru bağlanır.`,
            `Birinci Zabit, sal pozisyonlarının float-free çalışacak şekilde bağlandığını, painter line'ın senlamaya doğru kelepçelendiğini ve manifest'teki sal kapasitesinin mevcut mürettebatı karşıladığını doğrular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "HRU yanlış bağlantısı",
              text: `Yanlış bağlanan HRU/weak link, batma anında salın float-free olmasını engeller. HRU değişimi sonrası bağlantı şeması üreticinin diyagramıyla karşılaştırılarak doğrulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Can yeleği, immersion suit, lifebuoy",
          paragraphs: [
            `Can yelekleri (yetişkin/çocuk/ekstra), immersion suit'ler (kuru/sıcak su rotasına göre sayı), lifebuoy'lar (ışıklı, self-igniting, smoke signal, line-throwing) envanterde sayılır ve durumu kontrol edilir. Light ve battery expiry tarihleri, retro-reflective tape ve whistle varlığı denetlenir.`,
          ],
          table: {
            caption: `Bireysel LSA — Tipik Kontrol Kalemleri`,
            headers: ["Ekipman", "Kontrol", "Aralık"],
            rows: [
              ["Can yeleği", "Light, whistle, tape, kayış", "Aylık + drill"],
              ["Immersion suit", "Fermuar, sızdırmazlık, light", "Aylık / yıllık"],
              ["Lifebuoy (ışıklı)", "Battery expiry, bağlantı", "Aylık"],
              ["Line-throwing app.", "Expiry tarihi (genelde 3 yıl)", "Stok takibi"],
              ["EPIRB", "Battery + HRU expiry, self-test", "Aylık + yıllık servis"],
              ["SART", "Battery expiry, self-test", "Aylık"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Pyrotechnics, EPIRB ve SART",
      sections: [
        {
          subheading: "4.1 İşaret fişekleri (pyrotechnics)",
          paragraphs: [
            `Rocket parachute flare, hand flare ve buoyant smoke signal'lerin expiry tarihleri (genellikle imalattan 3-3.5 yıl) titizlikle izlenir. Süresi dolanlar uygun şekilde imha/teslim edilir, sefere expired pyrotechnic ile çıkılmaz. GMDSS/distress ekipmanları içinde sayılır.`,
          ],
        },
        {
          subheading: "4.2 EPIRB ve SART servis takibi",
          paragraphs: [
            `EPIRB battery ve HRU expiry tarihleri ile yıllık shore-based servis tarihi PMS'te izlenir. Aylık self-test yapılır ve kayıt tutulur. SART (Search and Rescue Transponder) battery expiry ve montaj noktası kontrol edilir. Bu cihazların güncel kayıtlı (registration) olması da gereklidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Sabit Yangın Söndürme Sistemleri",
      sections: [
        {
          subheading: "5.1 CO2, foam ve water-mist sistemleri",
          paragraphs: [
            `Makine dairesi ve kargo bölgesi sabit CO2/clean agent sistemleri, yıllık muayene ve periyodik tartı/basınç kontrolüne tabidir. Birinci Zabit (genelde 2./3. mühendisle koordineli), tüp dolu yüzdesi, distribution piping, alarm/delay ve release mekanizmasının fonksiyonunu izler. Yanlış release ölümcüldür; bu yüzden release öncesi alan boşaltma alarmı ve interlock kritiktir.`,
            `Tankerlerde deck foam sistemi ve foam compound expiry, fixed foam monitor'ler ve high-expansion foam (gerekirse) ayrıca kontrol edilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MSC.1/Circ.1318 (rev.)",
              text: `Sabit CO2 sistemlerinin bakım, muayene ve test prosedürlerini düzenler; cylinder hose, distribution piping ve alarm/delay testleri için periyodik program tanımlar.`,
            },
          ],
        },
        {
          subheading: "5.2 Fire detection ve fixed alarm",
          paragraphs: [
            `Yangın algılama (smoke/heat detector), manuel call point, fire alarm panel ve general alarm fonksiyon testi periyodik yapılır. Detector kirlenmesi false alarm veya geç algılama yaratır; zone bazında test ve temizlik programlanır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Taşınabilir Yangın Ekipmanı ve EEBD",
      sections: [
        {
          subheading: "6.1 Portable extinguisher ve hidrant sistemi",
          paragraphs: [
            `Portable yangın söndürücüler (foam, dry powder, CO2) konum, basınç göstergesi, mühür, expiry ve servis tarihiyle kontrol edilir; yıllık muayene ve periyodik hydrostatic test (genellikle 10 yıl) uygulanır. Fire hydrant, hortum, nozzle ve international shore connection varlığı; fire pump ve emergency fire pump fonksiyonu test edilir.`,
          ],
          table: {
            caption: `FFE — Periyodik Kontrol Özeti (Tipik)`,
            headers: ["Ekipman", "Kontrol", "Aralık"],
            rows: [
              ["Portable extinguisher", "Basınç, mühür, konum", "Aylık + yıllık servis"],
              ["Fire hose & nozzle", "Bütünlük, basınç testi", "Aylık / yıllık"],
              ["Emergency fire pump", "Çalıştırma + basınç", "Haftalık/aylık"],
              ["Fireman's outfit / SCBA", "Hava tüpü basıncı, conta", "Aylık"],
              ["EEBD", "Basınç, expiry", "Aylık"],
            ],
          },
        },
        {
          subheading: "6.2 SCBA, fireman's outfit ve EEBD",
          paragraphs: [
            `Fireman's outfit (koruyucu giysi, eldiven, çizme, helmet, lifeline, lamp, axe) ve SCBA setleri tam ve hazır tutulur; SCBA tüp basıncı ve maske contası düzenli kontrol edilir. EEBD (Emergency Escape Breathing Device) konum ve expiry takip edilir. Hava dolum kompresörü çalışırlığı denetlenir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Muster List, Familiarization ve Drill",
      sections: [
        {
          subheading: "7.1 Muster list güncellemesi",
          paragraphs: [
            `Muster list, her mürettebata acil durum görevini, muster station'ını ve sinyal anlamlarını gösterir. Personel değişiminde Birinci Zabit muster list'i günceller ve görünür yerlere asar. Yeni gelen herkese 24 saat içinde safety familiarization verilir; can yeleği giyme, muster station bulma, alarm tanıma ve LSA kullanımı gösterilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19 — Drills",
              text: `Abandon ship ve fire drill ayda en az bir kez yapılmalı; her mürettebat aylık olarak en az bir abandon ship ve bir fire drill'e katılmalıdır. Filika, yeni katılanlar için 24 saat içinde tanıtılmalı; enclosed space rescue drill periyodik yapılmalıdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Drill organizasyonu ve kayıt",
          paragraphs: [
            `Birinci Zabit, abandon ship, fire, enclosed space rescue, MOB ve emergency steering drill'lerini senaryolu olarak planlar, gerçekçi koşullarda yürütür ve debrief ile zayıf noktaları belirler. Her drill tarih, katılan, senaryo, kullanılan ekipman ve gözlemlerle kayıt altına alınır; "kâğıt drill" değil gerçek pratik beklenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Drill realizmi",
              text: `Rutinleşmiş, hep aynı senaryolu drill'ler gerçek acil durumda işe yaramaz. Senaryoyu değiştirmek (örn. ana muster station'ı erişilemez ilan etmek) mürettebatın gerçek karar verme yeteneğini test eder ve eksiklikleri ortaya çıkarır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Envanter, Kayıt ve Denetim Hazırlığı",
      sections: [
        {
          subheading: "8.1 LSA/FFE planı ve inventory",
          paragraphs: [
            `Gemide onaylı LSA/FFE arrangement plan (fire control plan dahil) bulundurulur ve güncel tutulur. Envanter kayıtları; her kalemin konumu, miktarı, servis/expiry tarihi ve durumunu gösterir. Birinci Zabit, expiry takvimini ileriye dönük planlayarak limanda servis/yenileme organize eder.`,
          ],
        },
        {
          subheading: "8.2 PSC ve vetting denetimleri",
          paragraphs: [
            `PSC ve vetting denetiminde LSA/FFE en sık kontrol edilen alanlardandır: expired pyrotechnic, expired immersion suit light, çalışmayan emergency fire pump, eksik SCBA basıncı tipik bulgulardır. Birinci Zabit, kayıt-saha tutarlılığını sağlayarak detention riskini düşürür.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Emniyet ekipmanı kontrol listesi",
          bullets: [
            `Filika/davit haftalık-aylık-üç aylık test kayıtları güncel mi?`,
            `Liferaft, HRU, EPIRB, SART servis/expiry tarihleri içinde mi?`,
            `Pyrotechnics ve immersion suit light'ları expired değil mi?`,
            `Sabit CO2/foam sistem muayene ve alarm/interlock test edildi mi?`,
            `Portable extinguisher + SCBA + EEBD basınç ve expiry tamam mı?`,
            `Emergency fire pump ve fire main fonksiyon testi yapıldı mı?`,
            `Muster list güncel ve yeni personel familiarization yapıldı mı?`,
            `Aylık abandon ship + fire drill kayıtları tutuldu mu?`,
            `LSA/FFE envanteri saha durumuyla birebir uyumlu mu?`,
          ],
          paragraphs: [
            `Emniyet ekipmanı yönetiminde başarı, hiç kullanılmadan geçen bir sefer değil; gerektiğinde her kalemin eksiksiz çalışmasıdır. Birinci Zabit'in disiplinli envanteri, servis takibi ve gerçekçi drill'leri, acil durumda mürettebatın hayatta kalma şansını doğrudan belirler.`,
          ],
        },
      ],
    },
  ],
};

export default content;
