import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PublicNavProps {
  theme?: 'dark' | 'light';
}

export default function PublicNav({ theme = 'dark' }: PublicNavProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);


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

          {/* Desktop nav links */}
          <div className="nav-links desktop-links">
            <Link
              href="/jobseekers"
              className="nav-link"
              aria-current={router.pathname === '/jobseekers' ? 'page' : undefined}
            >
              For jobseekers
            </Link>
            <Link
              href="/hirers"
              className="nav-link"
              aria-current={router.pathname === '/hirers' ? 'page' : undefined}
            >
              For hirers
            </Link>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className="burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`burger-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Mobile slide-down menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link
              href="/jobseekers"
              className="mobile-link"
              aria-current={router.pathname === '/jobseekers' ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              For jobseekers
            </Link>
            <Link
              href="/hirers"
              className="mobile-link"
              aria-current={router.pathname === '/hirers' ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              For hirers
            </Link>
          </div>
        )}
      </nav>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${theme === 'dark' ? '#33374A' : '#FFFFFF'};
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB'};
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

        /* Desktop nav links */
        .desktop-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#33374A'};
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
          color: ${theme === 'dark' ? 'white' : '#FF7A6F'};
        }

        :global(a.nav-link[aria-current='page']) {
          color: ${theme === 'dark' ? 'white' : '#FF7A6F'};
          opacity: 1;
          border-bottom: 2px solid #FF7A6F;
          padding-bottom: 2px;
        }

        /* Hamburger button - hidden on desktop */
        .burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 101;
        }

        .burger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: ${theme === 'dark' ? 'white' : '#33374A'};
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
        }

        .burger-line.open:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .burger-line.open:nth-child(2) {
          opacity: 0;
        }

        .burger-line.open:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile menu - hidden on desktop */
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 0.5rem 2rem 1.5rem;
          background: ${theme === 'dark' ? '#33374A' : '#FFFFFF'};
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB'};
        }

        .mobile-link {
          display: block;
          padding: 0.875rem 0;
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#33374A'};
          text-decoration: none;
          font-size: 1.0625rem;
          font-weight: 500;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font);
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#F2F4F6'};
        }

        :global(a.mobile-link[aria-current='page']) {
          color: #FF7A6F;
        }

        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 99;
        }

        @media (max-width: 768px) and (orientation: portrait), (max-width: 480px) {
          .nav-container {
            height: 56px;
            padding: 0 1rem;
          }

          /* Hide desktop links, show burger */
          .desktop-links {
            display: none;
          }

          .burger {
            display: flex;
          }

          .mobile-menu {
            display: flex;
            padding: 0.5rem 1rem 1.5rem;
          }

          .overlay {
            display: block;
          }
        }

        /* Landscape phones: tighter spacing for inline nav */
        @media (max-width: 768px) and (orientation: landscape) {
          .nav-container {
            height: 48px;
            padding: 0 1rem;
          }

          .desktop-links {
            gap: 1.25rem;
          }

          .nav-link {
            font-size: 0.875rem;
          }


        }
      `}</style>
    </>
  );
}
