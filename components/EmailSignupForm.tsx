import { useState, useEffect } from 'react';
import { joinWaitlist, type WaitlistRequest } from '../lib/api';
import { validateEmail } from '../lib/validation';
import SearchableSelect from './SearchableSelect';
import { COUNTRIES, SECTORS, CANDIDATE_INTENTS, RECRUITER_INTENTS } from '../lib/form-options';

interface EmailSignupFormProps {
  source: 'jobseekers' | 'hirers';
  title?: string;
  compact?: boolean;
}

export default function EmailSignupForm({ source, title, compact = false }: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState<string | null>(null);
  const [intent, setIntent] = useState('');
  const [intentError, setIntentError] = useState<string | null>(null);
  const [sector, setSector] = useState('');
  const [company, setCompany] = useState('');
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [showExtra, setShowExtra] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const intentOptions = source === 'jobseekers' ? CANDIDATE_INTENTS : RECRUITER_INTENTS;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ?reset clears waitlist memory (for testing/admin)
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
      localStorage.removeItem('careira_waitlist');
      window.history.replaceState({}, '', window.location.pathname);
    } else if (localStorage.getItem('careira_waitlist')) {
      setSuccess(true);
    }

    if (compact) {
      const dismissed = sessionStorage.getItem('sticky_cta_dismissed');
      setIsDismissed(dismissed === 'true');
    }
  }, [compact]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('sticky_cta_dismissed', 'true');
  };

  function handleEmailBlur() {
    if (email) {
      const result = validateEmail(email);
      if (!result.isValid) {
        setEmailError(result.error || 'Please enter a valid email address.');
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEmailError(null);
    setNameError(null);
    setCountryError(null);
    setIntentError(null);
    setCompanyError(null);

    // Validate all required fields
    const emailResult = validateEmail(email);
    let hasErrors = false;

    if (!emailResult.isValid) {
      setEmailError(emailResult.error || 'Please enter a valid email address.');
      hasErrors = true;
    }

    if (!compact) {
      if (!name.trim()) {
        setNameError('Name is required.');
        hasErrors = true;
      }
      if (!country) {
        setCountryError('Country is required.');
        hasErrors = true;
      }
      if (!intent) {
        setIntentError('Please select an option.');
        hasErrors = true;
      }
      if (source === 'hirers' && !company.trim()) {
        setCompanyError('Company name is required.');
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      const payload: WaitlistRequest = {
        email,
        first_name: name.trim() || undefined,
        user_type: source === 'jobseekers' ? 'candidate' : 'recruiter',
        country_code: country || undefined,
        intent: intent || undefined,
        sector: sector || undefined,
        company: (source === 'hirers' && company.trim()) ? company.trim() : undefined,
      };

      const result = await joinWaitlist(payload);
      localStorage.setItem('careira_waitlist', email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (compact && isDismissed) {
    return null;
  }

  if (success) {
    return (
      <>
        <div className={`success-message ${compact ? 'compact' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>You're on the waitlist! Check your email for confirmation.</span>
        </div>

        <style jsx>{`
          .success-message {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.5rem;
            background: var(--success-bg);
            border: 1px solid var(--success);
            border-radius: var(--radius);
            color: var(--success);
            font-weight: 500;
          }

          .success-message.compact {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }

          .success-message svg {
            flex-shrink: 0;
          }
        `}</style>
      </>
    );
  }

  // Compact mode: email-only (too many fields for sticky bar)
  if (compact) {
    return (
      <>
        <form onSubmit={handleSubmit} className="signup-form compact" id="email-signup" data-lpignore="true" data-1p-ignore data-form-type="other">
          <div className="form-content">
            <div className="input-group">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                onBlur={handleEmailBlur}
                required
                autoComplete="email"
                data-lpignore="true"
                data-1p-ignore
                className={emailError ? 'error' : ''}
              />
              {emailError && <span className="field-error">{emailError}</span>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Joining...' : source === 'hirers' ? 'Request early access' : 'Join waitlist'}
            </button>
          </div>

          <button type="button" className="dismiss-btn" onClick={handleDismiss} aria-label="Dismiss">
            ×
          </button>

          {error && <div className="error-message">{error}</div>}
        </form>

        <style jsx>{`
          .signup-form.compact {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            max-width: none;
            background: var(--surface);
            border-top: 1px solid var(--border);
            padding: 0.5rem 1.5rem;
            box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
            z-index: 1000;
            display: block;
          }

          .form-content {
            display: flex;
            gap: 0.5rem;
            max-width: 480px;
            margin: 0 auto;
            align-items: center;
          }

          .input-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .signup-form.compact input[type="email"] {
            width: 100%;
            padding: 0.625rem 0.875rem;
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            font-size: 0.9375rem;
            transition: border-color 0.15s, box-shadow 0.15s;
            background: var(--surface);
            color: var(--text);
          }

          .signup-form.compact input[type="email"]:focus {
            outline: none;
            border-color: var(--brand-coral);
            box-shadow: 0 0 0 3px var(--focus-ring);
          }

          .signup-form.compact input[type="email"].error {
            border-color: var(--error);
          }

          .signup-form.compact input[type="email"]::placeholder {
            color: var(--text-muted);
          }

          .signup-form.compact .btn {
            padding: 0.625rem 1rem;
            font-size: 0.9375rem;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .field-error {
            color: var(--error);
            font-size: 0.8125rem;
          }

          .error-message {
            margin-top: 0.5rem;
            padding: 0.5rem 0.75rem;
            background: var(--error-bg);
            border: 1px solid var(--error);
            border-radius: var(--radius-sm);
            color: var(--error);
            font-size: 0.8125rem;
          }

          .dismiss-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            line-height: 1;
            color: var(--text-muted);
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            transition: color 0.15s;
          }

          .dismiss-btn:hover {
            color: var(--text);
          }
        `}</style>
      </>
    );
  }

  // Full form (non-compact)
  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form" id="email-signup" data-lpignore="true" data-1p-ignore data-form-type="other">
        {title && <h3>{title}</h3>}

        <div className="form-fields">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(null);
            }}
            onFocus={() => setShowExtra(true)}
            onBlur={handleEmailBlur}
            required
            autoComplete="email"
            data-lpignore="true"
            data-1p-ignore
            className={emailError ? 'error' : ''}
          />
          {emailError && <span className="field-error">{emailError}</span>}

          {showExtra && (
            <div className="extra-fields">
              <div className="field-row">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(null); }}
                    autoComplete="given-name"
                    data-lpignore="true"
                    data-1p-ignore
                    className={nameError ? 'error' : ''}
                  />
                  {nameError && <span className="field-error">{nameError}</span>}
                </div>
                <div className="field">
                  <SearchableSelect
                    options={COUNTRIES}
                    value={country}
                    onChange={(v) => { setCountry(v); setCountryError(null); }}
                    placeholder="Country"
                    hasError={!!countryError}
                  />
                  {countryError && <span className="field-error">{countryError}</span>}
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <select
                    value={intent}
                    onChange={(e) => { setIntent(e.target.value); setIntentError(null); }}
                    className={`form-select${intentError ? ' error' : ''}${!intent ? ' placeholder' : ''}`}
                  >
                    <option value="" disabled>How can Careira help you?</option>
                    {intentOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {intentError && <span className="field-error">{intentError}</span>}
                </div>
                <div className="field">
                  <SearchableSelect
                    options={SECTORS}
                    value={sector}
                    onChange={setSector}
                    placeholder="Sector (optional)"
                  />
                </div>
              </div>

              {source === 'hirers' && (
                <div className="field">
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => { setCompany(e.target.value); setCompanyError(null); }}
                    autoComplete="organization"
                    className={companyError ? 'error' : ''}
                  />
                  {companyError && <span className="field-error">{companyError}</span>}
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Joining...' : source === 'hirers' ? 'Request early access' : 'Join waitlist'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </form>

      <style jsx>{`
        .signup-form {
          width: 100%;
          max-width: 540px;
        }

        .signup-form h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text);
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .signup-form input[type="email"],
        .signup-form input[type="text"] {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: var(--surface);
          color: var(--text);
        }

        .signup-form input[type="email"]:focus,
        .signup-form input[type="text"]:focus {
          outline: none;
          border-color: var(--brand-coral);
          box-shadow: 0 0 0 3px var(--focus-ring);
        }

        .signup-form input[type="email"].error,
        .signup-form input[type="text"].error {
          border-color: var(--error);
        }

        .signup-form input[type="email"]::placeholder,
        .signup-form input[type="text"]::placeholder {
          color: var(--text-muted);
        }

        .extra-fields {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .field-row {
          display: flex;
          gap: 0.75rem;
        }

        .field {
          flex: 1;
          min-width: 0;
        }

        .form-select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: var(--surface);
          color: var(--text);
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23667085' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.875rem center;
          padding-right: 2.25rem;
        }

        .form-select:focus {
          outline: none;
          border-color: var(--brand-coral);
          box-shadow: 0 0 0 3px var(--focus-ring);
        }

        .form-select.error {
          border-color: var(--error);
        }

        .form-select.placeholder {
          color: var(--text-muted);
        }

        .field-error {
          display: block;
          color: var(--error);
          font-size: 0.8125rem;
          margin-top: 0.25rem;
        }

        .signup-form .btn {
          width: 100%;
          white-space: nowrap;
        }

        .error-message {
          margin-top: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--error-bg);
          border: 1px solid var(--error);
          border-radius: var(--radius-sm);
          color: var(--error);
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .field-row {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
