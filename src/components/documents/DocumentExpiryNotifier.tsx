import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { safeLocalStorage } from "@/lib/safeStorage";
import { getDocumentExpiryState, isReminderDue, sortByExpiry } from "@/lib/documentExpiry";
import { fetchDocuments } from "@/services/documentTracker";

function localDateKey(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function showDeviceNotification(title: string, body: string): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        icon: "/maritime-logo.svg",
        badge: "/maritime-logo.svg",
        tag: "maritime-document-expiry",
        data: { url: "/beta/documents" },
      });
      return;
    }
    new Notification(title, { body, icon: "/maritime-logo.svg", tag: "maritime-document-expiry" });
  } catch {
    // Uygulama içi uyarı zaten gösterildiği için cihaz bildirimi hatası sessiz kalır.
  }
}

export function DocumentExpiryNotifier() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;

    const notify = async () => {
      const storageKey = `maritime-document-reminder:${user.id}:${localDateKey()}`;
      if (safeLocalStorage.getItem(storageKey)) return;

      try {
        const allDocuments = await fetchDocuments(user.id);
        if (cancelled) return;
        const due = sortByExpiry(
          allDocuments.filter((document) =>
            !document.no_expiry && isReminderDue(document.expiry_date),
          ),
        );
        if (!due.length) {
          safeLocalStorage.setItem(storageKey, "none");
          return;
        }

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
        safeLocalStorage.setItem(storageKey, "shown");
      } catch {
        // Ağ veya oturum sorunu uygulamanın açılışını engellememeli.
      }
    };

    void notify();
    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  return null;
}
