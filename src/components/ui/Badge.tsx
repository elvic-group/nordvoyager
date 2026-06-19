interface BadgeProps {
  label: string;
  active?: boolean;
  color?: 'red' | 'navy' | 'grey';
  onClick?: () => void;
}

const colorMap = {
  red: 'bg-[#E5212D] text-white',
  navy: 'bg-[#15273F] text-white',
  grey: 'bg-[#F0F1F3] text-[#5A6A7A]',
};

export default function Badge({ label, active = false, color = 'grey', onClick }: BadgeProps) {
  const classes = active ? colorMap[color] : colorMap.grey;
  return (
    <span
      onClick={onClick}
      className={`inline-block px-3 py-1 rounded-[4px] text-xs font-medium transition-colors ${classes} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {label}
    </span>
  );
}
