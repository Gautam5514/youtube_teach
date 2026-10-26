import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PAGE_METADATA = {
  '/': {
    title: 'SmileCare Dental Studio | Modern Dental Care',
    description: 'Experience gentle, modern dental care designed around your comfort. Routine checkups, smile transformations, and personalized dental consultations.',
  },
  '/about': {
    title: 'About Us | SmileCare Dental Studio',
    description: 'Learn about our patient-first approach to modern dentistry, our core clinic values, and our comfortable consultation philosophy.',
  },
  '/services': {
    title: 'Our Services | SmileCare Dental Studio',
    description: 'Explore comprehensive dental services including General Dentistry, Teeth Whitening, Implants, Orthodontics, Root Canal Care, and Pediatric Dentistry.',
  },
  '/doctors': {
    title: 'Our Doctors | SmileCare Dental Studio',
    description: 'Meet the illustrative care team at SmileCare Dental Studio. Dedicated professionals focused on clear communication and preventive dental wellness.',
  },
  '/appointment': {
    title: 'Book an Appointment | SmileCare Dental Studio',
    description: 'Request a dental consultation inquiry with SmileCare Dental Studio. Select your preferred service, date, and time window.',
  },
  '/project': { title: 'AI Project Walkthrough | SmileCare Dental Studio', description: 'Inspect the SmileCare AI development process, prompt documentation, reviewer guide, and working inquiry demo.' },
  '/contact': {
    title: 'Contact Us | SmileCare Dental Studio',
    description: 'Get in touch with the SmileCare Dental Studio team. Send us your inquiry, view our hours, or request a consultation.',
  },
};

// Helper component to scroll to top and update document metadata on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    const timer = hash ? setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' }), 150) : null;

    const meta = PAGE_METADATA[pathname] || {
      title: 'SmileCare Dental Studio | Modern Dental Care',
      description: 'Experience gentle, modern dental care designed around your comfort.',
    };

    document.title = meta.title;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) {
      metaTag.setAttribute('content', meta.description);
    }
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-[#526477] w-full max-w-full">
      {/* Skip to Main Content Link for Screen Readers and Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0d8277] text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#102A43]"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <Header />
      
      <main id="main-content" tabIndex={-1} className="flex-grow flex flex-col focus:outline-none w-full max-w-full">
        <Outlet />
      </main>


      <Footer />
    </div>
  );
}
