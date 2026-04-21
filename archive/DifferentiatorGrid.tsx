interface Differentiator {
  title: string;
  description: string;
}

interface DifferentiatorGridProps {
  items: Differentiator[];
  title?: string;
  highlightWord?: string;
}

export default function DifferentiatorGrid({ items, title, highlightWord }: DifferentiatorGridProps) {
  const renderTitle = () => {
    if (!title) return null;

    if (highlightWord && title.includes(highlightWord)) {
      const parts = title.split(highlightWord);
      return (
        <h2 className="section-title">
          {parts[0]}
          <span className="highlight">{highlightWord}</span>
          {parts[1]}
        </h2>
      );
    }

    return <h2 className="section-title">{title}</h2>;
  };

  return (
    <>
      <section className="differentiators">
        <div className="container">
          {renderTitle()}

          <div className="grid">
            {items.map((item, index) => (
              <div key={index} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .differentiators {
          background: var(--canvas);
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

        :global(.section-title .highlight) {
          color: var(--brand-coral);
          font-weight: 600;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.2s, transform 0.2s;
        }

        .card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
          color: var(--text);
        }

        .card p {
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .differentiators {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          .section-title {
            font-size: 1.5rem;
            margin: 0 0 2rem 0;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
