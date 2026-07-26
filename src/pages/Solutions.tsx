import { Link } from "react-router-dom";
import { CalendarCheck, Siren, UserCheck } from "@phosphor-icons/react";
import Orb from "../components/Orb";

const solutions = [
  {
    icon: CalendarCheck,
    title: "Book service calls without phone tag",
    body: "Sarah captures the address, unit type, symptoms, and preferred times, then writes the job straight into your calendar. Your dispatcher opens the morning schedule and the work is already there.",
  },
  {
    icon: Siren,
    title: "Cover every emergency, around the clock",
    body: "No-heat in January, a gas smell, a water leak: Sarah recognizes urgent calls, gives clear safety guidance, and escalates to your on-call tech with a concise incident summary.",
  },
  {
    icon: UserCheck,
    title: "Qualify replacement leads on the first call",
    body: "Install inquiries get asked about home size, equipment age, and timeline. Qualified leads land in your CRM with full call notes, ready for your comfort advisor to close.",
  },
];

export default function Solutions() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-[7fr_5fr]">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            One receptionist, three jobs done
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate">
            Everything Sarah does maps to a call your business is losing today.
          </p>
        </div>
        <div className="hidden justify-center md:flex">
          <Orb size="260px" />
        </div>
      </div>

      <div className="mt-16 space-y-4">
        {solutions.map((s) => (
          <div
            key={s.title}
            className="grid gap-4 rounded-2xl border border-line bg-white/50 p-7 md:grid-cols-[auto_1fr] md:gap-6 md:p-9"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-soft">
              <s.icon size={24} className="text-royal" />
            </span>
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">{s.title}</h2>
              <p className="mt-2.5 max-w-2xl leading-relaxed text-slate">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          to="/contact"
          className="inline-block rounded-full bg-royal px-8 py-4 font-medium text-cream transition-[background-color,transform] hover:bg-royal-deep active:scale-[0.98]"
        >
          Book a Demo
        </Link>
      </div>
    </div>
  );
}
