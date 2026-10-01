import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import CareerMatchProfile from '../components/proof/CareerMatchProfile';
import ProductProofSection from '../components/ProductProofSection';
import AudienceRoutingSection from '../components/AudienceRoutingSection';
import WhyThisFits from '../components/proof/WhyThisFits';
import StrengthsGapsRisks from '../components/proof/StrengthsGapsRisks';
import EmailSignupForm from '../components/EmailSignupForm';
import { useScrollReveal } from '../lib/useScrollReveal';
import { useStickySignup } from '../hooks/useStickySignup';

/* ── Icons (white glyphs, sit inside coral circles) ── */
const IconUserCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
  </svg>
);
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" />
  </svg>
);
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconShuffle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);
const IconSync = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const IconDoc = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);

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

const MATCHES = [
  {
    iconKey: 'bars' as const,
    iconBg: '#3B6FD4',
    primary: 'Lead Data Engineer',
    secondary: 'Fintech scale-up · London, hybrid',
    tags: [{ label: 'Step up to lead' }, { label: 'Uses your pipeline experience' }],
    score: 94,
  },
  {
    iconKey: 'cursor' as const,
    iconBg: '#E0922F',
    primary: 'Analytics Platform Engineer',
    secondary: 'Retail group · Remote, UK',
    tags: [{ label: 'Adjacent: analytics → platform' }, { label: 'Builds on your SQL and dbt' }],
    score: 89,
  },
  {
    iconKey: 'layers' as const,
    iconBg: '#0E8A8A',
    primary: 'Data Infrastructure Engineer',
    secondary: 'Logistics tech · Manchester',
    tags: [{ label: 'New today · matched first', highlight: true }, { label: 'Draws on your cloud-migration work' }],
    score: 86,
  },
  {
    iconKey: 'pin' as const,
    iconBg: '#1F9D6B',
    primary: 'Data Platform Engineer',
    secondary: 'Public sector · Leeds, hybrid',
    tags: [{ label: 'Values your governance work' }, { label: 'Python, Spark in your stack' }],
    score: 83,
  },
];

const CHANGES = [
  { icon: <IconUserCheck />, title: 'A profile that does you justice', body: 'A structured Career Profile captures your whole background, not just what fits on a two-page CV.' },
  { icon: <IconClock />, title: 'Relevant roles in less time', body: 'Start from a ranked, explained list of matches, not a wall of listings. Far less time goes on scrolling and sifting.' },
  { icon: <IconLayers />, title: 'Context, not keywords', body: 'Experience, seniority, trajectory and domain are all weighed, so your strengths aren’t lost to different wording.' },
  { icon: <IconShuffle />, title: 'Adjacent strengths, seen early', body: 'Transferable skills that keyword search misses come to the surface, opening roles you’d never have found alone.' },
  { icon: <IconSync />, title: 'One profile, working constantly', body: 'Your Career Profile is rematched against every new role as it arrives, so the right opportunities come to you.' },
  { icon: <IconDoc />, title: 'Reasoning you can act on', body: 'Each match comes with clear reasoning tied to your background, so you know where to focus and why.' },
];

const OLD_WAY = [
  'Matches words, not meaning',
  'Makes you guess the ‘right’ words',
  'Misses transferable experience',
  'Leaves you guessing why',
  'Built for volume, not relevance',
];

const NEW_WAY = [
  'Understands your experience',
  'Weighs your whole background',
  'Sees adjacent strengths',
  'Finds roles you’d never search',
  'Explains relevance with evidence',
];

const STEPS = [
  { n: '1', title: 'Create your profile', body: 'Upload your CV or answer a short questionnaire. Careira structures your background in seconds.' },
  { n: '2', title: 'Get matched', body: 'Careira weighs your experience against live roles from every angle, as new ones arrive.' },
  { n: '3', title: 'Review your matches', body: 'Ranked, explained matches, with the reasoning behind every recommendation.' },
];

// Fixed "random" scatter for the live-roles cell (deterministic → no hydration mismatch).
// [cx, cy, r, opacity]
const SCATTER: [number, number, number, number][] = [
  [8, 12, 3, 0.55], [19, 30, 2.5, 0.45], [13, 41, 3, 0.6], [29, 16, 2, 0.4],
  [37, 35, 3.5, 0.65], [25, 45, 2.5, 0.5], [45, 24, 3, 0.55], [53, 9, 2, 0.4],
  [49, 41, 3, 0.6], [63, 31, 2.5, 0.5], [59, 17, 3, 0.55], [71, 43, 2, 0.45],
  [80, 13, 3.5, 0.65], [75, 29, 2.5, 0.5], [88, 38, 3, 0.55], [96, 21, 2, 0.4],
  [103, 35, 3, 0.6], [99, 11, 2.5, 0.5], [112, 27, 3, 0.55], [119, 43, 2, 0.45],
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
          content="Find where you fit, faster. Careira is AI matching for jobseekers that reads your whole background, matches you to roles where you genuinely fit, and explains every recommendation."
        />
        <meta property="og:title" content="For Jobseekers – Careira" />
        <meta property="og:description" content="Intelligent matching that understands you, not just keywords. Ranked, explained matches so your effort goes on the right applications." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.careira.com/jobseekers" />
        <link rel="canonical" href="https://www.careira.com/jobseekers" />
      </Head>

      <PublicNav theme="dark" />

      <main>
        {/* Hero (dark) */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow eyebrow-dark">For jobseekers</span>
            <h1>Find where you fit, faster.</h1>
            <p className="lead">Intelligent matching that understands you, not just keywords</p>
            <p className="intro">
              Careira is an AI matching platform for jobseekers. It reads your background the way an experienced
              recruiter does, looking at the whole picture and not just the keywords. It matches you to the roles
              where you genuinely fit and explains every recommendation, so your effort goes on the right
              applications, not searching and scrolling.
            </p>
            <button className="cta-button" onClick={scrollToForm}>Find roles that fit</button>
          </div>
        </section>

        {/* Career profile proof (grey) */}
        <section className="proof reveal">
          <div className="wrap wrap-center">
            <CareerMatchProfile
              eyebrow="Your best matches"
              title="Senior Data Engineer"
              showTally={false}
              footerNote="Every match shows the reasoning behind it"
              items={MATCHES}
            />
          </div>
        </section>

        {/* What changes for you (white) */}
        <section className="changes reveal">
          <div className="wrap">
            <h2>What changes for you</h2>
            <div className="changes-grid">
              {CHANGES.map((c, i) => (
                <div className="change-card" key={i}>
                  <span className="wc-icon">{c.icon}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Judgement banner (coral) */}
        <section className="banner reveal">
          <div className="wrap">
            <p>
              Careira doesn&apos;t replace your judgement. It removes the endless scrolling, guesswork and wasted
              applications that make job searching feel like a full-time job.
            </p>
          </div>
        </section>

        {/* Keywords vs context (dark) */}
        <section className="compare reveal">
          <div className="wrap">
            <h2 className="h2-dark">Job search can finally move beyond keywords</h2>
            <p className="section-sub">Careira replaces keyword matching with contextual evaluation.</p>

            <div className="compare-grid">
              <div className="panel panel-old">
                <div className="mock">
                  <div className="mock-lines">
                    <span className="ml" style={{ width: '70%' }} />
                    <span className="ml ml-hit" style={{ width: '55%' }} />
                    <span className="ml" style={{ width: '80%' }} />
                    <span className="ml ml-hit" style={{ width: '45%' }} />
                    <span className="ml" style={{ width: '65%' }} />
                  </div>
                  <span className="mock-note">2 of 7 lines matched</span>
                </div>
                <h3 className="panel-title panel-title-old">Keywords: the old way</h3>
                <ul>
                  {OLD_WAY.map((t, i) => (
                    <li key={i} className="li-old"><span className="mark mark-x">&times;</span>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="panel panel-new">
                <div className="diagram">
                  <svg viewBox="-30 0 420 190" width="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Your attributes mapped to a role">
                    <g stroke="rgba(255,122,111,0.55)" strokeWidth="1.5">
                      <line x1="170" y1="100" x2="72" y2="46" />
                      <line x1="170" y1="100" x2="232" y2="46" />
                      <line x1="170" y1="100" x2="48" y2="102" />
                      <line x1="170" y1="100" x2="82" y2="156" />
                      <line x1="170" y1="100" x2="214" y2="156" />
                      <line x1="188" y1="100" x2="298" y2="100" strokeWidth="2" />
                    </g>
                    <g fill="#FF7A6F">
                      <circle cx="72" cy="46" r="4.5" />
                      <circle cx="232" cy="46" r="4.5" />
                      <circle cx="48" cy="102" r="4.5" />
                      <circle cx="82" cy="156" r="4.5" />
                      <circle cx="214" cy="156" r="4.5" />
                    </g>
                    <circle cx="170" cy="100" r="18" fill="#FF7A6F" />
                    <g stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="170" cy="94" r="4" />
                      <path d="M162 110c1.5-4 5-6 8-6s6.5 2 8 6" />
                    </g>
                    <rect x="298" y="84" width="66" height="32" rx="7" fill="rgba(255,122,111,0.14)" stroke="#FF7A6F" strokeWidth="1.5" />
                    <text x="331" y="105" textAnchor="middle" fill="#FF9A91" fontSize="13" fontWeight="700" letterSpacing="0.05em">ROLE</text>
                    <g fill="rgba(255,255,255,0.7)" fontSize="14">
                      <text x="72" y="32" textAnchor="middle">Experience</text>
                      <text x="232" y="32" textAnchor="middle">Domain</text>
                      <text x="40" y="106" textAnchor="end">Seniority</text>
                      <text x="82" y="172" textAnchor="middle">Trajectory</text>
                      <text x="214" y="172" textAnchor="middle">Adjacent skills</text>
                    </g>
                  </svg>
                </div>
                <h3 className="panel-title panel-title-new">Context: the Careira way</h3>
                <ul>
                  {NEW_WAY.map((t, i) => (
                    <li key={i} className="li-new"><span className="mark mark-check">&#10003;</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="compare-caption">
              Careira understands people and roles, compares them from every angle, and explains every
              recommendation.
            </p>
          </div>
        </section>

        {/* How it works (grey) */}
        <section className="how reveal">
          <div className="wrap">
            <h2>How it works</h2>
            <div className="steps">
              {STEPS.map((s) => (
                <div className="step" key={s.n}>
                  <span className="step-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>

            <div className="flow">
              <div className="flow-cell">
                <div className="dots">
                  <svg className="scatter" viewBox="0 0 130 50" width="130" height="50" aria-hidden="true">
                    {SCATTER.map((p, i) => (
                      <circle key={i} cx={p[0]} cy={p[1]} r={p[2]} opacity={p[3]} />
                    ))}
                  </svg>
                </div>
                <span className="flow-label">Every live role</span>
              </div>
              <span className="flow-arrow">&rsaquo;</span>
              <div className="flow-cell">
                <div className="dots dots-grid">
                  {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
                </div>
                <span className="flow-label">Credible matches</span>
              </div>
              <span className="flow-arrow">&rsaquo;</span>
              <div className="flow-cell">
                <div className="dots dots-final">
                  {Array.from({ length: 4 }).map((_, i) => <span key={i} />)}
                </div>
                <span className="flow-label flow-label-strong">Worth your time</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Proof - See what Careira sees (kept as-is) */}
        <div className="reveal">
          <ProductProofSection headline="See what Careira sees" subheadline="Understand at a glance where you're a great fit for a role, and where there might be things to consider.">
            <WhyThisFits
              role="Financial Analyst"
              candidate="James Oliver"
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

        {/* Audience routing (grey) */}
        <div className="reveal">
          <AudienceRoutingSection
            headline="What kind of move are you making?"
            cards={AUDIENCE_CARDS}
          />
        </div>

        {/* Waitlist CTA (dark) */}
        <section className="cta reveal" ref={bottomCtaRef}>
          <div className="wrap">
            <div className="cta-inner">
              <h2 className="h2-dark">Which roles will find you?</h2>
              <p className="cta-sub">
                Request access and create your Career Profile. See whether Careira surfaces roles genuinely worth
                your time.
              </p>
              <EmailSignupForm source="jobseekers" />
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
        .wrap {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .wrap-center {
          display: flex;
          justify-content: center;
        }

        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 2rem;
        }

        .h2-dark {
          color: #fff;
        }

        .eyebrow {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FF7A6F;
          margin-bottom: 1.25rem;
        }

        /* Hero (dark) */
        .hero {
          background: #33374A;
          background-image: radial-gradient(ellipse at 25% 40%, rgba(255, 122, 111, 0.06) 0%, transparent 55%);
          padding: 5.5rem 0 4rem;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          line-height: 1.05;
        }

        .lead {
          font-size: 1.375rem;
          font-weight: 600;
          color: #FF7A6F;
          margin: 1.25rem 0 0;
        }

        .intro {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
          max-width: 760px;
          margin: 1.5rem 0 0;
        }

        .cta-button {
          margin-top: 2rem;
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          background: #FF7A6F;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font);
          transition: background 0.15s;
        }

        .cta-button:hover {
          background: #FF5C4D;
        }

        /* Proof (grey) */
        .proof {
          background: #F2F4F6;
          padding: 4rem 0;
        }

        /* What changes (white) */
        .changes {
          background: #FFFFFF;
          padding: 5rem 0;
        }

        .changes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .change-card {
          display: flex;
          gap: 1rem;
          background: #FFFFFF;
          border: 1px solid #EAECEF;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .wc-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FF7A6F;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .change-card h3 {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #33374A;
          margin: 0.25rem 0 0.5rem;
        }

        .change-card p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
        }

        /* Banner (coral) */
        .banner {
          background: #FF7A6F;
          padding: 2.75rem 0;
        }

        .banner p {
          color: #33374A;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.5;
          text-align: left;
          max-width: 820px;
          margin: 0;
        }

        /* Compare (dark) */
        .compare {
          background: #33374A;
          padding: 5rem 0;
        }

        .section-sub {
          font-size: 1.0625rem;
          color: rgba(255, 255, 255, 0.65);
          margin: -1.25rem 0 2.25rem;
        }

        .compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .panel {
          border-radius: 14px;
          padding: 1.5rem;
        }

        .panel-old {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .panel-new {
          background: rgba(255, 122, 111, 0.05);
          border: 1px solid rgba(255, 122, 111, 0.4);
        }

        .mock {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          padding: 1.25rem;
          height: 190px;
          margin-bottom: 1.5rem;
        }

        .mock-lines {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          flex: 1;
        }

        .ml {
          height: 10px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }

        .ml-hit {
          background: rgba(255, 255, 255, 0.28);
        }

        .mock-note {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.45);
          white-space: nowrap;
        }

        .diagram {
          height: 190px;
          margin-bottom: 1.5rem;
        }

        .diagram svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .panel-title {
          font-size: 1.0625rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }

        .panel-title-old {
          color: rgba(255, 255, 255, 0.75);
        }

        .panel-title-new {
          color: #FF7A6F;
        }

        .panel ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .panel li {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.9375rem;
          line-height: 1.5;
          padding: 0.375rem 0;
          color: rgba(255, 255, 255, 0.85);
        }

        .li-old {
          color: rgba(255, 255, 255, 0.6);
        }

        .mark {
          flex-shrink: 0;
          font-weight: 700;
          line-height: 1.4;
        }

        .mark-x {
          color: rgba(255, 255, 255, 0.4);
        }

        .mark-check {
          color: #FF7A6F;
        }

        .compare-caption {
          font-size: 0.9375rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.6);
          text-align: left;
          margin: 2rem 0 0;
          max-width: 760px;
        }

        /* How it works (grey) */
        .how {
          background: #F2F4F6;
          padding: 5rem 0;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FF7A6F;
          color: #fff;
          font-weight: 700;
          font-size: 1.0625rem;
          margin-bottom: 1rem;
        }

        .step h3 {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.5rem;
        }

        .step p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
        }

        .flow {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #FFFFFF;
          border: 1px solid #EAECEF;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .flow-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.875rem;
        }

        .dots {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dots span {
          background: #C3C8D0;
          border-radius: 50%;
        }

        .scatter circle {
          fill: #C3C8D0;
        }

        .dots-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 6px;
        }

        .dots-grid span {
          width: 7px;
          height: 7px;
          opacity: 0.85;
        }

        .dots-final {
          gap: 10px;
        }

        .dots-final span {
          width: 12px;
          height: 12px;
          background: #FF7A6F;
        }

        .flow-label {
          font-size: 1rem;
          color: #667085;
        }

        .flow-label-strong {
          color: #FF7A6F;
          font-weight: 600;
        }

        .flow-arrow {
          color: #FF7A6F;
          font-size: 1.5rem;
          font-weight: 700;
        }

        /* Waitlist CTA (dark) */
        .cta {
          background: #33374A;
          background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          padding: 5rem 0;
        }

        .cta-inner {
          max-width: 560px;
          margin: 0;
          text-align: left;
        }

        .cta-inner :global(.signup-form) {
          margin-left: 0;
          margin-right: 0;
        }

        .cta-sub {
          font-size: 1.0625rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: -1rem 0 2rem;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .lead {
            font-size: 1.1875rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          .changes-grid,
          .compare-grid,
          .steps {
            grid-template-columns: 1fr;
          }
          .steps {
            gap: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .wrap {
            padding: 0 1.25rem;
          }
          .hero {
            padding: 3.5rem 0 2.5rem;
          }
          .proof,
          .changes,
          .compare,
          .how,
          .cta {
            padding: 3rem 0;
          }
          .flow {
            flex-direction: column;
            gap: 1.25rem;
          }
          .flow-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </>
  );
}
