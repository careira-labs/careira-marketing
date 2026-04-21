export default function PreferenceConflicts() {
  const conflicts = [
    {
      candidate: 'Prefers fully remote',
      role: 'Hybrid – 3 days in London office',
      severity: 'medium',
    },
    {
      candidate: 'Salary expectation £75–85k',
      role: 'Role budget £65–72k',
      severity: 'high',
    },
    {
      candidate: 'Seeking IC role (no management)',
      role: 'Includes 2 direct reports',
      severity: 'low',
    },
  ];

  return (
    <div className="artifact">
      <h4>Preference Conflicts</h4>
      <p className="intro">Careira surfaces where candidate preferences and role requirements don&apos;t align – before time gets wasted.</p>

      <div className="conflicts">
        {conflicts.map((conflict, i) => (
          <div key={i} className={`conflict conflict-${conflict.severity}`}>
            <div className="conflict-row">
              <span className="label">Candidate</span>
              <span className="value">{conflict.candidate}</span>
            </div>
            <div className="conflict-row">
              <span className="label">Role</span>
              <span className="value">{conflict.role}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .artifact {
          background: #FFFFFF;
          border-radius: 12px;
          border-top: 2px solid #F59E0B;
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

        .conflicts {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .conflict {
          padding: 0.75rem;
          border-radius: 8px;
          border-left: 3px solid;
        }

        .conflict-high {
          background: #FEF3F2;
          border-color: #B42318;
        }

        .conflict-medium {
          background: #FFFBEB;
          border-color: #F59E0B;
        }

        .conflict-low {
          background: #F2F4F6;
          border-color: #667085;
        }

        .conflict-row {
          display: flex;
          gap: 0.5rem;
          align-items: baseline;
          font-size: 0.8125rem;
          line-height: 1.5;
        }

        .conflict-row + .conflict-row {
          margin-top: 0.25rem;
        }

        .label {
          font-weight: 600;
          color: #33374A;
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          flex-shrink: 0;
          min-width: 65px;
        }

        .value {
          color: #4C526A;
        }
      `}</style>
    </div>
  );
}
