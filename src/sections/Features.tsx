import { useEffect, useRef, useState } from "react";
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
    body: "AI gets the contact info, the address, and what is wrong, then puts the job on your schedule.",
  },
  {
    lead: "Never miss an emergency.",
    body: "No heat, a gas smell, a leak. She knows what cannot wait and wakes your on call tech.",
  },
  {
    lead: "Qualify leads on the call.",
    body: "Replacement inquiries get pre-qualified and pushed straight to your CRM.",
  },
];

const LABEL = "AI MAKING IT EASIER";

/* Breathing room left between the last feature line and the section that
   follows it, on phones. */
const GAP_BELOW = 40;

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
    [0.14, 0.34],
    [0.4, 0.6],
    [0.66, 0.86],
  ];

  return (
    <div ref={ref} className="relative h-[300vh]">
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
          <div className="mt-8 space-y-9">
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

/* ---------------- Mobile: title rises, then the stack builds ---------------- */

/*
  The title's travel from centre to top is driven straight off scroll
  position rather than flipped by a state change, so it rises and shrinks
  gradually under the visitor's thumb instead of snapping the moment a
  threshold is crossed. Only the lines below use discrete state, since
  they need to mount into layout as they arrive.
*/
function MobileFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(0);
  const entered = useInView(labelRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );
  /* How far the next section is pulled up to sit under the last line.
     Measured rather than hardcoded: the copy wraps to different heights on
     different widths, so a fixed value that closes the gap on a 390 wide
     phone leaves it gaping on a 430. */
  const [pull, setPull] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      setVh(window.innerHeight);
      const contentH = el.getBoundingClientRect().height;
      /* 64 sticky offset + 48 top padding above the content. */
      const leftover = window.innerHeight - 112 - contentH - GAP_BELOW;
      setPull(Math.max(0, Math.round(leftover)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* The title's move is a fixed eased curve, not a scroll-linked one.
     Tying it directly to scroll position means it inherits every stutter
     in the visitor's thumb, which reads as jitter on a phone. Playing a
     set curve on the way past means it moves the same smooth way every
     time regardless of how the page is scrolled. */
  const labelTravel = vh * 0.32;

  /* The last line lands late so the section releases into the demo almost
     as soon as the stack completes, rather than holding on a screen where
     nothing changes. */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.32 ? 0 : v < 0.62 ? 1 : v < 0.92 ? 2 : 3;
    setShown((prev) => (prev === next ? prev : next));
  });

  return (
    <div
      ref={ref}
      className="relative h-[175vh]"
      /* Negative bottom margin lifts the following section up under the
         last line, closing the height the pinned box cannot use. */
      style={{ marginBottom: pull ? -pull : undefined }}
    >
      {/* Alignment never changes, and every line occupies its layout slot
          from the start even while invisible. Both together mean nothing
          on screen can move as the sequence plays: the lines animate with
          opacity and transform only, which do not affect layout. */}
      <div className="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-start px-5 pt-12">
        <div ref={contentRef} className="w-full">
        <motion.div
          animate={{
            y: shown === 0 ? labelTravel : 0,
            scale: shown === 0 ? 1 : 0.72,
          }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="w-full origin-center"
        >
          <motion.p
            ref={labelRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 30 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="w-full whitespace-nowrap text-center text-[clamp(18px,5.4vw,23px)] font-bold uppercase leading-tight tracking-[0.14em] text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {LABEL}
          </motion.p>
        </motion.div>

        <div className="mt-9 w-full max-w-sm space-y-7">
          {lines.map((line, i) => (
            <motion.p
              key={line.lead}
              initial={false}
              animate={{
                opacity: shown > i ? 1 : 0,
                y: shown > i ? 0 : 22,
              }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              className="text-left text-[21px] leading-snug"
            >
              <span className="font-semibold">{line.lead}</span>{" "}
              <span className="text-slate">{line.body}</span>
            </motion.p>
          ))}
        </div>
        </div>
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
