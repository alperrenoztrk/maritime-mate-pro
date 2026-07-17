package com.marinersbook.app;

import android.os.Bundle;
import android.view.WindowManager;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Özel ekran görüntüsü engelleme eklentisini köprü başlamadan önce kaydet.
        registerPlugin(ScreenProtectionPlugin.class);
        // Google Play Billing (Pro abonelik / ömür boyu satın alma) eklentisi.
        registerPlugin(PlayBillingPlugin.class);

        super.onCreate(savedInstanceState);

        // Ekran görüntüsü / ekran kaydını ilk kareden itibaren engelle.
        // FLAG_SECURE; ekran görüntüsünü ve kaydı engeller, ayrıca uygulamayı
        // "son kullanılanlar" önizlemesinde gizler. JS tarafı ScreenProtection
        // eklentisi ile bunu çalışma zamanında açıp kapatabilir.
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE
        );
    }
}
