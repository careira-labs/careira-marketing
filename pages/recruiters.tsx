import { useState, useEffect } from 'react';
import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import FeatureSteps from '../components/FeatureSteps';
import DifferentiatorGrid from '../components/DifferentiatorGrid';
import ComparisonSection from '../components/ComparisonSection';
import TargetAudienceSection from '../components/TargetAudienceSection';
import CTASection from '../components/CTASection';
import EmailSignupForm from '../components/EmailSignupForm';
import Footer from '../components/Footer';

export default function RecruitersPage() {
  const [showStickyForm, setShowStickyForm] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('reset') && localStorage.getItem('careira_waitlist')) {
      setAlreadySignedUp(true);
    }

    const handleScroll = () => {
      const heroHeight = 600;
      setShowStickyForm(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formEl = document.querySelector('#email-signup');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Define the role',
      description: 'Capture the role across function, domain, location, seniority, and key signals — not just a free-text job description.',
      screenshot: '/screenshots/recruiters-step-1.png',
    },
    {
      number: 2,
      title: 'Candidate scoring',
      description: 'Each candidate is evaluated across the same dimensions — consistently and transparently.',
      screenshot: '/screenshots/recruiters-step-2.png',
    },
    {
      number: 3,
      title: 'Transparent decision support',
      description: 'See overall alignment, strength areas, risk factors, and confidence for every candidate.',
      screenshot: '/screenshots/recruiters-step-3.png',
    },
    {
      number: 4,
      title: 'Signal-driven improvement',
      description: 'Structured dismiss reasons refine future rankings automatically.',
      screenshot: '/screenshots/recruiters-step-4.png',
    },
  ];

  const differentiators = [
    {
      title: 'Explainable shortlists',
      description:
        'Every candidate ranking includes clear scoring and reasoning, so hiring decisions are defensible.',
    },
    {
      title: 'Feedback loop built in',
      description:
        'Recruiter feedback and preferences continuously improve match quality.',
    },
    {
      title: 'Automatic rediscovery',
      description:
        'When role requirements change, previously dismissed candidates are re-evaluated instantly.',
    },
  ];

  return (
    <>
      <Head>
        <title>For Recruiters – Careira</title>
        <meta
          name="description"
          content="Hire with intelligence, not guesswork. Careira delivers decision-grade shortlists with explainable scoring and transparent candidate matches."
        />
      </Head>

      <PublicNav theme="light" />

      <main>
        <HeroSection
          headline={
            <>
              Hire with intelligence.
              <br />
              Not guesswork.
            </>
          }
          subheadline="Careira translates your role requirements into a clear evaluation framework, then ranks candidates across multiple dimensions with transparent reasoning."
          ctaText="Request early access"
          ctaAction={scrollToForm}
          screenshot="/screenshots/recruiters-hero.png"
          screenshotAlt="Recruiter dashboard showing candidate matches and scoring"
        />

        <ProblemSection
          title="Recruiting tools optimise workflow, not understanding"
          problems={[
            'Manual CV screening',
            'Keyword filtering misses context',
            'Opaque AI ranking',
            "Dismissals don't improve future matches",
            'Shortlists that feel arbitrary',
          ]}
        />

        <FeatureSteps steps={steps} title="How Careira works" />

        {/* CTA after "How it works" */}
        {!alreadySignedUp && (
          <section className="mid-cta">
            <div className="container">
              <EmailSignupForm
                source="recruiters"
                title="Ready to hire with clarity?"
              />
            </div>
          </section>
        )}

        <DifferentiatorGrid
          items={differentiators}
          title="What makes Careira different"
          highlightWord="Careira"
        />

        <ComparisonSection
          title="Careira vs. the status quo"
          rows={[
            {
              aspect: 'How candidates are evaluated',
              traditional: 'Manual CV screening and keyword filters',
              careira: 'Structured scoring across function, domain, and outcomes',
            },
            {
              aspect: 'How shortlists are built',
              traditional: 'Opaque AI ranking or gut feeling',
              careira: 'Explainable scoring with clear reasoning per candidate',
            },
            {
              aspect: 'What you see per candidate',
              traditional: 'A name, a CV, and a guess',
              careira: 'Alignment score, strengths, risks, and confidence',
            },
            {
              aspect: 'How the system improves',
              traditional: 'Dismissals vanish — nothing learned',
              careira: 'Feedback can refine future rankings over time',
            },
            {
              aspect: 'When requirements change',
              traditional: 'Start the search over from scratch',
              careira: 'Candidates can be re-evaluated as requirements evolve',
            },
          ]}
        />

        <TargetAudienceSection
          title="Built for teams hiring into complexity"
          description="High-growth SaaS, operational leadership roles, cross-functional positions, and organisations that value precision over volume."
        />

        <CTASection headline="Hire with clarity">
          <EmailSignupForm source="recruiters" />
        </CTASection>

        {/* Mobile sticky CTA */}
        {showStickyForm && !alreadySignedUp && <EmailSignupForm source="recruiters" compact />}
      </main>

      <Footer />

      <style jsx>{`
        main {
          min-height: 100vh;
        }

        .mid-cta {
          background: var(--canvas);
          padding: 3rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .mid-cta .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .mid-cta {
            padding: 2rem 0;
          }

          .mid-cta .container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}
