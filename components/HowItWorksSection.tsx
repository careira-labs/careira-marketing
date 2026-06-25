interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  headline: string;
  steps: HowItWorksStep[];
  background?: string;
}

export default function HowItWorksSection({ headline, steps, background = '#FFFFFF' }: HowItWorksSectionProps) {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2>{headline}</h2>
        <div className="steps">
          {steps.map((step, i) => (
            <div key={i} className="step">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          background: ${background};
          padding: 6rem 0;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          text-align: center;
          margin: 0 0 3.5rem;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }

        .steps::before {
          display: none;
        }

        .step {
          padding: 0 2rem;
        }

        .step:first-child {
          padding-left: 0;
        }

        .step:last-child {
          padding-right: 0;
        }

        .step-number {
          display: inline-block;
          font-size: 2rem;
          font-weight: 600;
          color: #FF7A6F;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        :global(.reveal) .step {
          opacity: 0;
          transition: opacity 0.35s ease-out;
        }

        :global(.visible) .step {
          opacity: 1;
        }

        :global(.visible) .step:nth-child(2) {
          transition-delay: 0.1s;
        }

        :global(.visible) .step:nth-child(3) {
          transition-delay: 0.2s;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.5rem;
        }

        p {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #667085;
          margin: 0;
        }

        @media (max-width: 768px) {
          .how-it-works {
            padding: 3.5rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
            margin: 0 0 2.5rem;
          }

          .steps {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .step {
            padding: 0;
            border-bottom: 1px solid #E5E7EB;
            padding-bottom: 2rem;
          }

          .step:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}
