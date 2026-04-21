interface ProblemSectionProps {
  title: string;
  problems: string[];
}

export default function ProblemSection({ title, problems }: ProblemSectionProps) {
  return (
    <>
      <section className="problem-section">
        <div className="container">
          <h2>{title}</h2>
          <ul className="problems-list">
            {problems.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>
        </div>
      </section>

      <style jsx>{`
        .problem-section {
          background: var(--surface);
          padding: 4rem 0;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: var(--text);
          text-align: center;
        }

        .problems-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem 3rem;
        }

        .problems-list li {
          padding-left: 1.75rem;
          position: relative;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .problems-list li::before {
          content: '×';
          position: absolute;
          left: 0;
          top: 0.15rem;
          color: var(--error);
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .problem-section {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .problems-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}
