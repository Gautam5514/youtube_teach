import React from 'react';
import { Quote, Info } from 'lucide-react';

const EXPERIENCE_CARDS = [
  {
    id: 1,
    text: 'Taking time to explain each step can make dental visits easier to understand.',
    pillar: 'Clear Communication',
  },
  {
    id: 2,
    text: 'A welcoming clinic atmosphere can help patients feel more comfortable.',
    pillar: 'Comfortable Setting',
  },
  {
    id: 3,
    text: 'Clear appointment information helps people plan their visit with confidence.',
    pillar: 'Predictable Care',
  },
];

export default function PatientExperience() {
  return (
    <section 
      aria-labelledby="patient-experience-heading"
      className="w-full bg-[#E8F8F5] border-b border-[#E4EBF0] py-16 lg:py-[96px] overflow-hidden"
    >
      <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-white/90 px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5 shadow-2xs">
            PATIENT EXPERIENCE
          </span>
          <h2 
            id="patient-experience-heading"
            className="text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.15] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
          >
            A Better Dental Visit Begins With Trust
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Examples of the thoughtful experience our demo clinic aims to provide.
          </p>
        </div>

        {/* 3 White Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {EXPERIENCE_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-[#E4EBF0] rounded-[20px] p-7 flex flex-col justify-between h-full shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.06)] hover:-translate-y-1 hover:border-[#13B8A6]/30 transition-all duration-200"
            >
              <div>
                {/* Subtle Quote Icon */}
                <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center mb-5 flex-shrink-0 shadow-2xs">
                  <Quote className="w-5 h-5 fill-current opacity-80" aria-hidden="true" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d8277] mb-2 block">
                  {card.pillar}
                </span>

                {/* Card Text */}
                <p className="text-[16px] leading-[1.65] font-medium text-[#102A43]">
                  “{card.text}”
                </p>
              </div>

              {/* Explicit Mandatory Label on EACH card */}
              <div className="pt-4 mt-6 border-t border-[#F7FAFC] flex items-center gap-1.5 text-[11px] text-[#8295A9]">
                <Info className="w-3.5 h-3.5 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
                <span>Illustrative example — not an actual patient review</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
