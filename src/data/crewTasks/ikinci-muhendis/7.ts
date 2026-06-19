import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine personeli eğitimi",
  roleSlug: "ikinci-muhendis",
  taskIndex: 7,
  estimatedPages: 23,
  intro: `Makine dairesi, yüksek sıcaklık, basınç, dönen ekipman ve elektrik tehlikeleriyle dolu bir ortamdır; burada güvenlik, ekibin yetkinliğine ve eğitimine doğrudan bağlıdır. İkinci Mühendis, makine dairesi ekibinin operasyonel başı olarak yeni gelen mühendis ve tayfaların familiarization'ını, emniyet prosedürleri eğitimini ve vendor-specific ekipman eğitimlerini koordine eder. Blackout recovery, engine room fire ve flooding gibi acil durum tatbikatlarına katılır ve eğitir. Bu bölüm makine personeli eğitimini ele alır.`,
  sources: [
    "STCW — engine department yetkinlikleri ve eğitim",
    "ISM Code — familiarization ve eğitim",
    "SOLAS — emergency procedures ve drills",
    "Üretici (vendor) ekipman eğitim el kitapları",
    "Şirket SMS — engine room familiarization checklist",
  ],
  chapters: [
    {
      heading: "1. Eğitimin Önemi",
      sections: [
        {
          subheading: "1.1 Yetkinlik = güvenlik",
          paragraphs: [
            `Makine dairesinde güvenlik, ekibin ekipmanı ve riskleri bilmesine bağlıdır. İkinci Mühendis, eğitimi bir formalite değil, kaza önlemenin ve operasyonel sürekliliğin temeli olarak görür. İyi eğitilmiş bir ekip, hem rutinde hem acil durumda doğru hareket eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Eğitim yatırımdır",
              text: `Eğitime ayrılan zaman, ileride önlenen arıza ve kazalarla fazlasıyla geri döner. İyi eğitilmiş bir tayfa, makine dairesinin en değerli güvencesidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Familiarization",
      sections: [
        {
          subheading: "2.1 Yeni personel tanıtımı",
          paragraphs: [
            `Yeni gelen mühendis/tayfa; makine dairesi düzeni, acil çıkışlar, emniyet ekipmanı yerleri (EEBD, yangın söndürücü, emergency stops), alarm sinyalleri ve temel prosedürler konusunda ilk gün bilgilendirilir. İkinci Mühendis bu familiarization'ı yapar ve checklist'i tamamlar.`,
          ],
          bullets: [
            `Makine dairesi düzeni ve acil çıkışlar`,
            `Emergency stops ve quick-closing valves yerleri`,
            `EEBD/yangın söndürücü konumları`,
            `Alarm sinyalleri ve muster`,
          ],
        },
      ],
    },
    {
      heading: "3. Emniyet Prosedürleri Eğitimi",
      sections: [
        {
          subheading: "3.1 LOTO, PTW, enclosed space",
          paragraphs: [
            `İkinci Mühendis; LOTO (enerji izolasyonu), Permit to Work, enclosed space entry ve hot work prosedürlerini ekibe öğretir. Bu yüksek riskli işlerin neden katı kurallara tabi olduğunu örneklerle anlatır. Prosedürü "neden" uyguladığını bilen bir ekip, onu ciddiye alır.`,
          ],
          table: {
            caption: "Eğitilen emniyet prosedürleri",
            headers: ["Prosedür", "Risk"],
            rows: [
              ["LOTO", "Beklenmedik enerjilenme"],
              ["Enclosed space", "Boğulma/zehirlenme"],
              ["Hot work", "Yangın/patlama"],
              ["Elektrik/HV", "Çarpma/arc flash"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Vendor-Specific Eğitim",
      sections: [
        {
          subheading: "4.1 Ekipmana özgü eğitim",
          paragraphs: [
            `Bazı ekipmanlar (otomasyon, purifier, özel pompalar, BWMS) üretici-özgü bilgi ister. İkinci Mühendis, vendor el kitaplarına ve eğitimlerine erişimi koordine eder; ekibin ekipmanı doğru kullanmasını ve yanlış müdahaleyle hasar vermemesini sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "5. Acil Durum Tatbikatları",
      sections: [
        {
          subheading: "5.1 Blackout, fire, flooding",
          paragraphs: [
            `İkinci Mühendis; blackout recovery (kara/elektrik kaybından toparlanma), engine room fire ve flooding tatbikatlarına katılır ve ekibi eğitir. Bu senaryolar gerçekçi tatbik edildiğinde, gerçek bir olayda ekip ne yapacağını düşünmeden uygular. Quick-closing valves, emergency stops ve fixed extinguishing sistem kullanımı tatbik edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Blackout recovery",
              text: `Bir blackout'ta emergency generatör, essential servislerin sırayla devreye alınması ve ana makine restartı tatbik edilmiş bir refleks olmalıdır. Gerçek bir blackout, eğitimin sınandığı andır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Eğitim koordinasyon kontrolü",
          bullets: [
            `Yeni personel familiarization (çıkış/emniyet/alarm) yapıldı mı?`,
            `LOTO/PTW/enclosed space/hot work prosedürleri eğitildi mi?`,
            `Vendor-specific ekipman eğitimi koordine edildi mi?`,
            `Blackout/fire/flooding tatbikatları yapıldı mı?`,
            `Emergency stops/quick-closing valves kullanımı tatbik edildi mi?`,
            `Eğitim kayıtları tutuluyor mu?`,
          ],
          paragraphs: [
            `Makine personeli eğitimi, İkinci Mühendisin ekibine ve geminin güvenliğine yaptığı en değerli yatırımdır. Doğru familiarization, sağlam emniyet eğitimi ve gerçekçi acil durum tatbikatları; makine dairesini hem rutinde verimli hem krizde dirençli kılar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
