import ProductScreenshot from './ProductScreenshot';

interface Step {
  number: number;
  title: string;
  description: string;
  screenshot?: string;
}

interface FeatureStepsProps {
  steps: Step[];
  title?: string;
}

export default function FeatureSteps({ steps, title }: FeatureStepsProps) {
  return (
    <>
      <section className="feature-steps">
        <div className="container">
          {title && <h2 className="section-title">{title}</h2>}

          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.screenshot && (
                  <div className="step-screenshot">
                    <ProductScreenshot
                      src={step.screenshot}
                      alt={`${step.title} screenshot`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .feature-steps {
          background: var(--surface);
          padding: 4rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0 0 3rem 0;
          color: var(--text);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .step {
          display: flex;
          flex-direction: column;
        }

        .step-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-coral);
          color: white;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .step h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
          color: var(--text);
        }

        .step p {
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0 0 1rem 0;
          flex-grow: 1;
        }

        .step-screenshot {
          margin-top: auto;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .feature-steps {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          .section-title {
            font-size: 1.5rem;
            margin: 0 0 2rem 0;
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
