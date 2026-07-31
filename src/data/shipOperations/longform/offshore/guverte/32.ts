import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate ile manevra: joystick, DP mod geçişleri ve kontrol devri",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 32,
  estimatedPages: 20,
  intro: `DP'ye geçiş, bir düğmeye basma işlemi değil kademeli bir kontrol devridir. Bridge Mate mimarisinde joystick sistemi DP'den ayrı bir yol olarak arayüzlenebildiği için, manuel–joystick–otomatik DP zinciri hem operasyonel bir kolaylık hem de arıza anında bir yedek imkândır. Bu bölüm, bu zincirin doğru sırayla nasıl kullanıldığını ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "Marine Technologies Bridge Mate JX / DP 0 Brochure (MT-SAL-0005 v2.0)",
    "IMCA M103",
    "IMCA M117",
    "Vessel DP Operations Manual",
  ],
  chapters: [
    {
      heading: "1. Kontrol Yolları",
      lead: `Gemide birden fazla kontrol yolu vardır; hangisinin aktif olduğu her an bilinmelidir.`,
      sections: [
        {
          subheading: "1.1 Bağımsız joystick",
          paragraphs: [
            `Bridge Mate DP sistemine bağımsız bir joystick sistemi arayüzlenebilir. Bu bağımsızlık operasyonel olarak kritiktir: DP kontrol yolu kaybedildiğinde, joystick üzerinden manevra imkânı ayrı bir yol olarak korunur.`,
            `Bridge Mate JX sistemi de aynı dağıtık mimariye dayanır ve DP 0'a yükseltilebilir; çünkü itici ve sensör kablolaması ile arayüzü her iki sistemde aynıdır.`,
          ],
          table: {
            headers: ["Kontrol yolu", "Kapsam", "Kullanım"],
            rows: [
              ["Manuel / local", "Ünite bazında doğrudan", "Prove ve acil durum"],
              ["Bağımsız joystick", "Birleşik itki komutu", "Manevra ve DP yedeği"],
              ["DP — baş kontrolü", "Otomatik baş, manuel mevki", "Ara safha"],
              ["DP — tam otomatik", "Otomatik mevki ve baş", "Görev safhası"],
            ],
          },
        },
        {
          subheading: "1.2 Neden kademeli geçiş",
          paragraphs: [
            `Kademeli geçiş, her adımda geminin tepkisinin gözlenmesini ve bir sonraki adıma geçmeden önce doğrulanmasını sağlar. Doğrudan tam otomatik moda geçiş, hatalı bir itici tepkisinin ya da yanlış bir referansın ancak mevki sapması başladıktan sonra fark edilmesine yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "2. DP'ye Geçiş Sırası",
      sections: [
        {
          subheading: "2.1 İtici prove etme",
          paragraphs: [
            `Genel DP uygulamasında, DP'ye geçmeden önce her itici ve ana pervane manuel kontrolde iki yönde prove edilir. Komut, geri besleme (feedback) ve fiziksel tepki karşılaştırılır; üçünün uyumlu olduğu doğrulanmadan sistem devralınmaz.`,
          ],
          bullets: [
            `Her üniteye iki yönde komut ver ve tepkiyi gözle`,
            `Komut–feedback–fiziksel tepki üçlüsünü karşılaştır`,
            `Azimuth ünitelerinde dönüş yönünü ve açı geri beslemesini doğrula`,
            `Yasak açı (forbidden zone) ayarlarının aktif olduğunu kontrol et`,
            `Prove sonuçlarını checklist'e işle`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ters yönde itki",
              text: `İtici prove edilmeden DP'ye geçiş, ters yönde itki üreten bir üniteyi fark etmeden drive-off riskine yol açar. Sistem bu üniteyi doğru çalışıyor kabul edip komut vermeye devam eder ve sapma hızla büyür.`,
            },
          ],
        },
        {
          subheading: "2.2 Kademeli devir",
          paragraphs: [
            `İticiler prove edildikten sonra kontrol kademeli olarak devredilir. Önce joystick modunda otomatik baş kontrolü devreye alınıp gemi tepkisi gözlenir; kararlı davranış görüldükten sonra mevki kontrolü eklenir.`,
          ],
          bullets: [
            `Adım 1 — Manuel kontrolde itici prove`,
            `Adım 2 — Joystick modunda birleşik itki`,
            `Adım 3 — Otomatik baş kontrolü, mevki manuel`,
            `Adım 4 — Tam otomatik mevki tutma`,
            `Adım 5 — Model oturması için stabilizasyon süresi`,
          ],
        },
        {
          subheading: "2.3 Model oturması",
          paragraphs: [
            `Tam otomatik mevki tutmaya geçildikten sonra DP'nin matematik modelinin çevresel kuvvetleri öğrenmesi için stabilizasyon süresi tanınır. Bu süre boyunca gemi kararlı hale gelir ve sistem rüzgâr, akıntı ve dalga kuvvetlerine ilişkin tahminini oluşturur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Erken görev başlatma",
              text: `Model oturmadan görev başlatılırsa, ilk çevresel değişimde belirgin mevki sapması görülebilir. Dalgıç suda veya yük askıdayken bu sapma doğrudan can ve ekipman riski demektir.`,
            },
            {
              type: "tip",
              title: "Ne zaman hazır?",
              text: `Sapmanın watch circle içinde kalması, itici yüklerinin dengelenmesi ve çevresel kuvvet tahmininin ölçülen rüzgârla tutarlı hale gelmesi, modelin oturduğuna dair pratik göstergelerdir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Mod Geçişi Disiplini ve Kayıt",
      sections: [
        {
          subheading: "3.1 Kim, ne zaman, hangi istasyondan",
          paragraphs: [
            `Her mod geçişi; komuttaki istasyon, saat ve geçiş tipi ile birlikte DP loguna işlenir. Geçiş sırasında ikinci bir kişinin gözetim yapması, tek kişilik hata zincirini kırar.`,
          ],
          bullets: [
            `Geçiş öncesi sesli niyet beyanı ("DP'ye alıyorum")`,
            `İkinci kişi tarafından teyit`,
            `Geçiş sonrası sistem durumunun birlikte okunması`,
            `Log kaydı: saat, istasyon, mod, seçili PRS`,
          ],
        },
        {
          subheading: "3.2 Geçiş yapılmayacak anlar",
          callouts: [
            {
              type: "warning",
              title: "Kritik safhada mod değiştirme",
              text: `Dalgıç suda, yük askıda, riser bağlı veya hat gerilimi altındayken mod geçişi yapılmamalıdır. Geçiş anındaki kısa kararsızlık, bu safhalarda tolere edilemez.`,
            },
          ],
          bullets: [
            `Dalgıç veya ROV sualtındayken`,
            `Yük askıda veya vinç yük altındayken`,
            `Hat/tel gerilimi aktifken`,
            `Ağır squall veya ani çevresel değişim sırasında`,
            `Açık bir DP alarmı çözülmeden önce`,
          ],
        },
        {
          subheading: "3.3 Geri dönüş planı",
          paragraphs: [
            `Her geçişin bir geri dönüş yolu olmalıdır. DP'de beklenmeyen davranış görülürse joystick veya manuel kontrole dönüş, önceden düşünülmüş ve tatbik edilmiş bir hareket olmalıdır. Bağımsız joystick yolunun düzenli test edilmesi bu nedenle operasyonel bir gerekliliktir.`,
          ],
          bullets: [
            `Joystick yolu son ne zaman test edildi?`,
            `Manuel kontrole dönüş adımları ekipçe biliniyor mu?`,
            `Geri dönüş sonrası kaçış hattı açık mı?`,
            `Terminate time hâlâ karşılanabiliyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
