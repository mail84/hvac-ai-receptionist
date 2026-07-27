import { Check, X } from "@phosphor-icons/react";
import BookButton from "../components/BookButton";

/*
  Head-to-head comparison. Each capability is one row read straight across:
  what hiring staff gives you, and what the receptionist gives you. The
  incumbent column is muted so the eye lands on the royal column.
*/
const rows: { label: string; staff: boolean; ai: boolean }[] = [
  { label: "Answers after hours and weekends", staff: false, ai: true },
  { label: "Never sick, never on vacation", staff: false, ai: true },
  { label: "Books jobs into your calendar", staff: false, ai: true },
  { label: "Updates your CRM after every call", staff: false, ai: true },
  { label: "No payroll or paperwork", staff: false, ai: true },
  { label: "Answers every call on the first ring", staff: false, ai: true },
];

function Mark({ on, muted }: { on: boolean; muted?: boolean }) {
  return on ? (
    <Check
      size={22}
      weight="bold"
      className={muted ? "text-slate/40" : "text-royal"}
      aria-label="Yes"
    />
  ) : (
    <X size={22} weight="bold" className="text-slate/35" aria-label="No" />
  );
}

export default function CostCompare() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-[8vw] font-semibold leading-tight tracking-tight sm:text-5xl md:text-7xl">
          AI vs. Hiring Staff
        </h2>

        <div className="mt-14">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_4.2rem_4.2rem] items-end gap-2 pb-4 sm:grid-cols-[1fr_9rem_9rem] sm:gap-4">
            <span />
            <span className="text-center text-[11px] font-medium uppercase tracking-wider text-slate/70 sm:text-sm sm:normal-case sm:tracking-normal">
              Hiring staff
            </span>
            <span className="text-center text-[11px] font-semibold uppercase tracking-wider text-royal sm:text-sm sm:normal-case sm:tracking-normal">
              Our AI
            </span>
          </div>

          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_4.2rem_4.2rem] items-center gap-2 border-t border-line py-4 sm:grid-cols-[1fr_9rem_9rem] sm:gap-4 sm:py-5"
            >
              <span className="text-[15px] leading-snug sm:text-[17px]">{row.label}</span>
              <span className="flex justify-center">
                <Mark on={row.staff} />
              </span>
              <span className="flex justify-center">
                <Mark on={row.ai} />
              </span>
            </div>
          ))}

          {/* Cost carries figures rather than marks. */}
          <div className="grid grid-cols-[1fr_4.2rem_4.2rem] items-center gap-2 border-t border-line py-5 sm:grid-cols-[1fr_9rem_9rem] sm:gap-4">
            <span className="text-[15px] font-semibold sm:text-[17px]">Cost per month</span>
            <span className="text-center text-[15px] font-semibold text-slate/70 sm:text-lg">
              $9,000
            </span>
            <span className="text-center text-[15px] font-semibold text-royal sm:text-lg">
              $500
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-royal px-7 py-6 text-cream md:flex-row md:px-8">
          <p className="text-lg font-medium md:text-xl">
            Around <span className="font-semibold">$200,000 saved per year</span> with our
            AI system in place.
          </p>
          <BookButton className="shrink-0 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-royal transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]" />
        </div>
      </div>
    </section>
  );
}
