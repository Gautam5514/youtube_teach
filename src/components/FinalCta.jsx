import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';


export default function FinalCta() {
  return (
    <section 
      aria-labelledby="final-cta-heading"
      className="w-full bg-white py-16 lg:py-24 overflow-hidden"
    >
      <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
        
        {/* Dark Navy Inset Panel with 28px corners */}
        <div className="relative bg-[#071D31] text-white rounded-[28px] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(7,29,49,0.2)] border border-[#102A43]">
          
          {/* Subtle decorative teal shapes strictly contained inside panel */}
          <div 
            className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#0d8277]/10 blur-3xl"
            aria-hidden="true"
          />
          <div 
            className="pointer-events-none absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#0d8277]/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102A43] text-[#0d8277] text-xs font-bold uppercase tracking-wider border border-[#13B8A6]/30">
              <span className="w-2 h-2 rounded-full bg-[#0d8277]" aria-hidden="true" />
              <span>START YOUR JOURNEY</span>
            </div>

            {/* Centered White Heading */}
            <h2 
              id="final-cta-heading"
              className="text-[30px] sm:text-[38px] lg:text-[46px] font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]"
            >
              Your Healthier Smile Starts Here
            </h2>

            {/* Supportive Body */}
            <p className="text-[16px] sm:text-[18px] text-slate-300 leading-relaxed max-w-xl mx-auto">
              Ready to explore dental care options? Our team is here to help you take the next step.
            </p>

            {/* CTA Buttons: stack on mobile, inline on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-3 max-w-md mx-auto sm:max-w-none">
              
              {/* Primary White Button */}
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#071D31] font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D31]"
              >
                <Calendar className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
                <span>Request an Appointment</span>
              </Link>

              {/* Secondary Outlined / Text Button */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-transparent hover:bg-white/10 text-white font-semibold text-sm border border-slate-600 hover:border-slate-400 transition-all duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
              >
                <Mail className="w-4 h-4 text-slate-300" aria-hidden="true" />
                <span>Contact Us</span>
              </Link>

            </div>

            {/* Non-clinical demo disclaimer footnote */}
            <p className="text-[11px] text-slate-400 pt-2">
              SmileCare Dental Studio is a portfolio simulation. No patient data or binding appointments are processed.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
