import Head from 'next/head';
import Link from 'next/link';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import OutcomesSection from '../components/OutcomesSection';
import CredibilitySection from '../components/CredibilitySection';
import EmailSignupForm from '../components/EmailSignupForm';
import WhyThisFits from '../components/proof/WhyThisFits';
import StrengthsGapsRisks from '../components/proof/StrengthsGapsRisks';
import PreferenceConflicts from '../components/proof/PreferenceConflicts';
import ScoreBreakdown from '../components/proof/ScoreBreakdown';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useStickySignup } from '../hooks/useStickySignup';
import { useState, useEffect, useCallback, useRef } from 'react';

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

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const CompassIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#FF7A6F" opacity="0.2" stroke="#FF7A6F" />
  </svg>
);

const EyeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const NoEntryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
);

const OUTCOME_ITEMS = [
  {
    icon: <TargetIcon />,
    title: 'Only pursue roles that are worth it',
    description: 'Focus on roles that are genuinely worth your time.',
  },
  {
    icon: <EyeIcon />,
    title: 'See why something fits',
    description: 'Every match comes with clear reasoning you can understand and act on.',
  },
  {
    icon: <CompassIcon />,
    title: 'Decide where your effort goes',
    description: 'Shape what you see using real preferences, constraints, and feedback.',
  },
  {
    icon: <NoEntryIcon />,
    title: 'Avoid dead ends early',
    description: 'Surface conflicts before they cost you time, energy, or momentum.',
  },
];

export default function HomePage() {
  useScrollReveal();
  const { showStickyForm, alreadySignedUp, bottomFormVisible, bottomCtaRef, scrollToForm } =
    useStickySignup();

  const [proofSlide, setProofSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const carouselRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCarouselVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback((i: number) => {
    setProofSlide(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  }, []);

  useEffect(() => {
    if (paused || !carouselVisible) return;
    const timer = setInterval(() => {
      setProofSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, carouselVisible]);

  return (
    <>
      <Head>
        <title>Careira – Work that fits, found faster</title>
        <meta
          name="description"
          content="Careira helps people understand their strengths, see where they fit, and move forward with confidence. A career intelligence system, not a job board."
        />
        <meta property="og:title" content="Careira – Work that fits, found faster" />
        <meta property="og:description" content="Careira helps people understand their strengths, see where they fit, and move forward with confidence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.careira.com/" />
        <link rel="canonical" href="https://www.careira.com/" />
      </Head>

      <PublicNav theme="dark" />

      <main>
        {/* 1. Hero (dark) — split layout */}
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>Careers are too important for keyword matching</h1>
              <p className="brand-line">Work that fits, found faster</p>
              <p className="hero-sub">
                Careira turns your experience into a clear professional profile, shows where you fit
                best, and explains why – so you can make better career moves with confidence.
              </p>
              <div className="hero-cta">
                <Link href="/jobseekers">
                  <span className="cta-primary">I&apos;m looking for work</span>
                </Link>
                <Link href="/hirers">
                  <span className="cta-secondary">I&apos;m hiring</span>
                </Link>
              </div>
            </div>
            <div className="hero-artifact">
              <div className="artifact-stack">
                <div className="ghost-layer ghost-1" />
                <div className="ghost-layer ghost-2" />
                <div className="fit-frame">
                  <WhyThisFits />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Problem (white) — narrow, editorial, left-aligned */}
        <section className="problem reveal">
          <div className="problem-container">
            <h2>You already know the problem</h2>
            <ul className="problem-list">
              <li>Too many applications that were never worth making</li>
              <li>Roles that looked plausible but weren&apos;t actually viable</li>
              <li>Time wasted working out what the system should have told you</li>
            </ul>
            <p className="problem-close">
              Most hiring platforms generate activity. Careira is built to reduce it.
            </p>
          </div>
        </section>

        {/* 3. Audience Routing (grey) — two-column */}
        <section className="routing reveal">
          <div className="routing-container">
            <h2 className="routing-headline">Find your path through Careira</h2>
            <div className="routing-grid">
              <div className="routing-col">
                <h3 className="routing-label">For jobseekers</h3>
                <div className="routing-cards">
                  {AUDIENCE_CARDS.map((card) => (
                    <Link key={card.slug} href={`/${card.slug}`} className="rcard-link">
                      <div className="rcard">
                        <h4>{card.label}</h4>
                        <p className="rcard-subtitle">{card.subtitle}</p>
                        <p className="rcard-desc">{card.description}</p>
                        <span className="rcard-cta">Learn more <span className="rcard-arrow">&rarr;</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="routing-col routing-col-hirers">
                <h3 className="routing-label">For hirers</h3>
                <div className="routing-cards">
                  <Link href="/hirers" className="rcard-link">
                    <div className="rcard">
                      <h4>Hiring teams</h4>
                      <p className="rcard-desc">Build shortlists you can defend. See scored candidates with reasoning before you present.</p>
                      <span className="rcard-cta">Learn more <span className="rcard-arrow">&rarr;</span></span>
                    </div>
                  </Link>
                  <Link href="/hirers" className="rcard-link">
                    <div className="rcard">
                      <h4>Agencies &amp; recruiters</h4>
                      <p className="rcard-desc">Screen faster, present stronger. Structured fit evaluation for every candidate you put forward.</p>
                      <span className="rcard-cta">Learn more <span className="rcard-arrow">&rarr;</span></span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Product Proof (dark) — carousel */}
        <section className="proof-carousel reveal" ref={carouselRef}>
          <div className="proof-carousel-container">
            <h2 className="proof-headline">Not just smarter matching &ndash; better judgment</h2>
            <p className="proof-subheadline">
              Careira evaluates fit across multiple dimensions and shows you the reasoning &ndash; strengths, gaps, risks, and preference conflicts &ndash; before you invest time.
            </p>
            <div className="proof-stage">
              <div className={`proof-slide ${proofSlide === 0 ? 'active' : ''}`}>
                <ScoreBreakdown />
              </div>
              <div className={`proof-slide ${proofSlide === 1 ? 'active' : ''}`}>
                <WhyThisFits
                  role="Head of Operations"
                  candidate="Tom Hartley"
                  score={79}
                  scoreLabel="Strong Alignment"
                  reasoning={[
                    'Operational leadership background with 8 years of relevant experience',
                    'Track record in process optimisation and team restructuring',
                    'Gap: limited experience in manufacturing – primarily services sector',
                    'Compensation expectations within range; location preference compatible',
                  ]}
                />
              </div>
              <div className={`proof-slide ${proofSlide === 2 ? 'active' : ''}`}>
                <StrengthsGapsRisks />
              </div>
              <div className={`proof-slide ${proofSlide === 3 ? 'active' : ''}`}>
                <PreferenceConflicts />
              </div>
            </div>
            <div className="proof-dots">
              {['Score breakdown', 'Fit reasoning', 'Strengths & gaps', 'Preference conflicts'].map((label, i) => (
                <button
                  key={i}
                  className={`proof-dot ${proofSlide === i ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={label}
                >
                  <span className="dot-label">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Outcomes (white) */}
        <div className="reveal">
          <OutcomesSection headline="What better looks like" items={OUTCOME_ITEMS} />
        </div>

        {/* 6. Why we built this (grey) */}
        <div className="reveal">
          <CredibilitySection
            headline="Why we built this"
            body={
              <>
                <p>
                  Most hiring platforms optimise for activity &ndash; more applications, more listings, more volume.
                </p>
                <p>
                  That doesn&apos;t improve outcomes. It just creates noise.
                </p>
                <p>
                  Careira is built on a different premise: better decisions come from understanding fit before time is spent.
                </p>
              </>
            }
          />
        </div>

        {/* 8. Final CTA (dark) – audience routing */}
        <section className="final-cta" ref={bottomCtaRef} id="email-signup">
          <div className="cta-container">
            <h2>See how it works in practice</h2>
            <div className="cta-routes">
              <Link href="/jobseekers">
                <span className="cta-route-primary">I&apos;m looking for work</span>
              </Link>
              <Link href="/hirers">
                <span className="cta-route-secondary">I&apos;m hiring</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Sticky compact form */}
        {showStickyForm && !alreadySignedUp && !bottomFormVisible && (
          <EmailSignupForm source="jobseekers" compact />
        )}
      </main>

      <Footer />

      <style jsx>{`
        /* Hero — split layout */
        .hero {
          background: #33374A;
          background-image: radial-gradient(ellipse at 30% 50%, rgba(255, 122, 111, 0.04) 0%, transparent 60%);
          padding: 6rem 0 5.5rem;
          border-bottom: 1px solid rgba(255, 122, 111, 0.15);
        }

        .hero-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 0.85fr;
          align-items: center;
        }

        .hero-text {
          max-width: 560px;
        }

        h1 {
          font-size: 3.75rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.08;
          color: white;
        }

        .brand-line {
          font-size: 1.5rem;
          font-weight: 600;
          color: #FF7A6F;
          margin: 1.25rem 0 0;
        }

        .hero-sub {
          font-size: 1.125rem;
          font-weight: 400;
          margin: 1.25rem 0 0;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.72);
        }

        .hero-cta {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
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

        .cta-primary:hover {
          background: #FF5C4D;
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          background: transparent;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
          cursor: pointer;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.6);
        }

        /* Hero artifact — layered depth treatment */
        .hero-artifact {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .artifact-stack {
          position: relative;
          display: inline-flex;
        }

        .artifact-stack::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 140%;
          height: 140%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at center, rgba(255, 122, 111, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .ghost-layer {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .ghost-1 {
          transform: translate(10px, 8px) scale(0.97);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .ghost-2 {
          transform: translate(20px, 16px) scale(0.94);
          background: rgba(255, 255, 255, 0.025);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .fit-frame {
          position: relative;
          z-index: 1;
          border-left: 2px solid #FF7A6F;
          padding-left: 1rem;
          box-shadow: -4px 0 30px rgba(255, 122, 111, 0.14), 0 12px 48px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: scale(1.03);
        }

        /* Hero micro-motion */
        .hero-artifact :global(.score-fill) {
          transform-origin: left;
          animation: heroScoreGrow 0.8s ease-out both;
        }

        .hero-artifact :global(.reasoning li:nth-child(4)) {
          animation: heroFadeIn 0.4s ease-out 0.8s both;
        }

        @keyframes heroScoreGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Problem — narrow editorial, left-aligned */
        .problem {
          background: #FFFFFF;
          padding: 5rem 0;
          border-top: 1px solid rgba(255, 122, 111, 0.08);
        }

        .problem-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: left;
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
          font-size: 1.125rem;
          line-height: 1.7;
          color: #667085;
          padding: 0.625rem 0 0.625rem 1.5rem;
          position: relative;
        }

        .problem-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.875rem;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: #FF7A6F;
        }

        .problem-close {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #4C526A;
          font-weight: 500;
          margin: 0;
        }

        /* Audience Routing — two-column */
        .routing {
          background: #F2F4F6;
          padding: 6rem 0;
        }

        .routing-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .routing-headline {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          text-align: center;
          margin: 0 0 3rem;
        }

        .routing-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 2.5rem;
          align-items: start;
        }

        .routing-label {
          font-size: 1.125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.25rem;
        }

        .routing-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        :global(a.rcard-link) {
          text-decoration: none;
          color: inherit;
        }

        .rcard {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 2rem 1.75rem;
          border-left: 3px solid #FF7A6F;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .rcard:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.09), 0 4px 10px rgba(0, 0, 0, 0.04);
        }

        .rcard h4 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.25rem;
        }

        .rcard-subtitle {
          font-size: 0.8125rem;
          color: #667085;
          margin: 0 0 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .rcard-desc {
          font-size: 1.05rem;
          color: #4C526A;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }

        .rcard-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          margin-top: 1rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #FF7A6F;
        }

        .rcard-arrow {
          display: inline-block;
          transition: transform 0.15s ease;
        }

        .rcard:hover .rcard-arrow {
          transform: translateX(4px);
        }

        .routing-col-hirers .routing-cards {
          flex: 1;
        }

        /* Proof Carousel */
        .proof-carousel {
          background: #33374A;
          background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          padding: 7rem 0;
        }

        .proof-carousel-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .proof-headline {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          text-align: left;
          margin: 0 0 1rem;
        }

        .proof-subheadline {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          text-align: left;
          max-width: 640px;
          margin: 0 0 3rem;
        }

        .proof-stage {
          position: relative;
          height: 520px;
          overflow: hidden;
        }

        .proof-slide :global(.artifact) {
          max-width: 100%;
        }

        .proof-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }

        .proof-slide.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .proof-dots {
          display: flex;
          justify-content: flex-start;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .proof-dot {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .proof-dot::before {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          transition: background 0.3s, transform 0.3s;
        }

        .proof-dot.active::before {
          background: #FF7A6F;
          transform: scale(1.2);
        }

        .proof-dot:hover::before {
          background: rgba(255, 255, 255, 0.5);
        }

        .proof-dot.active:hover::before {
          background: #FF7A6F;
        }

        .dot-label {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          transition: color 0.3s;
        }

        .proof-dot.active .dot-label {
          color: rgba(255, 255, 255, 0.85);
        }

        /* Final CTA */
        .final-cta {
          background: #33374A;
          background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          padding: 7.5rem 0;
        }

        .cta-container {
          max-width: 560px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .final-cta h2 {
          font-size: 2.375rem;
          font-weight: 700;
          color: white;
          margin: 0 0 2.25rem;
        }

        .cta-routes {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-route-primary {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 1.0625rem;
          font-weight: 600;
          background: #FF7A6F;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s;
          cursor: pointer;
        }

        .cta-route-primary:hover {
          background: #FF5C4D;
        }

        .cta-route-secondary {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 1.0625rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          background: transparent;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
          cursor: pointer;
        }

        .cta-route-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.6);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 3.5rem 0 3rem;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            padding: 0 1.5rem;
          }

          h1 {
            font-size: 2.5rem;
          }

          .brand-line {
            font-size: 1.25rem;
          }

          .hero-sub {
            font-size: 1rem;
          }

          .hero-artifact {
            justify-content: center;
          }

          .artifact-stack {
            max-width: 300px;
          }

          .artifact-stack::before {
            display: none;
          }

          .ghost-layer {
            display: none;
          }

          .hero-artifact :global(.artifact) {
            max-width: 300px;
            padding: 0 1.25rem 1.25rem;
          }

          .hero-artifact :global(.artifact-header) {
            padding: 1rem 1.25rem;
            margin: 0 -1.25rem 1rem;
          }

          .fit-frame {
            border-left: none;
            padding-left: 0;
            box-shadow: none;
            transform: none;
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

          .routing {
            padding: 3.5rem 0;
          }

          .routing-container {
            padding: 0 1rem;
          }

          .routing-headline {
            font-size: 1.5rem;
            margin: 0 0 2rem;
          }

          .routing-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .rcard {
            padding: 1.75rem 1.5rem;
          }

          .proof-carousel {
            padding: 4rem 0;
          }

          .proof-carousel-container {
            padding: 0 1rem;
          }

          .proof-headline {
            font-size: 1.5rem;
          }

          .proof-subheadline {
            margin: 0 auto 2rem;
          }

          .proof-stage {
            height: auto;
          }

          .proof-slide.active {
            position: relative;
          }

          .proof-dots {
            gap: 1rem;
          }

          .dot-label {
            font-size: 0.75rem;
          }

          .final-cta {
            padding: 4rem 0;
          }

          .cta-container {
            padding: 0 1rem;
          }

          .final-cta h2 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 640px) {
          .hero-cta {
            gap: 0.5rem;
          }

          .cta-primary,
          .cta-secondary {
            padding: 0.625rem 1.125rem;
            font-size: 0.9375rem;
            white-space: nowrap;
          }

          .cta-routes {
            flex-direction: column;
          }

          .cta-route-primary,
          .cta-route-secondary {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
