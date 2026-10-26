import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, ShieldCheck, Smile } from 'lucide-react';
import heroPatientImg from '../assets/hero-patient.webp';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section 
      aria-label="Welcome and hero overview"
      className="w-full max-w-full bg-[#F7FAFC] border-b border-[#E4EBF0] min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden py-8 sm:py-12 lg:py-16"
    >
      <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
        {/* Responsive Grid: single column on mobile, 54% / 46% on desktop with 60px visual gap */}
        <div className="grid grid-cols-1 lg:grid-cols-[54fr_46fr] gap-8 sm:gap-10 lg:gap-[60px] items-center w-full min-w-0">
          
          {/* LEFT COLUMN: text first on mobile */}
          <div className="hero-fade-in flex flex-col items-start justify-center text-left space-y-5 sm:space-y-6 w-full max-w-[620px] min-w-0">
            
            {/* Pale-teal pill label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full bg-[#E8F8F5] text-[#0d8277] text-xs font-bold uppercase tracking-wider border border-[#13B8A6]/20 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0d8277]" aria-hidden="true" />
              <span>YOUR SMILE, OUR PRIORITY</span>
            </div>

            {/* Main h1 heading exactly two lines */}
            <h1 className="text-[clamp(2rem,8.5vw,2.75rem)] sm:text-[46px] lg:text-[64px] leading-[1.1] font-extrabold tracking-[-0.035em] text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
              Healthy Smiles.<br />
              <span className="text-[#0d8277]">Confident Lives.</span>
            </h1>

            {/* Body copy */}
            <p className="text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#526477] max-w-[520px]">
              Experience gentle, modern dental care designed around your comfort. From routine checkups to smile transformations, we’re here for every step of your journey.
            </p>

            {/* CTA row: stacked full width on mobile, inline row on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-[15px] shadow-sm hover:shadow-md transition-all duration-200 min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-white hover:bg-[#E8F8F5]/50 text-[#102A43] hover:text-[#0d8277] font-semibold text-[15px] border border-[#E4EBF0] hover:border-[#13B8A6]/30 transition-all duration-200 min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

            {/* Three compact icon-and-label practice principles */}
            <div 
              aria-label="Practice core principles"
              className="pt-4 border-t border-[#E4EBF0] w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-semibold text-[#102A43]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E8F8F5] flex items-center justify-center text-[#0d8277] flex-shrink-0">
                  <HeartHandshake className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>Personalized Care</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E8F8F5] flex items-center justify-center text-[#0d8277] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>Modern Technology</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E8F8F5] flex items-center justify-center text-[#0d8277] flex-shrink-0">
                  <Smile className="w-4 h-4" aria-hidden="true" />
                </div>
                <span>Comfort-First Approach</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: image container */}
          <div className="hero-fade-in-delayed relative flex items-center justify-center lg:justify-end w-full min-w-0 pt-2 sm:pt-4 lg:pt-0">
            
            {/* Wrapper to contain both decorative ellipse and photo card within same bounds */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] mx-auto lg:mr-0">
              
              {/* Subtle decorative pale-teal ellipse BEHIND photo only */}
              <div 
                className="absolute inset-0 sm:-inset-3 lg:-inset-5 bg-[#E8F8F5] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] pointer-events-none z-0 transform -rotate-1"
                aria-hidden="true"
              />

              {/* Photo frame container ~4:5 portrait crop with rounded 28px */}
              <div className="relative z-10 w-full aspect-[4/5] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(16,42,69,0.08)] border border-[#E4EBF0] bg-white">
                {!imgError ? (
                  <img
                    src={heroPatientImg}
                    alt="Illustrative photograph of a smiling visitor in a dental setting"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Accessible graceful fallback if photo fails to load */
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#E8F8F5] to-white text-center">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0d8277] mb-4">
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C7.58 2 4 5.58 4 10c0 3.31 1.69 6.22 4.25 7.85.45.29.75.76.75 1.3V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-4.5c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.85c0-.54.3-1.01.75-1.3C18.31 16.22 20 13.31 20 10c0-4.42-3.58-8-8-8zm-2 10c-.83 0-1.5-.67-1.5-1.5S9.17 9 10 9s1.5.67 1.5 1.5S10.83 12 10 12zm4 0c-.83 0-1.5-.67-1.5-1.5S13.17 9 14 9s1.5.67 1.5 1.5S14.83 12 14 12z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                      SmileCare Dental Studio
                    </h3>
                    <p className="text-xs text-[#526477] mt-1 max-w-[220px]">
                      Gentle, contemporary clinical dentistry designed for patient comfort.
                    </p>
                  </div>
                )}

                {/* Floating white card at image bottom-left */}
                <div 
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 max-w-[calc(100%-24px)] sm:max-w-[260px] bg-white/95 backdrop-blur-md border border-[#E4EBF0] rounded-[16px] sm:rounded-[20px] p-2.5 sm:p-3.5 shadow-[0_10px_25px_rgba(7,29,49,0.14)] flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.02] duration-200"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C7.58 2 4 5.58 4 10c0 3.31 1.69 6.22 4.25 7.85.45.29.75.76.75 1.3V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-4.5c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.85c0-.54.3-1.01.75-1.3C18.31 16.22 20 13.31 20 10c0-4.42-3.58-8-8-8zm-2 10c-.83 0-1.5-.67-1.5-1.5S9.17 9 10 9s1.5.67 1.5 1.5S10.83 12 10 12zm4 0c-.83 0-1.5-.67-1.5-1.5S13.17 9 14 9s1.5.67 1.5 1.5S14.83 12 14 12z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#102A43] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                      Gentle Dental Care
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-[#526477] truncate">
                      Made for Your Comfort
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
