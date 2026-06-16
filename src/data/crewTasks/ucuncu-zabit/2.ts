import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Haftalık ve aylık testlerin yürütülmesi",
  roleSlug: "ucuncu-zabit",
  taskIndex: 2,
  estimatedPages: 24,
  intro: `Üçüncü Zabit / Safety Officer, SOLAS III/20 ve gemi üzeri bakım rehberlerinin (MSC.402(96), üretici talimatları) öngördüğü haftalık ve aylık emniyet testlerinin planlanması, yürütülmesi ve kayıt altına alınmasından sorumludur. Bu rutin; haftalık lifeboat inspection ve engine run, general alarm testi, emergency lighting kontrolü, seçili fire station testleri ile aylık extinguisher/SCBA/EEBD kontrolleri ve expiry list güncellemesini kapsar. Disiplinli bir test takvimi, hem ekipmanı her an hazır tutar hem de denetimde kesintisiz bir kayıt zinciri sunar.`,
  sources: [
    "SOLAS III/20 — Operational readiness, maintenance and inspections",
    "IMO Res. MSC.402(96) — Maintenance, examination, testing of LSA",
    "SOLAS II-2/14 — Operational readiness & maintenance of fire systems",
    "MSC.1/Circ.1206/Rev.1 — Lifeboat accident prevention",
    "MSC.1/Circ.1432 — Maintenance & inspection of fire protection systems",
    "GMDSS / SOLAS IV — radyo ekipmanı test gereklilikleri",
    "Company SMS / PMS — haftalık & aylık test takvimi",
  ],
  chapters: [
    {
      heading: "1. Test Takviminin Kurulması",
      lead: `Haftalık ve aylık testlerin değeri, düzeninden gelir; rastgele yapılan testler ne ekipmanı hazır tutar ne de denetimde kabul görür.`,
      sections: [
        {
          subheading: "1.1 Test matrisi ve sorumluluk",
          paragraphs: [
            `Safety Officer, geminin SMS'i ve SOLAS gerekliliklerine göre bir test matrisi kurar: hangi ekipman, hangi periyotta, kim tarafından, hangi kayda. Haftalık testler genelde belirli bir günde (örn. her Pazartesi) toplu yapılır; aylık testler ay sonu öncesi tamamlanır. Matris, kaptan tarafından onaylanır ve köprüüstünde izlenir.`,
            `Her test bir PMS job'ına bağlanır; yapıldığında tarih, sonuç ve sorumlu girilerek kapatılır. Atlanmış veya geciken bir test, sistemde "overdue" olarak görünür ve Safety Officer'ın takip listesine düşer.`,
          ],
          table: {
            caption: `Haftalık & Aylık Test Matrisi (Tipik)`,
            headers: ["Test", "Periyot", "Referans"],
            rows: [
              ["Lifeboat görsel + motor run", "Haftalık", "SOLAS III/20.6"],
              ["General alarm + PA testi", "Haftalık", "SOLAS III/20"],
              ["Emergency lighting kontrolü", "Haftalık", "SOLAS II-1"],
              ["Seçili fire station/hydrant", "Haftalık", "SMS"],
              ["Extinguisher görsel + basınç", "Aylık", "FSS / Res. A.951"],
              ["SCBA/EEBD kontrolü", "Aylık", "SOLAS II-2"],
              ["Liferaft/davit detaylı inspection", "Aylık", "MSC.402(96)"],
              ["Expiry list güncelleme", "Aylık", "SMS"],
            ],
          },
        },
        {
          subheading: "1.2 Kayıt ve raporlama",
          paragraphs: [
            `Test sonuçları logbook ve PMS'e işlenir; ayrıca anormal bulgular defect report olarak ayrı açılır. Safety Officer, ay sonunda bir özet rapor hazırlar (yapılan testler, bulunan defect'ler, açık aksiyonlar) ve kaptana sunar. Bu rapor, SMS internal audit ve PSC için kanıt niteliğindedir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/20.7 — Records",
              text: `Inspection ve bakım kayıtları gemide tutulmalı; haftalık/aylık kontrol sonuçları ve LSA bakım tarihleri logbook'a kaydedilmelidir. Kayıt eksikliği bağımsız bir deficiency'dir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Haftalık Lifeboat Inspection ve Engine Run",
      sections: [
        {
          subheading: "2.1 Görsel kontrol",
          paragraphs: [
            `Haftalık lifeboat ve launching appliance görsel kontrolünde; filika ve davit'in gözle muayenesi, halatların (falls) durumu, release gear ve hook bağlantısının yerinde olması, embarkation ladder ve brake'in görsel durumu denetlenir. Eksiklik fark edilirse anında kayda alınır ve gerekirse defect açılır.`,
            `Free-fall filikalarda haftalık kontrol, simulated launch ekipmanının ve serbest düşüş sisteminin görsel durumunu içerir; gerçek serbest düşüş testi periyodu farklıdır. Davit-launched salda davit ve release sistemi de kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Personel filikadayken test yok",
              text: `Haftalık motor run ve davit kontrolü sırasında, on-load release gear'ın yanlışlıkla açılmasını önlemek için maintenance pin takılı olmalı ve mümkünse filikada personel bulunmamalıdır (MSC.1/Circ.1206/Rev.1).`,
            },
          ],
        },
        {
          subheading: "2.2 Motor çalıştırma",
          paragraphs: [
            `Filika motoru haftalık olarak çalıştırılır; su soğutmalı motorlar denizden veya yardımcı su kaynağından soğutulmadan uzun süre çalıştırılmaz (hava soğutmalı değilse en az 3 dakika, soğutmalı ise üretici limitinde). Çalışma sırasında yağ basıncı, şarj, egzoz rengi ve kolay start gözlenir; battery şarj durumu doğrulanır.`,
            `Motorun ileri/geri kavramaları (eğer güvenli ise davit'te değil, denize indirildiğinde) ayrı test edilir. Çalıştırma süresi, gözlem ve battery durumu logbook'a yazılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. General Alarm, PA ve Acil Aydınlatma",
      sections: [
        {
          subheading: "3.1 General alarm ve public address",
          paragraphs: [
            `Haftalık general alarm testi, tüm gemide alarm sesinin duyulduğunu ve yedek güç kaynağından (battery) çalıştığını doğrular. Mürettebata önceden duyurulur ki gerçek acil sanılmasın. PA (public address) sistemi her güverte ve mahalde anlaşılır şekilde çalışmalıdır; ölü noktalar tespit edilirse defect açılır.`,
            `Safety Officer, alarm testini emergency switchboard üzerinden de doğrular; ana güç kesildiğinde alarmın battery'den beslendiği kontrol edilir. Test, tarih ve sonuç ile kaydedilir.`,
          ],
        },
        {
          subheading: "3.2 Emergency lighting ve escape route işaretleri",
          paragraphs: [
            `Acil aydınlatma, ana güç kaybında belirli süre (genelde 3-36 saat, mahalle göre) çalışmalıdır. Haftalık kontrolde emergency lighting devreye alınarak escape route, muster station, embarkation deck ve makine kaçış yollarının yeterli aydınlatıldığı doğrulanır. Photoluminescent (low-location lighting) şeritlerin şarjı ve görünürlüğü kontrol edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Karanlık testi",
              text: `Emergency lighting ve low-location lighting'in gerçek değeri ancak karanlıkta görülür. Periyodik olarak ana ışıklar kapatılıp kaçış yollarının fiilen görünür olduğunu kontrol etmek, kâğıt üstü testten çok daha güvenilirdir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Haftalık Fire Station ve Hydrant Testleri",
      sections: [
        {
          subheading: "4.1 Seçili istasyon rotasyonu",
          paragraphs: [
            `Tüm yangın istasyonlarını her hafta test etmek pratik değildir; Safety Officer bir rotasyon kurar ve her hafta farklı bir grup hydrant/hortum/nozzle test eder, böylece ay içinde tüm istasyonlar kapsanır. Test edilen istasyonun hortumu basınçlandırılır, nozzle jet/spray fonksiyonu denenir.`,
            `Emergency fire pump da haftalık/aylık çalıştırılarak ana pompadan bağımsız çalışabildiği doğrulanır. Test basıncı, debi gözlemi ve istasyon numaraları kayda geçer.`,
          ],
          table: {
            caption: `Fire Station Haftalık Rotasyon Örneği`,
            headers: ["Hafta", "Test Edilen Bölge", "Kapsam"],
            rows: [
              ["1. hafta", "Forward deck istasyonları", "Hydrant + hortum + nozzle"],
              ["2. hafta", "Akomodasyon istasyonları", "Hydrant + emergency fire pump"],
              ["3. hafta", "Makine dairesi istasyonları", "Hydrant + spray nozzle"],
              ["4. hafta", "Aft deck + shore connection", "Hydrant + int. shore connection"],
            ],
          },
        },
        {
          subheading: "4.2 Bulguların işlenmesi",
          paragraphs: [
            `Test sırasında çıkan her kusur (sızdıran gland, çatlak coupling, tıkalı nozzle) anında defect report'a dönüştürülür; gerekirse istasyon "out of service" işaretlenir ve telafi tedbiri belirlenir. Onarım sonrası tekrar test edilip kayıt güncellenir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Aylık Extinguisher, SCBA ve EEBD Kontrolleri",
      sections: [
        {
          subheading: "5.1 Aylık extinguisher kontrolü",
          paragraphs: [
            `Aylık olarak tüm portatif tüpler görsel kontrol edilir: basınç göstergesi yeşil bantta mı, safety pin ve tamper seal yerinde mi, gövde korozyonsuz mu, bracket sağlam mı, doğru istasyonda mı. CO2 ve dry powder tüplerinin yıllık tartım tarihleri ayrıca izlenir.`,
            `Eksik veya geçersiz tüp anında yedekle değiştirilir; boşalan tüp refill'e gönderilir. Tüm kontroller checklist ve PMS ile kayda geçer.`,
          ],
        },
        {
          subheading: "5.2 SCBA, EEBD ve fireman's outfit aylık kontrolü",
          paragraphs: [
            `Aylık olarak SCBA tüp basıncı, low-pressure whistle, maske sızdırmazlığı; EEBD mührü, basınç göstergesi ve expiry; fireman's outfit'in tamlığı ve safety lamp battery'si kontrol edilir. Bulunan eksiklikler defect'e dönüşür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: aylık kontrolde kaçırılan whistle",
              text: `Bir gemide aylık SCBA kontrolü yüzeysel yapıldığı için low-pressure whistle arızası fark edilmedi; sonraki PSC'de denetçi cihazı test edip whistle'ın çalışmadığını gördü. Bulgu, hem ekipman hem de "kontrol disiplini" eleştirisine yol açtı. Ders: aylık kontrol görsel değil fonksiyonel olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Expiry List ve Inventory Güncellemesi",
      sections: [
        {
          subheading: "6.1 Aylık expiry takibi",
          paragraphs: [
            `Safety Officer, aylık olarak tüm tarihli kalemleri (pyrotechnics, EPIRB/SART battery, HRU, liferaft servis, immersion suit seam test, SCBA hydro-test, lifejacket light) tek bir expiry tablosunda günceller. Yaklaşan tarihler için (örn. 3 ay önceden) ikmal/servis talebi açılır, böylece hiçbir kalem aniden geçersiz hale gelmez.`,
            `Inventory güncellemesi; kullanılan, boşalan veya değiştirilen kalemlerin sayısını günceller ve eksikleri ikmal listesine ekler. Bu liste, port call ve servis planlamasının temelini oluşturur.`,
          ],
        },
      ],
    },
    {
      heading: "7. GMDSS ve Radyo Ekipmanı Testleri",
      sections: [
        {
          subheading: "7.1 Haftalık/aylık radyo testleri",
          paragraphs: [
            `GMDSS kapsamında EPIRB self-test (haftalık), SART self-test (haftalık), batarya ve şarj kontrolü, DSC test call ve radyo battery reserve testleri yapılır. Safety Officer bu testleri (gemi organizasyonuna göre) radyo zabitiyle koordine eder veya yürütür ve radio log'a işler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "SOLAS IV — GMDSS",
              text: `GMDSS ekipmanı için günlük, haftalık ve aylık testler radio log defterine kaydedilir; EPIRB yıllık onboard/shore-based test gerektirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 Test rutini kontrol listesi",
          bullets: [
            `Haftalık lifeboat görsel + motor run yapıldı ve kaydedildi mi?`,
            `General alarm + PA + emergency lighting haftalık test edildi mi?`,
            `Seçili fire station/hydrant rotasyonu uygulandı mı?`,
            `Aylık extinguisher görsel + basınç kontrolü tamam mı?`,
            `Aylık SCBA/EEBD/fireman's outfit fonksiyon kontrolü yapıldı mı?`,
            `Liferaft/davit aylık detaylı inspection kaydedildi mi?`,
            `Expiry list ve inventory güncellendi, yaklaşan tarihler için talep açıldı mı?`,
            `GMDSS/EPIRB/SART self-test ve radio log girişleri tamam mı?`,
            `Çıkan tüm bulgular defect report'a dönüştürüldü mü?`,
          ],
          paragraphs: [
            `Haftalık ve aylık testler, emniyet sisteminin "nabzıdır": düzenli yapıldığında ekipman her an hazır, kayıtlar kesintisiz ve denetim sorunsuz olur. Safety Officer'ın disiplinli test takvimi, gerçek bir acilde "çalışmadı" sürprizini ortadan kaldıran en güçlü güvencedir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
