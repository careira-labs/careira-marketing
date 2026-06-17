import Head from 'next/head';
import { useState } from 'react';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import SearchableSelect from '../components/SearchableSelect';
import { validateEmail } from '../lib/validation';
import { applyForPilot } from '../lib/api';
import {
  COUNTRIES,
  SEARCH_DURATIONS,
  JOBSEEKER_SITUATIONS,
  RECRUITER_SPECIALIZATIONS,
  EXPERIENCE_YEARS,
  TEAM_SIZES,
  RECRUITER_ROLES,
} from '../lib/form-options';

type View = 'choose' | 'jobseeker' | 'recruiter' | 'success';

export default function PilotPage() {
  const [view, setView] = useState<View>('choose');

  return (
    <>
      <Head>
        <title>Join the Careira Pilot</title>
        <meta
          name="description"
          content="Apply to take part in the Careira pilot for jobseekers or recruiters. Test AI-powered job matching and help shape the product."
        />
        <meta property="og:title" content="Join the Careira Pilot" />
        <meta
          property="og:description"
          content="Apply to take part in the Careira pilot for jobseekers or recruiters."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.careira.com/pilot" />
      </Head>

      <PublicNav theme="dark" />

      <main className="pilot-page">
        {view === 'choose' && <ChooseView onSelect={setView} />}
        {view === 'jobseeker' && (
          <FormView
            type="jobseeker"
            onBack={() => setView('choose')}
            onSuccess={() => setView('success')}
          />
        )}
        {view === 'recruiter' && (
          <FormView
            type="recruiter"
            onBack={() => setView('choose')}
            onSuccess={() => setView('success')}
          />
        )}
        {view === 'success' && <SuccessView />}
      </main>

      <Footer />

      <style jsx>{`
        .pilot-page {
          background: #F2F4F6;
          min-height: calc(100vh - 64px);
        }
      `}</style>
    </>
  );
}


/* ── Choose view ── */

function ChooseView({ onSelect }: { onSelect: (v: View) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Join the Careira pilot</h1>
          <p className="hero-sub">
            Thanks for your interest in Careira. We&rsquo;re running focused pilot programs
            for jobseekers and recruiters who want early access to AI-powered job matching
            and are willing to share honest feedback.
          </p>
          <p className="hero-sub">Choose which pilot you&rsquo;d like to apply for.</p>
        </div>
      </section>

      <section className="cards-section">
        <div className="cards">
          <div className="card" onClick={() => onSelect('jobseeker')} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect('jobseeker')}>
            <h2>Jobseeker Pilot</h2>
            <p>
              For active jobseekers who want a clearer view of where they fit,
              why they fit, and which roles are genuinely worth their time.
            </p>
            <ul>
              <li>Create your Career Profile</li>
              <li>Review AI-matched roles with explanations</li>
              <li>Share feedback to shape the product</li>
            </ul>
            <span className="card-cta">Apply &rarr;</span>
          </div>

          <div className="card" onClick={() => onSelect('recruiter')} role="button" tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect('recruiter')}>
            <h2>Recruiter Pilot</h2>
            <p>
              For experienced finance and cyber recruiters who want better shortlists,
              less wasted screening, and clear reasoning behind every recommendation.
            </p>
            <ul>
              <li>Test Careira against live roles</li>
              <li>Review AI-generated matches and shortlists</li>
              <li>Share feedback on match quality and workflows</li>
            </ul>
            <span className="card-cta">Apply &rarr;</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: #33374A;
          padding: 5rem 2rem 3rem;
        }
        .hero-inner {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 1rem;
        }
        .hero-sub {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 0.75rem;
        }
        .cards-section {
          padding: 3rem 2rem 5rem;
        }
        .cards {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 2rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
          transition: box-shadow 0.15s, transform 0.15s;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        .card h2 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.75rem;
        }
        .card p {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0 0 1rem;
        }
        .card ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.25rem;
          flex: 1;
        }
        .card ul li {
          font-size: 0.9375rem;
          line-height: 1.5;
          color: #4C526A;
          padding: 0.25rem 0 0.25rem 1.25rem;
          position: relative;
        }
        .card ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF7A6F;
        }
        .card-cta {
          font-size: 1rem;
          font-weight: 600;
          color: #FF7A6F;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3.5rem 1.5rem 2rem;
          }
          h1 {
            font-size: 1.75rem;
          }
          .cards-section {
            padding: 2rem 1rem 3.5rem;
          }
          .cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}


/* ── Success view ── */

function SuccessView() {
  return (
    <>
      <section className="success-section">
        <div className="success-card">
          <div className="success-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#FF7A6F" />
              <path
                d="M10 16l4 4 8-8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2>Application received</h2>
          <p>
            Thanks for applying. We&rsquo;ll review your details and come back
            to you if there&rsquo;s a suitable pilot place available.
          </p>
        </div>
      </section>

      <style jsx>{`
        .success-section {
          padding: 5rem 2rem;
          display: flex;
          justify-content: center;
        }
        .success-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 3rem 2.5rem;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
        }
        .success-icon {
          margin-bottom: 1.25rem;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.75rem;
        }
        p {
          font-size: 1.0625rem;
          line-height: 1.6;
          color: #4C526A;
          margin: 0;
        }

        @media (max-width: 768px) {
          .success-section {
            padding: 3rem 1rem;
          }
          .success-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </>
  );
}


/* ── Form view ── */

function FormView({
  type,
  onBack,
  onSuccess,
}: {
  type: 'jobseeker' | 'recruiter';
  onBack: () => void;
  onSuccess: () => void;
}) {
  // Shared fields
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [website, setWebsite] = useState(''); // honeypot

  // Jobseeker fields
  const [country, setCountry] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [searchDuration, setSearchDuration] = useState('');
  const [situation, setSituation] = useState('');
  const [feedbackOk, setFeedbackOk] = useState<boolean | null>(null);

  // Recruiter fields
  const [companyName, setCompanyName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [hasLiveRoles, setHasLiveRoles] = useState<boolean | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    const emailResult = validateEmail(email);
    if (!emailResult.isValid) errs.email = emailResult.error!;
    if (!fullName.trim()) errs.fullName = 'Name is required.';

    if (type === 'jobseeker') {
      if (!country) errs.country = 'Country is required.';
      if (!searchDuration) errs.searchDuration = 'Please select how long you have been looking.';
      if (!situation) errs.situation = 'Please select your situation.';
      if (feedbackOk === null) errs.feedbackOk = 'Please answer this question.';
    } else {
      if (!companyName.trim()) errs.companyName = 'Company name is required.';
      if (!specialization) errs.specialization = 'Please select your specialization.';
      if (!experienceYears) errs.experienceYears = 'Please select your experience level.';
      if (!teamSize) errs.teamSize = 'Please select your team size.';
      if (!roleDescription) errs.roleDescription = 'Please select which describes your role.';
      if (hasLiveRoles === null) errs.hasLiveRoles = 'Please answer this question.';
    }

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
      const data =
        type === 'jobseeker'
          ? {
              email: email.trim().toLowerCase(),
              full_name: fullName.trim(),
              country_code: country,
              linkedin_url: linkedinUrl.trim() || undefined,
              job_title: jobTitle.trim() || undefined,
              search_duration: searchDuration,
              situation,
              feedback_ok: feedbackOk!,
              website,
            }
          : {
              email: email.trim().toLowerCase(),
              full_name: fullName.trim(),
              company_name: companyName.trim(),
              linkedin_url: linkedinUrl.trim() || undefined,
              specialization,
              experience_years: experienceYears,
              team_size: teamSize,
              role_description: roleDescription,
              has_live_roles: hasLiveRoles!,
              website,
            };

      const result = await applyForPilot(type, data);
      if (result.success) {
        onSuccess();
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // Soft gate warnings for recruiter
  const showExpWarning =
    type === 'recruiter' && (experienceYears === '<3 years' || experienceYears === '3-5 years');
  const showSpecWarning = type === 'recruiter' && specialization === 'Other';
  const showSizeWarning = type === 'recruiter' && teamSize === '50+';

  const heading = type === 'jobseeker' ? 'Jobseeker pilot application' : 'Recruiter pilot application';

  return (
    <>
      <section className="form-section">
        <div className="form-container">
          <button className="back-link" onClick={onBack} type="button">
            &larr; Back
          </button>

          <div className="form-card">
            <h2>{heading}</h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="field">
                <label htmlFor="pilot-email">Email address</label>
                <input
                  id="pilot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              {/* Full name */}
              <div className="field">
                <label htmlFor="pilot-name">Full name</label>
                <input
                  id="pilot-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  maxLength={200}
                />
                {errors.fullName && <span className="field-error">{errors.fullName}</span>}
              </div>

              {/* Jobseeker: country */}
              {type === 'jobseeker' && (
                <div className="field">
                  <SearchableSelect
                    options={COUNTRIES}
                    value={country}
                    onChange={(v) => { setCountry(v); setErrors((e) => { const { country: _, ...rest } = e; return rest; }); }}
                    placeholder="Country"
                    hasError={!!errors.country}
                  />
                  {errors.country && <span className="field-error">{errors.country}</span>}
                </div>
              )}

              {/* Recruiter: company */}
              {type === 'recruiter' && (
                <div className="field">
                  <label htmlFor="pilot-company">Company name</label>
                  <input
                    id="pilot-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your company"
                    autoComplete="organization"
                    maxLength={200}
                  />
                  {errors.companyName && <span className="field-error">{errors.companyName}</span>}
                </div>
              )}

              {/* LinkedIn (both) */}
              <div className="field">
                <label htmlFor="pilot-linkedin">
                  LinkedIn profile <span className="optional">(optional)</span>
                </label>
                <input
                  id="pilot-linkedin"
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="linkedin.com/in/your-name"
                  maxLength={500}
                />
              </div>

              {/* Jobseeker: job title */}
              {type === 'jobseeker' && (
                <div className="field">
                  <label htmlFor="pilot-jobtitle">
                    Current or most recent job title <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="pilot-jobtitle"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Head of Operations"
                    maxLength={200}
                  />
                </div>
              )}

              {/* Jobseeker: search duration */}
              {type === 'jobseeker' && (
                <div className="field">
                  <label htmlFor="pilot-duration">How long have you been actively looking?</label>
                  <select
                    id="pilot-duration"
                    value={searchDuration}
                    onChange={(e) => setSearchDuration(e.target.value)}
                  >
                    <option value="" disabled>Select...</option>
                    {SEARCH_DURATIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.searchDuration && <span className="field-error">{errors.searchDuration}</span>}
                </div>
              )}

              {/* Jobseeker: situation */}
              {type === 'jobseeker' && (
                <div className="field">
                  <label htmlFor="pilot-situation">What best describes your situation?</label>
                  <select
                    id="pilot-situation"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                  >
                    <option value="" disabled>Select...</option>
                    {JOBSEEKER_SITUATIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.situation && <span className="field-error">{errors.situation}</span>}
                </div>
              )}

              {/* Jobseeker: feedback comfort */}
              {type === 'jobseeker' && (
                <div className="field">
                  <label>Are you comfortable using an early product and sharing honest feedback?</label>
                  <div className="toggle-group">
                    <button
                      type="button"
                      className={`toggle-btn ${feedbackOk === true ? 'active' : ''}`}
                      onClick={() => setFeedbackOk(true)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${feedbackOk === false ? 'active' : ''}`}
                      onClick={() => setFeedbackOk(false)}
                    >
                      No
                    </button>
                  </div>
                  {errors.feedbackOk && <span className="field-error">{errors.feedbackOk}</span>}
                </div>
              )}

              {/* Recruiter: specialization */}
              {type === 'recruiter' && (
                <div className="field">
                  <label htmlFor="pilot-spec">Recruiting specialization</label>
                  <select
                    id="pilot-spec"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <option value="" disabled>Select...</option>
                    {RECRUITER_SPECIALIZATIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {showSpecWarning && (
                    <span className="soft-warning">This pilot focuses on finance and cyber recruitment.</span>
                  )}
                  {errors.specialization && <span className="field-error">{errors.specialization}</span>}
                </div>
              )}

              {/* Recruiter: experience */}
              {type === 'recruiter' && (
                <div className="field">
                  <label htmlFor="pilot-exp">Years of recruiting experience</label>
                  <select
                    id="pilot-exp"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                  >
                    <option value="" disabled>Select...</option>
                    {EXPERIENCE_YEARS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {showExpWarning && (
                    <span className="soft-warning">This pilot is designed for recruiters with 6+ years of experience.</span>
                  )}
                  {errors.experienceYears && <span className="field-error">{errors.experienceYears}</span>}
                </div>
              )}

              {/* Recruiter: team size */}
              {type === 'recruiter' && (
                <div className="field">
                  <label htmlFor="pilot-size">Team / business size</label>
                  <select
                    id="pilot-size"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                  >
                    <option value="" disabled>Select...</option>
                    {TEAM_SIZES.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {showSizeWarning && (
                    <span className="soft-warning">This pilot is aimed at smaller teams (1\u201350 people).</span>
                  )}
                  {errors.teamSize && <span className="field-error">{errors.teamSize}</span>}
                </div>
              )}

              {/* Recruiter: role description */}
              {type === 'recruiter' && (
                <div className="field">
                  <label htmlFor="pilot-roledesc">Which best describes your role?</label>
                  <select
                    id="pilot-roledesc"
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                  >
                    <option value="" disabled>Select...</option>
                    {RECRUITER_ROLES.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {errors.roleDescription && <span className="field-error">{errors.roleDescription}</span>}
                </div>
              )}

              {/* Recruiter: live roles */}
              {type === 'recruiter' && (
                <div className="field">
                  <label>Do you have active live roles you could test Careira with?</label>
                  <div className="toggle-group">
                    <button
                      type="button"
                      className={`toggle-btn ${hasLiveRoles === true ? 'active' : ''}`}
                      onClick={() => setHasLiveRoles(true)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${hasLiveRoles === false ? 'active' : ''}`}
                      onClick={() => setHasLiveRoles(false)}
                    >
                      No
                    </button>
                  </div>
                  {errors.hasLiveRoles && <span className="field-error">{errors.hasLiveRoles}</span>}
                </div>
              )}

              {/* Privacy consent */}
              <p className="consent">
                By applying, you agree that Careira may use your details to review your
                pilot application and contact you about the pilot. We&rsquo;ll handle your
                data in line with our{' '}
                <a href="https://www.careira.com/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                .
              </p>

              {submitError && <div className="submit-error">{submitError}</div>}

              <button type="submit" disabled={submitting} className="submit-btn">
                {submitting ? 'Submitting\u2026' : 'Submit application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .form-section {
          padding: 3rem 2rem 5rem;
        }
        .form-container {
          max-width: 560px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          font-size: 0.9375rem;
          color: #4C526A;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1.25rem;
          font-family: var(--font);
        }
        .back-link:hover {
          color: #33374A;
        }
        .form-card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
        }
        .form-card h2 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.5rem;
        }
        form {
          position: relative;
        }
        .field {
          margin-bottom: 1.25rem;
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
        .field select {
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
        .field select:focus {
          border-color: #FF7A6F;
          box-shadow: 0 0 0 3px rgba(255, 122, 111, 0.15);
        }
        .field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23667085' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          padding-right: 2.5rem;
        }
        .field-error {
          display: block;
          font-size: 0.8125rem;
          color: #B42318;
          margin-top: 0.25rem;
        }
        .soft-warning {
          display: block;
          font-size: 0.85rem;
          color: #667085;
          margin-top: 0.25rem;
        }
        .toggle-group {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .toggle-btn {
          flex: 1;
          padding: 0.625rem;
          font-size: 0.9375rem;
          font-weight: 500;
          font-family: var(--font);
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #33374A;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .toggle-btn:hover {
          border-color: #D0D5DD;
        }
        .toggle-btn.active {
          background: #FF7A6F;
          border-color: #FF7A6F;
          color: white;
        }
        .consent {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: #667085;
          margin: 1.5rem 0 1.25rem;
        }
        .consent a {
          color: #FF7A6F;
          text-decoration: none;
        }
        .consent a:hover {
          text-decoration: underline;
        }
        .submit-error {
          font-size: 0.875rem;
          color: #B42318;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: #FEF2F2;
          border-radius: 8px;
        }
        .submit-btn {
          width: 100%;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font);
          color: white;
          background: #FF7A6F;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .submit-btn:hover:not(:disabled) {
          background: #FF5C4D;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-section {
            padding: 2rem 1rem 3.5rem;
          }
          .form-card {
            padding: 1.5rem;
          }
          .form-card h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
