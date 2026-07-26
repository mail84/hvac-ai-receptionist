import { PhoneCall } from "@phosphor-icons/react";
import Orb from "../components/Orb";

/*
  Demo centerpiece: the orb alone, one action under it. The call button is
  a stub until the live demo line is wired up.

  The section carries a soft royal wash that starts and ends fully
  transparent, so it emerges out of the cream above it and dissolves back
  into the cream below rather than starting on a visible edge. A second
  radial sits behind the orb so the glow reads as coming off the orb
  itself.
*/
export default function Demo() {
  return (
    <section id="demo" className="relative scroll-mt-16 overflow-hidden py-14 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,241,251,0) 0%, rgba(238,241,251,0.55) 22%, rgba(238,241,251,0.8) 50%, rgba(238,241,251,0.5) 78%, rgba(238,241,251,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(39,74,179,0.13) 0%, rgba(39,74,179,0.05) 42%, rgba(39,74,179,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Call our AI voice agent live.
        </h2>
        <div className="mt-10 md:mt-14">
          <Orb />
        </div>
        <button
          type="button"
          className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-royal px-7 py-3.5 font-medium text-cream transition-transform duration-150 ease-[var(--ease-out)] hover:bg-royal-deep active:scale-[0.97] md:mt-14"
        >
          <PhoneCall size={19} weight="fill" />
          Call Agent
        </button>
      </div>
    </section>
  );
}
