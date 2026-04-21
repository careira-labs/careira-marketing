import { ReactNode } from 'react';

interface DifferentiationSectionProps {
  headline: string;
  body: string | ReactNode;
}

export default function DifferentiationSection({ headline, body }: DifferentiationSectionProps) {
  return (
    <section className="differentiation">
      <div className="container">
        <h2>{headline}</h2>
        <div className="body">
          {typeof body === 'string' ? <p>{body}</p> : body}
        </div>
      </div>

      <style jsx>{`
        .differentiation {
          background: #F2F4F6;
          padding: 5rem 0;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.25rem;
        }

        .body :global(p) {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #667085;
          margin: 0 0 1rem;
        }

        .body :global(p:last-child) {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .differentiation {
            padding: 3.5rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
