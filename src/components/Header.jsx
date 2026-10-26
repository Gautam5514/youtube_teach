import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { Sparkles, Menu, X, Calendar, Phone, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO, NAV_LINKS, CTA_APPOINTMENT } from '../data/clinicData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const closeMobileMenu = () => { setMobileMenuOpen(false); menuButtonRef.current?.focus(); };


  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    desktop.addEventListener('change', handleResize);
    return () => desktop.removeEventListener('change', handleResize);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        const links = mobileMenuRef.current?.querySelectorAll('a');
        const last = links?.[links.length - 1];
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); menuButtonRef.current?.focus(); }
        if (e.shiftKey && document.activeElement === menuButtonRef.current) { e.preventDefault(); last?.focus(); }
      }
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.getElementById('main-content')?.setAttribute('inert', '');
      document.querySelector('footer')?.setAttribute('inert', '');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.getElementById('main-content')?.removeAttribute('inert');
      document.querySelector('footer')?.removeAttribute('inert');
    }

    return () => {
      document.body.style.overflow = '';
      document.getElementById('main-content')?.removeAttribute('inert');
      document.querySelector('footer')?.removeAttribute('inert');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full max-w-full bg-white/95 backdrop-blur-md border-b border-[#E4EBF0] shadow-[0_2px_8px_rgba(16,42,69,0.04)]">
      {/* Top Demo Notice Bar */}
      <div 
        role="region" 
        aria-label="Demo site advisory"
        className="bg-[#071D31] text-[#E8F8F5] text-xs py-1.5 px-3 sm:px-4 font-medium tracking-wide border-b border-navy/20 w-full overflow-hidden"
      >
        <div className="app-container w-full flex items-center justify-between text-xs min-w-0">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0d8277] text-white uppercase tracking-wider flex-shrink-0">
              DEMO
            </span>
            <span className="truncate text-[11px] sm:text-xs">
              AI-built healthcare project · Fictional clinic
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#8295A9] flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#0d8277]" aria-hidden="true" />
              <span>Demo line: {CLINIC_INFO.phone}</span>
            </span>
          </div>
        </div>
      </div>


      {/* Main Header Container */}
      <div className="app-container">
        <div className="flex items-center justify-between h-[72px] lg:h-20">
          {/* Brand Logo: Textual tooth logo + SmileCare */}
          <Link
            to="/"
            className="flex items-center gap-3 group rounded-lg focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:outline-none p-1"
            aria-label={`${CLINIC_INFO.name} - Home`}
          >
            {/* Custom geometric tooth icon SVG mark */}
            <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F5] border border-[#13B8A6]/20 flex items-center justify-center text-[#0d8277] group-hover:bg-[#0d8277] group-hover:text-white transition-colors duration-200 shadow-sm flex-shrink-0">
              <svg 
                className="w-5 h-5 fill-current" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path d="M12 2C7.58 2 4 5.58 4 10c0 3.31 1.69 6.22 4.25 7.85.45.29.75.76.75 1.3V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-4.5c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.85c0-.54.3-1.01.75-1.3C18.31 16.22 20 13.31 20 10c0-4.42-3.58-8-8-8zm-2 10c-.83 0-1.5-.67-1.5-1.5S9.17 9 10 9s1.5.67 1.5 1.5S10.83 12 10 12zm4 0c-.83 0-1.5-.67-1.5-1.5S13.17 9 14 9s1.5.67 1.5 1.5S14.83 12 14 12z" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl tracking-tight text-[#102A43] group-hover:text-[#0d8277] transition-colors leading-tight">
                SmileCare
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-[#526477] uppercase">
                Dental Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center gap-1 lg:gap-2" 
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 relative min-h-[44px] flex items-center ${
                    isActive
                      ? 'text-[#0d8277] font-bold bg-[#E8F8F5]'
                      : 'text-[#526477] hover:text-[#102A43] hover:bg-[#F7FAFC]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span 
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0d8277] rounded-full" 
                        aria-hidden="true" 
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA: Book Appointment */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={CTA_APPOINTMENT.path}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{CTA_APPOINTMENT.label}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[12px] border border-[#E4EBF0] text-[#102A43] hover:bg-[#F7FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] transition-colors"
            aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#102A43]" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-[#102A43]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown attached directly beneath header */}
      {mobileMenuOpen && (
        <>
          {/* Dimmed backdrop covering full viewport behind dropdown */}
          {createPortal(
            <div
              className="fixed inset-0 bg-[#071D31]/35 z-40 lg:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />,
            document.body
          )}

          {/* Dropdown menu container attached directly to header with zero gap */}
          <div 
            id="mobile-navigation-drawer"
            ref={mobileMenuRef}
            aria-label="Mobile navigation menu"
            className="mobile-navigation absolute top-full inset-x-0 z-50 lg:hidden bg-white border-t border-[#E4EBF0] shadow-[0_20px_40px_rgba(7,29,49,0.14)] p-4 rounded-b-[24px] max-h-[calc(100dvh-110px)] overflow-y-auto overscroll-contain"
          >
            {/* Demo reminder in mobile drawer */}
            <div className="mb-3 px-3 py-2.5 rounded-[10px] bg-[#E8F8F5] border border-[#13B8A6]/30 flex items-center gap-2.5 text-xs text-[#102A43]">
              <Sparkles className="w-4 h-4 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
              <span>SmileCare · Portfolio demo</span>
            </div>

            <nav className="flex flex-col gap-1" aria-label="Mobile links">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-[12px] text-[15px] font-semibold min-h-[48px] transition-colors ${
                      isActive
                        ? 'bg-[#E8F8F5] text-[#0d8277]'
                        : 'text-[#102A43] hover:bg-[#F7FAFC]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d8277]" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-[#8295A9]" aria-hidden="true" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 pt-3 border-t border-[#E4EBF0] flex flex-col gap-3">
              <Link
                to={CTA_APPOINTMENT.path}
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-[15px] shadow-sm min-h-[48px]"
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                <span>{CTA_APPOINTMENT.label}</span>
              </Link>

              <div className="text-center text-xs text-[#526477] mt-1">
                Demo Line: <span className="font-medium text-[#102A43]">{CLINIC_INFO.phone}</span>
              </div>
            </div>
          </div>
        </>
      )}

    </header>
  );
}
