import Link from 'next/link';

interface AudienceCard {
  slug: string;
  label: string;
  subtitle: string;
  description: string;
}

interface AudienceRoutingSectionProps {
  headline: string;
  cards: AudienceCard[];
}

export default function AudienceRoutingSection({ headline, cards }: AudienceRoutingSectionProps) {
  return (
    <section className="audience-routing">
      <div className="container">
        <h2>{headline}</h2>
        <div className="cards">
          {cards.map((card) => (
            <Link key={card.slug} href={`/${card.slug}`} className="card-link">
              <div className="card">
                <h3>{card.label}</h3>
                <p className="subtitle">{card.subtitle}</p>
                <p className="description">{card.description}</p>
                <span className="card-cta">Learn more <span className="card-cta-arrow">&rarr;</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .audience-routing {
          background: #F2F4F6;
          padding: 6rem 0;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #33374A;
          text-align: center;
          margin: 0 0 3rem;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        :global(a.card-link) {
          text-decoration: none;
          color: inherit;
        }

        .card {
          background: #FFFFFF;
          border-radius: 12px;
          padding: 2.5rem 2rem;
          border-left: 3px solid #FF7A6F;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.05);
        }

        h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #33374A;
          margin: 0 0 0.25rem;
        }

        .subtitle {
          font-size: 0.8125rem;
          color: #667085;
          margin: 0 0 1.25rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .description {
          font-size: 1.05rem;
          color: #4C526A;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }

        .card-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          margin-top: 1.5rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #FF7A6F;
        }

        .card-cta-arrow {
          display: inline-block;
          transition: transform 0.15s ease;
        }

        .card:hover .card-cta-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .audience-routing {
            padding: 3.5rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
            margin: 0 0 2rem;
          }

          .cards {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .card {
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
