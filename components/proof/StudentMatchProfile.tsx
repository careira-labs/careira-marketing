const LayersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);

const BarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const CursorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const ROLES = [
  {
    icon: <LayersIcon />,
    iconBg: '#0E8A8A',
    title: 'Graduate Software Engineer',
    location: 'Northbank, Leeds',
    tags: [{ label: 'Open Source experience' }, { label: 'Python, SQL, React' }],
    score: 85,
  },
  {
    icon: <BarIcon />,
    iconBg: '#3B6FD4',
    title: 'Data Analyst Graduate Scheme',
    location: 'Caldane Group, Manchester',
    tags: [{ label: 'Adjacent: engineering → data' }, { label: 'ML dissertation' }],
    score: 81,
  },
  {
    icon: <CursorIcon />,
    iconBg: '#E0922F',
    title: 'Graduate Product Analyst',
    location: 'Wren Technologies, Bristol',
    tags: [{ label: 'From your careers team · closes 14 Nov', highlight: true }, { label: 'Team leadership' }],
    score: 78,
  },
  {
    icon: <PinIcon />,
    iconBg: '#1F9D6B',
    title: 'Digital Services Developer',
    location: 'Public sector, Birmingham',
    tags: [{ label: 'App used by 1,200 students' }, { label: 'Agile teams' }],
    score: 76,
  },
];

export default function StudentMatchProfile() {
  return (
    <div className="profile">
      <div className="profile-head">
        <div>
          <span className="eyebrow">Student profile</span>
          <h3>Sophie Clarke, 3rd year Computer Science</h3>
        </div>
        <span className="tally">100k+ live roles <span className="arrow">&rarr;</span> <strong>4 strong fits</strong></span>
      </div>

      <div className="rows">
        {ROLES.map((r, i) => (
          <div className="row" key={i}>
            <span className="icon-tile" style={{ background: r.iconBg }}>{r.icon}</span>
            <div className="role">
              <span className="role-title">{r.title}</span>
              <span className="role-loc">{r.location}</span>
            </div>
            <div className="tags">
              {r.tags.map((t, j) => (
                <span className={`tag ${t.highlight ? 'tag-highlight' : ''}`} key={j}>{t.label}</span>
              ))}
            </div>
            <span className="score">{r.score}</span>
          </div>
        ))}
      </div>

      <div className="profile-foot">
        <span>Every match explains the fit and the gaps</span>
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

        .icon-tile {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .role {
          display: flex;
          flex-direction: column;
          min-width: 0;
          width: 220px;
          flex-shrink: 0;
        }

        .role-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #33374A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .role-loc {
          font-size: 0.75rem;
          color: #667085;
          margin-top: 0.125rem;
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

          .role {
            width: auto;
            flex: 1;
          }

          .tags {
            flex-basis: 100%;
            order: 3;
            padding-left: 0;
          }

          .role-title {
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
}
