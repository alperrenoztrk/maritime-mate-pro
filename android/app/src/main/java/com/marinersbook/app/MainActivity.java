package com.marinersbook.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Google Play Billing (Pro abonelik / ömür boyu satın alma) eklentisi.
        registerPlugin(PlayBillingPlugin.class);

        super.onCreate(savedInstanceState);
    }
}
