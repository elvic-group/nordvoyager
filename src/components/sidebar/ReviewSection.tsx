'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Button from '@/components/ui/Button';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

interface ReviewSectionProps {
  tripId: string;
}

export default function ReviewSection({ tripId }: ReviewSectionProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [authorName, setAuthorName] = useState(session?.user?.name || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?tripId=${tripId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tripId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId,
          authorName: authorName.trim(),
          rating,
          comment: comment.trim() || undefined,
          userId: session?.user?.id,
        }),
      });

      if (res.ok) {
        const newReview: Review = {
          id: Date.now().toString(),
          authorName: authorName.trim(),
          rating,
          comment: comment.trim() || undefined,
          createdAt: new Date().toISOString(),
        };
        setReviews((prev) => [newReview, ...prev]);
        setShowForm(false);
        setComment('');
      }
    } catch {
      console.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="border-t border-[#E0E2E5] pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-bold text-[#7A8A9A] uppercase tracking-wider">
          Anmeldelser
        </div>
        {reviews.length > 0 && (
          <div className="text-xs text-[#5A6A7A]">
            ★ {avgRating.toFixed(1)} ({reviews.length})
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-xs text-[#5A6A7A] py-2">Laster anmeldelser...</div>
      ) : reviews.length === 0 && !showForm ? (
        <div className="text-xs text-[#5A6A7A] py-2">
          Ingen anmeldelser enda. Bli den første til å vurdere denne reiseplanen!
        </div>
      ) : (
        <div className="space-y-2 mb-3 max-h-[200px] overflow-y-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#F8F8F8] rounded-[4px] p-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#15273F]">
                  {review.authorName}
                </span>
                <span className="text-[10px] text-[#D4A04A]">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              {review.comment && (
                <p className="text-[11px] text-[#5A6A7A] mt-0.5">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Ditt navn"
            className="w-full text-xs px-2 py-1.5 border border-[#E0E2E5] rounded-[4px] outline-none focus:border-[#E5212D] text-[#15273F]"
            required
          />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-sm ${star <= rating ? 'text-[#D4A04A]' : 'text-[#E0E2E5]'}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Din opplevelse (valgfritt)"
            rows={2}
            maxLength={500}
            className="w-full text-xs px-2 py-1.5 border border-[#E0E2E5] rounded-[4px] outline-none focus:border-[#E5212D] text-[#15273F] resize-none"
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" loading={submitting}>
              Send inn
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Avbryt
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
          ★ Vurder denne reisen
        </Button>
      )}
    </div>
  );
}
