import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuthContext";
import { safeLocalStorage } from "@/lib/safeStorage";
import {
  getDocumentExpiryState,
  getReminderMilestone,
  sortByExpiry,
} from "@/lib/documentExpiry";
import { fetchDocuments } from "@/services/documentTracker";

async function showDeviceNotification(title: string, body: string): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.showNotification(title, {
          body,
          icon: "/maritime-logo.svg",
          badge: "/maritime-logo.svg",
          tag: "maritime-document-expiry",
          data: { url: "/beta/documents" },
        });
        return;
      }
    }
    new Notification(title, { body, icon: "/maritime-logo.svg", tag: "maritime-document-expiry" });
  } catch {
    // Uygulama içi uyarı zaten gösterildiği için cihaz bildirimi hatası sessiz kalır.
  }
}

export function DocumentExpiryNotifier() {
  const { user, loading } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (loading || !userId) return;
    let cancelled = false;

    const notify = async () => {
      try {
        const allDocuments = await fetchDocuments(userId);
        if (cancelled) return;
        const due = sortByExpiry(
          allDocuments.filter((document) => {
            if (document.no_expiry) return false;
            const milestone = getReminderMilestone(document.expiry_date);
            if (milestone === null) return false;
            const key = `maritime-document-reminder:${userId}:${document.id}:${milestone}`;
            return safeLocalStorage.getItem(key) !== "shown";
          }),
        );
        if (!due.length) return;

        const first = due[0];
        const firstState = getDocumentExpiryState(first.expiry_date, first.no_expiry);
        const extra = due.length > 1 ? ` ve ${due.length - 1} belge daha` : "";
        const body = `${first.title}: ${firstState.label}${extra}.`;

        toast.warning("Belge süresi hatırlatması", {
          description: body,
          duration: 9000,
          action: {
            label: "Belgeler",
            onClick: () => window.location.assign("/beta/documents"),
          },
        });
        await showDeviceNotification("Mariner's Book — Belge hatırlatması", body);
        for (const document of due) {
          const milestone = getReminderMilestone(document.expiry_date);
          if (milestone !== null) {
            safeLocalStorage.setItem(
              `maritime-document-reminder:${userId}:${document.id}:${milestone}`,
              "shown",
            );
          }
        }
      } catch {
        // Ağ veya oturum sorunu uygulamanın açılışını engellememeli.
      }
    };

    void notify();
    return () => {
      cancelled = true;
    };
  }, [loading, userId]);

  return null;
}
