import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {

  return (
    <>
      <Head>
        <title>Careira – Work that fits, found faster</title>
        <meta
          name="description"
          content="Launching soon – the AI talent-matching platform that understands people and jobs, and redefines how they connect."
        />
      </Head>

      <div className="wrapper">
        <div className="container">
          <img
            src="/assets/LOGO-Careira-bitone-white.png"
            alt="Careira"
            className="logo"
          />
          <h1>
            Work that fits,
            <br />
            found faster
          </h1>
          <div className="subhead">
            Launching soon – the AI talent-matching platform that understands
            people and jobs – and redefines how they connect.
          </div>

          <div className="cta-buttons">
            <Link href="/jobseekers">
              <span className="cta-button">I'm looking for work →</span>
            </Link>
            <Link href="/recruiters">
              <span className="cta-button">I'm hiring →</span>
            </Link>
          </div>
        </div>

        <div className="footer">
          <span className="footer-item">
            © 2026 Careira Ltd. Registered in England and Wales with company
            number 16937993.
          </span>
          <a href="mailto:info@careira.com" className="footer-item email">
            info@careira.com
          </a>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100svh;
          background-color: #33374a;
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex: 1 1 auto;
          padding: clamp(2rem, 6vw, 4rem) clamp(2rem, 8vw, 6rem);
          box-sizing: border-box;
        }

        .logo {
          height: 48px;
          width: auto;
          margin-bottom: 1.5rem;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.2;
          color: white;
        }

        .subhead {
          font-size: 1.4rem;
          font-weight: 400;
          margin-top: 2rem;
          border-top: 3px solid #ff7a6f;
          padding-top: 1.2rem;
          max-width: 700px;
          line-height: 1.5;
          color: white;
        }

        .cta-buttons {
          margin-top: 2rem;
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: white;
          background: transparent;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          display: inline-block;
        }

        .cta-button:hover {
          background: #ff7a6f;
          border-color: #ff7a6f;
        }

        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-button {
            width: 100%;
            text-align: center;
          }
        }

        .footer {
          padding: 1.5rem clamp(2rem, 8vw, 6rem);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          background: #33374a;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-item {
          margin: 0;
        }

        .footer .email {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
        }

        .footer .email:hover {
          color: white;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .subhead {
            font-size: 1.2rem;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
