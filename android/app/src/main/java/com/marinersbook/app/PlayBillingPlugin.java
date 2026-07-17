package com.marinersbook.app;

import androidx.annotation.NonNull;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Google Play Billing (satın alma) eklentisi.
 *
 * Yalnızca istemci tarafı akışı yürütür: ürün bilgisi sorgulama, satın alma
 * ekranını açma ve mevcut satın alımları listeleme (geri yükleme). Satın alma
 * DOĞRULAMA ve ONAYLAMA (acknowledge) işlemleri bilinçli olarak sunucudadır
 * (Supabase `verify-purchase` edge function); istemcide Pro hakkı açılmaz.
 *
 * JS köprüsü: src/plugins/playBilling.ts
 */
@CapacitorPlugin(name = "PlayBilling")
public class PlayBillingPlugin extends Plugin implements PurchasesUpdatedListener {

    private BillingClient billingClient;
    /** Satın alma sonucu onPurchasesUpdated'a asenkron geldiği için bekletilen çağrı. */
    private PluginCall pendingPurchaseCall;
    /** launchBillingFlow, queryProductDetailsAsync'ten dönen nesneyi ister. */
    private final Map<String, ProductDetails> productDetailsCache = new HashMap<>();

    @Override
    public void load() {
        billingClient = BillingClient.newBuilder(getContext())
            .setListener(this)
            .enablePendingPurchases(
                PendingPurchasesParams.newBuilder().enableOneTimeProducts().build()
            )
            .build();
    }

    /** Bağlantı hazırsa aksiyonu çalıştırır, değilse bağlanıp çalıştırır. */
    private void withConnection(PluginCall call, Runnable action) {
        if (billingClient.isReady()) {
            action.run();
            return;
        }
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                if (billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK) {
                    action.run();
                } else {
                    call.reject(
                        "Google Play Faturalandırma bağlantısı kurulamadı: " + billingResult.getDebugMessage(),
                        String.valueOf(billingResult.getResponseCode())
                    );
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                // Bir sonraki çağrıda withConnection yeniden bağlanır.
            }
        });
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        if (billingClient.isReady()) {
            JSObject ret = new JSObject();
            ret.put("available", true);
            call.resolve(ret);
            return;
        }
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(@NonNull BillingResult billingResult) {
                JSObject ret = new JSObject();
                ret.put("available", billingResult.getResponseCode() == BillingClient.BillingResponseCode.OK);
                call.resolve(ret);
            }

            @Override
            public void onBillingServiceDisconnected() {
                JSObject ret = new JSObject();
                ret.put("available", false);
                call.resolve(ret);
            }
        });
    }

    @PluginMethod
    public void getProducts(PluginCall call) {
        JSArray idsArray = call.getArray("productIds");
        String type = call.getString("type", "subs");
        if (idsArray == null || idsArray.length() == 0) {
            call.reject("productIds gerekli");
            return;
        }

        final List<String> ids = new ArrayList<>();
        try {
            for (int i = 0; i < idsArray.length(); i++) {
                ids.add(idsArray.getString(i));
            }
        } catch (Exception e) {
            call.reject("productIds okunamadı");
            return;
        }

        final String productType = "inapp".equals(type)
            ? BillingClient.ProductType.INAPP
            : BillingClient.ProductType.SUBS;

        withConnection(call, () -> {
            List<QueryProductDetailsParams.Product> productList = new ArrayList<>();
            for (String id : ids) {
                productList.add(
                    QueryProductDetailsParams.Product.newBuilder()
                        .setProductId(id)
                        .setProductType(productType)
                        .build()
                );
            }
            QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder()
                .setProductList(productList)
                .build();

            billingClient.queryProductDetailsAsync(params, (billingResult, productDetailsList) -> {
                if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    call.reject(
                        "Ürün bilgileri alınamadı: " + billingResult.getDebugMessage(),
                        String.valueOf(billingResult.getResponseCode())
                    );
                    return;
                }

                JSArray products = new JSArray();
                for (ProductDetails details : productDetailsList) {
                    productDetailsCache.put(details.getProductId(), details);

                    JSObject product = new JSObject();
                    product.put("productId", details.getProductId());
                    product.put("type", "inapp".equals(details.getProductType()) ? "inapp" : "subs");
                    product.put("title", details.getTitle());
                    product.put("description", details.getDescription());

                    ProductDetails.OneTimePurchaseOfferDetails oneTime = details.getOneTimePurchaseOfferDetails();
                    if (oneTime != null) {
                        product.put("formattedPrice", oneTime.getFormattedPrice());
                        product.put("priceAmountMicros", oneTime.getPriceAmountMicros());
                        product.put("currencyCode", oneTime.getPriceCurrencyCode());
                    }

                    JSArray offers = new JSArray();
                    List<ProductDetails.SubscriptionOfferDetails> offerDetails = details.getSubscriptionOfferDetails();
                    if (offerDetails != null) {
                        for (ProductDetails.SubscriptionOfferDetails offer : offerDetails) {
                            JSObject offerObj = new JSObject();
                            offerObj.put("offerToken", offer.getOfferToken());
                            offerObj.put("basePlanId", offer.getBasePlanId());
                            offerObj.put("offerId", offer.getOfferId());

                            JSArray phases = new JSArray();
                            for (ProductDetails.PricingPhase phase : offer.getPricingPhases().getPricingPhaseList()) {
                                JSObject phaseObj = new JSObject();
                                phaseObj.put("formattedPrice", phase.getFormattedPrice());
                                phaseObj.put("priceAmountMicros", phase.getPriceAmountMicros());
                                phaseObj.put("currencyCode", phase.getPriceCurrencyCode());
                                phaseObj.put("billingPeriod", phase.getBillingPeriod());
                                phases.put(phaseObj);
                            }
                            offerObj.put("pricingPhases", phases);
                            offers.put(offerObj);
                        }
                    }
                    product.put("offers", offers);
                    products.put(product);
                }

                JSObject ret = new JSObject();
                ret.put("products", products);
                call.resolve(ret);
            });
        });
    }

    @PluginMethod
    public void purchase(PluginCall call) {
        final String productId = call.getString("productId");
        final String offerToken = call.getString("offerToken");
        final String obfuscatedAccountId = call.getString("obfuscatedAccountId");
        if (productId == null) {
            call.reject("productId gerekli");
            return;
        }
        if (getActivity() == null) {
            call.reject("Activity mevcut değil");
            return;
        }
        if (pendingPurchaseCall != null) {
            call.reject("Devam eden bir satın alma akışı var", "FLOW_IN_PROGRESS");
            return;
        }

        withConnection(call, () -> {
            ProductDetails details = productDetailsCache.get(productId);
            if (details == null) {
                call.reject("Önce getProducts ile ürün bilgisi yükleyin", "PRODUCT_NOT_LOADED");
                return;
            }

            BillingFlowParams.ProductDetailsParams.Builder pdParams =
                BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(details);
            if (details.getSubscriptionOfferDetails() != null) {
                String token = offerToken;
                if (token == null && !details.getSubscriptionOfferDetails().isEmpty()) {
                    token = details.getSubscriptionOfferDetails().get(0).getOfferToken();
                }
                if (token == null) {
                    call.reject("Abonelik teklifi (offerToken) bulunamadı", "NO_OFFER");
                    return;
                }
                pdParams.setOfferToken(token);
            }

            List<BillingFlowParams.ProductDetailsParams> paramsList = new ArrayList<>();
            paramsList.add(pdParams.build());

            BillingFlowParams.Builder flowBuilder = BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(paramsList);
            if (obfuscatedAccountId != null && !obfuscatedAccountId.isEmpty()) {
                // Sunucu tarafında token-hesap eşleşmesini denetlemek için
                // Supabase kullanıcı kimliği satın almaya iliştirilir.
                flowBuilder.setObfuscatedAccountId(obfuscatedAccountId);
            }

            // Sonuç onPurchasesUpdated'a düşene kadar çağrıyı canlı tut.
            call.setKeepAlive(true);
            pendingPurchaseCall = call;

            getActivity().runOnUiThread(() -> {
                BillingResult result = billingClient.launchBillingFlow(getActivity(), flowBuilder.build());
                if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    pendingPurchaseCall = null;
                    call.setKeepAlive(false);
                    call.reject(
                        "Satın alma ekranı açılamadı: " + result.getDebugMessage(),
                        String.valueOf(result.getResponseCode())
                    );
                }
            });
        });
    }

    @Override
    public void onPurchasesUpdated(@NonNull BillingResult billingResult, List<Purchase> purchases) {
        PluginCall call = pendingPurchaseCall;
        pendingPurchaseCall = null;
        if (call == null) {
            return;
        }
        call.setKeepAlive(false);

        int code = billingResult.getResponseCode();
        if (code == BillingClient.BillingResponseCode.USER_CANCELED) {
            call.reject("Satın alma iptal edildi", "USER_CANCELED");
            return;
        }
        if (code == BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED) {
            // JS tarafı bu kodu görünce geri yükleme akışını başlatır.
            call.reject("Bu ürün zaten satın alınmış", "ITEM_ALREADY_OWNED");
            return;
        }
        if (code != BillingClient.BillingResponseCode.OK || purchases == null) {
            call.reject(
                "Satın alma tamamlanamadı: " + billingResult.getDebugMessage(),
                String.valueOf(code)
            );
            return;
        }

        JSObject ret = new JSObject();
        ret.put("purchases", purchasesToJson(purchases));
        call.resolve(ret);
    }

    @PluginMethod
    public void restorePurchases(PluginCall call) {
        String type = call.getString("type", "subs");
        final String productType = "inapp".equals(type)
            ? BillingClient.ProductType.INAPP
            : BillingClient.ProductType.SUBS;

        withConnection(call, () -> {
            QueryPurchasesParams params = QueryPurchasesParams.newBuilder()
                .setProductType(productType)
                .build();
            billingClient.queryPurchasesAsync(params, (billingResult, purchases) -> {
                if (billingResult.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                    call.reject(
                        "Satın alımlar sorgulanamadı: " + billingResult.getDebugMessage(),
                        String.valueOf(billingResult.getResponseCode())
                    );
                    return;
                }
                JSObject ret = new JSObject();
                ret.put("purchases", purchasesToJson(purchases));
                call.resolve(ret);
            });
        });
    }

    private JSArray purchasesToJson(List<Purchase> purchases) {
        JSArray array = new JSArray();
        for (Purchase purchase : purchases) {
            JSObject obj = new JSObject();
            JSArray productIds = new JSArray();
            for (String id : purchase.getProducts()) {
                productIds.put(id);
            }
            obj.put("productIds", productIds);
            obj.put("purchaseToken", purchase.getPurchaseToken());
            obj.put("orderId", purchase.getOrderId());
            // 1 = PURCHASED, 2 = PENDING (bekleyen ödemede Pro açılmaz).
            obj.put("purchaseState", purchase.getPurchaseState());
            obj.put("acknowledged", purchase.isAcknowledged());
            array.put(obj);
        }
        return array;
    }
}
