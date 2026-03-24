import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy – Careira</title>
        <meta
          name="description"
          content="How Careira collects, uses, and protects your personal information."
        />
      </Head>

      <PublicNav theme="light" />

      <main>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="updated">Last Updated: 24th March 2026</p>

          <section>
            <h2>When this Privacy Policy applies</h2>
            <p>
              Careira is an AI-powered job discovery platform (<a href="https://www.careira.com">www.careira.com</a>) designed to help individuals find roles that align with their skills, experience, and preferences. We also provide recruiters and employers with tools to promote vacancies and connect with relevant candidates.
            </p>
            <p>
              This Privacy Policy applies to all services provided directly by <strong>Careira Ltd</strong> (&ldquo;Careira&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), including our website, application, and related digital services.
            </p>
            <p>
              Our Privacy Policy does not cover the practices of third-party companies or individuals, including recruiters, employers, or external job boards linked from our platform.
            </p>
          </section>

          <section>
            <h2>What our Privacy Policy covers</h2>
            <p>
              Careira Ltd is the <strong>data controller</strong> responsible for processing the personal information you provide. This policy explains:
            </p>
            <ul>
              <li>What information we collect and why</li>
              <li>How we use and share your information</li>
              <li>Your rights regarding your personal data</li>
              <li>How we protect and store your data</li>
            </ul>
          </section>

          <section>
            <h2>Information we collect</h2>
            <p>We collect information to provide you with personalised job-matching and career services.</p>

            <h3>Visitors to our website</h3>
            <p>
              We use Vercel Analytics to collect anonymised, aggregated information about visitor behaviour (such as page views and referral sources). Vercel Analytics does not use cookies and does not collect personally identifiable information. This helps us understand how people use our website and improve the experience.
            </p>

            <h3>Job seeker accounts</h3>
            <p>When you create a Careira account or use our job-matching tools, we may collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>Your CV (uploaded as a PDF or Word document)</li>
              <li>LinkedIn URL, website, or portfolio links</li>
              <li>Location (country, city)</li>
              <li>Employment preferences (role type, seniority, location, salary expectations, work pattern, notice period)</li>
              <li>IP address and device identifiers</li>
              <li>Feedback on job matches (likes, dismissals, reasons)</li>
            </ul>
            <p>We may also collect information you provide voluntarily when completing forms, interacting with recruiters, or contacting our support team.</p>

            <h3>Recruiter and employer accounts</h3>
            <p>When a recruiter or employer creates an account, we collect:</p>
            <ul>
              <li>Name, email address, and job title</li>
              <li>Company name and LinkedIn URL</li>
              <li>Job role details (title, description, location, seniority, compensation)</li>
              <li>Candidate feedback (saves, dismissals, interest signals)</li>
            </ul>
          </section>

          <section>
            <h2>How we use your information</h2>
            <p>
              We use your information to provide, improve, and personalise our services. Data protection law allows us to process your personal information only where we have a lawful basis to do so.
            </p>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Lawful Basis</th>
                    <th>Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Create and manage your Careira account</td>
                    <td>Contract</td>
                    <td>Until you delete your account</td>
                  </tr>
                  <tr>
                    <td>Provide AI-powered job-matching recommendations</td>
                    <td>Legitimate interest</td>
                    <td>Until you delete your account</td>
                  </tr>
                  <tr>
                    <td>Parse your CV and build your career profile</td>
                    <td>Legitimate interest</td>
                    <td>Until you delete your account or CV</td>
                  </tr>
                  <tr>
                    <td>Enable recruiters/employers to view your profile (if you choose to make it visible)</td>
                    <td>Consent</td>
                    <td>Until you change visibility settings or delete account</td>
                  </tr>
                  <tr>
                    <td>Send you notifications about matches, updates, or saved jobs</td>
                    <td>Consent</td>
                    <td>Until you turn them off</td>
                  </tr>
                  <tr>
                    <td>Improve and personalise the service using anonymised analytics</td>
                    <td>Legitimate interest</td>
                    <td>Anonymised; no personal data retained</td>
                  </tr>
                  <tr>
                    <td>Respond to support or contact requests</td>
                    <td>Legitimate interest</td>
                    <td>Up to 12 months after resolution</td>
                  </tr>
                  <tr>
                    <td>Maintain security audit logs (login events, account activity)</td>
                    <td>Legitimate interest</td>
                    <td>12 months, then deleted</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>We will always seek your consent before using your data for any new purpose not covered above.</p>
          </section>

          <section>
            <h2>AI and automated decision-making</h2>
            <p>
              Careira uses artificial intelligence to match candidates with job opportunities. When you upload your CV, our system:
            </p>
            <ul>
              <li>Extracts and structures your skills, experience, and career history</li>
              <li>Compares your profile against available job opportunities</li>
              <li>Generates match scores and explanations for each recommendation</li>
            </ul>
            <p>
              No decisions are fully automated. Job recommendations are presented to you for your own evaluation — you decide which opportunities to pursue. Similarly, recruiters receive candidate shortlists as decision-support tools, not as final hiring decisions.
            </p>
            <p>
              You have the right to request human review of any AI-generated recommendation, or to ask us to explain how a particular match score was calculated. Contact us at the details below.
            </p>
          </section>

          <section>
            <h2>Information we share</h2>
            <p>We do not sell your personal information.</p>
            <p>We share your information only when necessary to provide our services:</p>
            <ul>
              <li>With recruiters or employers when you apply for a job or choose to make your profile visible</li>
              <li>With third-party service providers who process data on our behalf (see below)</li>
              <li>When required by law, regulation, or legal process</li>
              <li>If Careira enters into a merger, acquisition, or similar business transaction, where your data may transfer as part of the company assets</li>
            </ul>

            <h3>Sub-processors</h3>
            <p>We use the following third-party services to operate our platform. All process data on our behalf under strict data protection terms:</p>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OpenAI</td>
                    <td>CV parsing, career profile analysis, job matching</td>
                    <td>United States</td>
                  </tr>
                  <tr>
                    <td>Backblaze</td>
                    <td>CV file storage</td>
                    <td>United States</td>
                  </tr>
                  <tr>
                    <td>Railway</td>
                    <td>Database hosting</td>
                    <td>United States</td>
                  </tr>
                  <tr>
                    <td>Render</td>
                    <td>Backend application hosting</td>
                    <td>United States</td>
                  </tr>
                  <tr>
                    <td>Vercel</td>
                    <td>Frontend hosting and anonymised analytics</td>
                    <td>United States</td>
                  </tr>
                  <tr>
                    <td>Resend</td>
                    <td>Transactional email delivery</td>
                    <td>United States</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Data transfers outside the UK or EEA</h2>
            <p>
              Your information is processed by services located in the United States (see sub-processor list above). When your data is transferred outside the UK or European Economic Area, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner and the European Commission.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              We use a single essential cookie to maintain your login session when you are signed into your Careira account. This cookie is strictly necessary for the service to function and cannot be disabled.
            </p>
            <p>
              We do not use tracking cookies, advertising cookies, or third-party cookies. Our analytics provider (Vercel Analytics) operates without cookies.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>You have control over how we use your personal information. Under data protection law, you have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal information we hold about you</li>
              <li><strong>Rectification</strong> — request correction of inaccurate data</li>
              <li><strong>Erasure</strong> — request deletion of your data (&ldquo;the right to be forgotten&rdquo;)</li>
              <li><strong>Data portability</strong> — request a copy of your data in a portable, machine-readable format</li>
              <li><strong>Restrict or object</strong> to certain processing, including marketing</li>
              <li><strong>Withdraw your consent</strong> at any time, where processing is based on consent</li>
              <li><strong>Human review</strong> of automated decisions, including AI-generated job match recommendations</li>
            </ul>
            <p>You can manage most of your preferences directly in your Careira account. If you wish to exercise any of your rights, please contact us using the details below.</p>
          </section>

          <section>
            <h2>Account deletion</h2>
            <p>
              When you delete your Careira account, we remove your personal data from our systems, including your profile, career data, CV text, match history, and learned preferences. CV files are deleted from our file storage. Security audit logs are anonymised (personal identifiers removed) and retained for up to 12 months for fraud prevention and security purposes, after which they are deleted.
            </p>
          </section>

          <section>
            <h2>How we protect your information</h2>
            <p>We maintain strict technical and organisational safeguards to protect your personal data, including:</p>
            <ul>
              <li>Encryption of data at rest and in transit</li>
              <li>Access controls limited to authorised personnel</li>
              <li>Regular security assessments and code reviews</li>
              <li>Audit logging of security-sensitive operations</li>
            </ul>
            <p>If a data breach occurs that may affect you, we will notify you and relevant authorities in accordance with legal requirements.</p>
          </section>

          <section>
            <h2>How to contact us</h2>
            <p>If you have questions about this Privacy Policy or how we handle your data, please contact our Data Protection Officer:</p>
            <p>
              <strong>Email:</strong> <a href="mailto:privacy@careira.com">privacy@careira.com</a>
            </p>
            <p>
              <strong>Address:</strong> Careira Ltd, 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
            </p>
          </section>

          <section>
            <h2>How to complain</h2>
            <p>If you are unhappy with how we have used your personal data, please contact us first so we can resolve your concern.</p>
            <p>
              You also have the right to lodge a complaint with the <strong>Information Commissioner&rsquo;s Office (ICO)</strong> at <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a>.
            </p>
          </section>

          <section>
            <h2>Changes to this Privacy Policy</h2>
            <p>
              We review and update this Privacy Policy from time to time. Any updates will be posted on our website with a revised &ldquo;Last Updated&rdquo; date. If the changes are significant, we may also notify you by email or within your Careira account.
            </p>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        main {
          min-height: 100vh;
          padding: 6rem 0 4rem;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 2rem;
          color: #33374A;
        }

        h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #33374A;
        }

        .updated {
          font-size: 0.9rem;
          color: #4C526A;
          margin-bottom: 2.5rem;
        }

        section {
          margin-bottom: 2.5rem;
        }

        h2 {
          font-size: 1.35rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #33374A;
        }

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #33374A;
        }

        p {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 0.75rem;
          color: #4C526A;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }

        li {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 0.35rem;
          color: #4C526A;
        }

        a {
          color: #33374A;
          text-decoration: underline;
        }

        a:hover {
          color: #4C526A;
        }

        .table-wrapper {
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        th {
          text-align: left;
          padding: 0.6rem 0.75rem;
          background: #F2F4F6;
          color: #33374A;
          font-weight: 600;
          border-bottom: 2px solid #dfe2e6;
        }

        td {
          padding: 0.6rem 0.75rem;
          color: #4C526A;
          border-bottom: 1px solid #F2F4F6;
          vertical-align: top;
        }

        @media (max-width: 768px) {
          main {
            padding: 5rem 0 3rem;
          }

          .container {
            padding: 0 1rem;
          }

          h1 {
            font-size: 1.75rem;
          }

          h2 {
            font-size: 1.2rem;
          }

          table {
            font-size: 0.85rem;
          }

          th, td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
