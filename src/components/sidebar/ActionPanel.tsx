"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

interface ActionPanelProps {
  onRegenerate: () => void;
  tripId?: string;
}

export default function ActionPanel({
  onRegenerate,
  tripId,
}: ActionPanelProps) {
  const { data: session } = useSession();
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

      // Try creating a share token via API
      const res = await fetch("/api/trip/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId: tripIdToUse }),
      });

      if (res.ok) {
        const data = await res.json();
        if (navigator.share) {
          await navigator.share({
            title: "NordVoyager reiseplan",
            text: `Sjekk ut min reiseplan til ${parsed.input?.startLocation || "Nord-Norge"}!`,
            url: data.shareUrl,
          });
        } else {
          await navigator.clipboard.writeText(data.shareUrl);
          setShareResult("✅ Kopiert!");
          setTimeout(() => setShareResult(null), 3000);
        }
      } else {
        // Fallback to basic share
        const baseUrl = window.location.origin;
        if (navigator.share) {
          await navigator.share({
            title: "NordVoyager reiseplan",
            text: `Sjekk ut min reiseplan til ${parsed.input?.startLocation || "Nord-Norge"}!`,
            url: `${baseUrl}/planlegg/resultater`,
          });
        } else {
          await navigator.clipboard.writeText(`${baseUrl}/planlegg/resultater`);
          setShareResult("✅ Kopiert!");
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
        setSaveResult("✅ Lagret!");
        setTimeout(() => setSaveResult(null), 3000);
      } else {
        setSaveResult("❌ Kunne ikke lagre");
      }
    } catch {
      setSaveResult("❌ Kunne ikke lagre");
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
        ↻ Generer på nytt
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        📤 Eksporter PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        loading={sharing}
      >
        {shareResult || "🔗 Del lenke"}
      </Button>
      {session?.user && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          loading={saving}
        >
          {saveResult || "💾 Lagre reise"}
        </Button>
      )}
    </div>
  );
}
