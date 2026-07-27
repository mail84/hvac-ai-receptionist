import { PhoneCall } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Orb from "../components/Orb";
import { PHONE_HREF, PHONE_DISPLAY } from "../config";

/*
  Demo centerpiece: the orb alone, one action under it. The call button is
  a stub until the live demo line is wired up.

  The section carries a soft royal wash that starts and ends fully
  transparent, so it emerges out of the cream above it and dissolves back
  into the cream below rather than starting on a visible edge. A second
  radial sits behind the orb so the glow reads as coming off the orb
  itself.

  On phones it is pulled up under the feature section, which is pinned to
  a full viewport and therefore leaves height below its last line that no
  amount of padding can reclaim. Heading, orb, and button then rise in
  sequence as the section arrives, so the space reads as an entrance
  rather than a gap.
*/
const rise = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
};

const ease = [0.23, 1, 0.32, 1] as const;

export default function Demo() {
  const reduce = useReducedMotion();
  const anim = reduce ? {} : rise;

  return (
    <section
      id="demo"
      className="relative scroll-mt-16 overflow-hidden pb-16 pt-4 md:pb-28 md:pt-24"
    >
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
        <motion.h2
          {...anim}
          transition={{ duration: 0.85, ease }}
          className="text-center text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Call our AI voice agent live.
        </motion.h2>

        <motion.div
          {...anim}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="mt-9 md:mt-14"
        >
          <Orb />
        </motion.div>

        <motion.a
          {...anim}
          transition={{ duration: 0.8, delay: 0.24, ease }}
          href={PHONE_HREF}
          className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-royal px-7 py-3.5 font-medium text-cream transition-transform duration-150 ease-[var(--ease-out)] hover:bg-royal-deep active:scale-[0.97] md:mt-14"
        >
          <PhoneCall size={19} weight="fill" />
          Call Agent
        </motion.a>
        <p className="mt-4 text-sm text-slate">{PHONE_DISPLAY}</p>
      </div>
    </section>
  );
}
