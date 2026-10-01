import Head from 'next/head';
import { useState } from 'react';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import CareerMatchProfile from '../components/proof/CareerMatchProfile';
import { useScrollReveal } from '../lib/useScrollReveal';
import { validateEmail } from '../lib/validation';
import { submitEducationEnquiry } from '../lib/api';

/* ── Icons (white glyphs, sit inside coral circles) ── */
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
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const IconAdviser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconLead = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M15 9h3M15 13h3M7 16h10" />
  </svg>
);
const IconHead = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7A6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CHANGES = [
  { icon: <IconClock />, title: 'Personalised guidance at scale', body: 'Every student gets a career profile and ranked, explained matches, so advisers start from evidence, not a blank page.' },
  { icon: <IconLayers />, title: 'Context, not keywords', body: 'Skills, placements, projects and interests are all weighed, so students find roles that genuinely fit their background.' },
  { icon: <IconShuffle />, title: 'Transferable skills, new paths', body: 'Adjacent strengths come to the surface, opening credible career paths students might never have considered.' },
  { icon: <IconSync />, title: 'One view across your team', body: 'Caseloads, notes and appointments are shared across advisers, so everyone sees where each student stands.' },
  { icon: <IconDoc />, title: 'Your opportunities, well targeted', body: 'Post internships, placements and graduate roles privately, aim them at a cohort and see who applies.' },
  { icon: <IconShield />, title: 'Privacy students control', body: 'Profiles and matches stay private until students choose to share them. Built for GDPR, with full data erasure.' },
];

const OLD_WAY = [
  'Matches words, not meaning',
  'Rewards keyword stuffing',
  'Misses transferable skills',
  'Pushes good students out of view',
  'Built for volume, not relevance',
];

const NEW_WAY = [
  'Understands placements and projects',
  'Weighs the whole background',
  'Sees transferable skills',
  'Opens credible alternative paths',
  'Explains every match, and its gaps',
];

const STEPS = [
  { n: '1', title: 'Set up your workspace', body: 'Import your student records and invite by cohort, or let them join with their university email.' },
  { n: '2', title: 'Students build a profile', body: 'Each student’s CV and achievements become a career profile, matched to 100k+ live roles and yours.' },
  { n: '3', title: 'Guide, target and track', body: 'See the matches students choose to share, post targeted opportunities and follow engagement.' },
];

// Fixed "random" scatter for the Your students cell (deterministic → no hydration mismatch).
// [cx, cy, r, opacity]
const SCATTER: [number, number, number, number][] = [
  [8, 12, 3, 0.55], [19, 30, 2.5, 0.45], [13, 41, 3, 0.6], [29, 16, 2, 0.4],
  [37, 35, 3.5, 0.65], [25, 45, 2.5, 0.5], [45, 24, 3, 0.55], [53, 9, 2, 0.4],
  [49, 41, 3, 0.6], [63, 31, 2.5, 0.5], [59, 17, 3, 0.55], [71, 43, 2, 0.45],
  [80, 13, 3.5, 0.65], [75, 29, 2.5, 0.5], [88, 38, 3, 0.55], [96, 21, 2, 0.4],
  [103, 35, 3, 0.6], [99, 11, 2.5, 0.5], [112, 27, 3, 0.55], [119, 43, 2, 0.45],
];

const PERSONAS = [
  { icon: <IconAdviser />, title: 'Careers adviser', body: 'You want personalised guidance for every student, without a bigger caseload.' },
  { icon: <IconLead />, title: 'Employability lead', body: 'You want the opportunities you secure to reach the students they suit.' },
  { icon: <IconHead />, title: 'Head of careers', body: 'You want stronger engagement and graduate outcomes across every cohort.' },
];

export default function EducationPage() {
  useScrollReveal();

  const [institution, setInstitution] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!institution.trim()) errs.institution = 'Institution is required.';
    if (!name.trim()) errs.name = 'Name is required.';
    const result = validateEmail(email);
    if (!result.isValid) errs.email = result.error!;
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const result = await submitEducationEnquiry({
        institution: institution.trim(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim() || undefined,
        website,
      });
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>For Education – Careira</title>
        <meta
          name="description"
          content="Transparent, skills-first job matching for students and careers teams. Careira turns each student's experience into a career profile, matches it against live roles and your own opportunities, and explains every recommendation."
        />
        <meta property="og:title" content="For Education – Careira" />
        <meta property="og:description" content="Transparent, skills-first job matching for students and careers teams. Careira works alongside your careers service to give personalised, explained guidance at scale." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.careira.com/education" />
        <link rel="canonical" href="https://www.careira.com/education" />
      </Head>

      <PublicNav theme="dark" />

      <main>
        {/* Hero (dark) */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow eyebrow-dark">For careers services</span>
            <h1>Better guidance, better outcomes.</h1>
            <p className="lead">Transparent, skills-first job matching for students and careers teams</p>
            <p className="intro">
              Careira is an AI job-matching platform that works alongside your careers service. It turns each
              student&apos;s CV, placements and achievements into a structured career profile, matches it against
              live roles and your own opportunities, and explains every recommendation. Students apply where they
              have a real chance, and your advisers can guide more of them.
            </p>
            <a href="#book-a-call" className="cta-button">Book a call</a>
          </div>
        </section>

        {/* Student profile proof (grey) */}
        <section className="proof reveal">
          <div className="wrap wrap-center">
            <CareerMatchProfile />
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

        {/* Advisers banner (coral) */}
        <section className="banner reveal">
          <div className="wrap">
            <p>
              Careira doesn&apos;t replace your advisers. It lets them reach every student, not just the ones who
              walk through the door.
            </p>
          </div>
        </section>

        {/* Keywords vs context (dark) */}
        <section className="compare reveal">
          <div className="wrap">
            <h2 className="h2-dark">From job search to job matching</h2>
            <p className="section-sub">Careira replaces keyword search with contextual matching.</p>

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
                  <svg viewBox="-10 0 400 190" width="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Student attributes mapped to a role">
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
                      <text x="72" y="32" textAnchor="middle">Placements</text>
                      <text x="232" y="32" textAnchor="middle">Projects</text>
                      <text x="40" y="106" textAnchor="end">Skills</text>
                      <text x="82" y="172" textAnchor="middle">Interests</text>
                      <text x="214" y="172" textAnchor="middle">Transferable skills</text>
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
              Careira understands students and roles, compares them from every angle, and explains every
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
                <span className="flow-label">Your students</span>
              </div>
              <span className="flow-arrow">&rsaquo;</span>
              <div className="flow-cell">
                <div className="dots dots-grid">
                  {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
                </div>
                <span className="flow-label">Explained matches</span>
              </div>
              <span className="flow-arrow">&rsaquo;</span>
              <div className="flow-cell">
                <div className="dots dots-final">
                  {Array.from({ length: 4 }).map((_, i) => <span key={i} />)}
                </div>
                <span className="flow-label flow-label-strong">Roles worth pursuing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Personas (white) */}
        <section className="personas reveal">
          <div className="wrap">
            <h2>Built for university careers services</h2>
            <div className="personas-grid">
              {PERSONAS.map((p, i) => (
                <div className="persona" key={i}>
                  <div className="persona-head">
                    <span className="persona-icon">{p.icon}</span>
                    <h3>{p.title}</h3>
                  </div>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book a call (dark) */}
        <section className="cta reveal" id="book-a-call">
          <div className="wrap">
            <div className="cta-card">
              <h2 className="cta-title">Bring Careira to your careers service</h2>
              <p className="cta-lead">
                Give students and graduates looking for the right role a clearer route to opportunities worth
                pursuing, and help shape how Careira fits your careers service.
              </p>
              <p className="cta-meta">consent-led onboarding · regular joint reviews · outcome tracking and reports</p>

              {submitted ? (
                <div className="cta-success">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#16A34A" />
                    <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p>Thanks &ndash; we&apos;ve got your details and will be in touch to arrange a call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="cta-form">
                  {/* Honeypot */}
                  <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <label htmlFor="edu-website">Website</label>
                    <input id="edu-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                      value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>

                  <div className="field">
                    <label htmlFor="edu-institution">Institution</label>
                    <input id="edu-institution" type="text" value={institution} placeholder="University or college"
                      autoComplete="organization" maxLength={200}
                      onChange={(e) => { setInstitution(e.target.value); setErrors((p) => { const { institution: _, ...r } = p; return r; }); }} />
                    {errors.institution && <span className="field-error">{errors.institution}</span>}
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="edu-name">Your name</label>
                      <input id="edu-name" type="text" value={name} placeholder="Your name"
                        autoComplete="name" maxLength={100}
                        onChange={(e) => { setName(e.target.value); setErrors((p) => { const { name: _, ...r } = p; return r; }); }} />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="edu-email">Work email</label>
                      <input id="edu-email" type="email" value={email} placeholder="you@university.ac.uk"
                        autoComplete="email" maxLength={254}
                        onChange={(e) => { setEmail(e.target.value); setErrors((p) => { const { email: _, ...r } = p; return r; }); }} />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="edu-message">Anything we should know? <span className="optional">(optional)</span></label>
                    <textarea id="edu-message" value={message} rows={3} maxLength={5000}
                      placeholder="Cohort size, timelines, what you'd like to cover"
                      onChange={(e) => setMessage(e.target.value)} />
                  </div>

                  {submitError && <div className="cta-form-error">{submitError}</div>}

                  <button type="submit" className="cta-btn" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Request a call'}
                  </button>
                </form>
              )}

              <p className="cta-alt">Prefer email? <a href="mailto:info@careira.com">info@careira.com</a></p>
            </div>
          </div>
        </section>
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
          display: inline-block;
          margin-top: 2rem;
          padding: 0.875rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          background: #FF7A6F;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
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
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .panel-new {
          background: rgba(255, 122, 111, 0.06);
          border: 1px solid rgba(255, 122, 111, 0.45);
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

        /* Personas (white) */
        .personas {
          background: #FFFFFF;
          padding: 5rem 0;
        }

        .personas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .persona {
          background: #FFFFFF;
          border: 1px solid #EAECEF;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .persona-head {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 0.75rem;
        }

        .persona-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: rgba(255, 122, 111, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .persona h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #33374A;
          margin: 0;
        }

        .persona p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
        }

        /* Book a call (dark) */
        .cta {
          background: #33374A;
          background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          padding: 5rem 0;
        }

        .cta-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 2.5rem 2.25rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
        }

        .cta-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.75rem;
        }

        .cta-lead {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
          max-width: 480px;
        }

        .cta-meta {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #33374A;
          margin: 0.75rem 0 0;
        }

        .cta-form {
          margin: 1.75rem 0 0;
          max-width: 460px;
        }

        .field {
          margin-bottom: 1rem;
          text-align: left;
        }

        .field label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #33374A;
          margin-bottom: 0.375rem;
        }

        .optional {
          color: #667085;
          font-weight: 400;
        }

        .field input,
        .field textarea {
          width: 100%;
          padding: 0.75rem;
          font-size: 0.9375rem;
          font-family: var(--font);
          color: #33374A;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: #FF7A6F;
          box-shadow: 0 0 0 3px rgba(255, 122, 111, 0.15);
        }

        .field textarea {
          resize: vertical;
          min-height: 84px;
        }

        .field-error {
          display: block;
          font-size: 0.8125rem;
          color: #B42318;
          margin-top: 0.25rem;
        }

        .field-row {
          display: flex;
          gap: 0.75rem;
        }

        .field-row .field {
          flex: 1;
          min-width: 0;
        }

        .cta-form-error {
          font-size: 0.875rem;
          color: #B42318;
          background: #FEF2F2;
          border-radius: 8px;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          text-align: left;
        }

        .cta-btn {
          display: inline-block;
          margin-top: 0.5rem;
          background: #FF7A6F;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font);
          transition: background 0.15s;
        }

        .cta-btn:hover:not(:disabled) {
          background: #FF5C4D;
        }

        .cta-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cta-success {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          text-align: left;
          background: #F0FDF4;
          border-radius: 10px;
          padding: 1.25rem;
          margin: 1.75rem 0 0;
          max-width: 460px;
        }

        .cta-success svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cta-success p {
          margin: 0;
          color: #166534;
          font-size: 1rem;
          line-height: 1.5;
        }

        .cta-alt {
          font-size: 0.875rem;
          margin: 1.25rem 0 0;
          color: #667085;
        }

        .cta-alt a {
          color: #4C526A;
          font-weight: 600;
          text-decoration: underline;
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
          .steps,
          .personas-grid {
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
          .personas,
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
          .cta-card {
            padding: 2rem 1.5rem;
          }
          .field-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </>
  );
}
