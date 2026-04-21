import { ReactNode } from 'react';

interface CredibilitySectionProps {
  headline: string;
  body?: string | ReactNode;
  quotes?: Array<{ text: string }>;
}

export default function CredibilitySection({ headline, body, quotes }: CredibilitySectionProps) {
  return (
    <section className="credibility">
      <div className="container">
        <h2>{headline}</h2>
        {body && (
          <div className="body">
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
        )}
        {quotes && quotes.length > 0 && (
          <div className="quotes">
            {quotes.map((quote, i) => (
              <blockquote key={i} className="quote">
                <p>&ldquo;{quote.text}&rdquo;</p>
              </blockquote>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .credibility {
          background: #F2F4F6;
          padding: 5rem 0;
        }

        .container {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: left;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 1.5rem;
        }

        .body :global(p) {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #667085;
          margin: 0 0 1rem;
        }

        .quotes {
          margin-top: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .quote {
          margin: 0;
          padding: 1.5rem 2rem;
          background: #F2F4F6;
          border-radius: 12px;
          border-left: 3px solid #FF7A6F;
          text-align: left;
        }

        .quote p {
          font-size: 1rem;
          line-height: 1.65;
          color: #4C526A;
          margin: 0;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .credibility {
            padding: 3.5rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .quote {
            padding: 1.25rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
