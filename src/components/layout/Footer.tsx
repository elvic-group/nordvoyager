export default function Footer() {
  return (
    <footer className="border-t border-[#E0E2E5] bg-[#F8F8F8] mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-6 text-xs text-[#5A6A7A] flex justify-between items-center">
        <span>© {new Date().getFullYear()} NordVoyager — AI-drevet reiseplanlegger for Nord-Norge</span>
        <span className="hidden sm:inline">🌍 Planlagt med ❤️ for arktiske eventyr</span>
      </div>
    </footer>
  );
}
