import ProductScreenshot from './ProductScreenshot';
import { ReactNode } from 'react';

interface HeroSectionProps {
  headline: string | ReactNode;
  subheadline: string;
  ctaText: string;
  ctaAction: () => void;
  screenshot?: string;
  screenshotAlt?: string;
}

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaAction,
  screenshot,
  screenshotAlt,
}: HeroSectionProps) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{headline}</h1>
            <p className="subheadline">{subheadline}</p>
            <button onClick={ctaAction} className="btn btn-primary">
              {ctaText}
            </button>
          </div>

          {screenshot && (
            <div className="hero-visual">
              <ProductScreenshot
                src={screenshot}
                alt={screenshotAlt || 'Product screenshot'}
                priority
              />
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: var(--canvas);
          padding: 4rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 1.5rem 0;
          color: var(--text);
        }

        .subheadline {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0 0 2rem 0;
        }

        .hero-visual {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0;
          }

          .container {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1rem;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .subheadline {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
