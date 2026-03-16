import { useState, useEffect, useRef } from 'react';
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

export default function JobseekersPage() {
  const [showStickyForm, setShowStickyForm] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [bottomFormVisible, setBottomFormVisible] = useState(false);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

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

    // Hide sticky form when bottom CTA is visible
    const observer = new IntersectionObserver(
      ([entry]) => setBottomFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (bottomCtaRef.current) observer.observe(bottomCtaRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
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

        <div className="section-divider" />

        <FeatureSteps steps={steps} title="Structured matching, step by step" />

        {/* CTA after "How it works" */}
        {!alreadySignedUp && (
          <section className="mid-cta">
            <div className="container">
              <EmailSignupForm source="jobseekers" title="Ready to find work that fits?" />
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
              aspect: 'How you\'re understood',
              traditional: 'Reduced to keywords and job titles',
              careira: 'Modelled as a structured capability profile',
            },
            {
              aspect: 'How matching works',
              traditional: 'Opaque filters you can\'t see or influence',
              careira: 'Scored across function, domain, seniority, and more',
            },
            {
              aspect: 'What you\'re told',
              traditional: '"You\'re not a match" — no explanation',
              careira: 'Clear reasoning: strengths, gaps, risks, and confidence',
            },
            {
              aspect: 'How you improve',
              traditional: 'Repeat, guess, hope for different results',
              careira: 'Feedback refines your profile and future matches',
            },
            {
              aspect: 'Who it\'s built for',
              traditional: 'Volume applicants and mass job boards',
              careira: 'Professionals who value career trajectory',
            },
          ]}
        />

        <TargetAudienceSection
          title="Built for serious professionals"
          description="Growth-focused professionals, experienced operators, and people who value career trajectory over just another job listing."
        />

        <div ref={bottomCtaRef}>
          <CTASection headline="Find work that fits">
            <EmailSignupForm source="jobseekers" />
          </CTASection>
        </div>

        {/* Sticky CTA — hidden when bottom form is visible */}
        {showStickyForm && !alreadySignedUp && !bottomFormVisible && (
          <EmailSignupForm source="jobseekers" compact />
        )}
      </main>

      <Footer />

      <style jsx>{`
        main {
          min-height: 100vh;
        }

        .section-divider {
          height: 1px;
          background: #F2F4F6;
          margin: 0 2rem;
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
