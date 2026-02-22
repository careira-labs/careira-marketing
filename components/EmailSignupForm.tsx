import { useState, useEffect } from 'react';
import { joinWaitlist, type WaitlistRequest } from '../lib/api';
import { validateEmail } from '../lib/validation';

interface EmailSignupFormProps {
  source: 'jobseekers' | 'recruiters';
  title?: string;
  compact?: boolean;
  hideWhenSignedUp?: boolean;
}

export default function EmailSignupForm({ source, title, compact = false, hideWhenSignedUp = false }: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [showExtra, setShowExtra] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

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

    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      setEmailError(emailResult.error || 'Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const payload: WaitlistRequest = {
        email,
        user_type: source === 'jobseekers' ? 'candidate' : 'recruiter',
      };

      if (name.trim()) {
        payload.first_name = name.trim();
      }

      if (source === 'recruiters' && company.trim()) {
        payload.company = company.trim();
      }

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

  if (success && hideWhenSignedUp) {
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

  return (
    <>
      <form onSubmit={handleSubmit} className={`signup-form ${compact ? 'compact' : ''}`} id="email-signup">
        {title && !compact && <h3>{title}</h3>}

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
              onFocus={() => setShowExtra(true)}
              onBlur={handleEmailBlur}
              required
              autoComplete="email"
              className={emailError ? 'error' : ''}
            />
            {emailError && <span className="field-error">{emailError}</span>}

            {showExtra && (
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                className="extra-field"
              />
            )}

            {source === 'recruiters' && showExtra && (
              <input
                type="text"
                placeholder="Company name (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="organization"
                className="extra-field"
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Joining...' : source === 'recruiters' ? 'Request early access' : 'Join waitlist'}
          </button>
        </div>

        {compact && (
          <button type="button" className="dismiss-btn" onClick={handleDismiss} aria-label="Dismiss">
            ×
          </button>
        )}

        {error && <div className="error-message">{error}</div>}
      </form>

      <style jsx>{`
        .signup-form {
          width: 100%;
          max-width: 540px;
        }

        .signup-form.compact {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: none;
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 0.75rem 1rem;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          display: none;
        }

        @media (max-width: 768px) {
          .signup-form.compact {
            display: block;
          }
        }

        .signup-form h3 {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text);
        }

        .form-content {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .signup-form.compact .form-content {
          gap: 0.5rem;
        }

        .input-group {
          flex: 1;
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

        .signup-form.compact input[type="email"] {
          padding: 0.625rem 0.875rem;
          font-size: 0.9375rem;
        }

        .extra-field {
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

        .signup-form input[type="email"]:focus,
        .signup-form input[type="text"]:focus {
          outline: none;
          border-color: var(--brand-coral);
          box-shadow: 0 0 0 3px var(--focus-ring);
        }

        .signup-form input[type="email"].error {
          border-color: var(--error);
        }

        .field-error {
          color: var(--error);
          font-size: 0.8125rem;
          margin-top: -0.5rem;
        }

        .signup-form input[type="email"]::placeholder,
        .signup-form input[type="text"]::placeholder {
          color: var(--text-muted);
        }

        .signup-form .btn {
          white-space: nowrap;
          flex-shrink: 0;
        }

        .signup-form.compact .btn {
          padding: 0.625rem 1rem;
          font-size: 0.9375rem;
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

        @media (max-width: 640px) {
          .form-content {
            flex-direction: column;
          }

          .signup-form:not(.compact) .form-content {
            flex-direction: column;
          }

          .signup-form:not(.compact) .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
