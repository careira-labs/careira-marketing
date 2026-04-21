import { ReactNode } from 'react';

interface CTASectionProps {
  headline: string;
  children: ReactNode;
}

export default function CTASection({ headline, children }: CTASectionProps) {
  return (
    <>
      <section className="cta-section">
        <div className="container">
          <h2>{headline}</h2>
          <div className="cta-content">{children}</div>
        </div>
      </section>

      <style jsx>{`
        .cta-section {
          background: var(--surface);
          padding: 5rem 0;
          border-top: 1px solid var(--border);
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--text);
        }

        .cta-content {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
