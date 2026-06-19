export function formatCurrency(kr: number): string {
  return `${kr.toLocaleString('nb-NO')} kr`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('nb-NO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function formatTemp(celsius: number): string {
  return `${Math.round(celsius)} °C`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)} %`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function generateId(): string {
  return `trip_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
