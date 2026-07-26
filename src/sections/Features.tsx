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

/* One outcome per system: voice agent, missed call text back, online
   booking, reviews. */
const lines = [
  {
    lead: "Never miss a call.",
    body: "The AI voice agent answers 24/7, weekends and holidays included, and books the job on the spot.",
  },
  {
    lead: "Catch the ones that slip.",
    body: "Any call you miss gets an instant text back, before the caller reaches the next company on the list.",
  },
  {
    lead: "Let them book themselves.",
    body: "Customers pick a slot from your booking link, and it lands straight in your calendar.",
  },
  {
    lead: "Earn reviews without asking.",
    body: "Every finished job triggers a review request, with follow up until the customer leaves one.",
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
    [0.1, 0.26],
    [0.3, 0.46],
    [0.5, 0.66],
    [0.7, 0.86],
  ];

  return (
    <div ref={ref} className="relative h-[340vh]">
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
  const [stage, setStage] = useState(0);
  const titleUp = stage >= 1;
  const shown = Math.max(0, stage - 1);
  const entered = useInView(labelRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
  /* Stage 0 is the title alone, centred. Stage 1 lifts it to the top with
     nothing else on screen, so it has the move to itself. Lines only start
     at stage 2. Without that window the first line faded in at its layout
     slot near the top while the title was still transformed down the
     screen, so the line appeared above the title and the title then flew
     up past it. */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next =
      v < 0.13 ? 0 : v < 0.29 ? 1 : v < 0.46 ? 2 : v < 0.62 ? 3 : v < 0.78 ? 4 : 5;
    setStage((prev) => (prev === next ? prev : next));
  });

  return (
    <div ref={ref} className="relative h-[215vh]">
      {/* Alignment never changes. Once the title has settled it holds that
          exact position for the rest of the section, and each line appends
          below it. Switching this container's justification when the last
          line arrived slid the whole group downward mid-sequence, which
          read as the layout lurching rather than building. Leftover height
          at the bottom is absorbed by the demo section pulling up, not by
          re-centering this one. */}
      <div className="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col items-start px-5 pt-12">
        <motion.div
          animate={{
            y: titleUp ? 0 : labelTravel,
            scale: titleUp ? 0.72 : 1,
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

        <motion.div layout className="mt-8 w-full max-w-sm space-y-6">
          {lines.slice(0, shown).map((line) => (
            <motion.p
              key={line.lead}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
              className="text-left text-[19px] leading-snug"
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
