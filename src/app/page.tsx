'use client';

import Link from 'next/link';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import { APP_TAGLINE, APP_DESCRIPTION } from '@/lib/utils/constants';

const FEATURES = [
  { emoji: '🌌', title: 'Nordlys-sporing', desc: 'KP-indeks og skydekke-prognoser for beste fotosjanse' },
  { emoji: '🗺️', title: 'Sesongtilpasset', desc: 'Aktiviteter filtrert etter årstid — midnattssol eller polarnatt' },
  { emoji: '💰', title: 'Budsjettkontroll', desc: 'Gjennomsiktige priser med totaloversikt i NOK' },
  { emoji: '🧳', title: 'Pakkliste', desc: 'Skreddersydd for arktiske forhold og dine aktiviteter' },
];

const DESTINATIONS = [
  { city: 'Tromsø', desc: 'Nordlyshovedstaden', emoji: '🌌' },
  { city: 'Lofoten', desc: 'Dramatiske fjell og fiskevær', emoji: '⛰️' },
  { city: 'Senja', desc: 'Norges vakreste øy', emoji: '🏝️' },
  { city: 'Alta', desc: 'Helleristninger og hundekjøring', emoji: '🐕' },
];

export default function Home() {
  return (
    <Container>
      {/* Hero */}
      <section className="py-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#15273F] leading-tight">
          {APP_TAGLINE}
        </h1>
        <p className="text-sm text-[#5A6A7A] mt-3 leading-relaxed">
          {APP_DESCRIPTION}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/planlegg">
            <Button size="lg">Planlegg din reise →</Button>
          </Link>
        </div>
      </section>

      {/* Destinations */}
      <section className="mb-12">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-3">
          Populære destinasjoner
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DESTINATIONS.map((d) => (
            <div key={d.city} className="bg-white border border-[#E0E2E5] rounded-[4px] p-4 text-center hover:border-[#E5212D]/30 transition-colors">
              <div className="text-2xl mb-1">{d.emoji}</div>
              <div className="font-semibold text-sm text-[#15273F]">{d.city}</div>
              <div className="text-xs text-[#5A6A7A] mt-0.5">{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-3">
          Hvorfor NordVoyager?
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-[#E0E2E5] rounded-[4px] p-4">
              <div className="text-xl mb-2">{f.emoji}</div>
              <div className="font-semibold text-sm text-[#15273F]">{f.title}</div>
              <div className="text-xs text-[#5A6A7A] mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interest tags preview */}
      <section className="mb-12">
        <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-3">
          Opplevelser vi kan planlegge
        </div>
        <div className="flex flex-wrap gap-2">
          {['🌌 Nordlys', '🐕 Hundekjøring', '⛰️ Fjelltur', '🐋 Hvalsafari', '🏕️ Samisk kultur', '🚢 Fjordcruise', '📷 Fotografering', '🍽️ Lokal mat'].map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 border-t border-[#E0E2E5]">
        <p className="text-sm text-[#5A6A7A] mb-4">
          Klar for ditt neste arktiske eventyr?
        </p>
        <Link href="/planlegg">
          <Button size="lg">Start planleggingen</Button>
        </Link>
      </section>
    </Container>
  );
}
