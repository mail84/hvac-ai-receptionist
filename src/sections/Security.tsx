import { LockSimple, EyeSlash, Timer } from "@phosphor-icons/react";

const points = [
  {
    icon: LockSimple,
    text: "Every call is encrypted, in transit and wherever it is stored.",
  },
  {
    icon: EyeSlash,
    text: "Your customer data is never sold, shared, or used to train anything.",
  },
  {
    icon: Timer,
    text: "You decide what gets kept, and you can delete it any time.",
  },
];

/*
  Quiet section on a soft royal tint, same light theme. Icons are drawn
  thin and in ink rather than heavy and colored: at this size a light
  stroke reads as drafted, a thick one reads as clip art.
*/
export default function Security() {
  return (
    <section className="bg-royal-soft py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          Your customers&rsquo; info stays private. Always.
        </h2>
        <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.text} className="flex flex-col items-center text-center">
              <p.icon size={38} weight="thin" className="text-ink" />
              <p className="mt-6 max-w-xs text-[17px] leading-relaxed text-ink">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
