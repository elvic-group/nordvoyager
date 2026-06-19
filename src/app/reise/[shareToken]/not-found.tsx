import Container from '@/components/layout/Container';
import Link from 'next/link';

export default function SharedTripNotFound() {
  return (
    <Container>
      <div className="max-w-md mx-auto text-center py-12">
        <div className="text-4xl mb-3">🔗</div>
        <h1 className="text-lg font-bold text-[#15273F] mb-1">Reiseplan ikke funnet</h1>
        <p className="text-sm text-[#5A6A7A] mb-4">
          Denne delte reiseplanen finnes ikke lenger eller lenken er ugyldig.
        </p>
        <Link href="/" className="text-sm text-[#E5212D] hover:underline font-medium">
          Gå til forsiden →
        </Link>
      </div>
    </Container>
  );
}
