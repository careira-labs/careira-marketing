import { ReactNode } from 'react';
import Head from 'next/head';
import PublicNav from './PublicNav';
import Footer from './Footer';
import HowItWorksSection from './HowItWorksSection';
import OutcomesSection from './OutcomesSection';
import ProductProofSection from './ProductProofSection';
import EmailSignupForm from './EmailSignupForm';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useStickySignup } from '../hooks/useStickySignup';

interface OutcomeItem {
  title: string;
  description: string;
}

interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

interface SegmentPageLayoutProps {
  meta: { title: string; description: string; slug: string };
  hero: { headline: string; subheadline: string };
  problem: { headline: string; body: string | ReactNode };
  howItWorks?: { headline: string; steps: HowItWorksStep[] };
  outcomes: { headline: string; items: OutcomeItem[] };
  proofArtifact: ReactNode;
  proofHeadline?: string;
  ctaHeadline: string;
  ctaBody?: string;
  heroCtaText?: string;
  variant?: 'starting-out' | 'starting-again' | 'stepping-up';
}

export default function SegmentPageLayout({
  meta,
  hero,
  problem,
  howItWorks,
  outcomes,
  proofArtifact,
  proofHeadline,
  ctaHeadline,
  ctaBody,
  heroCtaText = 'Get started',
  variant,
}: SegmentPageLayoutProps) {
  useScrollReveal();
  const { showStickyForm, alreadySignedUp, bottomFormVisible, bottomCtaRef, scrollToForm } =
    useStickySignup();

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.careira.com/${meta.slug}`} />
        <link rel="canonical" href={`https://www.careira.com/${meta.slug}`} />
      </Head>

      <PublicNav theme="dark" />

      <main className={variant ? `variant-${variant}` : ''}>
        {/* Hero */}
        <section className="hero">
          <div className="hero-container">
            <h1>{hero.headline}</h1>
            <p className="hero-sub">{hero.subheadline}</p>
            <button className="cta-button hero-cta" onClick={scrollToForm}>
              {heroCtaText}
            </button>
          </div>
        </section>

        {/* Problem */}
        <section className="problem reveal">
          <div className="problem-container">
            <h2>{problem.headline}</h2>
            <div className="problem-body">
              {typeof problem.body === 'string' ? <p>{problem.body}</p> : problem.body}
            </div>
          </div>
        </section>

        {/* How It Works (optional) */}
        {howItWorks && (
          <div className="reveal">
            <HowItWorksSection headline={howItWorks.headline} steps={howItWorks.steps} background="#F2F4F6" />
          </div>
        )}

        {/* Product Proof */}
        <div className="reveal">
          <ProductProofSection headline={proofHeadline || 'See how it works'}>
            {proofArtifact}
          </ProductProofSection>
        </div>

        {/* Outcomes */}
        <div className="reveal">
          <OutcomesSection headline={outcomes.headline} items={outcomes.items} />
        </div>

        {/* Final CTA */}
        <section className="final-cta" ref={bottomCtaRef}>
          <div className="cta-container" id="email-signup">
            <h2>{ctaHeadline}</h2>
            {ctaBody && <p className="cta-body">{ctaBody}</p>}
            <EmailSignupForm source="jobseekers" />
          </div>
        </section>

        {/* Sticky compact form */}
        {showStickyForm && !alreadySignedUp && !bottomFormVisible && (
          <EmailSignupForm source="jobseekers" compact />
        )}
      </main>

      <Footer />

      <style jsx>{`
        /* Hero — base */
        .hero {
          background: #33374A;
          padding: 6rem 0 5rem;
        }

        /* Starting Out — aspirational, lighter gradient */
        :global(.variant-starting-out) .hero {
          background-image: radial-gradient(ellipse at 80% 80%, rgba(255, 122, 111, 0.06) 0%, transparent 50%);
          padding: 7rem 0 6rem;
        }

        :global(.variant-starting-out) .cta-button {
          animation: ctaPulse 3s ease-in-out infinite;
        }

        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 122, 111, 0); }
          50% { box-shadow: 0 0 0 6px rgba(255, 122, 111, 0.12); }
        }

        /* Starting Again — calmer, grounded */
        :global(.variant-starting-again) .hero {
          background-image: none;
          padding: 6rem 0 5rem;
        }

        /* Stepping Up — premium, tighter */
        :global(.variant-stepping-up) .hero {
          background-image: radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.04) 0%, transparent 40%);
          padding: 5.5rem 0 4.5rem;
        }

        :global(.variant-stepping-up) .problem-container {
          max-width: 780px;
        }

        .hero-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h1 {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin: 0 0 1rem;
          line-height: 1.15;
        }

        .hero-sub {
          font-size: 1.125rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 2rem;
          max-width: 560px;
        }

        .cta-button {
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          background: #FF7A6F;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
          font-family: var(--font);
        }

        .cta-button:hover {
          background: #FF5C4D;
        }

        /* Problem */
        .problem {
          background: #FFFFFF;
          padding: 5rem 0;
        }

        .problem-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 2rem 0 1.5rem;
          text-align: left;
          border-left: 2px solid rgba(255, 122, 111, 0.2);
        }

        .problem h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.5rem;
        }

        .problem-body :global(p) {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #667085;
          margin: 0 0 1rem;
        }

        .problem-body :global(p:last-child) {
          margin-bottom: 0;
        }

        .problem-body :global(.problem-list) {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .problem-body :global(.problem-list li) {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #667085;
          padding: 0.5rem 0 0.5rem 1.25rem;
          position: relative;
        }

        .problem-body :global(.problem-list li::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 0.9375rem;
          width: 5px;
          height: 5px;
          background: #FF7A6F;
        }

        .problem-body :global(.problem-close) {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #4C526A;
          font-weight: 500;
          margin: 0;
        }

        /* Final CTA */
        .final-cta {
          background: #33374A;
          background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          padding: 6rem 0;
        }

        .cta-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .final-cta h2 {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.75rem;
        }

        .cta-body {
          font-size: 1.0625rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 2rem;
          line-height: 1.6;
        }

        .cta-container :global(.signup-form) {
          max-width: 400px;
        }

        .cta-container :global(.signup-form input[type="email"]),
        .cta-container :global(.signup-form input[type="text"]),
        .cta-container :global(.signup-form .form-select) {
          font-size: 0.8rem;
        }

        .cta-container :global(.signup-form .btn) {
          width: auto;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 3.5rem 0;
          }

          .hero-container {
            padding: 0 1rem;
          }

          h1 {
            font-size: 2.25rem;
          }

          .hero-sub {
            font-size: 1rem;
          }

          .problem {
            padding: 3.5rem 0;
          }

          .problem-container {
            padding: 0 1rem;
          }

          .problem h2 {
            font-size: 1.5rem;
          }


          .final-cta {
            padding: 3.5rem 0;
          }

          .cta-container {
            padding: 0 1rem;
          }

          .final-cta h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
