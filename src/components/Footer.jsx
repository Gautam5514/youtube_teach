import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import { CLINIC_INFO, NAV_LINKS, CTA_APPOINTMENT } from '../data/clinicData';
import { SERVICES } from '../data/servicesData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {


  return (
    <footer className="bg-[#071D31] text-slate-300 border-t border-[#102A43] pt-16 pb-12">
      {/* Top Demo Banner within Footer */}
      <div className="app-container mb-12">
        <div className="bg-[#102A43]/80 border border-[#13B8A6]/30 rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0d8277]/20 flex items-center justify-center text-[#0d8277] flex-shrink-0">
              <ShieldAlert className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold flex items-center gap-2">
                <span>Educational Demonstration Website</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0d8277] text-white">DEMO</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                SmileCare Dental Studio is a fictional entity built with AI assistance. All contacts, addresses, and hours are simulated placeholders.
              </p>
            </div>
          </div>
          <Link
            to={CTA_APPOINTMENT.path}
            className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-[10px] bg-[#0d8277] hover:bg-[#0d9488] text-white transition-colors min-h-[38px] flex items-center"
          >
            Try Demo Booking
          </Link>
        </div>
      </div>

      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-700/60">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] rounded-lg"
              aria-label={`${CLINIC_INFO.name} footer home link`}
            >
              <div className="w-10 h-10 rounded-[12px] bg-[#102A43] border border-[#13B8A6]/30 flex items-center justify-center text-[#0d8277]">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 3.31 1.69 6.22 4.25 7.85.45.29.75.76.75 1.3V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-4.5c0-.28.22-.5.5-.5s.5.22.5.5V21c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.85c0-.54.3-1.01.75-1.3C18.31 16.22 20 13.31 20 10c0-4.42-3.58-8-8-8zm-2 10c-.83 0-1.5-.67-1.5-1.5S9.17 9 10 9s1.5.67 1.5 1.5S10.83 12 10 12zm4 0c-.83 0-1.5-.67-1.5-1.5S13.17 9 14 9s1.5.67 1.5 1.5S14.83 12 14 12z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl text-white tracking-tight">
                  SmileCare
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-[#0d8277] uppercase">
                  Dental Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {CLINIC_INFO.tagline} Providing modern dental care demos with gentle comfort and state-of-the-art aesthetics.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0d8277]" aria-hidden="true" />
              <span>Simulated clinic portfolio build</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="text-sm font-bold text-white tracking-wider uppercase mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center min-h-[32px] py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#13B8A6]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={CTA_APPOINTMENT.path}
                  className="text-[#0d8277] hover:text-[#5eead4] font-semibold transition-colors duration-150 inline-flex items-center min-h-[32px] py-1"
                >
                  Book Appointment (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (Shared data source) */}
          <div>
            <h2 className="text-sm font-bold text-white tracking-wider uppercase mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              Dental Services
            </h2>
            <ul className="space-y-2.5 text-sm" role="list">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.slug}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center min-h-[32px] py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#13B8A6]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours (Fictional Placeholders) */}
          <div>
            <h2 className="text-sm font-bold text-white tracking-wider uppercase mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              Clinic Contact & Hours
            </h2>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0d8277] mt-1 flex-shrink-0" aria-hidden="true" />
                <span>{CLINIC_INFO.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs">{CLINIC_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0d8277] flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs">{CLINIC_INFO.email}</span>
              </div>
              <div className="pt-2 border-t border-slate-700/50">
                <p className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
                  <span>Practice Hours (Demo):</span>
                </p>
                {CLINIC_INFO.hours.map((h, i) => (
                  <p key={i} className="text-xs text-slate-400 flex justify-between py-0.5">
                    <span>{h.days}:</span>
                    <span className="text-slate-300 font-medium">{h.time}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {CURRENT_YEAR} {CLINIC_INFO.name}. All rights reserved. <strong>DEMO VERSION</strong> — AI-assisted healthcare project.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link to="/project" className="underline underline-offset-4 min-h-11 inline-flex items-center">Project & AI process</Link>
            <span className="text-slate-400">Terms of Care (Demo)</span>
            <span className="text-[#0d8277] font-medium">No server storage</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
