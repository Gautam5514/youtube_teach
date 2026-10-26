import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  Mail, 
  ShieldAlert, 
  Building2 
} from 'lucide-react';

import clinicInteriorImg from '../assets/clinic-interior.webp';

export default function AboutPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-grow flex flex-col justify-start">
      
      {/* SECTION 1: HERO */}
      <section 
        aria-label="About Us overview"
        className="w-full bg-[#E8F8F5] border-b border-[#E4EBF0] py-12 sm:py-16 lg:py-20 flex items-center justify-center text-center"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Breadcrumb: Home / About Us */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-[#526477] mb-4">
            <Link to="/" className="hover:text-[#102A43] font-medium transition-colors">
              Home
            </Link>
            <span className="text-[#8295A9]">/</span>
            <span className="text-[#0d8277] font-semibold">About Us</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5 shadow-2xs">
            GET TO KNOW US
          </span>

          {/* Heading h1 */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Care That Puts People First
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Discover our patient-focused philosophy and approach to modern dental care.
          </p>

        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section 
        aria-labelledby="our-story-heading"
        className="w-full bg-white border-b border-[#E4EBF0] py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left: Clinic Photo with rounded 24px */}
            <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto min-w-0">
              <div className="relative z-10 w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(16,42,69,0.08)] border border-[#E4EBF0] bg-[#F7FAFC]">
                {!imgError ? (
                  <img
                    src={clinicInteriorImg}
                    alt="SmileCare Dental Studio calm and welcoming reception lounge"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#E8F8F5] to-white text-center">
                    <div className="w-14 h-14 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-3">
                      <Building2 className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                      SmileCare Dental Studio
                    </p>
                    <p className="text-xs text-[#526477] mt-1">
                      Modern clinical studio with a focus on serene comfort.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Story Copy */}
            <div className="flex flex-col items-start justify-center space-y-5 lg:space-y-6 max-w-[560px]">
              <div>
                <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3">
                  OUR STORY
                </span>
                <h2 
                  id="our-story-heading"
                  className="text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.2] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
                >
                  A More Comfortable Approach to Dentistry
                </h2>
              </div>

              {/* Paragraph 1 */}
              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#526477]">
                SmileCare Dental Studio was designed around a straightforward philosophy: dental visits should feel calm, transparent, and collaborative. We understand that medical environments can sometimes create anxiety, which is why our studio emphasizes unhurried listening, gentle pacing, and genuine empathy from the moment you step through our doors.
              </p>

              {/* Paragraph 2 */}
              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#526477]">
                Rather than rushing through procedural steps, we dedicate time to explain each stage in plain language and discuss options openly. By pairing thoughtful communication with comfortable clinical surroundings, we help you make informed decisions about your oral wellness with confidence and peace of mind.
              </p>

              {/* Demo transparency note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[#8295A9]">
                <ShieldAlert className="w-4 h-4 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
                <span>Simulated clinic portfolio concept — educational demo only</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: VALUES */}
      <section 
        aria-labelledby="values-heading"
        className="w-full bg-[#F7FAFC] border-b border-[#E4EBF0] py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
              OUR GUIDING VALUES
            </span>
            <h2 
              id="values-heading"
              className="text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.15] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
            >
              What Matters Most to Us
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
              Three fundamental commitments that shape our patient care every single day.
            </p>
          </div>

          {/* 3 Value Cards: 20px radii, 24px gaps, equal heights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* Value 1: Compassionate Care */}
            <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 flex flex-col justify-between h-full shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.06)] hover:-translate-y-1 hover:border-[#13B8A6]/30 transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-6 flex-shrink-0 shadow-2xs">
                  <HeartHandshake className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                  Compassionate Care
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#526477]">
                  Every visit is paced to your comfort. We listen carefully to your sensitivities and respect your personal comfort boundaries at every stage.
                </p>
              </div>
            </div>

            {/* Value 2: Clear Communication */}
            <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 flex flex-col justify-between h-full shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.06)] hover:-translate-y-1 hover:border-[#13B8A6]/30 transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-6 flex-shrink-0 shadow-2xs">
                  <MessageSquare className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                  Clear Communication
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#526477]">
                  We discuss treatment options in straightforward, everyday terms with complete pricing transparency so you always remain in full control.
                </p>
              </div>
            </div>

            {/* Value 3: Modern Thinking */}
            <div className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 flex flex-col justify-between h-full shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.06)] hover:-translate-y-1 hover:border-[#13B8A6]/30 transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-6 flex-shrink-0 shadow-2xs">
                  <Sparkles className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                  Modern Thinking
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#526477]">
                  We incorporate thoughtful digital imaging, ergonomic clinical setups, and modern practices designed to make routine visits efficient and gentle.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section 
        aria-labelledby="process-heading"
        className="w-full bg-white border-b border-[#E4EBF0] py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
              OUR PATIENT JOURNEY
            </span>
            <h2 
              id="process-heading"
              className="text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.15] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
            >
              Your Care, Step by Step
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
              A collaborative, three-stage workflow centered on communication and mutual understanding.
            </p>
          </div>

          {/* 3 Numbered Steps: Horizontal on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-[#F7FAFC] border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 relative flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0d8277] font-mono tracking-tight mb-4 block">
                  01
                </span>
                <h3 className="text-[19px] sm:text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                  Listen & Understand
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#526477]">
                  We start with a relaxed conversation about your dental priorities, past experiences, and questions before performing any gentle clinical examination.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F7FAFC] border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 relative flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0d8277] font-mono tracking-tight mb-4 block">
                  02
                </span>
                <h3 className="text-[19px] sm:text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                  Explain Your Options
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#526477]">
                  We review our findings together, explaining different paths clearly and without pressure so you understand all viable avenues.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F7FAFC] border border-[#E4EBF0] rounded-[20px] p-7 sm:p-8 relative flex flex-col justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0d8277] font-mono tracking-tight mb-4 block">
                  03
                </span>
                <h3 className="text-[19px] sm:text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                  Plan Your Care
                </h3>
                <p className="text-[15px] leading-[1.65] text-[#526477]">
                  We co-create a personalized care plan that suits your schedule, timeline, and comfort preferences, ensuring full clarity at every visit.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section 
        aria-labelledby="about-cta-heading"
        className="w-full bg-[#F7FAFC] py-16 lg:py-24 overflow-hidden"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Dark Navy Rounded Inset Panel (28px radius) */}
          <div className="relative bg-[#071D31] text-white rounded-[28px] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(7,29,49,0.2)] border border-[#102A43]">
            
            {/* Subtle ambient decorative shapes */}
            <div 
              className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0d8277]/10 blur-3xl"
              aria-hidden="true"
            />
            <div 
              className="pointer-events-none absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#0d8277]/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102A43] text-[#0d8277] text-xs font-bold uppercase tracking-wider border border-[#13B8A6]/30">
                <span className="w-2 h-2 rounded-full bg-[#0d8277]" aria-hidden="true" />
                <span>EXPERIENCE THE DIFFERENCE</span>
              </div>

              <h2 
                id="about-cta-heading"
                className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]"
              >
                Let’s Take the Next Step Together
              </h2>

              <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-xl mx-auto">
                Ready to experience compassionate dental care tailored to your lifestyle? Connect with our team to explore your options today.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3 max-w-md mx-auto sm:max-w-none">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#071D31] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D31]"
                >
                  <Calendar className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                  <span>Request an Appointment</span>
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-slate-600 hover:border-slate-400 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                >
                  <Mail className="w-4 h-4 text-slate-300" aria-hidden="true" />
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Educational Disclaimer */}
              <p className="text-[11px] text-slate-400 pt-2">
                SmileCare Dental Studio is a portfolio simulation. No real clinical appointments or medical guarantees are provided.
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
