import { AuroraForecast } from '@/lib/types';

const probabilityColors: Record<string, string> = {
  Excellent: 'text-green-700 bg-green-100',
  Good: 'text-[#2A7A4A] bg-[#D0F0D8]',
  Fair: 'text-[#C07A2A] bg-[#F8E8C0]',
  Poor: 'text-[#7A8A9A] bg-[#F0F1F3]',
};

interface AuroraBadgeProps {
  forecast: AuroraForecast;
}

export default function AuroraBadge({ forecast }: AuroraBadgeProps) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] ${probabilityColors[forecast.probability]}`}>
        KP-{forecast.kpIndex} · {forecast.probability}
      </span>
      {forecast.cloudCover !== undefined && (
        <span className="text-[10px] text-[#7A8A9A]">
          Skydekke {forecast.cloudCover}%
        </span>
      )}
    </div>
  );
}
