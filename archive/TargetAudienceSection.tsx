interface TargetAudienceSectionProps {
  title: string;
  description: string;
}

export default function TargetAudienceSection({ title, description }: TargetAudienceSectionProps) {
  return (
    <>
      <section className="target-audience">
        <div className="container">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </section>

      <style jsx>{`
        .target-audience {
          background: var(--canvas);
          padding: 4rem 0;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: var(--text);
        }

        h2::after {
          content: none;
        }

        p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 768px) {
          .target-audience {
            padding: 3rem 0;
          }

          .container {
            padding: 0 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
