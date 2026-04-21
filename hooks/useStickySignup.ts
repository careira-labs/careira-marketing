import { useState, useEffect, useRef } from 'react';

export function useStickySignup() {
  const [showStickyForm, setShowStickyForm] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [bottomFormVisible, setBottomFormVisible] = useState(false);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('reset') && localStorage.getItem('careira_waitlist')) {
      setAlreadySignedUp(true);
    }

    const handleScroll = () => {
      const heroHeight = 600;
      setShowStickyForm(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => setBottomFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (bottomCtaRef.current) observer.observe(bottomCtaRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    const formEl = document.querySelector('#email-signup');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return { showStickyForm, alreadySignedUp, bottomFormVisible, bottomCtaRef, scrollToForm };
}
