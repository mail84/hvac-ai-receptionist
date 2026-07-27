import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Wrench, Star, PhoneCall, ShieldCheck } from "@phosphor-icons/react";
import BookButton from "../components/BookButton";

/* Client supplied targets. Update alongside PRODUCT.md if they change. */
const results = [
  {
    icon: Wrench,
    value: 25,
    suffix: "+",
    label: "Extra jobs per month",
  },
  {
    icon: Star,
    value: 30,
    suffix: "+",
    label: "New reviews every 3 months",
  },
  {
    icon: PhoneCall,
    value: 100,
    suffix: "%",
    label: "Of calls answered, day or night",
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

function Counter({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !run) return;
    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.5,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [run, to, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function RevenueImpact() {
  const cueRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  /* Held back until the heading reaches the middle of the screen, so this
     sequence starts only after the feature stack above has finished. */
  const arrived = useInView(cueRef, { once: true, margin: "-45% 0px -25% 0px" });

  /* A band in the middle of the viewport is never crossed if the visitor
     lands below it: on a deep link, a refresh partway down, or a fast
     flick past the section. The element would then sit above the band,
     never intersect, and stay invisible for good. So on mount, anything
     already scrolled past is shown outright rather than waiting for an
     entrance that cannot happen. */
  const [alreadyPast, setAlreadyPast] = useState(false);
  useEffect(() => {
    const el = cueRef.current;
    if (!el) return;
    /* Deferred past the router's scroll-to-top, which runs on mount.
       Checking sooner reads the browser's restored position and reveals
       the section before the visitor has got there. */
    const id = window.setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.45) {
        setAlreadyPast(true);
      }
    }, 150);
    return () => window.clearTimeout(id);
  }, []);

  const inView = arrived || alreadyPast;

  /* Fade and scale, no vertical travel: sliding upward on entry reads as
     the content being dragged by the scroll rather than arriving. Scale
     starts at 0.94, never 0. */
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
    <section className="-mt-48 pb-20 pt-0 md:mt-0 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div ref={cueRef} {...enter(0)} className="text-center">
          <p
            className="text-sm font-bold uppercase tracking-[0.2em] text-royal md:text-base"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Average client results
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            What you can expect
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              {...enter(0.2 + i * 0.14)}
              className="rounded-2xl border border-line bg-white/70 px-6 py-9 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-royal-soft">
                <r.icon size={24} weight="fill" className="text-royal" />
              </span>
              <p className="mt-5 text-6xl font-semibold tabular-nums tracking-tight text-royal md:text-7xl">
                <Counter to={r.value} suffix={r.suffix} run={inView} />
              </p>
              <p className="mt-3 text-lg font-medium leading-snug">{r.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...enter(0.7)}
          className="mt-6 flex flex-col items-start gap-5 rounded-2xl bg-royal px-7 py-8 text-cream md:flex-row md:items-center md:gap-7 md:px-9"
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

        <motion.div {...enter(0.82)} className="mt-10 flex justify-center">
          <BookButton className="rounded-full bg-royal px-8 py-4 text-center font-medium text-cream transition-[background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-royal-deep active:scale-[0.97]">
            Book your free audit
          </BookButton>
        </motion.div>
      </div>
    </section>
  );
}
