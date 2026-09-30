const CANDIDATES = [
  {
    initials: 'AO',
    name: 'A. Oliver',
    sub: 'Lead Data Engineer, fintech scale-up',
    tags: [{ label: 'Built real-time pipelines at scale' }, { label: 'Led a team of 6' }],
    score: 94,
  },
  {
    initials: 'RP',
    name: 'R. Patel',
    sub: 'Analytics Engineer, retail group',
    tags: [{ label: 'Adjacent: analytics → platform' }, { label: 'Strong SQL and dbt' }],
    score: 89,
  },
  {
    initials: 'MC',
    name: 'M. Chen',
    sub: 'Senior Software Engineer, logistics',
    tags: [{ label: 'From your pool · contacted 3m ago', highlight: true }, { label: 'Cloud migration' }],
    score: 86,
  },
  {
    initials: 'LM',
    name: 'L. Moreau',
    sub: 'Data Platform Engineer, public sector',
    tags: [{ label: 'Governance and compliance' }, { label: 'Python, Spark' }],
    score: 83,
  },
];

export default function RoleMatchProfile() {
  return (
    <div className="profile">
      <div className="profile-head">
        <div>
          <span className="eyebrow">Live role</span>
          <h3>Senior Data Engineer</h3>
        </div>
        <span className="tally">412 candidates <span className="arrow">&rarr;</span> <strong>4 shortlisted</strong></span>
      </div>

      <div className="rows">
        {CANDIDATES.map((c, i) => (
          <div className="row" key={i}>
            <span className="avatar">{c.initials}</span>
            <div className="who">
              <span className="who-name">{c.name}</span>
              <span className="who-sub">{c.sub}</span>
            </div>
            <div className="tags">
              {c.tags.map((t, j) => (
                <span className={`tag ${t.highlight ? 'tag-highlight' : ''}`} key={j}>{t.label}</span>
              ))}
            </div>
            <span className="score">{c.score}</span>
          </div>
        ))}
      </div>

      <div className="profile-foot">
        <span>Every match shows the evidence behind it</span>
        <span>Illustrative example</span>
      </div>

      <style jsx>{`
        .profile {
          background: #FFFFFF;
          border-top: 2px solid #FF7A6F;
          border-radius: 14px;
          padding: 1.5rem;
          width: 100%;
          max-width: 720px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .profile-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .eyebrow {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #667085;
          margin-bottom: 0.375rem;
        }

        .profile-head h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0;
          line-height: 1.3;
        }

        .tally {
          font-size: 0.8125rem;
          color: #667085;
          white-space: nowrap;
        }

        .tally .arrow {
          color: #FF7A6F;
        }

        .tally strong {
          color: #FF7A6F;
          font-weight: 700;
        }

        .rows {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .row {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          background: #F2F4F6;
          border-radius: 10px;
          padding: 0.75rem 0.875rem;
        }

        .avatar {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #33374A;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .who {
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 230px;
          flex-shrink: 0;
        }

        .who-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #33374A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .who-sub {
          font-size: 0.75rem;
          color: #667085;
          margin-top: 0.125rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          flex: 1;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        .tag {
          font-size: 0.75rem;
          color: #4C526A;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 999px;
          padding: 0.25rem 0.75rem;
          white-space: nowrap;
        }

        .tag-highlight {
          color: #FF7A6F;
          background: rgba(255, 122, 111, 0.06);
          border: 1px solid rgba(255, 122, 111, 0.55);
        }

        .score {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #FF7A6F;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          color: #33374A;
        }

        .profile-foot {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 0.875rem;
          border-top: 1px solid #E5E7EB;
          font-size: 0.75rem;
          font-style: italic;
          color: #667085;
        }

        @media (max-width: 720px) {
          .profile {
            padding: 1.125rem;
          }

          .row {
            flex-wrap: wrap;
            gap: 0.625rem 0.75rem;
          }

          .who {
            width: auto;
            flex: 1;
          }

          .tags {
            flex-basis: 100%;
            order: 3;
            padding-left: 0;
          }

          .who-name,
          .who-sub {
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
}
