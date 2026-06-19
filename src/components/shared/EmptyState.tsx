interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="text-lg font-bold text-[#15273F] mb-1">{title}</div>
      <p className="text-sm text-[#5A6A7A] mb-4">{description}</p>
      {action}
    </div>
  );
}
