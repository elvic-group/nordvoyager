"use client";

import { useLocale, t } from "@/lib/i18n";

export default function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="border-t border-[#E0E2E5] bg-[#F8F8F8] mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-6 text-xs text-[#5A6A7A] flex justify-between items-center">
        <span>
          © {new Date().getFullYear()} NordVoyager —{" "}
          {t("footer.copyright", locale)}
        </span>
        <span className="hidden sm:inline">{t("footer.tagline", locale)}</span>
      </div>
    </footer>
  );
}
