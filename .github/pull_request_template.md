## Özet
- 

## PR Checklist
- [ ] Konu anlatımı içeriği eklendiyse ilgili `subTopics` satırlarında `hasContent: true` güncellemesi de **aynı PR** içinde tamamlandı.

## Kod İnceleme Kuralı
- İçerik eklenip `hasContent` güncellemesi eksik bırakılan PR’lar **onaylanmamalı**.
- İnceleme sırasında `src/pages/LessonTopicsPage.tsx` dosyasındaki `const hasContent = isNavigation ? ... : sub.hasContent;` davranışı referans alınmalı.
