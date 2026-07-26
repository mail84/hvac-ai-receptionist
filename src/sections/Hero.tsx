import { Link } from "react-router-dom";

/*
  Full-bleed background video hero, left-aligned content.
  The video is a generated abstract loop in the brand palette (royal blue
  fluid in cream). Until the file lands in /public, the layered gradient
  fallback below carries the same tones, so the hero never renders empty.
  A cream scrim keeps text at AA contrast over the moving video.
*/
export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-cream">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 110%, #274ab3 0%, rgba(39,74,179,0.35) 45%, rgba(255,253,247,0) 75%), radial-gradient(100% 80% at 10% 100%, rgba(30,58,143,0.55) 0%, rgba(255,253,247,0) 60%), #fffdf7",
        }}
      />
      {/* Palindrome encode: plays forward then reverse, so `loop` never
          hard cuts. Hue correction is baked into the file rather than
          applied as a CSS filter on a fullscreen element. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      {/* Scrim: pale at the top so the headline stays legible, opens up
          through the middle so the video reads, then closes back to solid
          cream at the bottom so the section dissolves into the one below
          instead of ending on a hard edge. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,253,247,0.93) 0%, rgba(255,253,247,0.66) 34%, rgba(255,253,247,0.42) 62%, rgba(255,253,247,0.88) 88%, rgba(255,253,247,1) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight md:text-5xl lg:text-[3.4rem]">
            HVAC 24/7 AI Answering Service &amp; Virtual Receptionist
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
            Front desk made easier. Call Sarah, a calm virtual receptionist who
            triages emergencies, captures details, and books your jobs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/#demo"
              className="rounded-full bg-royal px-7 py-3.5 font-medium text-cream transition-[background-color,transform] hover:bg-royal-deep active:scale-[0.98]"
            >
              Talk to Sarah
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-ink/15 bg-cream/80 px-7 py-3.5 font-medium text-ink backdrop-blur transition-[background-color,transform] hover:bg-cream active:scale-[0.98]"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
