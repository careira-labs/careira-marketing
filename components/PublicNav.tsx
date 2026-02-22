import Link from 'next/link';
import { useRouter } from 'next/router';

interface PublicNavProps {
  theme?: 'dark' | 'light';
}

export default function PublicNav({ theme = 'dark' }: PublicNavProps) {
  const router = useRouter();

  const scrollToForm = () => {
    const formEl = document.querySelector('#email-signup');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="logo-link">
            <img
              src={
                theme === 'dark'
                  ? '/assets/LOGO-Careira-bitone-white.png'
                  : '/assets/LOGO-Careira-bitone.png'
              }
              alt="Careira"
              className="logo"
            />
          </Link>

          <div className="nav-links">
            <Link
              href="/jobseekers"
              className="nav-link"
              aria-current={router.pathname === '/jobseekers' ? 'page' : undefined}
            >
              For jobseekers
            </Link>
            <Link
              href="/recruiters"
              className="nav-link"
              aria-current={router.pathname === '/recruiters' ? 'page' : undefined}
            >
              For recruiters
            </Link>
            <button onClick={scrollToForm} className="nav-link nav-button">
              {router.pathname === '/recruiters' ? 'Request early access' : 'Join waitlist'}
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${theme === 'dark' ? 'var(--brand-navy)' : 'var(--surface)'};
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'var(--border)'};
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-link {
          display: flex;
          align-items: center;
        }

        .logo {
          height: 32px;
          width: auto;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'var(--text)'};
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: opacity 0.15s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font);
        }

        .nav-link:hover {
          opacity: ${theme === 'dark' ? '1' : '0.7'};
          color: ${theme === 'dark' ? 'white' : 'var(--brand-coral)'};
        }

        :global(a.nav-link[aria-current='page']) {
          color: ${theme === 'dark' ? 'white' : 'var(--brand-coral)'};
          opacity: 1;
          border-bottom: 2px solid var(--brand-coral);
          padding-bottom: 2px;
        }

        .nav-button {
          padding: 0.5rem 1rem;
          background: var(--brand-coral);
          color: white;
          border-radius: var(--radius-sm);
          opacity: 1;
        }

        .nav-button:hover {
          background: var(--brand-coral-hover);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .nav-container {
            height: 56px;
            padding: 0 1rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-link {
            font-size: 0.875rem;
          }

          .nav-button {
            padding: 0.4rem 0.8rem;
          }
        }

        @media (max-width: 640px) {
          .nav-link:not(.nav-button) {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
