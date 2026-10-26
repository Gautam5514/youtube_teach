import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';


export default function NotFoundPage() {
  return (
    <div className="section-py flex-grow flex items-center justify-center">
      <div className="app-container text-center max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8F8F5] text-[#0d8277] font-bold text-2xl font-mono">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] font-['Plus_Jakarta_Sans',sans-serif]">
          Page Not Found
        </h1>

        <p className="text-sm text-[#526477] leading-relaxed">
          The requested page could not be located in this dental studio demo. Please return to the homepage or visit one of our main sections.
        </p>

        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#0d8277] hover:bg-[#0d9488] text-white font-semibold text-sm transition-colors min-h-[44px]"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Return to SmileCare Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
