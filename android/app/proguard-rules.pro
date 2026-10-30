# Uygulamaya özel R8 kuralları (release'te minifyEnabled true).
# Capacitor (@CapacitorPlugin / @PluginMethod / com.getcapacitor.Plugin alt
# sınıfları ve Cordova eklentileri), Play Billing ve Google Mobile Ads kendi
# tüketici kurallarını getirir; @JavascriptInterface metotlarını
# proguard-android-optimize.txt korur.

# JS köprüsü eklentiyi adıyla bulur ve metotlarını yansıma ile çağırır;
# Capacitor kuralı kapsasa da ödeme akışı için açıkça korunur.
-keep class com.marinersbook.app.PlayBillingPlugin { *; }

# Çökme raporlarında satır numarası kalsın (Play mapping.txt ile çözer).
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
