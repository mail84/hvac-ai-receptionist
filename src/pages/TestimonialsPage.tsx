import { useEffect, useState, type FormEvent } from "react";
import { Star, CheckCircle } from "@phosphor-icons/react";
import { reviews as seedReviews, type Review } from "../data/testimonials";
import ReviewCard, { Stars } from "../components/ReviewCard";
import BookButton from "../components/BookButton";

const STORAGE_KEY = "leaddigital.reviews.v1";

/*
  Reviews left here are kept in this browser only. There is no backend yet,
  so they are visible to the person who wrote them and nobody else, and
  they do not survive clearing site data. Point this at a real endpoint
  before treating it as a review collection tool.
*/
function loadSubmitted(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            aria-pressed={value === n}
            className="rounded p-0.5 transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.9]"
          >
            <Star
              size={30}
              weight={n <= shown ? "fill" : "regular"}
              className={n <= shown ? "text-[#e8a317]" : "text-slate/40"}
            />
          </button>
        );
      })}
    </div>
  );
}

function LeaveReview({ onAdd }: { onAdd: (r: Review) => void }) {
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const quote = String(data.get("quote") ?? "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Please add your name.";
    if (!company) next.company = "Please add your company.";
    if (quote.length < 10) next.quote = "Please write at least a sentence.";
    if (!rating) next.rating = "Please pick a star rating.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onAdd({ name, company, quote, rating });
    form.reset();
    setRating(0);
    setDone(true);
    window.setTimeout(() => setDone(false), 4000);
  }

  return (
    <div className="rounded-2xl border border-line bg-white/70 p-6 md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">Rate us</h2>
      <p className="mt-2 text-slate">
        Worked with us? Leave a review and it appears below.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Your rating</span>
          <StarPicker value={rating} onChange={setRating} />
          {errors.rating && (
            <p className="text-[13px] font-medium text-cost-red">{errors.rating}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" name="name" error={errors.name} />
          <Field label="Company" name="company" error={errors.company} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="quote" className="text-sm font-medium">
            Your review
          </label>
          <textarea
            id="quote"
            name="quote"
            rows={4}
            aria-invalid={!!errors.quote}
            className={`rounded-lg border bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/25 ${
              errors.quote ? "border-cost-red" : "border-line"
            }`}
          />
          {errors.quote && (
            <p className="text-[13px] font-medium text-cost-red">{errors.quote}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="rounded-full bg-royal px-7 py-3.5 font-medium text-cream transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-royal-deep active:scale-[0.97]"
          >
            Post review
          </button>
          {done && (
            <span className="flex items-center gap-2 text-sm font-medium text-royal">
              <CheckCircle size={18} weight="fill" />
              Thanks, it is showing below.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  error,
}: {
  label: string;
  name: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        className={`rounded-lg border bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/25 ${
          error ? "border-cost-red" : "border-line"
        }`}
      />
      {error && <p className="text-[13px] font-medium text-cost-red">{error}</p>}
    </div>
  );
}

export default function TestimonialsPage() {
  const [submitted, setSubmitted] = useState<Review[]>([]);

  useEffect(() => {
    setSubmitted(loadSubmitted());
  }, []);

  function addReview(r: Review) {
    setSubmitted((prev) => {
      const next = [r, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage full or blocked; the review still shows for this visit */
      }
      return next;
    });
  }

  const all = [...submitted, ...seedReviews];
  const average =
    Math.round((all.reduce((sum, r) => sum + r.rating, 0) / all.length) * 10) / 10;

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
        What HVAC owners say
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Stars rating={Math.round(average)} size={22} />
        <span className="text-slate">
          <span className="font-semibold text-ink">{average.toFixed(1)}</span> average
          from {all.length} reviews
        </span>
      </div>

      <div className="mt-10">
        <LeaveReview onAdd={addReview} />
      </div>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {all.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-royal px-7 py-8 text-center text-cream md:py-10">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Hear it on your own phone line
        </h2>
        <BookButton className="mt-6 inline-block rounded-full bg-cream px-7 py-3.5 font-semibold text-royal transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]" />
      </div>
    </div>
  );
}
