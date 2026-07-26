import Hero from "../sections/Hero";
import Demo from "../sections/Demo";
import Features from "../sections/Features";
import Testimonials from "../sections/Testimonials";
import StatCounter from "../sections/StatCounter";
import CostCompare from "../sections/CostCompare";
import Faq from "../sections/Faq";
import Security from "../sections/Security";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Demo />
      <Testimonials />
      <StatCounter />
      <CostCompare />
      <Security />
      <Faq />
    </>
  );
}
