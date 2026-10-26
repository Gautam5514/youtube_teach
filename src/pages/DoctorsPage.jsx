import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  UserCheck, 
  ArrowRight, 
  MessageSquare, 
  HeartHandshake, 
  HelpCircle, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';
import { DOCTORS } from '../data/doctorsData';
import aanyaImg from '../assets/doctor-aanya.webp';
import rohanImg from '../assets/doctor-rohan.webp';
import nehaImg from '../assets/doctor-neha.webp';
import clinicInteriorImg from '../assets/clinic-interior.webp';

const imageMap = {
  'dr-aanya-mehta': aanyaImg,
  'dr-rohan-shah': rohanImg,
  'dr-neha-kapoor': nehaImg,
};

export default function DoctorsPage() {
  const [imgErrors, setImgErrors] = useState({});
  const [clinicImgError, setClinicImgError] = useState(false);

  const handleImageError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex-grow flex flex-col justify-start">
      
      {/* 1. HERO SECTION */}
      <section 
        aria-label="Doctors overview"
        className="w-full bg-[#E8F8F5] border-b border-[#E4EBF0] py-12 sm:py-16 lg:py-20 flex items-center justify-center text-center"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Linked Breadcrumb: Home / Our Doctors */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-[#526477] mb-4">
            <Link to="/" className="hover:text-[#102A43] font-medium transition-colors">
              Home
            </Link>
            <span className="text-[#8295A9]">/</span>
            <span className="text-[#0d8277] font-semibold">Our Doctors</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5 shadow-2xs">
            OUR TEAM
          </span>

          {/* Heading h1 */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Meet the People Behind Your Smile
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Explore illustrative care-team profiles for our demonstration clinic.
          </p>

          {/* Required Visible Notice */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-[#13B8A6]/30 text-xs text-[#102A43] shadow-2xs max-w-lg mx-auto text-center">
            <ShieldAlert className="w-4 h-4 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
            <span>All profiles on this page are fictional examples, not real practicing clinicians.</span>
          </div>

        </div>
      </section>

      {/* 2. TEAM: THREE PREMIUM PORTRAIT CARDS */}
      <section 
        aria-labelledby="team-profiles-heading"
        className="w-full bg-white border-b border-[#E4EBF0] py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
              CARE TEAM PROFILES
            </span>
            <h2 
              id="team-profiles-heading"
              className="text-[28px] sm:text-[34px] lg:text-[38px] leading-[1.18] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
            >
              Dedicated Care, Personalized Attention
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3">
              Learn about our sample clinicians, their areas of focus, and how they approach comfortable patient visits.
            </p>
          </div>

          {/* Responsive 3/2/1 Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {DOCTORS.map((doctor) => {
              const hasError = imgErrors[doctor.id];
              const imgSrc = imageMap[doctor.id];

              return (
                <div
                  key={doctor.id}
                  className="bg-white border border-[#E4EBF0] rounded-[20px] overflow-hidden flex flex-col justify-between h-full shadow-xs hover:shadow-[0_16px_36px_rgba(16,42,69,0.08)] hover:-translate-y-1.5 hover:border-[#13B8A6]/40 transition-all duration-200 group focus-within:ring-2 focus-within:ring-[#13B8A6] focus-within:outline-none"
                >
                  <div>
                    {/* Aspect 4:5 image container with rounded top corners */}
                    <div className="relative w-full aspect-[4/5] bg-[#E8F8F5] overflow-hidden rounded-t-[20px]">
                      {!hasError ? (
                        <>
                          <img
                            src={imgSrc}
                            alt={doctor.avatarAlt}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                            onError={() => handleImageError(doctor.id)}
                          />
                          {/* Neutral illustrative label tag */}
                          <div className="absolute bottom-3 left-3 bg-[#071D31]/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10">
                            Illustrative Demo Persona
                          </div>
                        </>
                      ) : (
                        /* Graceful fallback placeholder */
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#E8F8F5] to-white text-center">
                          <div className="w-14 h-14 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0d8277] mb-3">
                            <UserCheck className="w-7 h-7" aria-hidden="true" />
                          </div>
                          <p className="text-sm font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                            {doctor.name}
                          </p>
                          <p className="text-xs text-[#0d8277] mt-0.5">
                            {doctor.specialty}
                          </p>
                          <span className="text-[11px] text-[#8295A9] mt-2">
                            Illustrative Persona
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Well-spaced white card body */}
                    <div className="p-6 sm:p-7">
                      {/* Teal Specialty */}
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0d8277] mb-1.5">
                        {doctor.specialty}
                      </span>

                      {/* 22px Bold Navy Name */}
                      <h3 className="text-[22px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                        {doctor.name}
                      </h3>

                      {/* Clear short bio */}
                      <p className="text-[15px] leading-[1.65] text-[#526477]">
                        {doctor.detailedBio || doctor.bio}
                      </p>
                    </div>
                  </div>

                  {/* CTA: Request Consultation -> /appointment */}
                  <div className="px-6 sm:px-7 pb-6 pt-0">
                    <div className="pt-4 border-t border-[#F7FAFC]">
                      <Link
                        to="/appointment"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-sm transition-all duration-200 shadow-2xs hover:shadow-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
                        aria-label={`Request consultation with ${doctor.name}`}
                      >
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span>Request Consultation</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtext reminder */}
          <div className="mt-10 text-center text-xs text-[#8295A9] flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
            <span>Demonstration clinic profiles — no medical endorsements or actual appointments implied.</span>
          </div>

        </div>
      </section>

      {/* 3. PHILOSOPHY: OFF-WHITE FULL-WIDTH SECTION */}
      <section 
        aria-labelledby="philosophy-heading"
        className="w-full bg-[#F7FAFC] border-b border-[#E4EBF0] py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Clinic Illustration */}
            <div className="lg:col-span-5 order-1">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(16,42,69,0.08)] border border-[#E4EBF0] bg-white">
                {!clinicImgError ? (
                  <img
                    src={clinicInteriorImg}
                    alt="Welcoming consultation suite and modern clinical environment"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    onError={() => setClinicImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#E8F8F5] to-white text-center">
                    <HeartHandshake className="w-10 h-10 text-[#0d8277] mb-3" aria-hidden="true" />
                    <p className="text-sm font-bold text-[#102A43]">
                      Modern Consultation Environment
                    </p>
                    <p className="text-xs text-[#526477] mt-1">
                      Designed for patient comfort and open discussion.
                    </p>
                  </div>
                )}

                {/* Subtle overlay pill */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#E4EBF0] shadow-xs flex items-center gap-2 text-xs font-semibold text-[#102A43]">
                  <span className="w-2 h-2 rounded-full bg-[#0d8277]" aria-hidden="true" />
                  <span>Patient-Centered Atmosphere</span>
                </div>
              </div>
            </div>

            {/* Right: Copy & Philosophy */}
            <div className="lg:col-span-7 order-2 flex flex-col items-start space-y-6">
              
              <div>
                <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3">
                  OUR CARE PHILOSOPHY
                </span>
                <h2 
                  id="philosophy-heading"
                  className="text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.18] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
                >
                  Care Starts With Understanding You
                </h2>
              </div>

              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#526477]">
                We believe that positive dental experiences begin long before any instrument is held. Every individual comes with distinct expectations, past experiences, and questions about their oral health. Our team prioritizes active listening, taking the time to understand your perspective without rushing.
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#526477]">
                During every visit, we ask clear questions, provide transparent explanations of our findings, and discuss suitable care options collaboratively. We present choices straightforwardly so that you can make well-informed decisions that suit your personal goals and comfort level.
              </p>

              {/* Three Supportive Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-1">
                <div className="p-4 rounded-[16px] bg-white border border-[#E4EBF0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-2.5">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Active Listening
                  </h3>
                  <p className="text-xs text-[#526477] mt-1 leading-normal">
                    Time set aside to hear your concerns and history.
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-white border border-[#E4EBF0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-2.5">
                    <HelpCircle className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Clear Questions
                  </h3>
                  <p className="text-xs text-[#526477] mt-1 leading-normal">
                    Straightforward discussions with zero medical jargon.
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-white border border-[#E4EBF0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-2.5">
                    <HeartHandshake className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                    Collaborative Care
                  </h3>
                  <p className="text-xs text-[#526477] mt-1 leading-normal">
                    Options reviewed together so you decide with confidence.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CTA: DARK NAVY INSET BANNER */}
      <section 
        aria-labelledby="doctors-cta-heading"
        className="w-full bg-white py-16 lg:py-24 overflow-hidden"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="relative bg-[#071D31] text-white rounded-[28px] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(7,29,49,0.2)] border border-[#102A43]">
            
            {/* Subtle decorative glow accents */}
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
                <span>WE ARE HERE TO HELP</span>
              </div>

              {/* Heading: Have a Question for Our Team? */}
              <h2 
                id="doctors-cta-heading"
                className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]"
              >
                Have a Question for Our Team?
              </h2>

              <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-xl mx-auto">
                Whether you have questions about clinic visit protocols, consultation preparation, or finding the right service option, our front-desk team is ready to provide guidance.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3 max-w-md mx-auto sm:max-w-none">
                {/* Primary CTA -> /contact */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#071D31] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D31]"
                >
                  <MessageSquare className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                  <span>Talk to Our Team</span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-slate-600 hover:border-slate-400 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                >
                  <span>Explore Dental Services</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
                <span>SmileCare Dental Studio demo • Educational demonstration site</span>
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
