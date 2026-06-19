import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acil durumda teknik müdahale",
  roleSlug: "bas-muhendis",
  taskIndex: 9,
  estimatedPages: 27,
  intro: `Baş Mühendis (Chief Engineer), makine dairesi kaynaklı acil durumlarda gemi emniyetinin teknik karar mercii ve müdahale koordinatörüdür. Black-out recovery, ana makine arızası, emergency steering, engine room fire ve flooding gibi senaryolarda hızlı, doğru ve soğukkanlı karar alır; makine ekibini drill ve gerçek müdahalede yönetir. Bu bölüm; başlıca acil senaryoları, müdahale prosedürlerini, karar matrisini, drill disiplinini ve köprü ile koordinasyonu detaylı ele alır.`,
  sources: [
    "SOLAS Bölüm II-1 (Machinery) ve II-2 (Fire protection)",
    "IACS UR M — Emergency source of power, dead ship condition",
    "STCW Bölüm A-III/2 — Emergency response yeterlilikleri",
    "ISM Code — Eleman 8: Emergency Preparedness",
    "IMO MSC kılavuzları — Steering gear ve emergency procedures",
    "FSS Code / LSA Code — Sabit söndürme ve can kurtarma",
    "Company SMS — Emergency response prosedürleri ve muster list",
  ],
  chapters: [
    {
      heading: "1. Acil Durum Hazırlığının Temelleri",
      lead: `Acil durumda başarı, o an değil; önceden yapılan hazırlık, eğitim ve disiplinle belirlenir. Baş Mühendis bu hazırlığı sistematik kurar.`,
      sections: [
        {
          subheading: "1.1 Emergency preparedness ve ISM",
          paragraphs: [
            `ISM Code Eleman 8, gemilerin olası acil durumları tanımlamasını, müdahale prosedürleri oluşturmasını ve düzenli tatbikat yapmasını zorunlu kılar. Baş Mühendis, makine kaynaklı senaryolar için bu prosedürlerin güncel, gerçekçi ve ekip tarafından bilinir olmasını sağlar.`,
            `Acil durum prosedürleri muster list ile entegredir; her ekip üyesinin acil durumdaki görevi (örn. fire team, engine team) net tanımlıdır. Prosedürler periyodik gözden geçirilir ve drill bulgularıyla güncellenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Eleman 8 — Emergency Preparedness",
              text: `Şirket, gemiyi etkileyebilecek acil durumları tanımlamalı, müdahale planı oluşturmalı ve bu planları periyodik tatbikatla test etmelidir. Makine acil durumları bu kapsamın kritik parçasıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Karar verme ve durumsal farkındalık",
          paragraphs: [
            `Acil anda Baş Mühendis hızlı durum değerlendirmesi yapar: ne oldu, ne risk altında (insan/gemi/çevre), hangi kaynaklar mevcut. Panik yerine, eğitimle içselleştirilmiş prosedürler uygulanır.`,
            `Köprü ile sürekli iletişim kritiktir; Kaptan'ın seyir kararı (durma, demir, kıyıdan uzaklaşma) ile Baş Mühendis'in teknik müdahalesi senkronize olmalıdır. Bilgi akışı tek yönlü değil, çift yönlüdür.`,
          ],
        },
      ],
    },
    {
      heading: "2. Black-out ve Dead Ship Recovery",
      sections: [
        {
          subheading: "2.1 Black-out anatomisi ve emergency generator",
          paragraphs: [
            `Black-out, tüm ana jeneratörlerin elektrik kaybıdır; ana makine, dümen, soğutma ve aydınlatma durur. SOLAS gereği emergency generator otomatik devreye girer ve 45 saniye içinde temel servisleri (acil aydınlatma, haberleşme, emergency steering, navigation) besler.`,
            `Baş Mühendis için ilk adımlar: emergency generator'ın devrede olduğunu teyit, ana jeneratör start sebebini belirleme (yakıt, kontaminasyon, soğutma, governor, breaker trip), preferential trip durumunu kontrol ve ana baranın yeniden enerjilendirilmesidir.`,
          ],
          bullets: [
            "Emergency generator devrede mi, temel servisler besleniyor mu?",
            "Jeneratör trip sebebi (overload, fuel, cooling, governor)?",
            "Ana generator start ve breaker close sırası",
            "Preferential / sequential restart (heavy consumers kademeli)",
            "Ana makine restart ön koşulları (starting air, control power)",
          ],
        },
        {
          subheading: "2.2 Dead ship recovery",
          paragraphs: [
            `Dead ship; hiçbir güç olmadan, depolanmış enerjiyle (starting air, emergency battery) geminin yeniden çalıştırılabilmesidir. IACS UR M, dead ship condition'dan dış yardım olmadan recovery kabiliyetini zorunlu kılar. Emergency air compressor (genelde bağımsız tahrikli) bu yeteneğin anahtarıdır.`,
            `Recovery sırası: emergency generator → emergency air compressor ile ana hava tankı dolumu → ilk jeneratör start → ana baranın enerjilendirilmesi → soğutma/yağlama pompaları → ana makine restart. Baş Mühendis bu sırayı ekibiyle ezbere bilmelidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Drill, gerçek black-out'ta hayat kurtardı",
              text: `Kıyıya yakın seyirde black-out yaşayan bir gemide, düzenli dead-ship drill yapan ekip emergency generator'ı teyit edip jeneratörü hızla devreye aldı ve ana makineyi karaya sürüklenmeden restart etti. Tatbikat disiplini, olası bir karaya oturmayı önledi.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Ana Makine Arızası",
      sections: [
        {
          subheading: "3.1 Seyirde ani güç kaybı / stop",
          paragraphs: [
            `Seyir sırasında ana makinenin durması (engine stop/trip) ciddi bir acil durumdur; özellikle dar suyolu, trafik veya kötü havada kritiktir. Baş Mühendis derhal köprüyü bilgilendirir, trip sebebini (overspeed, low LO pressure, jacket water high temp, scavenge fire) belirler.`,
            `Slow-down ve shut-down sistemleri (auto slowdown) gemiyi korumak için devreye girer. Baş Mühendis, otomatik korumanın gerçek bir tehlikeye mi yoksa sensör arızasına mı dayandığını ayırt eder; gerekirse override prosedürünü kontrollü uygular.`,
          ],
          table: {
            caption: `Ana makine trip nedenleri ve ilk aksiyon`,
            headers: ["Trip nedeni", "Olası kök neden", "İlk aksiyon"],
            rows: [
              ["Low LO pressure", "Pompa trip, kaçak, filtre tıkalı", "Stby pompa, kaçak kontrol"],
              ["Jacket water high temp", "Cooling pompa/cooler arıza", "Cooling kontrol, kademeli soğutma"],
              ["Overspeed", "Load shedding, governor", "Sebep, restart koşulları"],
              ["Scavenge fire", "Over-lub, blow-by, kaçak", "Yük sıfır, drain, soğutma"],
              ["Oil mist high", "Bearing overheating", "Stop, crankcase soğuma"],
            ],
          },
        },
        {
          subheading: "3.2 Kademeli müdahale ve restart kararı",
          paragraphs: [
            `Baş Mühendis, arızanın türüne göre restart edilebilir mi yoksa onarım mı gerektiğini değerlendirir. Crankcase explosion riski veya bearing damage şüphesinde kontrolsüz restart felaketle sonuçlanabilir; bu durumda gemi durdurulur, demir/tug değerlendirilir.`,
            `Tek silindiri devre dışı bırakarak (cut-out) sınırlı güçle seyir (limp home) bazı durumlarda mümkündür. Bu karar, manuel ve sınıf kılavuzlarına göre, köprüyle koordineli alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Crankcase açma yasağı",
              text: `Oil mist alarmı veya bearing overheating sonrası crankcase kapakları 15-30 dakika soğuma sağlanmadan AÇILMAMALIDIR; aniden giren oksijen, kızgın yağ buharını tutuşturarak crankcase explosion'a yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Emergency Steering",
      sections: [
        {
          subheading: "4.1 Steering gear failure ve changeover",
          paragraphs: [
            `Dümen sistemi arızası, gemiyi manevra kabiliyetinden eder ve çarpışma/karaya oturma riski yaratır. SOLAS, ana ve yardımcı steering gear ile remote/local kontrol gerektirir. Arıza anında köprüden makine dairesine emergency steering komutu gelir.`,
            `Baş Mühendis/makine ekibi, steering gear room'da yedek pompaya geçiş (changeover), local control'e alma ve helm order'larını telefon/talker ile uygulama prosedürünü uygular. Bu changeover periyodik drill ile prova edilir (SOLAS gereği liman çıkışı öncesi test).`,
          ],
        },
        {
          subheading: "4.2 Steering gear drill ve test",
          paragraphs: [
            `SOLAS, limandan ayrılmadan 12 saat içinde steering gear testini ve 3 ayda bir emergency steering drill'ini zorunlu kılar. Baş Mühendis bu testlerin yapıldığını ve kayıt altına alındığını güvence altına alır.`,
            `Drill'de helm order iletişimi, pompa changeover süresi ve rudder response ölçülür. Gerçek arızada bu pratik, kaybı önler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/26 — Steering gear testleri",
              text: `Limandan kalkıştan önce steering gear test edilmeli; 3 ayda bir emergency steering drill yapılmalıdır. Bu testler ve drill'ler resmî kayıt altına alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Engine Room Fire",
      sections: [
        {
          subheading: "5.1 Yangın algılama ve ilk müdahale",
          paragraphs: [
            `Makine dairesi yangınları genellikle yüksek basınçlı yakıt/yağ sızıntısının kızgın yüzeye (egzoz, T/C, manifold) teması ile başlar. Erken algılama (fire detection, flame detector) ve hızlı müdahale (taşınabilir söndürücü, fire team) kritiktir.`,
            `Baş Mühendis, yangının boyutuna göre lokal müdahaleyi yönetir veya makine dairesi tahliyesi ve sabit söndürme sistemi kararına geçer. Yakıt quick-closing valve'leri ve pompa stopları, yangını yakıttan keser.`,
          ],
          bullets: [
            "Fire team ve taşınabilir söndürücü ile lokal müdahale",
            "Yakıt quick-closing valve ve transfer pompa stop",
            "Ventilation fan stop ve damper kapatma",
            "Skylight / funnel damper kapatma (oksijen kesme)",
            "Personel sayımı ve makine dairesi tahliyesi",
          ],
        },
        {
          subheading: "5.2 Sabit söndürme sistemi (CO2 / water mist)",
          paragraphs: [
            `Lokal müdahale yetersizse, makine dairesi tamamen boşaltılır, tüm açıklıklar kapatılır ve sabit söndürme sistemi devreye alınır. CO2 toplam su basma sisteminde, personel sayımı eksiksiz teyit edilmeden gaz salınmaz — boğulma ölümcül risktir.`,
            `Water mist / high-pressure water fog sistemleri, lokal makine yangınlarında (boiler front, purifier, ME) CO2'ye göre daha esnek ve personel için güvenlidir. Baş Mühendis hangi sistemin hangi senaryoda kullanılacağını bilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "CO2 salımı öncesi personel sayımı",
              text: `CO2 toplam basma sistemi salınmadan ÖNCE, makine dairesindeki tüm personelin tahliye edildiği kesin teyit edilmelidir. Mahsur kalan personel için CO2 ortamı ölümcüldür. Sayım, alarm ve uyarı sirenleri prosedürü harfiyen uygulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Flooding (Su Alma) ve Bilge Yönetimi",
      sections: [
        {
          subheading: "6.1 Sea water ingress ve kaynak tespiti",
          paragraphs: [
            `Makine dairesinde su yükselmesi; sea chest/sea valve kaçağı, cooler tube rupture, shell plating hasarı veya boru patlaması kaynaklı olabilir. Bilge high-level alarm erken uyarı verir; Baş Mühendis kaynağı hızla bulup izole eder.`,
            `Sea water tarafı kaçaklarda ilgili sea valve kapatılır, etkilenen sistem bypass edilir. Su girişi pompaların kapasitesini aşarsa, emergency bilge suction (genelde ana sirkülasyon pompasına bağlı, büyük çaplı) devreye alınır.`,
          ],
        },
        {
          subheading: "6.2 Emergency bilge ve stabilite etkisi",
          paragraphs: [
            `Emergency bilge suction valve, en büyük kapasiteli pompayı doğrudan makine dairesi bilgesine bağlayarak hızlı su tahliyesi sağlar. Baş Mühendis bu valfin yerini ve çalışmasını ekibine öğretir; periyodik test eder.`,
            `Su alma, geminin stabilitesini ve trim'ini etkiler; Baş Mühendis durumu köprüye anında bildirir. Kontrol altına alınamayan flooding'de gemi terk dahil kararlar Kaptan ile alınır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Emergency bilge suction bilinirliği",
              text: `Emergency bilge suction valve sıklıkla en kritik anda aranır; konumu, açma yönü ve bağlı olduğu pompa tüm makine ekibince ezbere bilinmeli ve drill'lerde fiziksel olarak gösterilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Drill, Eğitim ve Köprü Koordinasyonu",
      sections: [
        {
          subheading: "7.1 Düzenli tatbikat programı",
          paragraphs: [
            `Baş Mühendis; black-out, engine room fire, flooding, emergency steering ve enclosed space rescue drill'lerini planlar ve yürütür. Drill'ler gerçekçi senaryolarla yapılır, kronometre tutulur ve debrief ile eksikler belirlenir.`,
            `Rutin "kâğıt doldurma" tatbikatı tehlikelidir; gerçek acil durumda işe yaramaz. Her drill, ekibin gerçekten ne yapacağını prova etmeli ve zayıf noktaları ortaya çıkarmalıdır.`,
          ],
        },
        {
          subheading: "7.2 Köprü-makine koordinasyonu",
          paragraphs: [
            `Acil durumda köprü (seyir kararı) ile makine (teknik müdahale) sıkı koordine olmalıdır. Baş Mühendis, durumu (kalan güç, tahmini restart süresi, manevra kabiliyeti) net olarak Kaptan'a iletir; Kaptan da seyir riskini (demir, tug, kıyı mesafesi) makineye aktarır.`,
            `Ortak bir terminoloji ve iletişim disiplini, kritik anda yanlış anlaşılmayı önler. Telsiz/telefon iletişimi closed-loop (tekrar-onayla) yöntemiyle yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Belgeleme ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Olay kaydı ve sonrası değerlendirme",
          paragraphs: [
            `Her acil durum ve drill, log book ve incident report'a kaydedilir: ne oldu, hangi aksiyon alındı, sonuç ne oldu, hangi ders çıkarıldı. Bu kayıtlar; sınıf, sigorta ve şirket soruşturmalarında ve gelecekteki eğitimde kullanılır.`,
            `Olay sonrası kök neden analizi ve düzeltici aksiyon, aynı acil durumun tekrarını önler. Açık ve dürüst raporlama, öğrenen bir organizasyonun temelidir.`,
          ],
        },
        {
          subheading: "8.2 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, acil durum teknik müdahale hazırlığını özetler.`,
          ],
          bullets: [
            "Emergency generator haftalık test edildi ve auto-start çalışıyor mu?",
            "Emergency air compressor ve dead ship recovery kabiliyeti test edildi mi?",
            "Steering gear testi (kalkış öncesi) ve emergency drill (3 ayda bir) yapıldı mı?",
            "Fixed fire suppression (CO2/water mist) ve quick-closing valve test edildi mi?",
            "Emergency bilge suction valve konumu ekipçe biliniyor ve test edildi mi?",
            "Fire/flooding/black-out drill'leri gerçekçi yapıldı ve debrief edildi mi?",
            "Muster list ve makine ekibi acil görevleri güncel mi?",
            "Köprü-makine acil iletişim prosedürü prova edildi mi?",
            "EEBD/SCBA ve escape route'lar kontrol edildi mi?",
            "Tüm olaylar/drill'ler kayıt altına alındı ve değerlendirildi mi?",
          ],
        },
        {
          subheading: "8.3 Sonuç",
          paragraphs: [
            `Acil durumda teknik müdahale, Baş Mühendis'in en yüksek sorumluluk anıdır. Başarı; teknik bilgi, soğukkanlı karar, prova edilmiş prosedür ve güçlü köprü koordinasyonunun bileşkesidir. En iyi müdahale, iyi yapılmış bir hazırlığın ve sürekli tatbikatın doğal sonucudur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
