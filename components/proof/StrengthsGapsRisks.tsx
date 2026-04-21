interface StrengthsGapsRisksProps {
  strengths?: string[];
  gaps?: string[];
  risks?: string[];
}

const DEFAULT_STRENGTHS = [
  'Strong functional alignment in product management',
  'Seniority level matches role expectations',
  'Relevant B2B SaaS domain experience',
  'Evidence of cross-functional leadership',
];

const DEFAULT_GAPS = [
  'No direct experience in healthcare sector',
  'Limited international team management',
];

const DEFAULT_RISKS = [
  'Salary expectations may exceed role budget',
];

export default function StrengthsGapsRisks({
  strengths = DEFAULT_STRENGTHS,
  gaps = DEFAULT_GAPS,
  risks = DEFAULT_RISKS,
}: StrengthsGapsRisksProps) {

  return (
    <div className="artifact">
      <div className="column">
        <div className="column-header strengths-header">
          <span className="dot strengths-dot" />
          <span>Strengths</span>
        </div>
        {strengths.map((item, i) => (
          <div key={i} className="item">
            <span className="dot strengths-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="divider" />
      <div className="column">
        <div className="column-header gaps-header">
          <span className="dot gaps-dot" />
          <span>Gaps</span>
        </div>
        {gaps.map((item, i) => (
          <div key={i} className="item">
            <span className="dot gaps-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="divider" />
      <div className="column">
        <div className="column-header risks-header">
          <span className="dot risks-dot" />
          <span>Risks</span>
        </div>
        {risks.map((item, i) => (
          <div key={i} className="item">
            <span className="dot risks-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .artifact {
          background: #FFFFFF;
          border-radius: 12px;
          border-top: 2px solid #E5E7EB;
          padding: 1.75rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .column-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #33374A;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8125rem;
          line-height: 1.5;
          color: #4C526A;
          padding: 0.3125rem 0;
        }

        .dot {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 0.375rem;
        }

        .column-header .dot {
          width: 8px;
          height: 8px;
          margin-top: 0;
        }

        .divider {
          height: 1px;
          background: #E5E7EB;
        }

        .strengths-dot {
          background: #16A34A;
        }

        .gaps-dot {
          background: #F59E0B;
        }

        .risks-dot {
          background: #B42318;
        }
      `}</style>
    </div>
  );
}
