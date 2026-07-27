import { Star } from "@phosphor-icons/react";
import type { Review } from "../data/testimonials";

/* Amber is the review convention, not a second brand accent. It appears
   only on ratings. */
export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          weight="fill"
          className={i < rating ? "text-[#e8a317]" : "text-line"}
          aria-hidden
        />
      ))}
    </span>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="mb-4 break-inside-avoid rounded-2xl border border-line bg-white/70 p-6">
      <Stars rating={review.rating} />
      <blockquote className="mt-3 text-[15px] leading-relaxed">
        {review.quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-royal-soft text-xs font-semibold text-royal">
          {initials}
        </span>
        <span className="text-sm">
          <span className="font-medium">{review.name}</span>
          <span className="block text-slate">{review.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}
