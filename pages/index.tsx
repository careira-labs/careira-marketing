import Head from 'next/head';
import Link from 'next/link';
import PublicNav from '../components/PublicNav';
import FeatureSteps from '../components/FeatureSteps';
import Footer from '../components/Footer';

export default function HomePage() {
  const howItWorksSteps = [
    {
      number: 1,
      title: 'Build a profile',
      description:
        'Upload a CV or define a role. Careira translates it into a structured capability model covering function, domain, seniority, and more.',
    },
    {
      number: 2,
      title: 'Get scored matches',
      description:
        'Candidates and roles are evaluated across the same dimensions — consistently and transparently.',
    },
    {
      number: 3,
      title: 'Understand the reasoning',
      description:
        'Every match includes strengths, gaps, risks, and a confidence score — so decisions are informed, not guesswork.',
    },
  ];

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
              <Link href="/recruiters">
                <span className="cta-button">I'm hiring</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Value prop */}
        <section className="value-prop">
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
        <FeatureSteps steps={howItWorksSteps} title="How it works" />

        {/* Proof section */}
        <section className="proof">
          <div className="proof-container">
            <h2>Why it works</h2>
            <div className="proof-grid">
              <div className="proof-card">
                <h3>Structured profiles, not parsed CVs</h3>
                <p>
                  CVs are translated into capability models with defined dimensions — not just extracted
                  keywords. This means matching is based on what someone can actually do, not how their
                  CV happens to be worded.
                </p>
              </div>
              <div className="proof-card">
                <h3>Scoring you can read and challenge</h3>
                <p>
                  Every match score breaks down into component dimensions with individual ratings.
                  You can see exactly where fit is strong, where gaps exist, and how confident the
                  assessment is.
                </p>
              </div>
              <div className="proof-card">
                <h3>Feedback that improves results</h3>
                <p>
                  Structured feedback — not just thumbs up or down — feeds back into the matching
                  model. Over time, the system learns what matters for each role and each candidate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bottom-cta">
          <div className="cta-container">
            <h2>Ready to see how it works?</h2>
            <div className="cta-buttons">
              <Link href="/jobseekers">
                <span className="cta-solid">I'm looking for work</span>
              </Link>
              <Link href="/recruiters">
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
          padding: 6rem 0 5rem;
        }

        .hero-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
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
          margin: 2rem 0 0;
          border-top: 3px solid #FF7A6F;
          padding-top: 1.25rem;
          max-width: 640px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        .hero-cta {
          margin-top: 2.5rem;
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
          padding: 5rem 0;
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
          margin: 0 0 1.5rem;
        }

        .value-prop p {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #667085;
          margin: 0;
        }

        /* Proof section */
        .proof {
          background: #FFFFFF;
          padding: 4rem 0;
        }

        .proof-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .proof h2 {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 2.5rem;
        }

        .proof-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .proof-card {
          padding: 1.5rem;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
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
          background: #F2F4F6;
          padding: 4rem 0;
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
          margin: 0 0 2rem;
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
            padding: 4rem 0 3rem;
          }

          .hero-container {
            padding: 0 1rem;
          }

          h1 {
            font-size: 2.5rem;
          }

          .hero-sub {
            font-size: 1.1rem;
          }

          .value-prop {
            padding: 3rem 0;
          }

          .vp-container {
            padding: 0 1rem;
          }

          .value-prop h2 {
            font-size: 1.5rem;
          }

          .proof {
            padding: 3rem 0;
          }

          .proof-container {
            padding: 0 1rem;
          }

          .proof h2 {
            font-size: 1.5rem;
          }

          .proof-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .bottom-cta {
            padding: 3rem 0;
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
