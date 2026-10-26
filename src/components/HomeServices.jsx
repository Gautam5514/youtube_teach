import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Sparkles, 
  Layers, 
  Smile, 
  Activity, 
  Heart, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES } from '../data/services';

// Mapping each of the six exact services to its appropriate Lucide icon
const iconMap = {
  'general-dentistry': Stethoscope,
  'teeth-whitening': Sparkles,
  'dental-implants': Layers,
  'orthodontics': Smile,
  'root-canal-care': Activity,
  'pediatric-dentistry': Heart,
};

export default function HomeServices() {
  return (
    <section 
      aria-labelledby="home-services-heading"
      className="w-full bg-white border-b border-[#E4EBF0] py-16 lg:py-24"
    >
      <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
            OUR SERVICES
          </span>
          <h2 
            id="home-services-heading"
            className="text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.15] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
          >
            Complete Dental Care Under One Roof
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Explore treatments and preventive care designed for different dental needs.
          </p>
        </div>

        {/* 6 Cards Grid: 3 columns desktop, 2 tablet, 1 mobile; 24px gaps; equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.id] || Sparkles;

            return (
              <div
                key={service.id}
                className="bg-white border border-[#E4EBF0] rounded-[20px] p-8 flex flex-col justify-between h-full transition-all duration-200 hover:-translate-y-1 hover:border-[#13B8A6]/40 hover:shadow-[0_12px_30px_rgba(16,42,69,0.08)] group focus-within:ring-2 focus-within:ring-[#13B8A6] focus-within:outline-none"
              >
                <div>
                  {/* 60px Pale-teal icon square with Lucide icon */}
                  <div className="w-[60px] h-[60px] rounded-[16px] bg-[#E8F8F5] text-[#0d8277] flex items-center justify-center flex-shrink-0 mb-6 group-hover:scale-105 transition-transform duration-200">
                    <IconComponent className="w-7 h-7" aria-hidden="true" />
                  </div>

                  {/* 20px Bold Title */}
                  <h3 className="text-[20px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                    {service.name}
                  </h3>

                  {/* 15px / 1.65 Line-Height Description */}
                  <p className="text-[15px] leading-[1.65] text-[#526477] mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Teal Learn More link -> /services */}
                <div className="pt-2 border-t border-[#F7FAFC]">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d8277] group-hover:text-[#0d9488] transition-colors rounded py-1 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                    aria-label={`Learn more about ${service.name}`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer: Outlined Centered Button -> /services */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-white hover:bg-[#E8F8F5]/60 text-[#102A43] hover:text-[#0d8277] font-semibold text-sm border border-[#E4EBF0] hover:border-[#13B8A6]/40 transition-all duration-200 min-h-[44px] shadow-2xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
