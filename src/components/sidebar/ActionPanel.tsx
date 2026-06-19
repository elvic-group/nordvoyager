"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import { useLocale, t } from "@/lib/i18n";

interface ActionPanelProps {
  onRegenerate: () => void;
  tripId?: string;
}

export default function ActionPanel({
  onRegenerate,
  tripId,
}: ActionPanelProps) {
  const { data: session } = useSession();
  const { locale } = useLocale();
  const [sharing, setSharing] = useState(false);
  const [shareResult, setShareResult] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<string | null>(null);

  const handleShare = async () => {
    setSharing(true);
    setShareResult(null);
    try {
      const trip = sessionStorage.getItem("currentTrip");
      if (!trip) return;
      const parsed = JSON.parse(trip);
      const tripIdToUse = tripId || parsed.id;

      const res = await fetch("/api/trip/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: tripIdToUse }),
      });

      if (res.ok) {
        const data = await res.json();
        const title =
          locale === "nb" ? "NordVoyager reiseplan" : "NordVoyager itinerary";
        const text =
          locale === "nb"
            ? `Sjekk ut min reiseplan til ${parsed.input?.startLocation || "Nord-Norge"}!`
            : `Check out my itinerary to ${parsed.input?.startLocation || "Northern Norway"}!`;

        if (navigator.share) {
          await navigator.share({ title, text, url: data.shareUrl });
        } else {
          await navigator.clipboard.writeText(data.shareUrl);
          setShareResult(t("sidebar.kopiert", locale));
          setTimeout(() => setShareResult(null), 3000);
        }
      } else {
        const baseUrl = window.location.origin;
        const title =
          locale === "nb" ? "NordVoyager reiseplan" : "NordVoyager itinerary";
        const text =
          locale === "nb"
            ? `Sjekk ut min reiseplan til ${parsed.input?.startLocation || "Nord-Norge"}!`
            : `Check out my itinerary to ${parsed.input?.startLocation || "Northern Norway"}!`;

        if (navigator.share) {
          await navigator.share({
            title,
            text,
            url: `${baseUrl}/planlegg/resultater`,
          });
        } else {
          await navigator.clipboard.writeText(`${baseUrl}/planlegg/resultater`);
          setShareResult(t("sidebar.kopiert", locale));
          setTimeout(() => setShareResult(null), 3000);
        }
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setSharing(false);
    }
  };

  const handleSave = async () => {
    if (!session?.user) return;
    setSaving(true);
    setSaveResult(null);
    try {
      const trip = sessionStorage.getItem("currentTrip");
      if (!trip) return;
      const parsed = JSON.parse(trip);

      const res = await fetch("/api/trip/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.input),
      });

      if (res.ok) {
        setSaveResult(t("sidebar.lagret", locale));
      } else {
        setSaveResult(t("sidebar.lagre-feilet", locale));
      }
    } catch {
      setSaveResult(t("sidebar.lagre-feilet", locale));
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Button variant="primary" size="sm" onClick={onRegenerate}>
        {t("itinerary.generer-pa-nytt", locale)}
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        {t("sidebar.eksporter-pdf", locale)}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        loading={sharing}
      >
        {shareResult || t("sidebar.del-lenke", locale)}
      </Button>
      {session?.user && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          loading={saving}
        >
          {saveResult || t("sidebar.lagre", locale)}
        </Button>
      )}
    </div>
  );
}
