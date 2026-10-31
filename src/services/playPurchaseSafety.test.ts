import assert from "node:assert/strict";
import test from "node:test";
import { normalizePurchases, isVerifiedResponse, planBackgroundSync } from "./playPurchaseSafety";
import type { PlayPurchase } from "@/plugins/playBilling";

const receipt = (state: number, ids = ["pro_monthly"], token = "token-1"): PlayPurchase =>
  ({ productIds: ids, purchaseToken: token, orderId: null, purchaseState: state, acknowledged: false });

test("completed purchase is submitted, but pending/canceled/unrecognized ones never grant entitlement", () => {
  const result = normalizePurchases([receipt(2),receipt(0),receipt(1,["other"]),receipt(1)],"subs",["pro_monthly"]);
  assert.deepEqual(result, { pending:true,inputs:[{productId:"pro_monthly",purchaseToken:"token-1",type:"subs"}] });
});
test("duplicate tokens and malformed native receipts do not enter purchase verification", () => {
  const result = normalizePurchases([receipt(1),receipt(1),receipt(1,["pro_monthly"],""),receipt(1,["pro_monthly"],"x".repeat(5000))],
    "subs",["pro_monthly"]);
  assert.equal(result.inputs.length,1);
});
test("restore covers subscriptions and non-consumable lifetime only when tokens belong to known SKUs", () => {
  const subs=normalizePurchases([receipt(1,["pro_yearly"])],"subs",["pro_monthly","pro_yearly"]);
  const life=normalizePurchases([receipt(1,["pro_lifetime"])],"inapp",["pro_lifetime"]);
  assert.equal(subs.inputs[0]?.type,"subs");assert.equal(life.inputs[0]?.type,"inapp");
});
test("malformed responses cannot unlock Pro without a typed server verification", () => {
  assert.equal(isVerifiedResponse({tier:"pro",results:[]}),true);
  assert.equal(isVerifiedResponse({tier:"pro",results:[{productId:"x",status:"active",active:true,expiresAt:null}]}),true);
  assert.equal(isVerifiedResponse({tier:"pro"}),false);
  assert.equal(isVerifiedResponse({tier:"pro",results:[{active:"true"}]}),false);
  assert.equal(isVerifiedResponse({tier:"admin",results:[]}),false);
});

const ids = { subs: ["pro_monthly", "pro_yearly"], inapp: ["pro_lifetime"] };
const owned = (ack: boolean, state = 1, product = "pro_yearly", token = "t-sync"): PlayPurchase =>
  ({ productIds: [product], purchaseToken: token, orderId: null, purchaseState: state, acknowledged: ack });

test("background sync verifies an unacknowledged Play purchase even when the server already grants Pro", () => {
  const plan = planBackgroundSync([owned(false)], [], ids, true);
  assert.equal(plan.reason, "unacknowledged");
  assert.deepEqual(plan.inputs, [{ productId: "pro_yearly", purchaseToken: "t-sync", type: "subs" }]);
});
test("background sync re-links owned products only when the server shows no access", () => {
  assert.equal(planBackgroundSync([owned(true)], [], ids, false).reason, "not_on_server");
  assert.equal(planBackgroundSync([], [owned(true, 1, "pro_lifetime")], ids, false).reason, "not_on_server");
  assert.equal(planBackgroundSync([owned(true)], [], ids, true).reason, null);
});
test("background sync ignores pending, unknown and empty purchase lists", () => {
  assert.equal(planBackgroundSync([owned(false, 2)], [], ids, false).reason, null);
  assert.equal(planBackgroundSync([owned(false, 1, "other_app_sku")], [], ids, false).reason, null);
  assert.equal(planBackgroundSync([], [], ids, false).reason, null);
});
