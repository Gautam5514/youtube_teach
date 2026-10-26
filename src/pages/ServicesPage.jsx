import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  ChevronDown, 
  ArrowRight, 
  ShieldAlert, 
  HelpCircle, 
  MessageSquare, 
  Stethoscope 
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';

import serviceGeneralImg from '../assets/service-general.webp';
import serviceWhiteningImg from '../assets/service-whitening.webp';
import serviceImplantsImg from '../assets/service-implants.webp';
import serviceOrthodonticsImg from '../assets/service-orthodontics.webp';
import serviceRootCanalImg from '../assets/service-rootcanal.webp';
import servicePediatricImg from '../assets/service-pediatric.webp';

const imageMap = {
  'general-dentistry': serviceGeneralImg,
  'teeth-whitening': serviceWhiteningImg,
  'dental-implants': serviceImplantsImg,
  'orthodontics': serviceOrthodonticsImg,
  'root-canal-care': serviceRootCanalImg,
  'pediatric-dentistry': servicePediatricImg,
};

const FAQ_ITEMS = [
  {
    question: 'How do I know which dental service I need?',
    answer: 'The ideal starting point is a comprehensive preventive checkup. During your initial consultation, our dentists perform a gentle examination, discuss your personal goals and dental history, and collaboratively review suitable care options before any decisions are made.',
  },
  {
    question: 'Can I request an appointment online?',
    answer: 'You can prepare an inquiry on our appointment page and copy it. This demo does not send messages or arrange a callback. A real clinic must confirm availability after receiving your inquiry.',
  },
  {
    question: 'Do I need a consultation before treatment?',
    answer: 'For focused restorative or cosmetic treatments—such as clear aligners, dental implants, or whitening—an initial consultation is essential. This allows our team to assess your oral health, answer questions, and build a tailored care plan with you.',
  },
  {
    question: 'How can I learn about treatment costs?',
    answer: 'We provide transparent, itemized treatment estimates during your consultation before any care begins. Our team clearly explains expected costs and available payment arrangements so you can make informed choices with complete confidence.',
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(0); // First open by default
  const [imgErrors, setImgErrors] = useState({});

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? -1 : index));
  };

  const handleImageError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex-grow flex flex-col justify-start">
      
      {/* 1. HERO SECTION */}
      <section 
        aria-label="Services overview"
        className="w-full bg-[#E8F8F5] border-b border-[#E4EBF0] py-12 sm:py-16 lg:py-20 flex items-center justify-center text-center"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          {/* Linked Breadcrumb: Home / Services */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-[#526477] mb-4">
            <Link to="/" className="hover:text-[#102A43] font-medium transition-colors">
              Home
            </Link>
            <span className="text-[#8295A9]">/</span>
            <span className="text-[#0d8277] font-semibold">Services</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5 shadow-2xs">
            OUR SERVICES
          </span>

          {/* Heading h1 */}
          <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15] max-w-2xl mx-auto">
            Comprehensive Care for Every Smile
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[17px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Discover dental treatment options and explore the next step for your oral health.
          </p>

        </div>
      </section>

      {/* 2. MAIN: SIX DETAILED ALTERNATING FEATURE ROWS */}
      <section 
        aria-labelledby="services-list-heading"
        className="w-full bg-white py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0 space-y-16 sm:space-y-20 lg:space-y-24">
          <h2 id="services-list-heading" className="sr-only">
            Detailed Dental Services List
          </h2>

          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 1;
            const imgSrc = imageMap[service.id];
            const hasError = imgErrors[service.id];

            return (
              <div
                key={service.id}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-4 first:pt-0"
              >
                
                {/* Image Column (~45% on desktop, order swapped on even rows; image above content on mobile) */}
                <div 
                  className={`w-full max-w-[500px] lg:max-w-none mx-auto min-w-0 order-1 ${
                    isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                  }`}
                >
                  <div className="relative z-10 w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(16,42,69,0.08)] border border-[#E4EBF0] bg-[#F7FAFC]">
                    {!hasError ? (
                      <img
                        src={imgSrc}
                        alt={`Consultation and clinical care for ${service.name}`}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        onError={() => handleImageError(service.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#E8F8F5] to-white text-center">
                        <div className="w-14 h-14 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-3">
                          <Stethoscope className="w-7 h-7" aria-hidden="true" />
                        </div>
                        <p className="text-sm font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
                          {service.name}
                        </p>
                        <p className="text-xs text-[#526477] mt-1 max-w-[220px]">
                          Gentle clinical care designed for patient comfort.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Column (~55% on desktop, order swapped on even rows) */}
                <div 
                  className={`flex flex-col items-start justify-center space-y-5 lg:space-y-6 max-w-[560px] order-2 ${
                    isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                  }`}
                >
                  <div>
                    <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3">
                      {service.category}
                    </span>
                    <h3 className="text-[26px] sm:text-[30px] lg:text-[34px] leading-[1.2] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                      {service.name}
                    </h3>
                  </div>

                  {/* Short careful description */}
                  <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[#526477]">
                    {service.detailedDescription}
                  </p>

                  {/* 3 Concise Feature Chips with Check Icons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {service.chips.map((chip, chipIdx) => (
                      <span
                        key={chipIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F8F5] text-[#102A43] text-xs font-semibold border border-[#13B8A6]/20 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>

                  {/* CTA: Request Consultation -> /appointment?service=<URL_ENCODED_SERVICE_NAME> */}
                  <div className="pt-2 w-full sm:w-auto">
                    <Link
                      to={`/appointment?service=${encodeURIComponent(service.name)}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
                      aria-label={`Request consultation for ${service.name}`}
                    >
                      <span>Request Consultation</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FAQ SECTION WITH ACCESSIBLE DISCLOSURES */}
      <section 
        aria-labelledby="faq-heading"
        className="w-full bg-[#F7FAFC] border-y border-[#E4EBF0] py-16 lg:py-24"
      >
        <div className="app-container w-full max-w-[860px] mx-auto min-w-0">
          
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
              QUESTIONS & ANSWERS
            </span>
            <h2 
              id="faq-heading"
              className="text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.15] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
              Helpful answers regarding consultation requests, appointment planning, and treatment discussions.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              const contentId = `faq-answer-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={index}
                  className="bg-white border border-[#E4EBF0] rounded-[18px] overflow-hidden transition-all duration-200 shadow-2xs hover:border-[#13B8A6]/30"
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full px-6 py-5 flex items-center justify-between text-left text-base sm:text-[17px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] min-h-[54px] transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#0d8277] text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-6 pb-6 pt-1 text-[15px] leading-[1.7] text-[#526477] border-t border-[#F7FAFC] animate-in fade-in-50 duration-150"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8295A9]">
            <HelpCircle className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
            <span>Educational information — no diagnosis or binding medical outcome is implied</span>
          </div>

        </div>
      </section>

      {/* 4. FINAL CTA: NOT SURE WHERE TO START? */}
      <section 
        aria-labelledby="services-cta-heading"
        className="w-full bg-white py-16 lg:py-24 overflow-hidden"
      >
        <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
          
          <div className="relative bg-[#071D31] text-white rounded-[28px] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(7,29,49,0.2)] border border-[#102A43]">
            
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
                <span>NEED GUIDANCE?</span>
              </div>

              <h2 
                id="services-cta-heading"
                className="text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]"
              >
                Not Sure Where to Start?
              </h2>

              <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-xl mx-auto">
                Every smile journey is unique. Whether you have questions about routine checkups or want to discuss a specific care option, our friendly team is ready to assist.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3 max-w-md mx-auto sm:max-w-none">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#071D31] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D31]"
                >
                  <MessageSquare className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                  <span>Talk to Our Team</span>
                </Link>

                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-slate-600 hover:border-slate-400 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                >
                  <span>Request an Appointment</span>
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
                <span>SmileCare Dental Studio demo • No clinical outcomes guaranteed</span>
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
