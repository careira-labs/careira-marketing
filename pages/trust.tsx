import Head from 'next/head';
import PublicNav from '../components/PublicNav';
import Footer from '../components/Footer';

// NOTE: badges/links below reflect only what is true today.
// When obtained, add a "Cyber Essentials" badge; when the accessibility
// statement and the public summaries are hosted, move them from
// "Available on request" up to "Published documents" with real hrefs.

export default function TrustPage() {
  return (
    <>
      <Head>
        <title>Trust &amp; Compliance – Careira</title>
        <meta
          name="description"
          content="How Careira protects personal data: security, AI governance, data processing roles, international transfers, and the compliance documents available to customers and partners."
        />
        <link rel="canonical" href="https://www.careira.com/trust" />
      </Head>

      <PublicNav theme="light" />

      <main>
        <div className="container">
          <h1>Trust &amp; Compliance</h1>
          <p className="updated">How we protect personal data &middot; Last updated: 2 November 2026</p>

          <div className="badges">
            <span className="badge">ICO registered &middot; ZC110377</span>
            <span className="badge">UK GDPR</span>
            <span className="badge">Signed sub-processor DPAs</span>
            <span className="badge">Transfer Risk Assessments</span>
            <span className="badge">Human-in-the-loop AI</span>
          </div>

          <section>
            <h2>At a glance</h2>
            <ul className="glance">
              <li>Personal data is encrypted in transit (TLS, HSTS) and at rest (AES-256).</li>
              <li>Our AI supports decisions; it never makes them. A person reviews outcomes.</li>
              <li>
                Roles vary by relationship: for people who sign up directly we are the
                controller; for recruiters and institutions placing their own candidates,
                they are the controller and we are the processor.
              </li>
              <li>
                Core hosting, storage and AI providers are in the USA, covered by the UK&ndash;US
                Data Privacy Framework or Standard Contractual Clauses, each supported by a
                Transfer Risk Assessment.
              </li>
              <li>
                You can access, correct, export or delete your data, and data is deleted or
                returned on exit.
              </li>
            </ul>
          </section>

          <section>
            <h2>Published documents</h2>
            <p>Available now to read:</p>
            <ul className="doc-list">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/data-processing-addendum">Data Processing Addendum</a></li>
            </ul>
          </section>

          <section>
            <h2>Available on request</h2>
            <p>
              Plain-English summaries we share with customers and partners &ndash; ask and we
              will send them:
            </p>
            <ul className="doc-list muted">
              <li>Data Handling Summary (for education institutions)</li>
              <li>Data Protection Impact Assessment &ndash; summary</li>
              <li>Service Level Summary</li>
              <li>Accessibility Statement</li>
            </ul>
            <p className="spacer-top">
              The full supporting documents are available to a customer or partner&rsquo;s
              data-protection office on request, under NDA:
            </p>
            <ul className="doc-list muted">
              <li>Full Data Protection Impact Assessment and AI Act technical file</li>
              <li>Record of Processing Activities</li>
              <li>Transfer Risk Assessments</li>
              <li>Signed sub-processor Data Processing Agreements</li>
              <li>Application security assessment summary</li>
            </ul>
          </section>

          <section>
            <h2>Request the pack</h2>
            <p>
              For any of the documents above, or to start a security and data-protection
              review, contact us and we will provide a private, access-controlled link.
            </p>
            <a className="cta" href="mailto:info@careira.com?subject=Trust%20%26%20compliance%20pack">
              Request documents
            </a>
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
          max-width: 960px;
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
          margin-bottom: 2rem;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 3rem;
        }

        .badge {
          font-size: 0.82rem;
          font-weight: 600;
          color: #33374A;
          background: #FFFFFF;
          border: 1px solid #E3E6EC;
          border-radius: 100px;
          padding: 0.4rem 0.85rem;
        }

        section {
          margin-bottom: 2.75rem;
        }

        h2 {
          font-size: 1.35rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #33374A;
        }

        p {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 0.75rem;
          color: #4C526A;
        }

        .spacer-top {
          margin-top: 1.5rem;
        }

        .glance {
          list-style: none;
          padding-left: 0;
          margin: 0;
        }

        .glance li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1rem;
          line-height: 1.7;
          color: #4C526A;
        }

        .glance li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #E4694F;
        }

        .doc-list {
          list-style: none;
          padding-left: 0;
          margin: 0.5rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .doc-list li {
          font-size: 1rem;
          line-height: 1.6;
          color: #33374A;
        }

        .doc-list.muted li {
          color: #4C526A;
          padding-left: 1.5rem;
          position: relative;
        }

        .doc-list.muted li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 10px;
          height: 2px;
          background: #B9C0CC;
        }

        a {
          color: #33374A;
          text-decoration: underline;
        }

        a:hover {
          color: #4C526A;
        }

        .cta {
          display: inline-block;
          align-self: flex-start;
          margin-top: 0.5rem;
          padding: 0.7rem 1.4rem;
          background: #E4694F;
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
        }

        .cta:hover {
          background: #C9513A;
          color: #FFFFFF;
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
        }
      `}</style>
    </>
  );
}
