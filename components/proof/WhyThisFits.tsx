const DEFAULT_REASONING = [
  '7 years product management across B2B SaaS, aligning directly with role requirements',
  'Proven track record in cross-functional leadership with engineering and design teams',
  'Domain experience in fintech maps strongly to the hiring company\'s sector',
  'Seniority level and scope of previous roles match the expected level of autonomy',
];

const getFitColor = (score: number): string => {
  if (score >= 80) return '#FF7A6F';
  if (score >= 65) return '#16A34A';
  if (score >= 50) return '#F59E0B';
  return '#B42318';
};

interface WhyThisFitsProps {
  role?: string;
  candidate?: string;
  score?: number;
  scoreLabel?: string;
  reasoning?: string[];
  considerations?: string[];
}

export default function WhyThisFits({
  role = 'Senior Product Manager',
  candidate = 'Sarah Chen',
  score = 84,
  scoreLabel = 'Strong Fit',
  reasoning = DEFAULT_REASONING,
  considerations,
}: WhyThisFitsProps) {
  const fitColor = getFitColor(score);

  return (
    <div className="artifact">
      <div className="artifact-header">
        <div className="role-info">
          <span className="role-label">Role</span>
          <span className="role-title">{role}</span>
        </div>
        <div className="candidate-info">
          <span className="candidate-label">Candidate</span>
          <span className="candidate-name">{candidate}</span>
        </div>
      </div>

      <div className="score-bar">
        <div className="score-label">Overall Fit</div>
        <div className="score-track">
          <div className="score-fill" style={{ width: `${score}%`, background: fitColor }} />
        </div>
        <div className="score-value" style={{ fontWeight: score >= 80 ? 700 : score >= 65 ? 600 : 500 }}>{scoreLabel} &middot; {score}%</div>
      </div>

      <div className="reasoning">
        <h4>Why this fits</h4>
        <ul>
          {reasoning.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {considerations && considerations.length > 0 && (
        <div className="considerations">
          <h4>Things to consider</h4>
          <ul>
            {considerations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        .artifact {
          background: #FFFFFF;
          border-radius: 12px;
          border-top: 2px solid #FF7A6F;
          padding: 0 1.75rem 1.75rem;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .artifact-header {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          background: #FAFBFC;
          margin: 0 -1.75rem 1.25rem;
          padding: 1.25rem 1.75rem;
          border-radius: 12px 12px 0 0;
          border-top: 2px solid #FF7A6F;
          border-bottom: 1px solid #E5E7EB;
        }

        .role-label,
        .candidate-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 500;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.125rem;
        }

        .role-title,
        .candidate-name {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #33374A;
        }

        .score-bar {
          margin-bottom: 1.25rem;
        }

        .score-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #667085;
          margin-bottom: 0.375rem;
        }

        .score-track {
          height: 8px;
          background: #E5E7EB;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.375rem;
        }

        .score-fill {
          height: 100%;
          border-radius: 4px;
        }

        .score-value {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #33374A;
        }

        .reasoning h4 {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 0.625rem;
        }

        .reasoning ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .reasoning li {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: #4C526A;
          padding: 0.375rem 0;
          padding-left: 1rem;
          position: relative;
          border-bottom: 1px solid #F0F1F3;
        }

        .reasoning li:last-child {
          border-bottom: none;
        }

        .reasoning li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6875rem;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #FF7A6F;
        }

        .considerations {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #F0F1F3;
        }

        .considerations h4 {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 0.625rem;
        }

        .considerations ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .considerations li {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: #4C526A;
          padding: 0.375rem 0;
          padding-left: 1rem;
          position: relative;
          border-bottom: 1px solid #F0F1F3;
        }

        .considerations li:last-child {
          border-bottom: none;
        }

        .considerations li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6875rem;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #F59E0B;
        }
      `}</style>
    </div>
  );
}
