import Head from 'next/head';
import Link from 'next/link';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import { useScrollReveal } from '../lib/useScrollReveal';

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <Head>
        <title>Careira – Work that fits, found faster</title>
        <meta
          name="description"
          content="AI-powered talent matching that models what people can do, scores fit across multiple dimensions, and explains why."
        />
      </Head>

      <PublicNav theme="dark" />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-container">
            <img
              src="/assets/LOGO-Careira-bitone-white.png"
              alt="Careira"
              className="hero-logo"
            />
            <h1>
              Work that fits,
              <br />
              found faster
            </h1>
            <p className="hero-sub">
              AI-powered talent matching that models what people can do, scores fit across multiple dimensions, and explains why.
            </p>
            <div className="hero-cta">
              <Link href="/jobseekers">
                <span className="cta-button">I'm looking for work</span>
              </Link>
              <Link href="/hirers">
                <span className="cta-button">I'm hiring</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Value prop */}
        <section className="value-prop reveal">
          <div className="vp-container">
            <h2>A different approach to talent matching</h2>
            <p>
              Most hiring tools rely on keyword matching and opaque algorithms. Careira builds structured
              capability profiles from CVs and role definitions, then scores fit across multiple dimensions
              — function, domain, seniority, outcomes, and more. Every score comes with clear reasoning,
              so both sides of the hiring process can make informed decisions.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="how-it-works reveal">
          <div className="hiw-container">
            <h2>How it works</h2>
            <div className="steps">
              <div className="step">
                <span className="step-num">1.</span>
                <div>
                  <h3>Build a profile</h3>
                  <p>Upload a CV or define a role. Careira translates it into a structured capability model covering function, domain, seniority, and more.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-num">2.</span>
                <div>
                  <h3>Get scored matches</h3>
                  <p>Candidates and roles are evaluated across the same dimensions - consistently and transparently.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-num">3.</span>
                <div>
                  <h3>Understand the reasoning</h3>
                  <p>Every match includes strengths, gaps, risks, and a confidence score, so decisions are informed, not guesswork.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section className="proof reveal">
          <div className="proof-container">
            <h2>Why it works</h2>
            <div className="proof-grid">
              <div className="proof-card">
                <div className="proof-accent"></div>
                <h3>Structured profiles, not parsed text</h3>
                <p>
                  CVs are translated into Career Profiles with defined dimensions - not just extracted
                  keywords. Matching is based on what someone can actually do, not how their CV
                  happens to be worded.
                </p>
              </div>
              <div className="proof-card">
                <div className="proof-accent"></div>
                <h3>Scoring you can read and challenge</h3>
                <p>
                  Every match score breaks down into component categories with individual ratings.
                  You can see exactly where fit is strong, where gaps exist, and how confident the
                  assessment is.
                </p>
              </div>
              <div className="proof-card">
                <div className="proof-accent"></div>
                <h3>Feedback that improves results</h3>
                <p>
                  Structured feedback (not just thumbs up or down) feeds back into the matching
                  model. Over time, the system learns what matters for each role and each candidate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bottom-cta">
          <div className="cta-container">
            <h2>See it in action</h2>
            <div className="cta-buttons">
              <Link href="/jobseekers">
                <span className="cta-solid">I'm looking for work</span>
              </Link>
              <Link href="/hirers">
                <span className="cta-solid">I'm hiring</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        /* Hero */
        .hero {
          background: #33374A;
          padding: 5rem 0 4rem;
        }

        .hero-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-logo {
          height: 56px;
          width: auto;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.15;
          color: white;
        }

        .hero-sub {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 1.75rem 0 0;
          border-top: 3px solid #FF7A6F;
          padding-top: 1.25rem;
          max-width: 640px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        .hero-cta {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: white;
          background: transparent;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
          display: inline-block;
        }

        .cta-button:hover {
          background: #FF7A6F;
          border-color: #FF7A6F;
        }

        /* Value prop */
        .value-prop {
          background: #F2F4F6;
          padding: 3.5rem 0;
        }

        .vp-container {
          max-width: 700px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .value-prop h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 1.25rem;
        }

        .value-prop p {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #667085;
          margin: 0;
        }

        /* How it works */
        .how-it-works {
          background: #FFFFFF;
          padding: 3.5rem 0;
        }

        .hiw-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .how-it-works h2 {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 2rem;
        }

        .steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .step-num {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FF7A6F;
          line-height: 1.3;
          flex-shrink: 0;
          min-width: 1.75rem;
        }

        .step h3 {
          font-size: 1.0625rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 0.375rem;
        }

        .step p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #667085;
          margin: 0;
        }

        /* Proof / Why it works */
        .proof {
          background: #F2F4F6;
          padding: 3.5rem 0;
        }

        .proof-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .proof h2 {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 2rem;
        }

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .proof-card {
          background: #FFFFFF;
          padding: 1.75rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
          position: relative;
          overflow: hidden;
        }

        .proof-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #FF7A6F;
        }

        .proof-card h3 {
          font-size: 1.0625rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 0.75rem;
        }

        .proof-card p {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: #667085;
          margin: 0;
        }

        /* Bottom CTA */
        .bottom-cta {
          background: #FFFFFF;
          padding: 3.5rem 0;
        }

        .cta-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .bottom-cta h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 1.5rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-solid {
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          background: #FF7A6F;
          color: white;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s;
          cursor: pointer;
          display: inline-block;
        }

        .cta-solid:hover {
          background: #FF5C4D;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0 2.5rem;
          }

          .hero-container {
            padding: 0 1rem;
          }

          .hero-logo {
            height: 44px;
          }

          h1 {
            font-size: 2.5rem;
          }

          .hero-sub {
            font-size: 1.1rem;
          }

          .value-prop {
            padding: 2.5rem 0;
          }

          .vp-container {
            padding: 0 1rem;
          }

          .value-prop h2 {
            font-size: 1.5rem;
          }

          .how-it-works {
            padding: 2.5rem 0;
          }

          .hiw-container {
            padding: 0 1rem;
          }

          .how-it-works h2 {
            font-size: 1.5rem;
          }

          .proof {
            padding: 2.5rem 0;
          }

          .proof-container {
            padding: 0 1rem;
          }

          .proof h2 {
            font-size: 1.5rem;
          }

          .proof-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .bottom-cta {
            padding: 2.5rem 0;
          }

          .cta-container {
            padding: 0 1rem;
          }

          .bottom-cta h2 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-cta {
            flex-direction: column;
            width: 100%;
          }

          .cta-button {
            width: 100%;
            text-align: center;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-solid {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
