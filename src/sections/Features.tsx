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

/* Closing beat. Lands after the three capabilities, both to tie them
   together and to occupy the space that was sitting empty before the
   demo section. */
const CLOSER = "All of it, while the customer is still on the phone.";

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
  const closerOpacity = useTransform(scrollYProgress, [0.78, 0.93], [0, 1]);
  const closerY = useTransform(scrollYProgress, [0.78, 0.93], [16, 0]);

  const ranges: [number, number][] = [
    [0.12, 0.3],
    [0.34, 0.52],
    [0.56, 0.74],
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
            <motion.p
              style={{ opacity: closerOpacity, y: closerY }}
              className="text-xl font-medium text-royal lg:text-2xl"
            >
              {CLOSER}
            </motion.p>
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

  /* Travel distance has to be a plain number. Motion interpolates px
     smoothly but cannot tween between vh strings, which makes the title
     jump from one end to the other instead of gliding. */
  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Continuous, so there is no jump: the title is wherever the scroll
     says it is. Settles before the first line arrives. */
  const labelY = useTransform(scrollYProgress, [0, 0.26], [vh * 0.34, 0]);
  const labelScale = useTransform(scrollYProgress, [0, 0.26], [1, 0.72]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.28 ? 0 : v < 0.5 ? 1 : v < 0.7 ? 2 : v < 0.87 ? 3 : 4;
    setShown((prev) => (prev === next ? prev : next));
  });

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-start px-5 pt-12">
        <motion.div style={{ y: labelY, scale: labelScale }} className="w-full origin-center">
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

        <motion.div layout className="mt-9 w-full max-w-sm space-y-7">
          {lines.slice(0, Math.min(shown, 3)).map((line) => (
            <motion.p
              key={line.lead}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              className="text-left text-[21px] leading-snug"
            >
              <span className="font-semibold">{line.lead}</span>{" "}
              <span className="text-slate">{line.body}</span>
            </motion.p>
          ))}

          {shown >= 4 && (
            <motion.p
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              className="text-left text-[19px] font-medium leading-snug text-royal"
            >
              {CLOSER}
            </motion.p>
          )}
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
          <p className="text-lg font-medium text-royal">{CLOSER}</p>
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
