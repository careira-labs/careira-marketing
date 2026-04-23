import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';
import { validateEmail } from '../lib/validation';
import { CONNECT_PEOPLE } from '../lib/connect-people';

interface ConnectPageProps {
  personKey: string;
}

export const getServerSideProps: GetServerSideProps<ConnectPageProps> = async (context) => {
  const raw = context.query.person;
  const person = typeof raw === 'string' ? raw.toLowerCase().trim() : '';

  if (!person || !CONNECT_PEOPLE[person]) {
    return { redirect: { destination: '/', permanent: false } };
  }

  return { props: { personKey: person } };
};

export default function ConnectPage({ personKey }: ConnectPageProps) {
  const person = CONNECT_PEOPLE[personKey];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required.';
    const result = validateEmail(email);
    if (!result.isValid) errs.email = result.error!;
    if (!message.trim()) errs.message = 'Message is required.';
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
      const res = await fetch('https://api.careira.com/connect/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person: personKey,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim() || undefined,
          message: message.trim(),
          website,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const firstName = person.name.split(' ')[0];

  return (
    <>
      <Head>
        <title>Connect with {person.name} \u2013 Careira</title>
        <meta
          name="description"
          content={`Get in touch with ${person.name}, ${person.role} at Careira.`}
        />
        <meta property="og:title" content={`Connect with ${person.name} \u2013 Careira`} />
        <meta
          property="og:description"
          content={`Get in touch with ${person.name}, ${person.role} at Careira.`}
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://www.careira.com/connect?person=${personKey}`} />
      </Head>

      <PublicNav theme="dark" />

      <main className="connect-page">
        <div className="container">
          {/* Profile */}
          <div className="profile">
            {person.image ? (
              <img src={person.image} alt={person.name} className="avatar-img" />
            ) : (
              <div className="avatar-initials">{person.initials}</div>
            )}
            <h1>{person.name}</h1>
            <p className="role">{person.role}, Careira</p>
          </div>

          {/* Bio */}
          <div className="bio">
            {person.bio.map((item, i) => {
              if (typeof item === 'string') {
                return <p key={i}>{item}</p>;
              }
              if ('subheader' in item) {
                return <h3 key={i} className="bio-subheader">{item.subheader}</h3>;
              }
              return (
                <ul key={i}>
                  {item.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              );
            })}
          </div>

          {/* Contact form */}
          <div className="form-card">
            <h2>Get in touch with {firstName}</h2>

            {submitted ? (
              <div className="success-message">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#16A34A" />
                  <path
                    d="M6 10l3 3 5-6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Message sent. {firstName} will be in touch.</p>
              </div>
            ) : (
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

                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={100}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="company">
                    Company / organisation <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company"
                    autoComplete="organization"
                    maxLength={200}
                  />
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={5}
                    maxLength={5000}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                {submitError && <div className="submit-error">{submitError}</div>}

                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? 'Sending\u2026' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .connect-page {
          background: #F2F4F6;
          min-height: calc(100vh - 64px);
          padding: 3.5rem 0 5rem;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Profile */
        .profile {
          text-align: center;
          margin-bottom: 2rem;
        }

        .avatar-initials {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #33374A;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .avatar-img {
          width: 20%;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          margin: 0;
          line-height: 1.2;
        }

        .role {
          font-size: 1.0625rem;
          color: #FF7A6F;
          font-weight: 500;
          margin: 0.25rem 0 0;
        }

        /* Bio */
        .bio {
          margin-bottom: 2.5rem;
        }

        .bio p {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #4C526A;
          margin: 0 0 1rem;
        }

        .bio ul {
          list-style: none;
          padding: 0;
          margin: -0.5rem 0 1rem;
        }

        .bio ul li {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #4C526A;
          padding: 0.25rem 0 0.25rem 1.25rem;
          position: relative;
        }

        .bio ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF7A6F;
        }

        .bio-subheader {
          font-size: 1.0625rem;
          font-weight: 600;
          color: #33374A;
          margin: 1.25rem 0 1.25rem;
        }

        /* Form card */
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
          min-height: 120px;
        }

        .field-error {
          display: block;
          font-size: 0.8125rem;
          color: #B42318;
          margin-top: 0.25rem;
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

        /* Success state */
        .success-message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: #F0FDF4;
          border-radius: 8px;
        }

        .success-message svg {
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .success-message p {
          font-size: 1rem;
          color: #166534;
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .connect-page {
            padding: 2.5rem 0 3.5rem;
          }

          .container {
            padding: 0 1rem;
          }

          h1 {
            font-size: 1.625rem;
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
