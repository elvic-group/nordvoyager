'use client';

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export default function Tag({ label, active = false, onClick, size = 'sm', className = '' }: TagProps) {
  const base = 'rounded-[4px] font-medium transition-colors duration-150 inline-block';
  const activeClass = active
    ? 'bg-[#E5212D] text-white'
    : 'bg-[#F0F1F3] text-[#5A6A7A] hover:bg-[#E0E2E5] cursor-pointer';
  const sizeClass = size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm';

  return (
    <span
      onClick={onClick}
      className={`${base} ${active ? activeClass : onClick ? activeClass : 'bg-[#F0F1F3] text-[#5A6A7A]'} ${sizeClass} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {label}
    </span>
  );
}
