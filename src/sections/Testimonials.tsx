import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { reviews } from "../data/testimonials";
import ReviewCard, { Stars } from "../components/ReviewCard";

/* The home page shows the most textured reviews, which sit at the top of
   the list. The rest live on the testimonials page. */
const FEATURED = reviews.slice(0, 24);

function column(offset: number, count: number) {
  return FEATURED.filter((_, i) => i % count === offset);
}

function MarqueeColumn({ offset, count, duration }: { offset: number; count: number; duration: string }) {
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
    <section className="border-b border-line bg-white/40 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Trusted by 120+ HVAC businesses
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <Stars rating={5} size={20} />
          <span className="text-sm text-slate">
            <span className="font-semibold text-ink">4.9</span> average rating
          </span>
        </div>

        {reduce ? (
          <div className="mt-12 max-h-[600px] overflow-y-auto rounded-2xl border border-line p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED.map((r) => (
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
