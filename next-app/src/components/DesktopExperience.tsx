"use client";

import Header from "./Header";
import Hero from "./Hero";
import FooterCTA from "./FooterCTA";
import WhatsAppButton from "./WhatsAppButton";
import IntroLoader from "./IntroLoader";
import SmoothScroll from "./SmoothScroll";

export default function DesktopExperience() {
  return (
    <>
      <SmoothScroll />
      <main className="min-h-screen bg-brand-black">
        <Header />
        <Hero />
      </main>
      <FooterCTA />
      <WhatsAppButton />
      <IntroLoader />
    </>
  );
}
