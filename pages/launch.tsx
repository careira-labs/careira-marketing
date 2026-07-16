import Head from 'next/head';
import { useEffect, useRef } from 'react';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import ScoreBreakdown from '../components/proof/ScoreBreakdown';

const EVENT_ID = '1992593899994';
const EVENT_URL = `https://www.eventbrite.com/e/${EVENT_ID}`;
const RESERVE_TRIGGERS = ['eb-reserve-hero', 'eb-reserve-final'];

const EVENT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Careira Launch Event',
  description:
    'A founder-led introduction to Careira’s AI-native hiring platform, with a live product demo, early pilot findings and guest perspectives on the future of hiring.',
  startDate: '2026-09-17T18:00:00+01:00',
  endDate: '2026-09-17T19:00:00+01:00',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'VirtualLocation',
    url: 'https://www.careira.com/launch',
  },
  organizer: {
    '@type': 'Organization',
    name: 'Careira',
    url: 'https://www.careira.com',
  },
  performer: { '@type': 'Person', name: 'Dan Mason' },
  image: 'https://www.careira.com/assets/LOGO-Careira-bitone.png',
  url: 'https://www.careira.com/launch',
};

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
  'A founder-led introduction to the mission and market',
  'A live product demo for candidates and recruiters',
  'Early findings from pilot activity',
  'Guest perspectives on hiring and AI',
  'What Careira is learning from the market',
  'Practical ways to get involved',
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
        <meta property="og:url" content="https://www.careira.com/launch" />
        <link rel="canonical" href="https://www.careira.com/launch" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_JSONLD) }}
        />
      </Head>

      <PublicNav theme="dark" />

      <main className="launch-page">
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-inner">
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
            <p className="reserve-note">Reserve in under a minute &middot; Secured through Eventbrite</p>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="section section-white intro-section">
          <div className="intro-grid">
            <div className="intro-copy">
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
            <div className="intro-visual" aria-hidden="true">
              <ScoreBreakdown
                role="Customer Success Manager"
                company="Onfund"
                location=""
                workStyle="Remote"
                salary="$90&ndash;120k"
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

        {/* ── Problem ── */}
        <section className="section section-canvas">
          <div className="problem-head">
            <h2 className="statement">
              Hiring doesn&rsquo;t lack information. It lacks a clear view of relevance.
            </h2>
          </div>
          <div className="problem-grid">
            <div className="problem-card">
              <span className="problem-label">Jobseekers</span>
              <p>struggle to show the full picture of who they are and what they could do.</p>
            </div>
            <div className="problem-card">
              <span className="problem-label">Recruiters</span>
              <p>are buried in profiles, applications, messages and disconnected tools.</p>
            </div>
            <div className="problem-card">
              <span className="problem-label">Hiring teams</span>
              <p>
                are still left asking the same core question: who is genuinely worth speaking to,
                and why?
              </p>
            </div>
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

        {/* ── Hosts ── */}
        <section className="section section-canvas">
          <div className="hosts">
            <h2 className="section-heading">Your hosts</h2>
            <p className="hosts-sub">A founder-led session, hosted live.</p>
            <div className="hosts-grid">
              <div className="host">
                <img src="/assets/connect/dan-mason.png" alt="Dan Mason" className="host-photo" />
                <span className="host-name">Dan Mason</span>
                <span className="host-role">Founder</span>
              </div>
              <div className="host">
                <img src="/assets/connect/gary-stacey.png" alt="Gary Stacey" className="host-photo" />
                <span className="host-name">Gary Stacey</span>
                <span className="host-role">Co-Founder</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="cta">
          <div className="cta-inner">
            <span className="cta-eyebrow">The launch event</span>
            <h2>Be part of the Careira launch</h2>
            <p>
              Careira is bringing more clarity, relevance and intelligence to one of the most
              important markets in the world: hiring. Join us for the product, pilot findings,
              market learning and the next stage of the business.
            </p>
            <div className="cta-meta">
              <span className="cta-pill">Thursday 17 September</span>
              <span className="cta-pill">6&ndash;7pm UK &middot; 1&ndash;2pm Eastern</span>
              <span className="cta-pill">Online</span>
            </div>
            <button
              id="eb-reserve-final"
              type="button"
              className="reserve-btn"
              onClick={handleReserveFallback}
            >
              Register now to attend
            </button>
            <p className="reserve-note reserve-note-dark">Reserve in under a minute &middot; Secured through Eventbrite</p>
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
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .eyebrow {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #FF7A6F;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 3.125rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.625rem;
          line-height: 1.12;
        }
        .hero-tagline {
          font-size: 1.4375rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 1.875rem;
        }
        .event-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem 1.5rem;
          margin-bottom: 1.75rem;
        }
        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.0625rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }
        .meta-item :global(svg) {
          color: #FF7A6F;
          flex-shrink: 0;
        }
        .hero-sub {
          font-size: 1.1875rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.82);
          max-width: 660px;
          margin: 0 auto 2rem;
        }

        /* ── Intro (copy + product card) ── */
        .intro-section {
          padding-top: 3.25rem;
          padding-bottom: 3.25rem;
        }
        .intro-grid {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.78fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .intro-copy p {
          font-size: 1.3125rem;
          line-height: 1.55;
          color: #33374A;
          margin: 0 0 1.125rem;
        }
        .intro-copy p:last-child {
          margin-bottom: 0;
        }
        .intro-visual {
          display: flex;
          justify-content: flex-end;
        }
        .intro-visual :global(.artifact) {
          max-width: 430px;
          border: 1px solid #EEF0F3;
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
          line-height: 1.5;
          color: #4C526A;
          padding: 0.5rem 0 0.5rem 2.1rem;
          position: relative;
        }
        .tick-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.3rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFE9E6;
        }
        .tick-list li::after {
          content: '';
          position: absolute;
          left: 7px;
          top: 0.52rem;
          width: 4.5px;
          height: 8px;
          border: solid #FF7A6F;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
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
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 50% -10%, rgba(255, 122, 111, 0.22), rgba(255, 122, 111, 0) 55%),
            #2E3142;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 5.5rem 2rem;
        }
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 660px;
          margin: 0 auto;
          text-align: center;
        }
        .cta-eyebrow {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #FF7A6F;
          margin-bottom: 1rem;
        }
        .cta h2 {
          font-size: 2.625rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 1rem;
          line-height: 1.15;
        }
        .cta p {
          font-size: 1.125rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          max-width: 560px;
          margin: 0 auto 2rem;
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
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 8px 20px rgba(255, 122, 111, 0.28);
        }
        .reserve-btn:hover {
          background: #FF5C4D;
          transform: translateY(-1px);
          box-shadow: 0 10px 26px rgba(255, 122, 111, 0.36);
          opacity: 1;
        }
        .reserve-note {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.55);
          margin: 0.875rem 0 0;
        }
        .reserve-note-dark {
          color: rgba(255, 255, 255, 0.55);
        }

        /* ── Problem persona cards ── */
        .problem-head {
          max-width: 760px;
          margin: 0 auto 2.5rem;
          text-align: center;
        }
        .problem-grid {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .problem-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 1.75rem;
          border-top: 3px solid #FF7A6F;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.03);
        }
        .problem-label {
          display: block;
          font-size: 1.0625rem;
          font-weight: 700;
          color: #33374A;
          margin-bottom: 0.5rem;
        }
        .problem-card p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
        }

        /* ── Hosts ── */
        .hosts {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .hosts-sub {
          font-size: 1.0625rem;
          color: #4C526A;
          margin: 0.5rem 0 2.25rem;
        }
        .hosts-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2.5rem;
        }
        .host {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .host-photo {
          width: 115px;
          height: 115px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #FFFFFF;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          margin-bottom: 0.875rem;
        }
        .host-name {
          font-size: 1rem;
          font-weight: 700;
          color: #33374A;
        }
        .host-role {
          font-size: 0.875rem;
          color: #667085;
          margin-top: 0.125rem;
        }

        /* ── CTA meta ── */
        .cta-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.625rem;
          margin: 0 0 2.25rem;
        }
        .cta-pill {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          padding: 0.4375rem 0.9375rem;
        }
        .cta .reserve-btn {
          padding: 1.0625rem 2.75rem;
          font-size: 1.125rem;
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
          .intro-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            max-width: 560px;
          }
          .intro-copy {
            text-align: center;
          }
          .intro-visual {
            justify-content: center;
          }
          .intro-visual :global(.artifact) {
            max-width: 500px;
          }
          .problem-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3.5rem 1.5rem 3rem;
          }
          h1 {
            font-size: 2.25rem;
          }
          .hero-tagline {
            font-size: 1.1875rem;
          }
          .event-meta {
            gap: 0.5rem 1.25rem;
          }
          .section {
            padding: 3rem 1.5rem;
          }
          .intro-copy p {
            font-size: 1.1875rem;
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
            padding: 4rem 1.5rem;
          }
          .cta h2 {
            font-size: 1.875rem;
          }
          .cta-meta {
            font-size: 0.875rem;
          }
          .hosts-grid {
            gap: 2rem;
          }
          .host-photo {
            width: 96px;
            height: 96px;
          }
        }
      `}</style>
    </>
  );
}
