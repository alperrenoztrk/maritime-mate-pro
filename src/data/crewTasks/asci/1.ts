import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Gıda güvenliği ve hijyen yönetimi",
  roleSlug: "asci",
  taskIndex: 1,
  estimatedPages: 26,
  intro: `Gemi Aşçısı, gemideki gıda güvenliği ve hijyen yönetiminin saha sorumlusudur. Bu sorumluluk; HACCP (Hazard Analysis and Critical Control Points) prensiplerine uygun gıda işleme, soğuk zincir kontrolü, doğru pişirme sıcaklıkları, çapraz bulaşma önleme, temizlik/dezenfeksiyon ve kişisel hijyeni kapsar. Kapalı bir toplulukta tek bir gıda kaynaklı salgın (örn. Salmonella, Norovirus) tüm mürettebatı saf dışı bırakabilir; bu nedenle gıda güvenliği, geminin operasyonel emniyetinin bir parçasıdır. Bu bölüm, aşçının HACCP temelli güvenli gıda üretimini adım adım açıklar.`,
  sources: [
    "Codex Alimentarius — HACCP System & General Principles of Food Hygiene (CXC 1-1969)",
    "WHO — Five Keys to Safer Food",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "MLC 2006 — Standard A3.2 (Food and Catering)",
    "WHO — Foodborne Disease Outbreaks: Guidelines for Investigation",
    "FAO/WHO — Food Safety Risk Analysis",
    "Ship Sanitation Inspection — IHR (2005) requirements",
  ],
  chapters: [
    {
      heading: "1. HACCP Prensiplerinin Gemi Mutfağına Uygulanması",
      sections: [
        {
          subheading: "1.1 Yedi HACCP prensibi ve gemi karşılığı",
          paragraphs: [
            `HACCP, gıdadaki tehlikeleri (biyolojik, kimyasal, fiziksel) sistematik olarak belirleyip kritik kontrol noktalarında (CCP) yöneten bir önleme yaklaşımıdır. Yedi prensip; tehlike analizi, CCP belirleme, kritik limit koyma, izleme, düzeltici faaliyet, doğrulama ve kayıt tutma şeklindedir. Gemi mutfağında bu, akışın her aşamasını (teslim alma → depolama → hazırlık → pişirme → soğutma → servis) kontrol altına alır.`,
            `Gemi mutfağında başlıca CCP'ler; soğuk zincir (depolama sıcaklığı), pişirme iç sıcaklığı, sıcak/soğuk tutma ve yeniden ısıtmadır. Aşçı bu noktalarda ölçülebilir limitler uygular (örn. tavuk iç sıcaklığı ≥75°C) ve günlük kayıt tutar. Kayıt, hem doğrulama hem de denetim (PSC, flag, charterer inspection) kanıtıdır.`,
          ],
          table: {
            caption: `Gemi Mutfağındaki Tipik CCP'ler ve Kritik Limitler`,
            headers: ["CCP", "Tehlike", "Kritik Limit", "İzleme"],
            rows: [
              ["Soğuk depolama", "Bakteri üremesi", "≤5°C (buzdolabı)", "Günde 2x sıcaklık kaydı"],
              ["Dondurucu", "Çözülme/üreme", "≤ -18°C", "Günlük sıcaklık kaydı"],
              ["Pişirme", "Patojen sağ kalımı", "İç sıcaklık ≥75°C", "Probe termometre"],
              ["Sıcak tutma", "Tehlike aralığı", "≥63°C", "Servis öncesi ölçüm"],
              ["Soğutma", "Toksin oluşumu", "60→10°C ≤2 saat", "Soğutma süresi kontrolü"],
            ],
          },
        },
        {
          subheading: "1.2 Tehlikeli sıcaklık aralığı (danger zone)",
          paragraphs: [
            `Patojen bakteriler yaklaşık 5°C ile 63°C arasında (tehlikeli aralık / danger zone) hızla çoğalır; 37°C civarında üreme en hızlıdır. Aşçının temel kuralı, gıdayı bu aralıkta mümkün olan en kısa süre tutmaktır. Sıcak gıda 63°C üzerinde, soğuk gıda 5°C altında tutulur; tehlikeli aralıkta toplam bekleme süresi sınırlandırılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Danger zone: 5°C - 63°C",
              text: `Bu aralıkta bekleyen gıdada bakteri sayısı dakikalar/saatler içinde tehlikeli düzeye çıkabilir. Pişmiş yemeği oda sıcaklığında bekletmek en yaygın gıda zehirlenmesi nedenidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Soğuk Zincir Kontrolü",
      sections: [
        {
          subheading: "2.1 Teslimden depolamaya kesintisiz soğuk zincir",
          paragraphs: [
            `Soğuk zincir, ürün gemiye teslim edildiği andan tüketileceği ana kadar kesintisiz soğuk tutulmasıdır. Aşçı, ikmal sırasında soğutulmuş/dondurulmuş ürünün teslim sıcaklığını ölçer; çözülme belirtisi (yumuşama, su, tekrar donma izi) gösteren ürünü reddeder. Teslim alınan ürün gecikmeden uygun depoya yerleştirilir; rıhtımda sıcakta bekletilmez.`,
            `Depo içinde aşçı, buzdolabı ve dondurucu sıcaklıklarını günde en az iki kez ölçer ve cold chain log'a kaydeder. Sıcaklık limit dışına çıkarsa (örn. kompresör arızası) düzeltici faaliyet uygulanır: ürün başka soğutucuya taşınır, mühendise arıza bildirilir, etkilenen ürünün güvenliği değerlendirilir.`,
          ],
        },
        {
          subheading: "2.2 Doğru çözülme (thawing) ve yeniden donma yasağı",
          paragraphs: [
            `Dondurulmuş ürün, en güvenli şekilde buzdolabında (≤5°C) kontrollü çözülür; bu yavaş ama bakteriyel açıdan en güvenli yöntemdir. Acil durumda akan soğuk su altında veya mikrodalgada (hemen pişirilecekse) çözülebilir. Oda sıcaklığında çözme yapılmaz; yüzey ısınırken iç kısım donuk kalır ve yüzeyde bakteri üreyebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çözülmüş ürün tekrar dondurulmaz",
              text: `Bir kez çözülmüş et/balık tekrar dondurulduğunda bakteri yükü artar ve toksin oluşabilir. Çözülen ürün ya pişirilir ya da Ek V'e göre bertaraf edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Pişirme Sıcaklıkları",
      sections: [
        {
          subheading: "3.1 Güvenli iç sıcaklık hedefleri",
          paragraphs: [
            `Pişirme, patojenleri öldürmenin temel CCP'sidir. Aşçı, probe (daldırma) termometre ile gıdanın en kalın noktasındaki iç sıcaklığı ölçer. Kümes eti, kıyma ve dolgu içeren ürünler en yüksek sıcaklığı gerektirir; bütün et parçaları daha düşük tolere edilebilir. Termometre her ölçümden sonra temizlenip dezenfekte edilir.`,
            `Genel hedef olarak kümes eti ve kıyma ≥75°C, balık/yumurta ≥63-70°C, yeniden ısıtma ≥75°C iç sıcaklık alır. Hedefe ulaşıldığını gözle değil, ölçümle doğrulamak esastır; rengin değişmesi pişmenin kesin kanıtı değildir.`,
          ],
          table: {
            caption: `Tipik Güvenli İç Pişirme/Isıtma Sıcaklıkları`,
            headers: ["Ürün", "Hedef İç Sıcaklık", "Not"],
            rows: [
              ["Kümes eti (tavuk/hindi)", "≥75°C", "En riskli, mutlaka ölç"],
              ["Kıyma / köfte / dolgu", "≥75°C", "İç kısımda patojen olabilir"],
              ["Balık", "≥63°C", "Etli/opak görünene kadar"],
              ["Yumurta yemekleri", "≥70°C", "Çiğ yumurta riskli"],
              ["Yeniden ısıtma (her ürün)", "≥75°C", "Tek seferde, kaynar"],
            ],
          },
        },
        {
          subheading: "3.2 Yeniden ısıtma ve güvenli soğutma",
          paragraphs: [
            `Pişmiş yemek tekrar kullanılacaksa hızlı soğutulur: 60°C'den 10°C'ye mümkünse 2 saat içinde indirilir, ardından buzdolabına alınır. Yeniden ısıtırken yemek tek seferde ≥75°C'ye getirilir; ılık ısıtma bakteri için ideal ortam yaratır. Bir yemek yalnızca bir kez yeniden ısıtılır, defalarca değil.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hızlı soğutmanın püf noktası",
              text: `Büyük tencere yerine sığ kaplara bölmek, soğuk su banyosu ve karıştırma, gıdanın tehlikeli aralıktan hızlı çıkmasını sağlar. Kaynar tenceredeki yemeği kapalı dolaba koymak yavaş ve risklidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Çapraz Bulaşma Önleme",
      sections: [
        {
          subheading: "4.1 Çiğ ve pişmiş ürünün ayrılması",
          paragraphs: [
            `Çapraz bulaşma, çiğ gıdadaki (özellikle çiğ et/tavuk/balık) patojenlerin pişmiş veya doğrudan tüketilecek gıdaya geçmesidir. Aşçı, çiğ ve pişmiş için ayrı kesme tahtası, bıçak ve kap kullanır; renk kodlu ekipman (örn. kırmızı = çiğ et, yeşil = sebze) bu ayrımı kolaylaştırır. Çiğ et işlendikten sonra eller, yüzeyler ve ekipman yıkanıp dezenfekte edilmeden başka işe geçilmez.`,
            `Depolamada çiğ et daima alt rafta, pişmiş/hazır ürünün altında tutulur; böylece damlayan su/kan üst raflara bulaşmaz. Ürünler kapalı kaplarda saklanır. Bu basit yerleşim kuralı, soğuk depodaki çapraz bulaşmayı büyük ölçüde önler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Renk kodlu kesme tahtası",
              text: `Kırmızı=çiğ et, mavi=balık, yeşil=sebze/meyve, sarı=pişmiş et, beyaz=süt/ekmek gibi bir renk sistemi, yoğun galley'de çapraz bulaşmayı önlemenin en pratik yoludur.`,
            },
          ],
        },
        {
          subheading: "4.2 Yüzey ve ekipman ayrımı",
          paragraphs: [
            `Tezgâh ve ekipman, işler arasında temizlenip dezenfekte edilir. Çiğ tavuk doğranan tezgâhta salata hazırlamak tipik bir hata zinciridir. Aşçı, iş akışını çiğden pişmişe doğru tek yönlü tasarlar; mümkünse çiğ ve pişmiş hazırlık alanlarını zamansal ya da mekânsal olarak ayırır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Temizlik ve Dezenfeksiyon",
      sections: [
        {
          subheading: "5.1 Temizlik ile dezenfeksiyonun farkı",
          paragraphs: [
            `Temizlik, görünür kir ve yağı uzaklaştırır; dezenfeksiyon ise mikroorganizmaları güvenli düzeye indirir. İkisi farklı adımlardır: önce deterjanla yıkanır (kir kalkar), sonra dezenfektan uygulanır. Dezenfektanın etkili olması için üreticinin belirttiği temas süresi (contact time) beklenir; hemen durulamak etkiyi düşürür.`,
            `Aşçı, yüksek temas yüzeylerini (tezgâh, kulplar, musluk, bıçak) sık dezenfekte eder. Temizlik bezleri tek kullanımlık ya da renk kodlu olmalı; aynı bezle çiğ et alanı ve salata alanı silinmemelidir. Bulaşıklar, ya yüksek sıcaklıkta bulaşık makinesinde ya da yıka-durula-dezenfekte üç aşamalı yöntemle temizlenir.`,
          ],
        },
        {
          subheading: "5.2 Temizlik programı (cleaning schedule)",
          paragraphs: [
            `Gemi mutfağında yazılı bir temizlik programı bulunur: hangi alanın ne sıklıkla, hangi kimyasalla, kim tarafından temizleneceği tanımlıdır. Günlük (tezgâh, zemin), haftalık (fırın içi, davlumbaz filtresi, dolap içi) ve periyodik (derin temizlik) görevler ayrılır. Tamamlanan görevler imzalı kayıtla doğrulanır; bu kayıt denetimde sunulur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "WHO — Guide to Ship Sanitation",
              text: `Gemi sanitasyon rehberi; mutfak, depo ve servis alanları için temizlik, dezenfeksiyon ve hijyen standartlarını tanımlar. Ship Sanitation inspection bu kriterlere göre yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Kişisel Hijyen Standartları",
      sections: [
        {
          subheading: "6.1 El hijyeni ve kıyafet",
          paragraphs: [
            `El yıkama, gıda güvenliğinin en etkili tek önlemidir. Aşçı; işe başlarken, çiğ et işledikten sonra, tuvaletten sonra, çöp/temizlik sonrası ve görev değişiminde ellerini sabunla en az 20 saniye yıkar. Temiz iş kıyafeti, saç koruyucu (bone/şapka) ve gerektiğinde eldiven kullanılır; eldiven, el yıkamanın yerini tutmaz ve sık değiştirilir.`,
            `Takı, saat ve tırnak ojesi gıda hazırlığı sırasında çıkarılır/kullanılmaz; bunlar hem fiziksel kontaminasyon hem de bakteri taşıyıcısıdır. Tırnaklar kısa ve temiz tutulur.`,
          ],
        },
        {
          subheading: "6.2 Hasta personel ve gıda işleme yasağı",
          paragraphs: [
            `İshal, kusma, sarılık veya enfekte yara taşıyan personel gıda hazırlamaktan men edilir; bu kişiler patojen yayabilir. Aşçı veya mess man'de gastrointestinal semptom varsa kaptana bildirilir ve iyileşene kadar (genellikle semptomsuz 48 saat) gıda işlemekten uzak tutulur. Yaralar su geçirmez bandajla kapatılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İshal/kusma = mutfaktan uzak",
              text: `Gastrointestinal semptomu olan biri gıda hazırlarsa Norovirus/Salmonella gibi etkenleri tüm gemiye yayabilir. Semptomlu personel mutfaktan derhal çekilmeli ve kaptana bildirilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Gıda Kaynaklı Hastalık Riski Yönetimi",
      sections: [
        {
          subheading: "7.1 Numune saklama ve izlenebilirlik",
          paragraphs: [
            `Birçok gemide, servis edilen her ana öğünden referans numunesi alınıp en az 48 saat (genellikle 72 saate kadar) buzdolabında saklanır. Bir gıda zehirlenmesi şüphesinde bu numune laboratuvar incelemesi için kullanılır; etkenin kaynağı belirlenebilir. Numuneler tarih/öğün etiketiyle, kapalı temiz kapta tutulur.`,
            `İzlenebilirlik için ikmal kayıtları (tedarikçi, parti, son kullanma tarihi) saklanır. Bir salgın halinde hangi üründen geldiği geriye doğru izlenebilir. Aşçı, açılan ürünleri açılış tarihiyle etiketler.`,
          ],
        },
        {
          subheading: "7.2 Salgın halinde müdahale",
          paragraphs: [
            `Birden fazla mürettebatta benzer semptom (ishal, kusma, ateş) görülürse gıda kaynaklı salgın şüphesi doğar. Aşçı, şüpheli gıdayı servisten çeker, numuneleri korur, kaptanı bilgilendirir ve telemedicine/sağlık otoritesi yönlendirmesini destekler. Mutfakta yoğunlaştırılmış temizlik/dezenfeksiyon uygulanır; özellikle Norovirus için yüzey dezenfeksiyonu kritiktir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Norovirus salgını riski",
              text: `Kapalı gemi ortamında Norovirus hızla yayılır; tek bir enfekte gıda işleyiciden başlayabilir. Katı el hijyeni, hasta personelin men edilmesi ve yüzey dezenfeksiyonu salgını sınırlamanın anahtarıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sıcaklık Kayıtları ve Denetim Hazırlığı",
      sections: [
        {
          subheading: "8.1 Cold chain log ve doğrulama",
          paragraphs: [
            `Aşçı; buzdolabı, dondurucu, sıcak tutma ve pişirme sıcaklıklarını günlük kayıt formlarına işler. Bu kayıtlar HACCP'in "izleme" ve "doğrulama" prensiplerinin kanıtıdır. Termometreler düzenli kalibre edilir (örn. buzlu su 0°C, kaynar su referansı) ve kalibrasyon kaydı tutulur.`,
          ],
        },
        {
          subheading: "8.2 PSC ve flag state denetimi",
          paragraphs: [
            `Port State Control ve bayrak devleti denetçileri, MLC kapsamında mutfak hijyenini, sıcaklık kayıtlarını, depo düzenini ve aşçı yeterliğini inceler. Eksiklik (deficiency) tespit edilirse düzeltme istenir; ağır hijyen kusurları geminin alıkonmasına (detention) kadar gidebilir. Düzenli iç denetim, sürpriz dış denetime hazır olmanın yoludur.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Aşçının günlük gıda güvenliği checklist'i",
          bullets: [
            `Buzdolabı ≤5°C, dondurucu ≤ -18°C ölçüldü ve kaydedildi mi?`,
            `Pişirme iç sıcaklıkları (özellikle tavuk ≥75°C) ölçüldü mü?`,
            `Çiğ/pişmiş için ayrı tahta-bıçak-kap kullanıldı mı?`,
            `Çiğ et alt rafta, kapalı kapta mı?`,
            `Çözülme buzdolabında kontrollü mü, tekrar donma yok mu?`,
            `Sıcak tutma ≥63°C, soğuk hazırlık ≤5°C mi?`,
            `El hijyeni ve temiz kıyafet/bone uygulandı mı?`,
            `Temizlik-dezenfeksiyon programı tamamlandı ve imzalandı mı?`,
            `Öğün numuneleri 48 saat için saklandı mı?`,
            `Hasta/semptomlu personel mutfaktan uzak mı?`,
          ],
          paragraphs: [
            `Gıda güvenliği, görünmediğinde başarılıdır. Disiplinli soğuk zincir, ölçülmüş pişirme, çapraz bulaşma engeli ve kişisel hijyen; tek bir salgının tüm gemiyi etkisiz bırakabileceği kapalı ortamda mürettebat sağlığının ilk savunma hattıdır. Aşçının tuttuğu sıcaklık kayıtları ve numuneler, hem önlemenin hem de bir sorun çıktığında izlenebilirliğin temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
