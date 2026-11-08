import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-brand-black">
        <Header />
        <Hero />
      </main>
      {/* Contato e rodapé */}
      <FooterCTA />
      <WhatsAppButton />
      <IntroLoader />
    </>
  );
}
