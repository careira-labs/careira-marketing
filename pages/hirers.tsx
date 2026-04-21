import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';
import OutcomesSection from '../components/OutcomesSection';
import ProductProofSection from '../components/ProductProofSection';
import EmailSignupForm from '../components/EmailSignupForm';
import RecruiterShortlist from '../components/proof/RecruiterShortlist';
import WhyThisFits from '../components/proof/WhyThisFits';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useStickySignup } from '../hooks/useStickySignup';

const OUTCOME_ITEMS = [
  {
    title: 'Stronger shortlists',
    description: 'Surface candidates who genuinely fit the role, not just those who match keywords.',
  },
  {
    title: 'Defensible decisions',
    description: 'Every shortlist comes with clear reasoning you can present to hiring managers.',
  },
  {
    title: 'Less screening waste',
    description: 'Focus on candidates who clear fit thresholds – not just keyword filters. Less volume, better signal.',
  },
  {
    title: 'Feedback that compounds',
    description: 'Every hiring decision refines future shortlists. The system learns from rejections and feedback, not just selections.',
  },
];

export default function HirersPage() {
  useScrollReveal();
  const { showStickyForm, alreadySignedUp, bottomFormVisible, bottomCtaRef, scrollToForm } =
    useStickySignup();

  return (
    <>
      <Head>
        <title>For Hirers – Careira</title>
        <meta
          name="description"
          content="Build shortlists you can defend. Careira helps recruiters and hiring managers focus on stronger-fit candidates, understand why they fit, and shortlist candidates with confidence."
        />
        <meta property="og:title" content="For Hirers – Careira" />
        <meta property="og:description" content="Build shortlists you can defend. Careira helps recruiters and hiring managers focus on stronger-fit candidates, understand why they fit, and shortlist candidates with confidence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.careira.com/hirers" />
        <link rel="canonical" href="https://www.careira.com/hirers" />
      </Head>

      <PublicNav theme="dark" />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-container">
            <h1>Build shortlists you can defend</h1>
            <p className="hero-sub">
              Careira helps recruiters and hiring managers focus on stronger-fit candidates, understand why they fit,
              and shortlist candidates with confidence.
            </p>
            <button className="cta-button" onClick={scrollToForm}>
              See stronger candidates
            </button>
          </div>
        </section>

        {/* Problem */}
        <section className="problem reveal">
          <div className="problem-container">
            <h2>Screening shouldn&apos;t rely on instinct</h2>
            <ul className="problem-list">
              <li>Hundreds of applications with no reliable way to rank them</li>
              <li>Shortlists built on instinct and keyword overlap</li>
              <li>Reasoning you can&apos;t fully articulate to hiring managers</li>
              <li>Hours spent screening candidates who were never going to fit</li>
            </ul>
            <p className="problem-close">
              Careira gives you structured fit evaluation – screen less, shortlist better, move faster.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <div className="reveal">
          <HowItWorksSection
            headline="How it works for hiring"
            background="#F2F4F6"
            steps={[
              {
                number: '01',
                title: 'Define the role',
                description: 'Careira builds a structured role profile from your description – function, seniority, domain, requirements, and constraints.',
              },
              {
                number: '02',
                title: 'Review scored candidates',
                description: 'Each candidate is evaluated against the role. You see fit scores, reasoning, and risk factors – not just keyword overlap.',
              },
              {
                number: '03',
                title: 'Learn from outcomes',
                description: 'Rejections and feedback improve future matches. The system gets better with use.',
              },
            ]}
          />
        </div>

        {/* Product Proof */}
        <div className="reveal">
          <ProductProofSection headline="Clarity behind every candidate" subheadline={'No more keyword sorting or "gut feel". Every candidate comes with structured reasoning you can stand behind.'}>
            <RecruiterShortlist />
            <WhyThisFits
              role="Product Designer"
              candidate="James Okafor"
              score={76}
              scoreLabel="Strong Alignment"
              reasoning={[
                'Portfolio demonstrates strong end-to-end product design capability across B2B SaaS',
                'Experience leading design sprints and user research aligns with team methodology',
                'Compensation expectations within range; hybrid work preference compatible',
              ]}
              considerations={[
                'Limited experience with design systems at scale – manageable with onboarding',
              ]}
            />
          </ProductProofSection>
        </div>

        {/* Outcomes */}
        <div className="reveal">
          <OutcomesSection headline="What changes for you" items={OUTCOME_ITEMS} />
        </div>

        {/* Commercial comparison block */}
        <section className="commercial reveal">
          <div className="commercial-container">
            <h2>Why this is better than your current workflow</h2>
            <ul className="commercial-list">
              <li>Fewer weak shortlists – candidates are scored before you see them</li>
              <li>Less manual explanation – every candidate comes with reasoning you can present</li>
              <li>Less wasted recruiter time – focus on candidates who clear fit thresholds</li>
              <li>Shortlist candidates with confidence – structured fit breakdowns, not gut feel</li>
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta" ref={bottomCtaRef}>
          <div className="cta-container" id="email-signup">
            <h2>Better shortlists start here</h2>
            <p className="cta-body">Define your role. See scored candidates with reasoning. Present a shortlist you can defend.</p>
            <EmailSignupForm source="hirers" />
          </div>
        </section>

        {/* Sticky compact form */}
        {showStickyForm && !alreadySignedUp && !bottomFormVisible && (
          <EmailSignupForm source="hirers" compact />
        )}
      </main>

      <Footer />

      <style jsx>{`
        /* Hero */
        .hero {
          background: #33374A;
          padding: 6rem 0 5rem;
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
          margin: 0 0 1.25rem;
          line-height: 1.15;
        }

        .hero-sub {
          font-size: 1.125rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 2rem;
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

        .problem-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .problem-list li {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #667085;
          padding: 0.5rem 0 0.5rem 1.25rem;
          position: relative;
        }

        .problem-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.9375rem;
          width: 5px;
          height: 5px;
          background: #FF7A6F;
        }

        .problem-close {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #4C526A;
          font-weight: 500;
          margin: 0;
        }

        /* Commercial comparison block */
        .commercial {
          background: #F2F4F6;
          padding: 5rem 0;
        }

        .commercial-container {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .commercial h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.5rem;
        }

        .commercial-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .commercial-list li {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #4C526A;
          padding: 0.75rem 0;
          padding-left: 1.25rem;
          position: relative;
        }

        .commercial-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 1.125rem;
          width: 6px;
          height: 6px;
          background: #FF7A6F;
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



          .commercial {
            padding: 3.5rem 0;
          }

          .commercial-container {
            padding: 0 1rem;
          }

          .commercial h2 {
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
