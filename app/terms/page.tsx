import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";
import { LegalDocument } from "@/app/components/legal-document";

export const metadata: Metadata = {
  title: "Terms & Conditions — AuraSync",
  description:
    "The terms under which AuraSync publishes its calibration tools, audio guides, and research notes.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title={
        <>
          Terms &amp;
          <br />
          <span className="font-display italic text-accent-light lowercase">
            *conditions*
          </span>
        </>
      }
      description="Please read these terms carefully — they describe how you may interact with the AuraSync website, audio guides, calibrator, and editorial content."
      backHref="/"
      backLabel="Return to home"
    >
      <LegalDocument
        lastUpdated="May 22, 2026"
        intro={
          <p>
            These Terms &amp; Conditions form a binding agreement between you
            and AuraSync. By accessing this site or any of its experiences you
            agree to be bound by these terms. If you do not agree, please do
            not use the service.
          </p>
        }
        sections={[
          {
            heading: "Acceptable use",
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Use the site for personal, non-commercial wellbeing
                  exploration unless we grant written permission for another
                  use.
                </li>
                <li>
                  Do not attempt to disrupt the service, scrape the audio
                  catalogue, or reverse-engineer the calibrator.
                </li>
                <li>
                  Treat editorial content as research material — not as
                  medical, legal, or financial advice.
                </li>
              </ul>
            ),
          },
          {
            heading: "Medical disclaimer",
            body: (
              <p>
                AuraSync is an experiential resonance studio. Our audio
                guides, calibrator outputs, and research notes are designed
                for healthy adults and are not a substitute for professional
                medical, psychological, or therapeutic care. If you are
                pregnant, experiencing seizures, recovering from trauma, or
                managing a clinical condition, consult a qualified
                practitioner before engaging with our tools.
              </p>
            ),
          },
          {
            heading: "Subscriptions & emails",
            body: (
              <p>
                When you subscribe, you consent to receive the requested
                content via email. Subscription form delivery is handled by{" "}
                <a
                  href="https://www.emailjs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-light underline-offset-4 hover:underline"
                >
                  EmailJS
                </a>
                . You may unsubscribe at any time by replying with the word
                &quot;UNSUBSCRIBE&quot;; doing so terminates all future
                newsletter deliveries.
              </p>
            ),
          },
          {
            heading: "Intellectual property",
            body: (
              <p>
                All audio compositions, written articles, illustrations, and
                code published on AuraSync are owned by AuraSync or its
                licensors and are protected by copyright law. You may share
                short excerpts for editorial purposes with attribution; any
                commercial reproduction requires written consent.
              </p>
            ),
          },
          {
            heading: "Third-party services",
            body: (
              <p>
                The Vibration Calibrator relies on Google&apos;s Gemini model
                to generate guidance, and subscription email delivery is
                operated by EmailJS. By using these features you also agree to
                the respective providers&apos; terms and privacy policies.
              </p>
            ),
          },
          {
            heading: "Limitation of liability",
            body: (
              <p>
                To the maximum extent permitted by applicable law, AuraSync
                and its contributors are not liable for any indirect,
                incidental, or consequential damages arising from your use of
                the service. Aggregate liability is limited to the amount you
                paid us (if any) in the twelve months preceding the claim.
              </p>
            ),
          },
          {
            heading: "Modifications",
            body: (
              <p>
                We may revise these terms to reflect changes in our service
                or in applicable law. When we make material updates we revise
                the &quot;Last updated&quot; date above and notify subscribers
                via email. Continued use of the service after a revision
                constitutes acceptance of the new terms.
              </p>
            ),
          },
          {
            heading: "Contact",
            body: (
              <p>
                Questions about these terms can be sent to{" "}
                <a
                  href="mailto:legal@aurasync.space"
                  className="text-accent-light underline-offset-4 hover:underline"
                >
                  legal@aurasync.space
                </a>
                .
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  );
}
