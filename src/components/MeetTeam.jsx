import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck, ShieldAlert } from 'lucide-react';
import { DOCTORS } from '../data/doctorsData';
import aanyaImg from '../assets/doctor-aanya.webp';
import rohanImg from '../assets/doctor-rohan.webp';
import nehaImg from '../assets/doctor-neha.webp';

const imageMap = {
  'dr-aanya-mehta': aanyaImg,
  'dr-rohan-shah': rohanImg,
  'dr-neha-kapoor': nehaImg,
};

export default function MeetTeam() {
  const [imgErrors, setImgErrors] = useState({});

  const handleImageError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section 
      aria-labelledby="meet-team-heading"
      className="w-full bg-white border-b border-[#E4EBF0] py-16 lg:py-[96px] overflow-hidden"
    >
      <div className="app-container w-full max-w-[1200px] mx-auto min-w-0">
        
        {/* Section Center Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold text-[#0d8277] uppercase tracking-wider bg-[#E8F8F5] px-3.5 py-1 rounded-full border border-[#13B8A6]/20 mb-3.5">
            MEET OUR TEAM
          </span>
          <h2 
            id="meet-team-heading"
            className="text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.15] font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight"
          >
            Caring Professionals, Confident Smiles
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#526477] max-w-xl mx-auto leading-relaxed mt-3.5">
            Explore sample profiles of the people behind our demo clinic.
          </p>

          {/* Unobtrusive, clearly legible demo disclaimer label */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#8295A9]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#0d8277]" aria-hidden="true" />
            <span>Fictional demo profiles — not real clinicians</span>
          </div>
        </div>

        {/* 3 Equal-Height Cards Grid: 3 cols desktop, 1 col mobile, 24px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {DOCTORS.map((doctor) => {
            const hasError = imgErrors[doctor.id];
            const imgSrc = imageMap[doctor.id];

            return (
              <div
                key={doctor.id}
                className="bg-white border border-[#E4EBF0] rounded-[20px] overflow-hidden flex flex-col justify-between h-full shadow-xs hover:shadow-[0_12px_30px_rgba(16,42,69,0.08)] hover:-translate-y-1 hover:border-[#13B8A6]/40 transition-all duration-200 group focus-within:ring-2 focus-within:ring-[#13B8A6] focus-within:outline-none"
              >
                <div>
                  {/* Aspect 4:5 image container with rounded top corners */}
                  <div className="relative w-full aspect-[4/5] bg-[#E8F8F5] overflow-hidden rounded-t-[20px]">
                    {!hasError ? (
                      <img
                        src={imgSrc}
                        alt={doctor.avatarAlt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                        onError={() => handleImageError(doctor.id)}
                      />
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
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    {/* Teal Specialty */}
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0d8277] mb-1.5">
                      {doctor.specialty}
                    </span>

                    {/* 22px Bold Name */}
                    <h3 className="text-[22px] font-bold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                      {doctor.name}
                    </h3>

                    {/* Short 15px Bio */}
                    <p className="text-[15px] leading-[1.65] text-[#526477]">
                      {doctor.bio}
                    </p>
                  </div>
                </div>

                {/* Bottom Link: View Profile -> /doctors */}
                <div className="px-6 sm:px-7 pb-6 pt-0">
                  <div className="pt-3 border-t border-[#F7FAFC]">
                    <Link
                      to="/doctors"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d8277] group-hover:text-[#0d9488] transition-colors rounded py-1 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6]"
                      aria-label={`View sample profile of ${doctor.name}`}
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer Centered Button -> /doctors */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            to="/doctors"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-white hover:bg-[#E8F8F5]/60 text-[#102A43] hover:text-[#0d8277] font-semibold text-sm border border-[#E4EBF0] hover:border-[#13B8A6]/40 transition-all duration-200 min-h-[44px] shadow-2xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13B8A6] focus-visible:ring-offset-2"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
