import { PackingItem } from '@/lib/types';

export function generatePackingList(
  season: string,
  interests: string[]
): PackingItem[] {
  const items: PackingItem[] = [
    { name: 'Pass/reise dokumenter', category: 'documents', requiredFor: ['all'] },
    { name: 'Reiseforsikring', category: 'documents', requiredFor: ['all'] },
    { name: 'Lader og kabler', category: 'tech', requiredFor: ['all'] },
    { name: 'Toalettsaker', category: 'accessories', requiredFor: ['all'] },
  ];

  if (season === 'winter' || season === 'autumn') {
    items.push(
      { name: 'Ullundertøy', category: 'clothing', requiredFor: [season] },
      { name: 'Fleece mellomlag', category: 'clothing', requiredFor: [season] },
      { name: 'Vindtett jakke', category: 'clothing', requiredFor: [season] },
      { name: 'Lue og hansker', category: 'clothing', requiredFor: [season] },
      { name: 'Vinterstøvler', category: 'footwear', requiredFor: [season] },
    );
  }

  if (season === 'summer' || season === 'spring') {
    items.push(
      { name: 'Regnjakke', category: 'clothing', requiredFor: [season] },
      { name: 'Fotturstøvler', category: 'footwear', requiredFor: [season] },
      { name: 'Myggmiddel', category: 'accessories', requiredFor: ['summer'] },
    );
  }

  if (interests.includes('photography')) {
    items.push(
      { name: 'Kamera', category: 'tech', requiredFor: ['photography'] },
      { name: 'Statif', category: 'tech', requiredFor: ['photography'] },
      { name: 'Ekstra batterier', category: 'tech', requiredFor: ['photography'] },
    );
  }

  return items;
}
