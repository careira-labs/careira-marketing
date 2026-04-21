import { ReactNode } from 'react';

interface OutcomeItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface OutcomesSectionProps {
  headline: string;
  items: OutcomeItem[];
}

export default function OutcomesSection({ headline, items }: OutcomesSectionProps) {
  return (
    <section className="outcomes">
      <div className="container">
        <h2>{headline}</h2>
        <div className="items">
          {items.map((item, i) => (
            <div key={i} className="item">
              <div className="item-header">
                {item.icon && <div className="icon">{item.icon}</div>}
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .outcomes {
          background: #FFFFFF;
          padding: 6rem 0;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          text-align: center;
          margin: 0 0 3.5rem;
        }

        .items {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          column-gap: 4rem;
          row-gap: 3rem;
        }

        .item {
          max-width: 400px;
          border-left: 2px solid #FF7A6F;
          padding-left: 1rem;
        }

        .item-header {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 0.5rem;
        }

        .icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #33374A;
          margin: 0;
        }

        p {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #667085;
          margin: 0;
        }

        @media (max-width: 768px) {
          .outcomes {
            padding: 3.5rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
            margin: 0 0 2.5rem;
          }

          .items {
            grid-template-columns: 1fr;
            row-gap: 2rem;
          }

        }
      `}</style>
    </section>
  );
}
