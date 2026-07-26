import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/* Placeholder figure, swap for the real total. Deliberately not a round
   number: a clean 100,000 reads as marketing rather than a count. */
const TARGET = 110926;

export default function StatCounter() {
  const numRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);

  /* Count up once, when the number comes into view. Explanatory motion, so
     it can run past the 300ms UI ceiling; strong ease-out so it moves
     immediately and decelerates into the final figure. */
  useEffect(() => {
    const node = numRef.current;
    if (!inView || !node) return;

    if (reduce) {
      node.textContent = TARGET.toLocaleString("en-US");
      return;
    }

    const controls = animate(0, TARGET, {
      duration: 2.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString("en-US");
      },
      onComplete: () => setSettled(true),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  /* Then keep ticking, so "and counting" is literally true on screen. */
  useEffect(() => {
    const node = numRef.current;
    if (!settled || reduce || !node) return;
    let n = TARGET;
    const id = window.setInterval(() => {
      n += 1;
      node.textContent = n.toLocaleString("en-US");
    }, 4200);
    return () => window.clearInterval(id);
  }, [settled, reduce]);

  return (
    <section ref={sectionRef} className="py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-[17vw] font-semibold leading-[0.9] tracking-tighter tabular-nums text-royal sm:text-[14vw] lg:text-[12vw]">
          <span ref={numRef}>0</span>
        </p>
        <p className="mt-6 text-xl text-slate md:text-3xl">
          answered calls and counting
        </p>
      </div>
    </section>
  );
}
