import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { Star } from "@phosphor-icons/react";
import { reviews, type Review } from "../data/testimonials";

/* Amber is the review convention, not a second brand accent. It appears
   only here, on the rating. Figures are placeholders pending the real ones. */
function Rating() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} weight="fill" className="text-[#e8a317]" />
        ))}
      </span>
      <span className="text-sm text-slate">
        <span className="font-semibold text-ink">4.9</span> average rating
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className="mb-4 rounded-2xl border border-line bg-white/70 p-6">
      <blockquote className="text-[15px] leading-relaxed">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-royal-soft text-xs font-semibold text-royal">
          {initials}
        </span>
        <span className="text-sm">
          <span className="font-medium">{review.name}</span>
          <span className="block text-slate">
            {review.company}, {review.city}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* Split into columns that scroll as independent tracks. */
function column(offset: number, count: number) {
  return reviews.filter((_, i) => i % count === offset);
}

/*
  Vertical marquee. Reviews scroll upward continuously inside a bordered
  viewport, masked at both edges so they fade rather than cut. Constant
  motion, so the timing is linear. Hovering the viewport pauses it.
  Each column renders its list twice; the track travels exactly -50% so
  the second copy lands where the first began.
*/
function MarqueeColumn({
  offset,
  count,
  duration,
}: {
  offset: number;
  count: number;
  duration: string;
}) {
  const items = column(offset, count);
  return (
    <div className="marquee-track" style={{ animationDuration: duration }}>
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1}>
          {items.map((r) => (
            <ReviewCard key={`${copy}-${r.name}`} review={r} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    /* No top border: the demo section above fades out into cream, and a
       hairline there would put back the hard edge that fade removes. */
    <section className="border-b border-line bg-white/40 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Trusted by 120+ HVAC businesses
        </h2>
        <Rating />

        {reduce ? (
          <div className="mt-12 max-h-[600px] overflow-y-auto rounded-2xl border border-line p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.name} review={r} />
              ))}
            </div>
          </div>
        ) : (
          <div className="marquee-viewport mt-12 h-[520px] overflow-hidden md:h-[600px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MarqueeColumn offset={0} count={3} duration="64s" />
              <div className="hidden sm:block">
                <MarqueeColumn offset={1} count={3} duration="78s" />
              </div>
              <div className="hidden lg:block">
                <MarqueeColumn offset={2} count={3} duration="71s" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Link
            to="/testimonials"
            className="text-sm font-medium text-royal transition-colors hover:text-royal-deep"
          >
            Read all reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
