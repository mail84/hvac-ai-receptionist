/*
  The demo orb. A generated video of a glowing, breathing sphere, encoded
  as a palindrome (forward then reverse) so the loop never hard cuts.
  Falls back to the CSS gradient sphere if the video cannot play.
*/
export default function Orb({ size = "clamp(240px, 34vw, 380px)" }: { size?: string }) {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <div className="orb-surface absolute inset-0 rounded-full" />
      {/* Scaled slightly past the clip so the source frame's thin light
          margin falls outside the circle. */}
      <video
        className="absolute inset-0 h-full w-full scale-[1.06] rounded-full object-cover"
        src="/orb-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="orb-grain absolute inset-0 rounded-full" />
    </div>
  );
}
