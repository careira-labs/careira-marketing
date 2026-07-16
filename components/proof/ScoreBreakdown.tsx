interface DimensionScore {
  label: string;
  score: number;
}

interface ScoreBreakdownProps {
  role?: string;
  company?: string;
  location?: string;
  workStyle?: string;
  matchLabel?: string;
  overallScore?: number;
  dimensions?: DimensionScore[];
}

const getBarColor = (score: number): string => {
  if (score >= 75) return '#16A34A';
  if (score >= 50) return '#F59E0B';
  return '#667085';
};

const getScoreColor = (score: number): string => {
  if (score >= 75) return '#16A34A';
  if (score >= 50) return '#F59E0B';
  return '#667085';
};

const DEFAULT_DIMENSIONS: DimensionScore[] = [
  { label: 'Domain fit', score: 62 },
  { label: 'Skills match', score: 74 },
  { label: 'Role Outcomes', score: 81 },
  { label: 'Core function', score: 68 },
  { label: 'Location fit', score: 85 },
  { label: 'Seniority level', score: 88 },
];

export default function ScoreBreakdown({
  role = 'Head of Operations',
  company = 'Ashworth Group',
  location = 'Manchester',
  workStyle = 'Hybrid',
  matchLabel = 'Strong Alignment',
  overallScore = 79,
  dimensions = DEFAULT_DIMENSIONS,
}: ScoreBreakdownProps) {
  return (
    <div className="artifact">
      <div className="match-badge">
        <span className="match-label">{matchLabel}</span>
        <div className="match-underline" />
      </div>
      <h3 className="role-title">{role}</h3>
      <p className="role-meta">{company} &bull; {location} &bull; {workStyle}</p>

      <div className="score-card">
        <div className="overall-row">
          <span className="overall-label">Overall match</span>
          <span className="overall-value" style={{ color: getScoreColor(overallScore) }}>{overallScore}%</span>
        </div>

        <div className="dimensions">
          {dimensions.map((dim, i) => (
            <div key={i} className="dim-row">
              <span className="dim-label">{dim.label}</span>
              <div className="dim-track">
                <div
                  className="dim-fill"
                  style={{ width: `${dim.score}%`, background: getBarColor(dim.score) }}
                />
              </div>
              <span className="dim-value" style={{ color: getScoreColor(dim.score) }}>{dim.score}%</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .artifact {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 1.75rem;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .match-badge {
          margin-bottom: 0.75rem;
        }

        .match-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #33374A;
        }

        .match-underline {
          width: 40px;
          height: 3px;
          background: #FF7A6F;
          margin-top: 0.375rem;
          border-radius: 2px;
        }

        .role-title {
          font-size: 1.375rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.375rem;
          line-height: 1.25;
        }

        .role-meta {
          font-size: 0.875rem;
          color: #667085;
          margin: 0 0 1.75rem;
        }

        .score-card {
          background: #FAFBFC;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          padding: 1.5rem;
        }

        .overall-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.5rem;
        }

        .overall-label {
          font-size: 1rem;
          font-weight: 600;
          color: #33374A;
        }

        .overall-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .dimensions {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .dim-row {
          display: grid;
          grid-template-columns: 120px 1fr 44px;
          gap: 0.75rem;
          align-items: center;
        }

        .dim-label {
          font-size: 0.875rem;
          color: #4C526A;
          white-space: nowrap;
        }

        .dim-track {
          height: 10px;
          background: #E5E7EB;
          border-radius: 5px;
          overflow: hidden;
        }

        .dim-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.6s ease-out;
        }

        .dim-value {
          font-size: 0.875rem;
          font-weight: 600;
          text-align: right;
        }

        @media (max-width: 480px) {
          .artifact {
            padding: 1.25rem;
          }

          .score-card {
            padding: 1.25rem;
          }

          .dim-row {
            grid-template-columns: 100px 1fr 40px;
            gap: 0.5rem;
          }

          .role-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}
