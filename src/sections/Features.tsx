import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useInView,
  type MotionValue,
} from "motion/react";
import Orb from "../components/Orb";
import { useMediaQuery } from "../hooks/useMediaQuery";

const lines = [
  {
    lead: "Book faster.",
    body: "She gets the address, the unit, and what is wrong, then puts the job on your schedule.",
  },
  {
    lead: "Never miss an emergency.",
    body: "No heat, a gas smell, a leak. She knows what cannot wait and wakes your on-call tech.",
  },
  {
    lead: "Qualify leads on the call.",
    body: "Replacement inquiries get pre-qualified and pushed straight to your CRM.",
  },
];

const LABEL = "AI MAKING IT EASIER";

/* ---------------- Desktop: orb shrinks, lines surface beside it ---------------- */

function DesktopFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const orbScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.55]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.85]);

  const ranges: [number, number][] = [
    [0.15, 0.32],
    [0.38, 0.55],
    [0.6, 0.77],
  ];

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-16 grid h-[calc(100dvh-4rem)] grid-cols-[5fr_7fr] items-center gap-12 px-6">
        <motion.div style={{ scale: orbScale, opacity: orbOpacity }} className="flex justify-center">
          <Orb size="min(30vw, 340px)" />
        </motion.div>

        <div className="max-w-xl">
          <p
            className="text-[15px] font-bold uppercase tracking-[0.22em] text-ink lg:text-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {LABEL}
          </p>
          <div className="mt-8 space-y-10">
            {lines.map((line, i) => (
              <DesktopLine
                key={line.lead}
                line={line}
                progress={scrollYProgress}
                range={ranges[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopLine({
  line,
  progress,
  range,
}: {
  line: { lead: string; body: string };
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, [range[0], range[1]], [0.18, 1]);
  const y = useTransform(progress, [range[0], range[1]], [18, 0]);
  return (
    <motion.p style={{ opacity, y }} className="text-2xl leading-snug lg:text-[28px]">
      <span className="font-semibold">{line.lead}</span>{" "}
      <span className="text-slate">{line.body}</span>
    </motion.p>
  );
}

/* ---------------- Mobile: no orb, lines accumulate into a stack ---------------- */

/*
  The label leads at full size, then settles as the first line arrives.
  Each line enters in turn and stays, so the section builds a stack rather
  than swapping one line for another and leaving the screen empty. Only
  four discrete renders across the whole scroll, so this is state rather
  than a per-frame motion value. The group stays vertically centered as it
  grows, which is what removes the dead space.
*/
function MobileFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(0);
  /* Fires as the title scrolls into view, so it rises into place rather
     than being pre-painted and waiting there. */
  const entered = useInView(labelRef, { once: true, amount: 0.6 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* First line lands almost immediately, so the section responds to the
     very first flick rather than making the visitor scroll into a dead
     zone waiting for something to happen. The last line arrives at 0.68,
     leaving only a short hold before the section releases. */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.09 ? 0 : v < 0.42 ? 1 : v < 0.74 ? 2 : 3;
    setShown((prev) => (prev === next ? prev : next));
  });

  return (
    <div ref={ref} className="relative h-[170vh]">
      {/* The label is the section title: it arrives centred in the middle
          of the screen, then shrinks and rises to make room as the lines
          build beneath it. The lines themselves stay left aligned. */}
      <div
        className={`sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-start px-5 ${
          shown === 0 ? "justify-center" : "justify-start pt-12"
        }`}
      >
        <motion.p
          ref={labelRef}
          layout
          initial={{ opacity: 0, y: 34, scale: 0.88 }}
          animate={{
            opacity: entered ? 1 : 0,
            y: entered ? 0 : 34,
            scale: shown === 0 ? (entered ? 1 : 0.88) : 0.72,
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full origin-center whitespace-nowrap text-center text-[clamp(18px,5.4vw,23px)] font-bold uppercase leading-tight tracking-[0.14em] text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {LABEL}
        </motion.p>

        <motion.div layout className="mt-9 w-full max-w-sm space-y-7">
          {lines.slice(0, shown).map((line) => (
            <motion.p
              key={line.lead}
              layout
              initial={{ opacity: 0, y: 26, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="text-left text-[21px] leading-snug"
            >
              <span className="font-semibold">{line.lead}</span>{" "}
              <span className="text-slate">{line.body}</span>
            </motion.p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Reduced motion: plain stacked list ---------------- */

function StaticFeatures() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <p
          className="text-xl font-bold uppercase tracking-[0.2em] text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {LABEL}
        </p>
        <div className="mt-8 space-y-8">
          {lines.map((line) => (
            <p key={line.lead} className="text-xl leading-snug">
              <span className="font-semibold">{line.lead}</span>{" "}
              <span className="text-slate">{line.body}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (reduce) return <StaticFeatures />;

  /* Mounted conditionally, not hidden with CSS: the desktop branch owns a
     video that phones should never download. */
  return <section>{isDesktop ? <DesktopFeatures /> : <MobileFeatures />}</section>;
}
