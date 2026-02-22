export default function Footer() {
  return (
    <>
      <footer className="footer">
        <span className="footer-item">
          © 2026 Careira Ltd. Registered in England and Wales with company number 16937993.
        </span>
        <a href="mailto:info@careira.com" className="footer-item email">
          info@careira.com
        </a>
      </footer>

      <style jsx>{`
        .footer {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          background: #33374a;
          color: rgba(255, 255, 255, 0.6);
          border-top: none;
        }

        .footer-item {
          margin: 0;
        }

        .email {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
        }

        .email:hover {
          color: rgba(255, 255, 255, 0.95);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
