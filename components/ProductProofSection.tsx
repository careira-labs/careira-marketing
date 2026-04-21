import { ReactNode } from 'react';

interface ProductProofSectionProps {
  headline: string;
  subheadline?: string;
  children: ReactNode;
}

export default function ProductProofSection({ headline, subheadline, children }: ProductProofSectionProps) {
  return (
    <section className="product-proof">
      <div className="container">
        <h2>{headline}</h2>
        {subheadline && <p className="subheadline">{subheadline}</p>}
        <div className="artifacts">
          {children}
        </div>
      </div>

      <style jsx>{`
        .product-proof {
          background: #33374A;
          background-image: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          padding: 7rem 0;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          text-align: center;
          margin: 0 0 1rem;
        }

        .subheadline {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
        }

        .artifacts {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .product-proof {
            padding: 4rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .subheadline {
            margin: 0 auto 2rem;
          }

          .artifacts {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
