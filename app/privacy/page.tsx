import type { Metadata } from "next";
import PageShell from "@/app/components/page-shell";
import { LegalDocument } from "@/app/components/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy — AuraSync",
  description:
    "How AuraSync collects, uses, stores, and protects the resonance data and personal information you share with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title={
        <>
          Privacy
          <br />
          <span className="font-display italic text-accent-light lowercase">
            *policy*
          </span>
        </>
      }
      description="Your nervous system data is sacred. This document explains exactly what we collect, why we collect it, and the rights you retain at every step of the AuraSync experience."
      backHref="/"
      backLabel="Return to home"
    >
      <LegalDocument
        lastUpdated="May 22, 2026"
        intro={
          <p>
            AuraSync (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) builds
            calibration tools for the nervous system. We hold ourselves to a
            high standard of consent, minimal data collection, and
            transparency. By using the AuraSync website, audio guides, or
            calibrator you agree to the practices described below.
          </p>
        }
        sections={[
          {
            heading: "Information we collect",
            body: (
              <>
                <p>
                  <strong className="text-text-primary">Contact data.</strong>{" "}
                  When you subscribe to the newsletter or request the 7-Day
                  Mindset Calibrator we store the email address you provide.
                  It is used solely to deliver the requested content and
                  occasional research notes.
                </p>
                <p>
                  <strong className="text-text-primary">
                    Calibration inputs.
                  </strong>{" "}
                  The Vibration Calibrator processes the desire, current mood,
                  and timeframe values you submit. We forward the request to
                  the Gemini model to generate a personalised manifestation
                  protocol. We do not retain the contents of the request after
                  the response has been returned.
                </p>
                <p>
                  <strong className="text-text-primary">
                    Technical telemetry.
                  </strong>{" "}
                  We collect anonymised usage data (page views, performance
                  metrics, browser type) to improve the experience. No raw
                  cookies are sold to third parties.
                </p>
              </>
            ),
          },
          {
            heading: "How we use your data",
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li>Deliver the email content you explicitly opted into.</li>
                <li>
                  Generate personalised audio guides and calibrator responses.
                </li>
                <li>
                  Monitor service availability, debug technical issues, and
                  protect against abuse.
                </li>
                <li>
                  Improve future research and editorial work — always in
                  aggregated, non-identifiable form.
                </li>
              </ul>
            ),
          },
          {
            heading: "Email delivery & EmailJS",
            body: (
              <p>
                Subscription submissions and the welcome email that you
                receive are processed by{" "}
                <a
                  href="https://www.emailjs.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-light underline-offset-4 hover:underline"
                >
                  EmailJS
                </a>
                , a transactional email service that operates under
                industry-standard data protection agreements. When you submit
                the form, your browser sends the form data directly to
                EmailJS, which then renders the welcome template and delivers
                it to your inbox. No subscription data is stored on AuraSync
                servers.
              </p>
            ),
          },
          {
            heading: "Cookies & local storage",
            body: (
              <p>
                We use the browser&apos;s sessionStorage to remember whether
                you have already seen the AuraSync introduction animation, and
                localStorage to remember your colour-theme preference. These
                values stay on your device and are never transmitted to our
                servers.
              </p>
            ),
          },
          {
            heading: "Data retention",
            body: (
              <p>
                Subscription records remain on file for as long as you are an
                active subscriber. You may unsubscribe at any time via the
                link inside every email; once you do, your record is purged
                within 30 days. Calibrator requests are processed transiently
                and are not stored after the response is returned.
              </p>
            ),
          },
          {
            heading: "Your rights",
            body: (
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Access — request a copy of the data associated with your
                  email address.
                </li>
                <li>
                  Rectification — ask us to correct inaccurate or outdated
                  information.
                </li>
                <li>
                  Erasure — request immediate deletion of your subscription
                  record.
                </li>
                <li>
                  Objection — opt out of any specific category of processing
                  at any time.
                </li>
              </ul>
            ),
          },
          {
            heading: "Contact",
            body: (
              <p>
                For any privacy-related question, write to{" "}
                <a
                  href="mailto:privacy@aurasync.space"
                  className="text-accent-light underline-offset-4 hover:underline"
                >
                  privacy@aurasync.space
                </a>
                . We respond within five business days.
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  );
}
