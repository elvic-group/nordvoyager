'use client';

import { useState, useRef, useEffect } from 'react';
import { Activity, AuroraForecast } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatters';
import AuroraBadge from './AuroraBadge';

interface ActivityPopoverProps {
  activity: Activity;
  children: React.ReactNode;
}

export default function ActivityPopover({ activity, children }: ActivityPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const categoryLabels: Record<string, string> = {
    transport: '🚗 Transport',
    accommodation: '🏨 Overnatting',
    food: '🍽️ Mat',
    outdoor: '⛰️ Utendørs',
    culture: '🏛️ Kultur',
    aurora: '🌌 Nordlys',
    photography: '📷 Foto',
    other: '📍 Annet',
  };

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {children}
      </div>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E0E2E5] rounded-[4px] p-3 shadow-lg z-20 text-xs" role="dialog" aria-label="Aktivitetsdetaljer">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-semibold text-sm text-[#15273F]">{activity.title}</div>
              <div className="text-[10px] text-[#5A6A7A] mt-0.5">{categoryLabels[activity.category] || activity.category}</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#7A8A9A] hover:text-[#15273F] text-sm leading-none" aria-label="Lukk">✕</button>
          </div>
          
          <p className="text-xs text-[#5A6A7A] mb-2">{activity.description}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <div><span className="text-[#7A8A9A]">Tid:</span> <span className="font-medium text-[#15273F]">{activity.time}</span></div>
            <div><span className="text-[#7A8A9A]">Sted:</span> <span className="font-medium text-[#15273F]">{activity.location}</span></div>
            {activity.price && (
              <div><span className="text-[#7A8A9A]">Pris:</span> <span className="font-medium text-[#E5212D]">{formatCurrency(activity.price)}</span></div>
            )}
            <div>
              <span className="text-[#7A8A9A]">Status:</span>
              <span className={`font-medium ml-0.5 ${activity.bookingStatus === 'booked' ? 'text-[#2A7A4A]' : 'text-[#5A6A7A]'}`}>
                {activity.bookingStatus === 'booked' ? 'Bestilt' : activity.bookingStatus === 'recommended' ? 'Anbefalt' : 'Ikke booket'}
              </span>
            </div>
          </div>

          {activity.auroraForecast && (
            <div className="mt-2 pt-2 border-t border-[#E0E2E5]">
              <AuroraBadge forecast={activity.auroraForecast} />
            </div>
          )}

          {activity.tags.length > 0 && (
            <div className="mt-2 pt-2 border-t border-[#E0E2E5] flex flex-wrap gap-1">
              {activity.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 bg-[#F0F1F3] rounded-[4px] text-[10px] text-[#5A6A7A]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
