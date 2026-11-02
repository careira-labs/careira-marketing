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
          <header className="head">
            <h1>Trust &amp; Compliance</h1>
            <p className="updated">How we protect personal data &middot; Last updated: 2 November 2026</p>

            <div className="badges">
              <span className="badge">ICO registered &middot; ZC110377</span>
              <span className="badge">UK GDPR</span>
              <span className="badge">Signed sub-processor DPAs</span>
              <span className="badge">Transfer Risk Assessments</span>
              <span className="badge">Human-in-the-loop AI</span>
            </div>
          </header>

          <section className="panel glance-panel">
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

          <section className="docs">
            <h2>Published documents</h2>
            <p>Available now to read:</p>
            <div className="doc-cards">
              <a className="doc-card" href="/privacy">
                <span>Privacy Policy</span>
                <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a className="doc-card" href="/terms">
                <span>Terms of Service</span>
                <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a className="doc-card" href="/data-processing-addendum">
                <span>Data Processing Addendum</span>
                <span className="arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </section>

          <section className="panel request-panel">
            <h2>Available on request</h2>
            <p>
              Plain-English summaries we share with customers and partners &ndash; ask and we
              will send them:
            </p>
            <ul className="doc-list">
              <li>Data Handling Summary (for education institutions)</li>
              <li>Data Protection Impact Assessment &ndash; summary</li>
              <li>Service Level Summary</li>
              <li>Accessibility Statement</li>
            </ul>
            <p className="spacer-top">
              The full supporting documents are available to a customer or partner&rsquo;s
              data-protection office on request, under NDA:
            </p>
            <ul className="doc-list">
              <li>Full Data Protection Impact Assessment and AI Act technical file</li>
              <li>Record of Processing Activities</li>
              <li>Transfer Risk Assessments</li>
              <li>Signed sub-processor Data Processing Agreements</li>
              <li>Application security assessment summary</li>
            </ul>
          </section>

          <section className="panel cta-panel">
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
          background: #FFFFFF;
        }

        .container {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 2rem;
          color: #33374A;
        }

        .head {
          margin-bottom: 2.5rem;
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
          margin-bottom: 1.75rem;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .badge {
          font-size: 0.82rem;
          font-weight: 600;
          color: #33374A;
          background: #FFF3F0;
          border: 1px solid #F6CFC6;
          border-radius: 100px;
          padding: 0.4rem 0.9rem;
        }

        section {
          margin-bottom: 1.75rem;
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

        /* panels add colour blocks between the plain document band */
        .panel {
          border-radius: 16px;
          padding: 1.9rem 2rem;
        }

        .glance-panel {
          background: #FFF3F0;
          border-left: 4px solid #FF7A6F;
        }

        .glance {
          list-style: none;
          padding-left: 0;
          margin: 0;
        }

        .glance li {
          position: relative;
          padding-left: 1.6rem;
          margin-bottom: 0.8rem;
          font-size: 1rem;
          line-height: 1.7;
          color: #4C526A;
        }

        .glance li:last-child {
          margin-bottom: 0;
        }

        .glance li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.62rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FF7A6F;
        }

        .docs {
          padding: 0 0.25rem;
        }

        .doc-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.85rem;
          margin-top: 0.75rem;
        }

        .doc-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          background: #FFFFFF;
          border: 1px solid #E3E6EC;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          color: #33374A;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }

        .doc-card:hover {
          border-color: #FF7A6F;
          box-shadow: 0 6px 18px rgba(255, 122, 111, 0.18);
          transform: translateY(-1px);
          color: #33374A;
        }

        .arrow {
          color: #FF7A6F;
          font-size: 1.1rem;
        }

        .request-panel {
          background: #F2F4F6;
        }

        .doc-list {
          list-style: none;
          padding-left: 0;
          margin: 0.5rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .doc-list li {
          font-size: 1rem;
          line-height: 1.6;
          color: #4C526A;
          position: relative;
          padding-left: 1.5rem;
        }

        .doc-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.62rem;
          width: 10px;
          height: 2px;
          background: #FF7A6F;
        }

        .cta-panel {
          background: #2A2D3D;
        }

        .cta-panel h2 {
          color: #FFFFFF;
        }

        .cta-panel p {
          color: rgba(255, 255, 255, 0.78);
        }

        .cta {
          display: inline-block;
          align-self: flex-start;
          margin-top: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #FF7A6F;
          color: #2A2D3D;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s ease;
        }

        .cta:hover {
          background: #FF9084;
          color: #2A2D3D;
        }

        a {
          color: #33374A;
          text-decoration: underline;
        }

        .doc-card,
        .cta {
          text-decoration: none;
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

          .panel {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
