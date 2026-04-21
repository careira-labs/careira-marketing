export default function RecruiterShortlist() {
  const candidates = [
    {
      name: 'Sarah Chen',
      score: 84,
      rationale: 'Strong functional fit, relevant domain experience, seniority aligned',
      top: true,
    },
    {
      name: 'James Okafor',
      score: 76,
      rationale: 'Solid skills match, slight seniority gap, strong cultural indicators',
      top: false,
    },
    {
      name: 'Maria Alvarez',
      score: 71,
      rationale: 'Good domain fit, lacks B2B SaaS experience, strong leadership signals',
      top: false,
    },
    {
      name: 'David Park',
      score: 63,
      rationale: 'Adjacent function, strong outcomes, would need domain onboarding',
      top: false,
    },
  ];

  return (
    <div className="artifact">
      <h4>Shortlist Rationale</h4>
      <p className="intro">Every candidate on the shortlist comes with a clear reason for inclusion.</p>

      <div className="candidates">
        {candidates.map((c, i) => (
          <div key={i} className={`candidate ${c.top ? 'candidate-top' : ''}`}>
            <div className="candidate-header">
              <span className="name">{c.name}</span>
              <span className={`score ${c.top ? 'score-top' : ''}`}>{c.score}%</span>
            </div>
            <p className="rationale">{c.rationale}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .artifact {
          background: #FFFFFF;
          border-radius: 12px;
          border-top: 2px solid #FF7A6F;
          padding: 1.75rem;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        h4 {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.375rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .intro {
          font-size: 0.75rem;
          line-height: 1.5;
          color: #667085;
          margin: 0 0 1rem;
        }

        .candidates {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .candidate {
          padding: 0.75rem 0;
          border-bottom: 1px solid #F0F1F3;
        }

        .candidate:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .candidate:first-child {
          padding-top: 0;
        }

        .candidate-top {
          padding-bottom: 0.875rem;
          border-left: 2px solid #FF7A6F;
          padding-left: 0.75rem;
        }

        .candidate-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #33374A;
        }

        .score {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #667085;
        }

        .score-top {
          color: #FF7A6F;
        }

        .rationale {
          font-size: 0.75rem;
          line-height: 1.5;
          color: #667085;
          margin: 0;
        }

        .candidate-top .name {
          color: #33374A;
        }

        .candidate-top .rationale {
          color: #4C526A;
        }
      `}</style>
    </div>
  );
}
