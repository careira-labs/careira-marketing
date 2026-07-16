import Head from 'next/head';
import { useEffect, useRef } from 'react';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import ScoreBreakdown from '../components/proof/ScoreBreakdown';

const EVENT_ID = '1992593899994';
const EVENT_URL = `https://www.eventbrite.com/e/${EVENT_ID}`;
const RESERVE_TRIGGERS = ['eb-reserve-hero', 'eb-reserve-final'];

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: string;
        eventId: string;
        modal: boolean;
        modalTriggerElementId: string;
        onOrderComplete?: () => void;
      }) => void;
    };
  }
}

const EXPECT = [
  'A founder-led introduction to the Careira mission, product and market opportunity',
  'A live product demo showing how Careira works for candidates and recruiters',
  'Early findings from pilot activity with jobseekers, recruiters and partner organisations',
  'Guest perspectives on hiring, recruitment, careers and the role of AI',
  'A clear view of what Careira is learning from the market',
  'Practical ways for recruiters, HR teams, advisors and investors to get involved',
];

const ATTEND = [
  'Recruitment founders and specialist recruiters',
  'HR, talent and people leaders',
  'Growing companies dealing with high application volumes or recurring hiring needs',
  'Angel investors and early-stage investors',
  'Advisors interested in hiring, careers, AI or the future of work',
];

const AGENDA = [
  {
    title: 'Welcome and founder introduction',
    body:
      'Why Careira exists, what is changing in the hiring market, and why now is the right time to build a better decision layer between people, roles and hiring teams.',
  },
  {
    title: 'Product demo',
    body:
      'A practical look at how Careira helps candidates and recruiters move beyond the limits of traditional applications, keyword search and disconnected hiring data.',
  },
  {
    title: 'Pilot findings and market learning',
    body:
      'Early results from Careira’s pilot activity, including what jobseekers, recruiters and partners are responding to.',
  },
  {
    title: 'Guest perspectives',
    body:
      'Short contributions from people with direct experience in hiring, recruitment, investment, careers or workforce change.',
  },
  {
    title: 'The next stage',
    body:
      'Where Careira is seeing demand, how the platform is developing around real market needs, and how early supporters can help through customer referrals, introductions, advisory input or investment.',
  },
];

export default function LaunchPage() {
  const widgetReady = useRef(false);

  useEffect(() => {
    function initWidgets() {
      if (!window.EBWidgets) return;
      RESERVE_TRIGGERS.forEach((id) => {
        if (!document.getElementById(id)) return;
        window.EBWidgets!.createWidget({
          widgetType: 'checkout',
          eventId: EVENT_ID,
          modal: true,
          modalTriggerElementId: id,
        });
      });
      widgetReady.current = true;
    }

    const existing = document.getElementById('eb-widgets-script');
    if (existing) {
      initWidgets();
      return;
    }

    const script = document.createElement('script');
    script.id = 'eb-widgets-script';
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    script.onload = initWidgets;
    document.body.appendChild(script);
  }, []);

  // The Eventbrite widget binds its own click handler to open the modal.
  // This only fires as a fallback if the widget script never loaded.
  function handleReserveFallback() {
    if (widgetReady.current) return;
    window.open(EVENT_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <Head>
        <title>Careira Launch Event | Bringing context back into hiring</title>
        <meta
          name="description"
          content="Join Careira&rsquo;s virtual launch event on Thursday 17 September. A founder-led introduction to Careira&rsquo;s AI-native hiring platform, with a live product demo, pilot findings and guest perspectives on the future of hiring."
        />
        <meta property="og:title" content="Careira Launch Event" />
        <meta
          property="og:description"
          content="A founder-led introduction to Careira&rsquo;s AI-native hiring platform. Thursday 17 September, 6–7pm UK time. Online."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.careira.com/launch" />
      </Head>

      <PublicNav theme="dark" />

      <main className="launch-page">
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
            <span className="eyebrow">Virtual launch event</span>
            <h1>Careira Launch Event</h1>
            <p className="hero-tagline">Bringing context back into hiring</p>

            <div className="event-meta">
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M2 6h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Thursday 17 September
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.35" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                6&ndash;7pm UK &middot; 1&ndash;2pm Eastern
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.35" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1.65 8h12.7M8 1.65c1.7 1.8 2.6 4 2.6 6.35 0 2.35-.9 4.55-2.6 6.35-1.7-1.8-2.6-4-2.6-6.35 0-2.35.9-4.55 2.6-6.35Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                Online
              </span>
            </div>

            <p className="hero-sub">
              A founder-led introduction to Careira&rsquo;s AI-native hiring platform, built to
              move hiring beyond keyword matching, static profiles and guesswork.
            </p>

            <button
              id="eb-reserve-hero"
              type="button"
              className="reserve-btn"
              onClick={handleReserveFallback}
            >
              Reserve your place
            </button>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <ScoreBreakdown
                role="Customer Success Manager"
                company="Orbital"
                location="London"
                workStyle="Remote"
                matchLabel="Exceptional Fit"
                overallScore={80}
                dimensions={[
                  { label: 'Domain fit', score: 30 },
                  { label: 'Skills match', score: 95 },
                  { label: 'Role Outcomes', score: 90 },
                  { label: 'Core function', score: 100 },
                  { label: 'Location fit', score: 70 },
                  { label: 'Seniority level', score: 63 },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="section section-white">
          <div className="prose">
            <p>
              Careira is building a clearer way for jobseekers, recruiters and hiring teams to
              make better decisions about people and roles.
            </p>
            <p>
              This event is Careira&rsquo;s public launch as a live platform. It brings together
              the product, the problem, and the wider opportunity to improve how hiring decisions
              are made.
            </p>
          </div>
        </section>

        {/* ── Problem ── */}
        <section className="section section-canvas">
          <div className="prose">
            <h2 className="statement">
              Hiring doesn&rsquo;t lack information. It lacks a clear view of relevance.
            </h2>
            <ul className="plain-list">
              <li>
                Jobseekers struggle to show the full picture of who they are and what they could do.
              </li>
              <li>
                Recruiters are buried in profiles, applications, messages and disconnected tools.
              </li>
              <li>
                Hiring teams are still left asking the same core question: who is genuinely worth
                speaking to, and why?
              </li>
            </ul>
          </div>
        </section>

        {/* ── Solution ── */}
        <section className="section section-white">
          <div className="prose">
            <h2>Careira is built to make relevance clearer.</h2>
            <p>
              The platform helps candidates create richer, more structured career profiles. It
              helps recruiters and hiring teams understand people in relation to specific roles,
              with clearer explanations, role-specific evidence and practical hiring intelligence.
            </p>
            <p>
              This event will include a product demo, early findings from pilot activity, guest
              perspectives on hiring and recruitment, and a clear view of how Careira is developing
              as a business.
            </p>
            <p>
              It is designed for people with a practical interest in the future of hiring and
              careers: recruiters, HR and talent leaders, founders, investors, advisors, and others
              interested in how AI can improve hiring without replacing human decision-making.
            </p>
          </div>
        </section>

        {/* ── What to expect / Who should attend ── */}
        <section className="section section-canvas">
          <div className="two-col">
            <div className="col-card">
              <h3>What to expect</h3>
              <ul className="tick-list">
                {EXPECT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-card">
              <h3>Who should attend</h3>
              <ul className="tick-list">
                {ATTEND.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Agenda ── */}
        <section className="section section-white">
          <div className="prose">
            <h2 className="section-heading">Event agenda</h2>
          </div>
          <div className="agenda">
            {AGENDA.map((item, i) => (
              <div className="agenda-item" key={item.title}>
                <span className="agenda-num">{i + 1}</span>
                <div className="agenda-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="cta">
          <div className="cta-inner">
            <h2>Be part of the Careira launch</h2>
            <p>
              Careira is bringing more clarity, relevance and intelligence to one of the most
              important markets in the world: hiring. Join us for a focused virtual launch event
              covering the product, pilot findings, market learning and the next stage of the
              business.
            </p>
            <button
              id="eb-reserve-final"
              type="button"
              className="reserve-btn"
              onClick={handleReserveFallback}
            >
              Register now to attend
            </button>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="disclaimer">
          <p>
            <strong>Important note.</strong> This event is for informational purposes only. Nothing
            presented should be interpreted as investment advice or an offer to sell securities. Any
            investment opportunity, if applicable, will be made only through proper offering
            materials and in accordance with applicable laws.
          </p>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .launch-page {
          background: #F2F4F6;
        }

        /* ── Hero ── */
        .hero {
          background: #33374A;
          padding: 5rem 2rem 4.5rem;
        }
        .hero-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 3.5rem;
          align-items: center;
          text-align: left;
        }
        .hero-visual {
          display: flex;
          justify-content: flex-end;
        }
        .hero-visual :global(.artifact) {
          max-width: 480px;
        }
        .eyebrow {
          display: inline-block;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FF7A6F;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.5rem;
          line-height: 1.15;
        }
        .hero-tagline {
          font-size: 1.25rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 1.75rem;
        }
        .event-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 0.75rem 1.5rem;
          margin-bottom: 1.75rem;
        }
        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }
        .meta-item :global(svg) {
          color: #FF7A6F;
          flex-shrink: 0;
        }
        .hero-sub {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          max-width: 540px;
          margin: 0 0 2rem;
        }

        /* ── Sections ── */
        .section {
          padding: 4rem 2rem;
        }
        .section-white {
          background: #FFFFFF;
        }
        .section-canvas {
          background: #F2F4F6;
        }
        .prose {
          max-width: 720px;
          margin: 0 auto;
        }
        .prose p {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #4C526A;
          margin: 0 0 1.25rem;
        }
        .prose p:last-child {
          margin-bottom: 0;
        }
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.25rem;
          line-height: 1.25;
        }
        .statement {
          font-size: 1.875rem !important;
          margin-bottom: 1.75rem !important;
        }
        .section-heading {
          text-align: center;
          margin-bottom: 0 !important;
        }

        .plain-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .plain-list li {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: #4C526A;
          padding: 0.75rem 0 0.75rem 1.75rem;
          position: relative;
          border-top: 1px solid #E5E7EB;
        }
        .plain-list li:first-child {
          border-top: none;
        }
        .plain-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 1.35rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FF7A6F;
        }

        /* ── Two column cards ── */
        .two-col {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .col-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
        }
        .col-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.25rem;
        }
        .tick-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tick-list li {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: #4C526A;
          padding: 0.5rem 0 0.5rem 1.75rem;
          position: relative;
        }
        .tick-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(255, 122, 111, 0.15);
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 5l2 2 4-4' stroke='%23FF7A6F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
        }

        /* ── Agenda ── */
        .agenda {
          max-width: 720px;
          margin: 2rem auto 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .agenda-item {
          display: flex;
          gap: 1.25rem;
          background: #FAFBFC;
          border: 1px solid #EEF0F3;
          border-radius: 12px;
          padding: 1.5rem;
        }
        .agenda-num {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FF7A6F;
          color: #FFFFFF;
          font-size: 0.9375rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .agenda-body h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0.25rem 0 0.5rem;
        }
        .agenda-body p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
        }

        /* ── Final CTA ── */
        .cta {
          background: #33374A;
          padding: 5rem 2rem;
        }
        .cta-inner {
          max-width: 640px;
          margin: 0 auto;
          text-align: center;
        }
        .cta h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 1rem;
        }
        .cta p {
          font-size: 1.0625rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 2rem;
        }

        /* ── Reserve button ── */
        .reserve-btn {
          display: inline-block;
          padding: 0.9375rem 2.25rem;
          font-size: 1.0625rem;
          font-weight: 600;
          font-family: var(--font);
          color: #FFFFFF;
          background: #FF7A6F;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, transform 0.15s;
        }
        .reserve-btn:hover {
          background: #FF5C4D;
          transform: translateY(-1px);
          opacity: 1;
        }

        /* ── Disclaimer ── */
        .disclaimer {
          background: #2A2D3D;
          padding: 2rem;
        }
        .disclaimer p {
          max-width: 720px;
          margin: 0 auto;
          font-size: 0.8125rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }
        .disclaimer strong {
          color: rgba(255, 255, 255, 0.75);
          font-weight: 600;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            max-width: 560px;
            text-align: center;
          }
          .event-meta {
            justify-content: center;
          }
          .hero-sub {
            max-width: 540px;
            margin: 0 auto 2rem;
          }
          .hero-visual {
            justify-content: center;
          }
          .hero-visual :global(.artifact) {
            max-width: 500px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3.5rem 1.5rem 3rem;
          }
          h1 {
            font-size: 1.875rem;
          }
          .hero-tagline {
            font-size: 1.0625rem;
          }
          .event-meta {
            gap: 0.5rem 1.25rem;
          }
          .section {
            padding: 3rem 1.5rem;
          }
          .prose h2 {
            font-size: 1.5rem;
          }
          .statement {
            font-size: 1.5rem !important;
          }
          .two-col {
            grid-template-columns: 1fr;
          }
          .col-card {
            padding: 1.75rem;
          }
          .agenda-item {
            padding: 1.25rem;
            gap: 1rem;
          }
          .cta {
            padding: 3.5rem 1.5rem;
          }
          .cta h2 {
            font-size: 1.625rem;
          }
        }
      `}</style>
    </>
  );
}
