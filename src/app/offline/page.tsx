import Container from '@/components/layout/Container';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <Container>
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-5xl mb-4">📡</div>
        <h1 className="text-xl font-bold text-[#15273F] mb-2">Ingen tilkobling</h1>
        <p className="text-sm text-[#5A6A7A] mb-6">
          Du er offline. Dine lagrede reiseplaner er fortsatt tilgjengelige.
        </p>
        <Link href="/" className="text-sm text-[#E5212D] hover:underline font-medium">
          Prøv igjen →
        </Link>
      </div>
    </Container>
  );
}
