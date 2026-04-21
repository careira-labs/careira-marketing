interface ComparisonRow {
  aspect: string;
  traditional: string;
  careira: string;
}

interface ComparisonSectionProps {
  title?: string;
  rows: ComparisonRow[];
}

export default function ComparisonSection({ title, rows }: ComparisonSectionProps) {
  return (
    <>
      <section className="comparison-section">
        <div className="container">
          {title && <h2 className="section-title">{title}</h2>}

          <div className="column-headers">
            <span className="header-traditional">Traditional hiring</span>
            <span className="header-careira">Careira</span>
          </div>

          <div className="rows">
            {rows.map((row, index) => (
              <div key={index} className="comparison-row">
                <div className="aspect-label">{row.aspect}</div>
                <div className="columns">
                  <div className="traditional-cell">
                    <span className="marker marker-x">&times;</span>
                    <span>{row.traditional}</span>
                  </div>
                  <div className="careira-cell">
                    <span className="marker marker-check">&#10003;</span>
                    <span>{row.careira}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .comparison-section {
          background: #FFFFFF;
          padding: 4rem 0;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 600;
          color: #33374A;
          margin: 0 0 2.5rem 0;
        }

        .column-headers {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #E5E7EB;
          margin-bottom: 0.5rem;
        }

        .header-traditional,
        .header-careira {
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .header-traditional {
          color: #667085;
        }

        .header-careira {
          color: #FF7A6F;
        }

        .comparison-row {
          padding: 1.5rem 0;
          border-bottom: 1px solid #F0F1F3;
        }

        .comparison-row:last-child {
          border-bottom: none;
        }

        .aspect-label {
          font-size: 1rem;
          font-weight: 600;
          color: #33374A;
          margin-bottom: 0.75rem;
        }

        .columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .traditional-cell,
        .careira-cell {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .traditional-cell {
          color: #667085;
        }

        .careira-cell {
          color: #33374A;
        }

        .marker {
          flex-shrink: 0;
          font-weight: 700;
          font-size: 1rem;
          line-height: 1.5;
        }

        .marker-x {
          color: #B42318;
        }

        .marker-check {
          color: #16A34A;
        }

        @media (max-width: 768px) {
          .comparison-section {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          .section-title {
            font-size: 1.5rem;
            margin: 0 0 2rem 0;
          }

          .column-headers {
            display: none;
          }

          .columns {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .traditional-cell::before {
            content: 'Traditional: ';
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #667085;
          }

          .careira-cell::before {
            content: 'Careira: ';
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #FF7A6F;
          }

          .comparison-row {
            padding: 1.25rem 0;
          }
        }
      `}</style>
    </>
  );
}
