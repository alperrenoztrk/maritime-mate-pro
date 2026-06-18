import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Çevre koruma ve atık yönetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 8,
  estimatedPages: 24,
  intro: `Birinci Zabit, güverte departmanı açısından geminin çevre uyumluluğundan birinci derecede sorumludur. Bu sorumluluk; Garbage Management Plan'ın uygulanması, bilge/sludge operasyonlarının kontrolü, SOPEP (Shipboard Oil Pollution Emergency Plan) prosedürlerinin operasyonel hazırlığı ve güverte bölgelerindeki kirlilik risklerinin önlenmesini kapsar. Deniz kirliliği vakaları yüksek para cezaları, gemi tutulması ve hatta hapis cezası ile sonuçlanabilir; ABD MARPOL ihlalleri milyonlarca dolar cezayla ünlüdür. Bu bölüm, Birinci Zabit'in MARPOL uyumlu çevre yönetimi metodolojisini açıklar.`,
  sources: [
    "MARPOL Annex I — Prevention of Pollution by Oil",
    "MARPOL Annex IV — Sewage",
    "MARPOL Annex V — Garbage",
    "MARPOL Annex VI — Air Pollution",
    "MEPC.1/Circ.834 — Consolidated Guidance for Port Reception Facilities",
    "2017 Guidelines for the Implementation of MARPOL Annex V (Res. MEPC.295(71))",
    "Shipboard Oil Pollution Emergency Plan (SOPEP) — IMO Resolution MEPC.54(32)",
    "ISM Code — Environmental Management",
  ],
  chapters: [
    {
      heading: "1. MARPOL Çerçevesi ve Birinci Zabit'in Rolü",
      lead: `MARPOL'ün altı eki, kirliliğin her türünü düzenler; Birinci Zabit güverte tarafındaki uygulamadan sorumludur.`,
      sections: [
        {
          subheading: "1.1 MARPOL ek yapısı ve kapsam",
          paragraphs: [
            `MARPOL 73/78, deniz kirliliğini altı ek altında düzenler: Annex I (yağ), Annex II (zararlı sıvı madde), Annex III (paketli zararlı madde), Annex IV (pis su/sewage), Annex V (çöp/garbage) ve Annex VI (hava kirliliği). Birinci Zabit özellikle Annex I (güverte yağ operasyonları, bunkering), Annex V (garbage) ve Annex IV ile doğrudan ilgilenir; sintine/sludge transfer ise makine ile koordineli yürür.`,
            `Her ek belirli kayıt defterleri zorunlu kılar: Oil Record Book (ORB Part I/II), Garbage Record Book (Part I/II), Sewage kayıtları. Bu defterler PSC denetimlerinde en sık incelenen belgelerdir ve hata "deficiency" hatta gemi tutulması doğurur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL — Special Areas ve ECA",
              text: `Akdeniz, Baltık, Karadeniz gibi "Special Area"larda ve ECA (Emission Control Area) bölgelerinde deşarj limitleri çok daha katıdır. Bazı bölgelerde garbage ve yağlı su deşarjı tamamen yasaktır. Birinci Zabit, geminin bulunduğu bölgeye göre kuralları bilmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Çevre yönetiminde ISM ve şirket politikası",
          paragraphs: [
            `ISM Code ve şirketin SMS (Safety Management System) içindeki çevre prosedürleri, MARPOL'ün üzerine ek şirket standartları getirir. "No discharge" politikası uygulayan şirketler, kanunen izinli olsa bile belirli atıkların denize verilmesini yasaklar. Birinci Zabit bu politikaları ekibe aktarır ve uygular.`,
            `Çevre uyumsuzluğu near-miss/non-conformity olarak raporlanır; magic pipe (yasadışı bypass hattı) gibi kasıtlı ihlaller hem suçtur hem de şirketi ağır cezalara maruz bırakır. Şeffaf ve dürüst kayıt kültürü Birinci Zabit'in sorumluluğudur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Garbage Management Plan ve Atık Ayrıştırma",
      sections: [
        {
          subheading: "2.1 Çöp kategorileri ve ayrıştırma",
          paragraphs: [
            `MARPOL Annex V, çöpü kategorilere ayırır: plastik (A), gıda atığı (B), domestic waste (C), pişirme yağı (D), incinerator külü (E), operasyonel atık (F), kargo kalıntısı (G), hayvan leşi (H), balıkçılık ekipmanı (I) ve e-waste (J). Birinci Zabit, etiketli ve renk kodlu garbage bin'lerin güvertede uygun konumlandırılmasını ve ekibin doğru ayrıştırma yapmasını sağlar.`,
            `Plastik HER ZAMAN denize atılması yasaktır ve gemide saklanıp shore reception facility'ye teslim edilir. Gıda atığı, kara mesafesi ve öğütülmüş/öğütülmemiş durumuna göre belirli mesafelerde deşarj edilebilir (Special Area dışında genelde >12 nm, comminuted >3 nm). Birinci Zabit deşarj kararını mevzuata göre verir.`,
          ],
          table: {
            caption: `MARPOL Annex V — Tipik Deşarj Kuralları (Special Area Dışı, Özet)`,
            headers: ["Atık Türü", "Denize Deşarj", "Mesafe / Koşul"],
            rows: [
              ["Plastik (her tür)", "Yasak", "Tüm denizlerde yasak"],
              ["Gıda atığı (öğütülmemiş)", "İzinli", "> 12 nm karadan"],
              ["Gıda atığı (öğütülmüş <25mm)", "İzinli", "> 3 nm karadan"],
              ["Kargo kalıntısı (zararsız)", "Şartlı", "> 12 nm, yıkama suyu ile"],
              ["Pişirme yağı", "Yasak", "Saklanır, teslim edilir"],
              ["Operasyonel atık / e-waste", "Yasak", "Saklanır, teslim edilir"],
            ],
          },
        },
        {
          subheading: "2.2 Garbage Record Book ve teslim makbuzları",
          paragraphs: [
            `Garbage Record Book (GRB) Part I (gemi atığı) ve Part II (kargo kalıntısı), her deşarj/yakma/teslim işlemini tarih, pozisyon, miktar (m³) ve kategori ile kayıt altına alır. Birinci Zabit kayıtların doğru ve eksiksiz tutulmasından sorumludur. Shore reception facility'ye teslimde alınan makbuz (garbage disposal receipt) saklanır ve GRB ile çapraz kontrol edilir.`,
            `400 GT üzeri ve 15+ kişi taşıyan gemiler Garbage Management Plan ve GRB bulundurmak zorundadır. PSC, GRB kayıtları ile fiili çöp miktarı ve teslim makbuzları arasında tutarsızlık ararsa ciddi bulgu açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıt tutarsızlığı = ağır bulgu",
              text: `GRB ile teslim makbuzları arasındaki tutarsızlık, PSC tarafından kasıtlı ihlal şüphesiyle ele alınır. Tüm deşarj ve teslimler gerçek zamanlı, dürüst ve okunaklı kaydedilmelidir. Geriye dönük "düzeltme" suç şüphesi yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Bilge ve Sludge Operasyonları (Annex I)",
      sections: [
        {
          subheading: "3.1 Güverte yağ kirliliği önleme",
          paragraphs: [
            `Güverte tarafında yağ kirliliği genelde bunkering, hidrolik ekipman kaçakları (vinç, winch, hatch cover) ve cargo operasyonlarından kaynaklanır. Birinci Zabit, scupper plug'ların bunkering öncesi takıldığını, drip tray'lerin yerleştiğini ve SOPEP gear'ın hazır olduğunu doğrular. Güverteye düşen küçük yağ derhal absorbent ile temizlenir, denize geçmesi önlenir.`,
            `15 ppm bilge separator ve Oil Discharge Monitoring Equipment (ODME — tankerler) ile yapılan tüm deşarjlar ORB'a kaydedilir. Güverte zabiti olarak Birinci Zabit, deşarj kayıtlarının doğruluğunu (özellikle slop ve cargo tank yıkama suları, tankerlerde) takip eder; makine tarafıyla koordineli çalışır.`,
          ],
        },
        {
          subheading: "3.2 Bunkering operasyonunda kirlilik kontrolü",
          paragraphs: [
            `Bunkering, güvertede en yüksek yağ kirliliği riski taşıyan işlemdir. Birinci Zabit (veya görevli zabit), pre-bunkering checklist'i uygular: scupper plug, drip tray, manifold conta kontrolü, ESD/iletişim teyidi, maksimum loading rate ve tank kapasitesi takibi. Sürekli ullage/sounding ile overflow önlenir; tank %90 dolunca topping-off yavaşlatılır.`,
            `Bunker spill durumunda SOPEP derhal devreye girer; deşarj durdurulur, kaynak kapatılır, absorbent/boom uygulanır ve liman otoritesi ile şirket DPA anında bilgilendirilir. Hızlı ve dürüst raporlama, cezayı hafifleten en önemli faktördür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Topping-off dikkati",
              text: `Bunker overflow'ların çoğu son aşamada (topping-off) yaşanır. Tank %85-90'a ulaşınca rate düşürülür, son tanka geçişte iletişim kesintisiz olmalı ve manifold sürekli gözetlenmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. SOPEP — Acil Kirlilik Müdahale Planı",
      sections: [
        {
          subheading: "4.1 SOPEP'in yapısı ve hazırlığı",
          paragraphs: [
            `400 GT üzeri her gemi (tankerlerde 150 GT) SOPEP bulundurmak zorundadır. Plan; kim kimi arayacak (reporting), nasıl müdahale edilecek (mitigation) ve hangi ekipman kullanılacak bilgisini içerir. Birinci Zabit, SOPEP locker'ın (absorbent, boom, sorbent pad, scoop, eldiven, dispersant izinli ise) tam ve erişilebilir olduğunu düzenli kontrol eder.`,
            `SOPEP, sahil otoritesi irtibat listesini (coastal state contacts) ve şirket emergency contact'larını içerir; bu liste güncel tutulmalıdır. Tankerlerde SOPEP yerine genişletilmiş SMPEP (Annex I + II'yi kapsayan) bulunur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I Reg. 37 — SOPEP",
              text: `SOPEP, kirlilik raporlama prosedürünü (Article 8 ve Protocol I uyarınca en yakın sahil devletine bildirim), müdahale adımlarını ve koordinasyonu içerir. Plan onaylı ve gemiye özgü olmalıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Spill müdahale tatbikatı ve roller",
          paragraphs: [
            `SOPEP tatbikatları düzenli yapılır; her mürettebatın spill anındaki rolü (raporlama, kaynak kapatma, absorbent uygulama, boom kurma) tanımlıdır. Birinci Zabit tatbikatı organize eder, eksikleri tespit eder ve kayıt tutar. Gerçek bir spill'de hız ve koordinasyon, çevresel ve hukuki sonucu belirler.`,
            `Spill sonrası temizlik atığı (oily waste, kontamine absorbent) tehlikeli atık olarak ayrı saklanır ve uygun reception facility'ye teslim edilir; denize asla atılmaz. Olay, near-miss/kaza raporu ile şirkete bildirilir ve root-cause analizi yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Pis Su (Sewage) ve Gri Su Yönetimi (Annex IV)",
      sections: [
        {
          subheading: "5.1 Sewage treatment ve deşarj kuralları",
          paragraphs: [
            `MARPOL Annex IV, pis su deşarjını düzenler: onaylı sewage treatment plant ile işlenmiş su belirli koşullarda deşarj edilebilir; işlenmemiş pis su ise karadan en az 12 nm uzakta ve gemi 4 knot üzeri seyirdeyken kademeli (moderate rate) deşarj edilebilir. Birinci Zabit, treatment plant'ın çalışır durumda olduğunu ve deşarj koşullarına uyulduğunu güverte tarafından izler.`,
            `Special Area'larda ve liman bölgelerinde sewage deşarjı sıkı kısıtlamalara tabidir; çoğu liman holding tank ve shore teslim ister. Gri su (greywater) bazı bölgelerde (örn. Alaska, kutup) ayrıca düzenlenir.`,
          ],
        },
        {
          subheading: "5.2 Holding tank ve liman teslimi",
          paragraphs: [
            `Deşarjın yasak olduğu bölgelerde sewage holding tank'ta toplanır ve uygun limanda reception facility'ye verilir. Birinci Zabit, holding tank kapasitesini izler ve port stay süresine göre planlama yapar; tank taşması hem hijyen hem kirlilik sorunudur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Hava Kirliliği ve Güverte Boyutu (Annex VI)",
      sections: [
        {
          subheading: "6.1 VOC ve cargo emisyonları",
          paragraphs: [
            `Annex VI ağırlıklı makine kapsamında olsa da, tankerlerde cargo VOC (Volatile Organic Compound) emisyonları güverte ilgisindedir. VOC Management Plan'ı olan tankerlerde Birinci Zabit, vapor return ve loading prosedürlerini bu plana göre uygular. Ozon tabakasına zararlı maddeler (ODS) ve içeren ekipmanlar da kayıt altındadır.`,
            `Incinerator kullanımı Annex VI ve Annex V ile çakışır; belirli atıkların (örn. PVC, kargo kalıntısı) yakılması yasaktır ve liman/Special Area'larda incinerator çalıştırma kısıtlanabilir. Birinci Zabit yakma kayıtlarını GRB ile koordine eder.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — incinerator yanlış kullanımı",
              text: `Bir gemide plastik içeren atık liman yakınında incinerator'da yakıldı; duman şikayeti ve PSC kontrolü sonucu Annex V/VI ihlali açıldı. Ders: yakma kuralları (yasak maddeler, bölge kısıtlaması) titizlikle uygulanmalı ve kaydedilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Güverte Kirlilik Riskleri ve Önleme",
      sections: [
        {
          subheading: "7.1 Hold/cargo residue ve yıkama suyu",
          paragraphs: [
            `Bulk gemilerde hold yıkama suları (cargo residue içeren) kargo türüne göre HME (Harmful to the Marine Environment) sınıflandırmasına tabidir. HME ise yıkama suyu denize verilemez, reception facility'ye teslim edilir. Birinci Zabit, IMSBC/shipper bilgisine göre kargonun HME olup olmadığını belirler ve GRB Part II'ye kaydeder.`,
            `Güverte üstü paint, kumlama (grit), kaynak cürufu ve diğer operasyonel atıkların denize karışması önlenir; güverte işleri sırasında scupper kontrolü ve atık toplama yapılır.`,
          ],
        },
        {
          subheading: "7.2 Paint ve kimyasal yönetimi",
          paragraphs: [
            `Paint locker ve kimyasal depolama MSDS'lere göre yönetilir; sızıntı, denize/güverteye yayılma ve yangın riski kontrol edilir. Boş kimyasal/boya bidonları operasyonel atık olarak saklanır, denize atılmaz. Antifouling boyaları (AFS Convention — TBT yasağı) uyumlu olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kayıt, Denetim ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Çevre kayıtları ve PSC hazırlığı",
          paragraphs: [
            `Birinci Zabit, GRB, ORB (güverte ilgili kısımlar), sewage kayıtları, teslim makbuzları, SOPEP envanter ve tatbikat kayıtlarını denetime hazır tutar. PSC ve vetting denetçileri bu kayıtlardaki tutarlılığı, fiili durumla uyumu ve plan uygulamasını kontrol eder. Düzenli iç denetim (self-assessment) bulguları önler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Self-audit alışkanlığı",
              text: `Her liman öncesi GRB-makbuz tutarlılığı, SOPEP locker tamlığı ve scupper plug durumunu kontrol etmek, PSC bulgularının büyük kısmını önler. Çevre uyumu sürekliliktir, tek seferlik hazırlık değil.`,
            },
          ],
        },
        {
          subheading: "8.2 Birinci Zabit'in çevre checklist'i",
          bullets: [
            `Garbage bin'ler etiketli, ayrıştırma doğru yapılıyor mu?`,
            `GRB Part I/II güncel ve teslim makbuzları ile tutarlı mı?`,
            `Plastik ve yasak atıklar saklanıp teslim ediliyor mu?`,
            `Bunkering öncesi scupper plug + drip tray + SOPEP gear hazır mı?`,
            `SOPEP envanteri tam ve irtibat listesi güncel mi?`,
            `Sewage treatment/holding tank durumu izleniyor mu?`,
            `Special Area/ECA kuralları biliniyor ve uygulanıyor mu?`,
            `Hold yıkama suyu HME değerlendirmesi yapıldı mı?`,
            `Spill/near-miss kayıtları ve tatbikatlar dokümante edildi mi?`,
          ],
          paragraphs: [
            `Çevre koruma, modern denizciliğin en sıkı denetlenen ve en ağır cezalandırılan alanıdır. Birinci Zabit'in başarısı; dürüst kayıt kültürü, hazır müdahale ekipmanı ve "denize tek damla bile gitmesin" disiplinini güverte ekibine yerleştirmekten geçer.`,
          ],
        },
      ],
    },
  ],
};

export default content;
