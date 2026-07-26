import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

const faqs = [
  {
    q: "How is this different from a call center?",
    a: "A call center puts your customers in a hold queue and reads from a script. Sarah answers on the first ring, knows HVAC, books the job directly into your calendar, and costs a flat monthly rate instead of per-minute fees.",
  },
  {
    q: "What is an HVAC AI answering service?",
    a: "Software that answers your business line with a natural voice, around the clock. It captures the caller's address, unit type, and symptoms, then schedules the visit or routes urgent issues to your on-call tech.",
  },
  {
    q: "How does it work?",
    a: "Your number stays the same. When a call comes in that your team cannot take, Sarah picks up, asks one question at a time, and either books the job or escalates it. You get a clean summary of every call.",
  },
  {
    q: "Can it handle multiple languages?",
    a: "Yes. Sarah detects the caller's language and switches automatically, so Spanish-speaking customers get helped in Spanish without pressing anything.",
  },
  {
    q: "Will it replace my office staff?",
    a: "No. It catches the calls your team cannot get to: after hours, during lunch, when everyone is on another line. Your staff keeps doing what they do, with fewer interruptions.",
  },
  {
    q: "What measurable benefits can I expect?",
    a: "Every call, booking, and escalation is logged, so you can see exactly how many after-hours and overflow calls turned into scheduled jobs instead of voicemails.",
  },
  {
    q: "Is it secure?",
    a: "Yes. Calls are encrypted, customer information stays in your account, and you control what is kept and for how long.",
  },
  {
    q: "What does it cost?",
    a: "A flat $500 per month. No per-call fees, no contracts with a call center, no payroll. Compare that to staffing a desk around the clock.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-medium md:text-lg">{q}</span>
        <CaretDown
          size={18}
          className={`shrink-0 text-royal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-6 pr-8 text-[15px] leading-relaxed text-slate">{a}</p>}
    </div>
  );
}

export default function Faq() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-10">
          {faqs.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
