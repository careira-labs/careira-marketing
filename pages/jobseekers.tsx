import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import HowItWorksSection from '../components/HowItWorksSection';
import AudienceRoutingSection from '../components/AudienceRoutingSection';
import OutcomesSection from '../components/OutcomesSection';
import ProductProofSection from '../components/ProductProofSection';
import EmailSignupForm from '../components/EmailSignupForm';
import WhyThisFits from '../components/proof/WhyThisFits';
import StrengthsGapsRisks from '../components/proof/StrengthsGapsRisks';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useStickySignup } from '../hooks/useStickySignup';

const AUDIENCE_CARDS = [
  {
    slug: 'starting-out',
    label: 'Starting out',
    subtitle: 'Early career & graduates',
    description: 'Find direction. Build momentum. Start well.',
  },
  {
    slug: 'starting-again',
    label: 'Starting again',
    subtitle: 'Returning to the market',
    description: 'Regain control. Reposition properly. Move forward.',
  },
  {
    slug: 'stepping-up',
    label: 'Stepping up',
    subtitle: 'Experienced professionals',
    description: 'Be selective. Find better fit. Make a stronger move.',
  },
];

const OUTCOME_ITEMS = [
  {
    title: 'A clear professional profile',
    description: 'Your experience translated into a structured capability model – not a keyword list.',
  },
  {
    title: 'Scored matches with reasoning',
    description: 'See why a role fits, where the strengths are, and what the risks look like.',
  },
  {
    title: 'Preferences that matter',
    description: 'Location, salary, work style – surfaced as real constraints, not hidden filters.',
  },
  {
    title: 'Feedback that improves results',
    description: 'Not just thumbs up or down – your structured feedback refines future matches.',
  },
];

export default function JobseekersPage() {
  useScrollReveal();
  const { showStickyForm, alreadySignedUp, bottomFormVisible, bottomCtaRef, scrollToForm } =
    useStickySignup();

  return (
    <>
      <Head>
        <title>For Jobseekers – Careira</title>
        <meta
          name="description"
          content="Find work that fits who you are. Careira helps you understand your strengths, see where you fit, and move forward with more confidence."
        />
        <meta property="og:title" content="For Jobseekers – Careira" />
        <meta property="og:description" content="Find work that fits who you are. Careira helps you understand your strengths, see where you fit, and move forward with more confidence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.careira.com/jobseekers" />
        <link rel="canonical" href="https://www.careira.com/jobseekers" />
      </Head>

      <PublicNav theme="dark" />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-container">
            <h1>Find work that fits who you are</h1>
            <p className="hero-sub">
              Careira helps you understand your strengths, see where you fit, and move forward
              with more confidence.
            </p>
            <button className="cta-button" onClick={scrollToForm}>
              Find roles that fit
            </button>
          </div>
        </section>

        {/* Problem */}
        <section className="problem reveal">
          <div className="problem-container">
            <h2>Job search should not feel like guesswork</h2>
            <ul className="problem-list">
              <li>Roles that look right on the surface but lead nowhere</li>
              <li>Applications that disappear without feedback or explanation</li>
              <li>No way to know what actually fits – or why something doesn&apos;t</li>
            </ul>
            <p className="problem-close">
              Most platforms generate noise. Careira is built to reduce it – less guesswork, more clarity, better decisions.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <div className="reveal">
          <HowItWorksSection
            headline="How Careira works"
            background="#F2F4F6"
            steps={[
              {
                number: '01',
                title: 'Upload your CV',
                description: 'Your experience is parsed into a structured professional profile – skills, functions, seniority, preferences.',
              },
              {
                number: '02',
                title: 'See scored matches',
                description: 'Each role is evaluated across multiple dimensions. You see why it fits, where the strengths are, and what the risks look like.',
              },
              {
                number: '03',
                title: 'Refine with feedback',
                description: 'Your responses improve future matches. The system learns from your choices, not just your clicks.',
              },
            ]}
          />
        </div>

        {/* Product Proof */}
        <div className="reveal">
          <ProductProofSection headline="See what Careira sees" subheadline="Understand at a glance where you're a great fit for a role, and where there might be things to consider.">
            <WhyThisFits
              role="Financial Analyst"
              candidate="James Okafor"
              score={82}
              scoreLabel="Strong Fit"
              reasoning={[
                'Quantitative finance background with 3 years of financial modelling experience directly relevant',
                'Advanced Excel and SQL skills match core technical requirements',
                'Experience in FMCG sector aligns with hiring company\'s domain',
                'Seniority level and salary expectations consistent with role scope',
              ]}
            />
            <StrengthsGapsRisks
              strengths={[
                'Strong quantitative analysis and financial modelling skills',
                'Seniority level matches role expectations',
                'FMCG sector experience aligns with hiring company domain',
                'Evidence of stakeholder reporting and data presentation',
              ]}
              gaps={[
                'No direct experience with M&A or due diligence',
                'Limited exposure to enterprise financial planning tools',
              ]}
              risks={[
                'May need to demonstrate advanced Excel proficiency in technical assessment',
              ]}
            />
          </ProductProofSection>
        </div>

        {/* Outcomes */}
        <div className="reveal">
          <OutcomesSection headline="Jobseeking changes when you can see clearly" items={OUTCOME_ITEMS} />
        </div>

        {/* Audience routing */}
        <div className="reveal">
          <AudienceRoutingSection
            headline="What kind of move are you making?"
            cards={AUDIENCE_CARDS}
          />
        </div>

        {/* Final CTA */}
        <section className="final-cta" ref={bottomCtaRef}>
          <div className="cta-container" id="email-signup">
            <h2>Stop guessing. Start seeing where you fit</h2>
            <p className="cta-body">Upload your CV. See scored matches with clear reasoning. Decide where to invest your time.</p>
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
