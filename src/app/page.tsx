"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { useLocale, t } from "@/lib/i18n";

export default function Home() {
  const { locale } = useLocale();

  const features =
    locale === "nb"
      ? [
          {
            emoji: "🌌",
            title: "Nordlys-sporing",
            desc: "KP-indeks og skydekke-prognoser for beste fotosjanse",
          },
          {
            emoji: "🗺️",
            title: "Sesongtilpasset",
            desc: "Aktiviteter filtrert etter årstid — midnattssol eller polarnatt",
          },
          {
            emoji: "💰",
            title: "Budsjettkontroll",
            desc: "Gjennomsiktige priser med totaloversikt i NOK",
          },
          {
            emoji: "🧳",
            title: "Pakkliste",
            desc: "Skreddersydd for arktiske forhold og dine aktiviteter",
          },
        ]
      : [
          {
            emoji: "🌌",
            title: "Aurora tracking",
            desc: "KP index and cloud cover forecasts for the best photo opportunities",
          },
          {
            emoji: "🗺️",
            title: "Season-tailored",
            desc: "Activities filtered by season — midnight sun or polar night",
          },
          {
            emoji: "💰",
            title: "Budget control",
            desc: "Transparent pricing with a full overview in NOK",
          },
          {
            emoji: "🧳",
            title: "Packing list",
            desc: "Tailored for Arctic conditions and your activities",
          },
        ];

  const destinations =
    locale === "nb"
      ? [
          { city: "Tromsø", desc: "Nordlyshovedstaden", emoji: "🌌" },
          {
            city: "Lofoten",
            desc: "Dramatiske fjell og fiskevær",
            emoji: "⛰️",
          },
          { city: "Senja", desc: "Norges vakreste øy", emoji: "🏝️" },
          {
            city: "Alta",
            desc: "Helleristninger og hundekjøring",
            emoji: "🐕",
          },
        ]
      : [
          { city: "Tromsø", desc: "The northern lights capital", emoji: "🌌" },
          {
            city: "Lofoten",
            desc: "Dramatic mountains and fishing villages",
            emoji: "⛰️",
          },
          {
            city: "Senja",
            desc: "Norway's most beautiful island",
            emoji: "🏝️",
          },
          { city: "Alta", desc: "Rock carvings and dog sledding", emoji: "🐕" },
        ];

  const interestTags =
    locale === "nb"
      ? [
          "🌌 Nordlys",
          "🐕 Hundekjøring",
          "⛰️ Fjelltur",
          "🐋 Hvalsafari",
          "🏕️ Samisk kultur",
          "🚢 Fjordcruise",
          "📷 Fotografering",
          "🍽️ Lokal mat",
        ]
      : [
          "🌌 Northern lights",
          "🐕 Dog sledding",
          "⛰️ Hiking",
          "🐋 Whale safari",
          "🏕️ Sami culture",
          "🚢 Fjord cruise",
          "📷 Photography",
          "🍽️ Local food",
        ];

  return (
    <Container>
      <section className="py-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#15273F] leading-tight">
          {t("app.tagline", locale)}
        </h1>
        <p className="text-sm text-[#5A6A7A] mt-3 leading-relaxed">
          {t("app.description", locale)}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/planlegg">
            <Button size="lg">{t("landing.planlegg", locale)}</Button>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-3">
          {t("landing.populaere", locale)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {destinations.map((destination) => (
            <div
              key={destination.city}
              className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 text-center hover:border-[#E5212D]/30 transition-colors"
            >
              <div className="text-2xl mb-1">{destination.emoji}</div>
              <div className="font-semibold text-sm text-[#15273F]">
                {destination.city}
              </div>
              <div className="text-xs text-[#5A6A7A] mt-0.5">
                {destination.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-3">
          {t("landing.hvorfor", locale)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-[#E0E2E5] rounded-[4px] p-4"
            >
              <div className="text-xl mb-2">{feature.emoji}</div>
              <div className="font-semibold text-sm text-[#15273F]">
                {feature.title}
              </div>
              <div className="text-xs text-[#5A6A7A] mt-1">{feature.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-3">
          {t("landing.opplevelser", locale)}
        </div>
        <div className="flex flex-wrap gap-2">
          {interestTags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </section>

      <section className="text-center py-8 border-t border-[#E0E2E5]">
        <p className="text-sm text-[#5A6A7A] mb-4">
          {t("landing.klar", locale)}
        </p>
        <Link href="/planlegg">
          <Button size="lg">{t("landing.start", locale)}</Button>
        </Link>
      </section>
    </Container>
  );
}
