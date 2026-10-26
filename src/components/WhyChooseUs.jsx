import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HeartHandshake, 
  CheckCircle2, 
  Smile, 
  ArrowRight 
} from 'lucide-react';
import consultationImg from '../assets/why-choose-consultation.webp';

export default function WhyChooseUs() {
  const [imgError, setImgError] = useState(false);

  return (
    <section 
      aria-labelledby="why-choose-heading"
      className="w-full bg-[#F7FAFC] border-b border-[#E4EBF0] py-16 lg:py-[100px] overflow-hidden"
    >
      <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
        
        {/* Two Columns Grid: Left 48% Image, Right 52% Copy with 72px Gap on Desktop */}
        {/* On mobile: single column, image appears first, then copy */}
        <div className="grid grid-cols-1 lg:grid-cols-[48fr_52fr] gap-10 lg:gap-[72px] items-center w-full min-w-0">
          
          {/* LEFT COLUMN: Image with floating callout (Mobile: top) */}
          <div className="relative w-full max-w-[460px] lg:max-w-none mx-auto min-w-0">
            
            {/* Image frame container with rounded 24px and large portrait shape */}
            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(16,42,69,0.08)] border border-[#E4EBF0] bg-white">
              {!imgError ? (
                <img
                  src={consultationImg}
                  alt="SmileCare dentist consulting warmly with patient about treatment guidance"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Accessible graceful fallback if photo fails to load */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-[#E8F8F5] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-4 shadow-xs">
                    <ShieldCheck className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Thoughtful, Human Dentistry
                  </h3>
                  <p className="text-xs text-[#526477] mt-1 max-w-[220px]">
                    Personalized consultations focused on patient communication and gentle comfort.
                  </p>
                </div>
              )}

              {/* Floating White Callout staying completely inside image bounds */}
              <div 
                className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 max-w-[calc(100%-24px)] sm:max-w-[270px] bg-white/95 backdrop-blur-md border border-[#E4EBF0] rounded-[18px] p-3.5 sm:p-4 shadow-[0_12px_28px_rgba(7,29,49,0.12)] flex items-center gap-3 transition-transform hover:scale-[1.02] duration-200"
              >
                <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-[#102A43] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                    Care You Can Feel
                  </p>
                  <p className="text-[11px] text-[#526477] truncate">
                    Every Visit Matters
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Copy & Feature Rows */}
          <div className="flex flex-col items-start justify-center space-y-6 lg:space-y-7 w-full max-w-[560px] min-w-0">
            
            {/* Eyebrow Label */}
            <div>
              <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
                WHY CHOOSE SMILECARE
              </span>

              {/* Main Heading h2 */}
              <h2 
                id="why-choose-heading"
                className="text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.18] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
              >
                Modern Dentistry With a Human Touch
              </h2>
            </div>

            {/* Section Body */}
            <p className="text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#526477]">
              We believe that great dental care begins with understanding your needs. Our approach focuses on communication, comfort, and personalized attention.
            </p>

            {/* Three Feature Rows */}
            <div className="space-y-4 sm:space-y-5 w-full pt-1">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-2 sm:p-2.5 rounded-[16px] transition-colors">
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <HeartHandshake className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Patient-First Approach
                  </h3>
                  <p className="text-sm text-[#526477] mt-1 leading-relaxed">
                    We take time to listen to your needs and concerns.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-2 sm:p-2.5 rounded-[16px] transition-colors">
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Clear Treatment Guidance
                  </h3>
                  <p className="text-sm text-[#526477] mt-1 leading-relaxed">
                    Understand your care options before making decisions.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-2 sm:p-2.5 rounded-[16px] transition-colors">
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Smile className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Comfortable Environment
                  </h3>
                  <p className="text-sm text-[#526477] mt-1 leading-relaxed">
                    A welcoming setting for every visit.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button: Learn More About Us -> /about */}
            <div className="pt-2 w-full sm:w-auto">
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
