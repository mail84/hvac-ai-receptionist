import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import {
  PhoneCall,
  CalendarBlank,
  Wrench,
  CaretRight,
  CaretDown,
  ShieldCheck,
} from "@phosphor-icons/react";

/* Figures supplied by the client as their average client results. Not
   invented here. Update alongside PRODUCT.md if they change. */
const steps = [
  {
    icon: PhoneCall,
    value: 7,
    label: "Extra calls per day",
    note: "5 phone calls plus 2 online bookings",
  },
  {
    icon: CalendarBlank,
    value: 210,
    label: "Extra calls per month",
    note: "7 across 30 days",
  },
  {
    icon: Wrench,
    value: 42,
    label: "Extra jobs per month",
    note: "40% become estimates, 50% close",
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

/* Counts to the figure once, when the tile arrives. Writes to the node
   directly so the tree does not re-render per frame, and the digits are
   tabular so the width does not twitch as it climbs. */
function Counter({ to, run }: { to: number; run: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !run) return;
    if (reduce) {
      node.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [run, to, reduce]);

  return <span ref={ref}>0</span>;
}

export default function RevenueImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Held back until the heading reaches the middle of the screen. Anchoring
     to the top of the section fired it while the last feature line was
     still arriving, so the two sequences overlapped. The negative margins
     shrink the detection band to the middle of the viewport, which by then
     is well past the feature section releasing. */
  const inView = useInView(cueRef, {
    once: true,
    margin: "-45% 0px -25% 0px",
  });

  /* Fade and scale, no vertical travel. Sliding upward on entry reads as
     the content being dragged by the scroll rather than arriving on its
     own. Scale starts at 0.94 rather than 0: nothing appears out of
     nothing. Order is heading, then the figures in reading order, so the
     sequence reads as one number leading to the next. */
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.94 },
          animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    /* Pulled up on phones to sit under the feature stack, which is pinned to
       a full viewport and leaves height below its last line that padding
       cannot reclaim. */
    <section ref={sectionRef} className="-mt-48 pb-20 pt-0 md:mt-0 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div ref={cueRef} {...enter(0)}>
          <p
            className="text-[12px] font-bold uppercase tracking-[0.18em] text-royal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Average client results
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            What you can expect
          </h2>
          <p className="mt-3 max-w-lg text-lg text-slate">
            Stronger reviews, plus the revenue you are currently missing.
          </p>
        </motion.div>

        {/* Vertical on phones with the arrows pointing down, horizontal from
            md up. The arrow is a real step in the sequence, not decoration. */}
        <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-2">
          {steps.map((step, i) => (
            <div key={step.label} className="contents">
              <motion.div
                {...enter(0.25 + i * 0.16)}
                className="flex-1 rounded-2xl border border-line bg-white/70 px-6 py-7 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal">
                  <step.icon size={22} weight="fill" className="text-cream" />
                </span>
                <p className="mt-4 text-5xl font-semibold tabular-nums tracking-tight text-royal md:text-6xl">
                  <Counter to={step.value} run={inView} />
                </p>
                <p className="mt-2 font-semibold">{step.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate">{step.note}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  {...enter(0.35 + i * 0.16)}
                  aria-hidden
                  className="flex shrink-0 items-center justify-center text-royal"
                >
                  <CaretDown size={26} weight="bold" className="md:hidden" />
                  <CaretRight size={26} weight="bold" className="hidden md:block" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          {...enter(0.75)}
          className="mt-10 flex flex-col items-start gap-5 rounded-2xl bg-royal px-7 py-8 text-cream md:flex-row md:items-center md:gap-7 md:px-9"
        >
          <ShieldCheck size={44} weight="light" className="shrink-0" />
          <div>
            <h3 className="text-xl font-semibold md:text-2xl">
              90 day money back guarantee
            </h3>
            <p className="mt-2 leading-relaxed text-cream/85">
              If we do not deliver you results, you get your money back. It is
              written into the contract.
            </p>
          </div>
        </motion.div>

        <motion.div {...enter(0.88)} className="mt-10 flex justify-center">
          <Link
            to="/contact"
            className="rounded-full bg-royal px-8 py-4 text-center font-medium text-cream transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-royal-deep active:scale-[0.97]"
          >
            Book your free audit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
