import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductScreenshotProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ProductScreenshot({ src, alt, priority = false }: ProductScreenshotProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  const handleClick = () => {
    setIsZoomed(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
  };

  return (
    <>
      <div className="screenshot-wrapper" onClick={handleClick}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="zoom-overlay">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>

      {isZoomed && (
        <div className="lightbox" onClick={handleClose}>
          <button className="close-btn" onClick={handleClose} aria-label="Close">
            ×
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .screenshot-wrapper {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: var(--radius);
          transition: transform 0.2s;
        }

        .screenshot-wrapper:hover {
          transform: scale(1.02);
        }

        .screenshot-wrapper:hover .zoom-overlay {
          opacity: 1;
        }

        .zoom-overlay {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }

        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.2s ease-out;
          cursor: zoom-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .lightbox-content {
          max-width: 95vw;
          max-height: 90vh;
          width: auto;
          height: auto;
          animation: zoomIn 0.3s ease-out;
          cursor: default;
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .close-btn {
          position: fixed;
          top: 1rem;
          right: 1rem;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          color: white;
          font-size: 2rem;
          line-height: 1;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .lightbox {
            padding: 1rem;
          }

          .close-btn {
            width: 40px;
            height: 40px;
            top: 0.5rem;
            right: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
