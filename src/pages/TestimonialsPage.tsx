import { Link } from "react-router-dom";
import { reviews } from "../data/testimonials";

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
        What HVAC owners say
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate">
        From solo operators to ten-truck shops, on what changed when every
        call started getting answered.
      </p>

      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {reviews.map((r) => (
          <figure key={r.name} className="mb-5 break-inside-avoid rounded-2xl border border-line bg-white/60 p-6">
            <blockquote className="text-[15px] leading-relaxed">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-medium">{r.name}</span>
              <span className="block text-slate">
                {r.company}, {r.city}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-royal px-7 py-8 text-center text-cream md:py-10">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Hear it on your own phone line
        </h2>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-full bg-cream px-7 py-3.5 font-semibold text-royal transition-transform active:scale-[0.98]"
        >
          Book Free Audit
        </Link>
      </div>
    </div>
  );
}
