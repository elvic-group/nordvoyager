"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLocale, t } from "@/lib/i18n";
import { APP_NAME } from "@/lib/utils/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { locale, setLocale } = useLocale();
  const { data: session } = useSession();

  return (
    <nav
      className="bg-[#E5212D] text-white sticky top-0 z-50"
      role="navigation"
      aria-label="Hovednavigasjon"
    >
      <div className="max-w-[1200px] mx-auto px-4 h-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-opacity"
        >
          <span aria-hidden="true">✈️</span>
          <span>{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-3 text-xs font-medium">
          <Link href="/mine-reiser" className="hover:underline px-2 py-1">
            {t("nav.mine-reiser", locale)}
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-2">
              <span className="text-white/70 hidden sm:inline text-[10px]">
                {session.user.email || session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="hover:underline px-2 py-1"
                type="button"
              >
                {t("nav.logg-ut", locale)}
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="hover:underline px-2 py-1"
              type="button"
            >
              {t("nav.logg-inn", locale)}
            </button>
          )}

          <button
            onClick={() => {
              const newLocale = locale === "nb" ? "en" : "nb";
              setLocale(newLocale);
            }}
            className="text-[10px] font-bold px-1.5 py-1 rounded-[4px] border border-white/30 hover:bg-white/10 transition-colors"
            aria-label="Change language"
            type="button"
          >
            {locale === "nb" ? "EN" : "NO"}
          </button>
          <Link href="/planlegg">
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#c41d27] text-white hover:bg-[#a81820] border-0"
            >
              {t("nav.ny-reise", locale)}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
