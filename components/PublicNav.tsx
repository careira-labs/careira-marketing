import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PublicNavProps {
  theme?: 'dark' | 'light';
}

const SEGMENT_PAGES = ['/starting-out', '/starting-again', '/stepping-up'];
const JOBSEEKER_PATHS = ['/jobseekers', ...SEGMENT_PAGES];

const SEGMENTS = [
  { href: '/starting-out', label: 'Starting out', subtitle: 'Early career & graduates' },
  { href: '/starting-again', label: 'Starting again', subtitle: 'Returning to the market' },
  { href: '/stepping-up', label: 'Stepping up', subtitle: 'Experienced professionals' },
];

export default function PublicNav({ theme = 'dark' }: PublicNavProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isJobseekerActive = JOBSEEKER_PATHS.includes(router.pathname);

  // Track scroll for backdrop blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
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

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  // Keyboard handling for dropdown
  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setDropdownOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  }, []);

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false);
      triggerRef.current?.querySelector<HTMLElement>('.nav-link')?.focus();
    }
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
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
            <div
              className="dropdown-trigger"
              ref={triggerRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/jobseekers"
                className={`nav-link ${isJobseekerActive ? 'active' : ''}`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onKeyDown={handleTriggerKeyDown}
              >
                For jobseekers
              </Link>

              {dropdownOpen && (
                <div
                  className="dropdown"
                  ref={dropdownRef}
                  role="menu"
                  onKeyDown={handleDropdownKeyDown}
                >
                  {SEGMENTS.map((seg) => (
                    <Link
                      key={seg.href}
                      href={seg.href}
                      className="dropdown-item"
                      role="menuitem"
                    >
                      <span className="dropdown-label">{seg.label}</span>
                      <span className="dropdown-subtitle">{seg.subtitle}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/hirers"
              className={`nav-link ${router.pathname === '/hirers' ? 'active' : ''}`}
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
              className={`mobile-link ${router.pathname === '/jobseekers' ? 'mobile-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              For jobseekers
            </Link>
            {SEGMENTS.map((seg) => (
              <Link
                key={seg.href}
                href={seg.href}
                className={`mobile-sub-link ${router.pathname === seg.href ? 'mobile-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-sub-label">{seg.label}</span>
                <span className="mobile-sub-subtitle">{seg.subtitle}</span>
              </Link>
            ))}
            <Link
              href="/hirers"
              className={`mobile-link ${router.pathname === '/hirers' ? 'mobile-active' : ''}`}
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
          transition: background 0.2s, backdrop-filter 0.2s;
        }

        .nav-scrolled {
          background: ${theme === 'dark' ? 'rgba(51, 55, 74, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
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

        :global(.nav-link) {
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#33374A'};
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: opacity 0.15s, color 0.15s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font);
          padding: 0;
        }

        :global(.nav-link:hover) {
          color: ${theme === 'dark' ? 'white' : '#FF7A6F'};
        }

        :global(.nav-link.active) {
          color: ${theme === 'dark' ? 'white' : '#FF7A6F'};
          border-bottom: 2px solid #FF7A6F;
          padding-bottom: 2px;
        }

        /* Dropdown */
        .dropdown-trigger {
          position: relative;
        }

        :global(.dropdown) {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 12px;
          background: #FFFFFF;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
          padding: 0.5rem;
          min-width: 260px;
          z-index: 101;
        }

        :global(.dropdown::before) {
          content: '';
          position: absolute;
          top: -12px;
          left: 0;
          right: 0;
          height: 12px;
        }

        :global(a.dropdown-item) {
          display: flex;
          flex-direction: column;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.12s;
        }

        :global(a.dropdown-item:hover) {
          background: #F2F4F6;
        }

        :global(.dropdown-label) {
          font-size: 0.875rem;
          font-weight: 600;
          color: #33374A;
        }

        :global(.dropdown-subtitle) {
          font-size: 0.75rem;
          color: #667085;
          margin-top: 0.125rem;
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

        /* Mobile menu */
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 0.5rem 2rem 1.5rem;
          background: ${theme === 'dark' ? '#33374A' : '#FFFFFF'};
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB'};
        }

        :global(a.mobile-link) {
          display: block;
          padding: 0.875rem 0;
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#33374A'};
          text-decoration: none;
          font-size: 1.0625rem;
          font-weight: 500;
          font-family: var(--font);
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#F2F4F6'};
        }

        :global(a.mobile-link.mobile-active) {
          color: #FF7A6F;
        }

        :global(a.mobile-sub-link) {
          display: flex;
          flex-direction: column;
          padding: 0.625rem 0 0.625rem 1.25rem;
          text-decoration: none;
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#F2F4F6'};
        }

        :global(a.mobile-sub-link.mobile-active) .mobile-sub-label {
          color: #FF7A6F;
        }

        :global(.mobile-sub-label) {
          font-size: 0.9375rem;
          font-weight: 500;
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : '#4C526A'};
        }

        :global(.mobile-sub-subtitle) {
          font-size: 0.75rem;
          color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#667085'};
          margin-top: 0.125rem;
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

        /* Landscape phones */
        @media (max-width: 768px) and (orientation: landscape) {
          .nav-container {
            height: 48px;
            padding: 0 1rem;
          }

          .desktop-links {
            gap: 1.25rem;
          }

          :global(.nav-link) {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
}
