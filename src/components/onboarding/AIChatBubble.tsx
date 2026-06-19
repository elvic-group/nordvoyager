interface AIChatBubbleProps {
  message: string;
}

export default function AIChatBubble({ message }: AIChatBubbleProps) {
  return (
    <div className="mt-4 p-3 bg-[#F0F1F3] rounded-[4px] border border-[#E0E2E5]">
      <div className="text-[10px] font-bold text-[#5A6A7A] uppercase tracking-wider mb-1">
        Agent
      </div>
      <div className="text-xs text-[#5A6A7A] leading-relaxed">
        💬 {message}
      </div>
    </div>
  );
}
