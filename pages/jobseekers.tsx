import { useState, useEffect } from 'react';
import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import FeatureSteps from '../components/FeatureSteps';
import DifferentiatorGrid from '../components/DifferentiatorGrid';
import TargetAudienceSection from '../components/TargetAudienceSection';
import CTASection from '../components/CTASection';
import EmailSignupForm from '../components/EmailSignupForm';
import Footer from '../components/Footer';

export default function JobseekersPage() {
  const [showStickyForm, setShowStickyForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600; // Approximate hero section height
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
      title: 'Build your Career Identity',
      description: 'Upload your CV. Careira translates it into a structured capability model.',
      screenshot: '/screenshots/jobseekers-step-1.png',
    },
    {
      number: 2,
      title: 'See scored matches',
      description:
        'Roles are evaluated across function, domain, outcomes, seniority, scope, and location.',
      screenshot: '/screenshots/jobseekers-step-2.png',
    },
    {
      number: 3,
      title: 'Understand your fit',
      description: 'See strengths, gaps, risks, and a confidence indicator for every match.',
      screenshot: '/screenshots/jobseekers-step-3.png',
    },
    {
      number: 4,
      title: 'Improve over time',
      description: 'Structured feedback refines future matches.',
      screenshot: '/screenshots/jobseekers-step-4.png',
    },
  ];

  const differentiators = [
    {
      title: 'Capability modelling',
      description:
        'Deep understanding of your experience beyond keywords and job titles.',
    },
    {
      title: 'Explainable scoring',
      description:
        'Every match comes with clear reasoning about fit, strengths, and gaps.',
    },
    {
      title: 'Decision-grade transparency',
      description:
        'Make informed career decisions with complete visibility into match quality.',
    },
  ];

  return (
    <>
      <Head>
        <title>For Jobseekers – Careira</title>
        <meta
          name="description"
          content="Find work that actually fits with AI-powered job matching. Careira understands your experience and trajectory, not just keywords."
        />
      </Head>

      <PublicNav theme="light" />

      <main>
        <HeroSection
          headline="Not just work. Work that fits."
          subheadline="Careira translates your experience into a clear professional profile, then evaluates roles against it across multiple dimensions."
          ctaText="Join the waitlist"
          ctaAction={scrollToForm}
          screenshot="/screenshots/jobseekers-hero.png"
          screenshotAlt="Careira dashboard showing job matches and career profile"
        />

        <ProblemSection
          title="Job search shouldn't feel like guesswork"
          problems={[
            'Reduced to keywords',
            'Filtered by opaque rules',
            'Endless irrelevant listings',
            'No explanation for why something "matches"',
          ]}
        />

        <FeatureSteps steps={steps} title="Structured matching, step by step" />

        {/* CTA after "How it works" */}
        <section className="mid-cta">
          <div className="container">
            <EmailSignupForm source="jobseekers" title="Ready to find work that fits?" hideWhenSignedUp />
          </div>
        </section>

        <DifferentiatorGrid
          items={differentiators}
          title="What makes Careira different"
          highlightWord="Careira"
        />

        <TargetAudienceSection
          title="Built for serious professionals"
          description="Growth-focused professionals, experienced operators, and people who value career trajectory over just another job listing."
        />

        <CTASection headline="Find work that fits">
          <EmailSignupForm source="jobseekers" />
        </CTASection>

        {/* Mobile sticky CTA */}
        {showStickyForm && <EmailSignupForm source="jobseekers" compact hideWhenSignedUp />}
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
