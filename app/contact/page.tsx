import type { Metadata } from "next";
import ContactFooter from "@/app/components/contact-footer";
import PageShell from "@/app/components/page-shell";

export const metadata: Metadata = {
  title: "Contact — AuraSync",
  description:
    "Connect with AuraSync's decentralized sound laboratories and access biological metrics for mental momentum.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Ready to Realign?"
      title={
        <>
          Let&apos;s shift the{" "}
          <span className="font-display italic text-accent-light lowercase">
            *vibe together*
          </span>
        </>
      }
      description="Reach out, subscribe to the audio guide, and join the cohort of practitioners running AuraSync's neuro-manifestation protocols."
    >
      <div className="border border-stroke rounded-3xl overflow-hidden">
        <ContactFooter />
      </div>
    </PageShell>
  );
}
