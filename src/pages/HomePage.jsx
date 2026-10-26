import React from 'react';
import Hero from '../components/Hero';
import ServiceFinder from '../components/ServiceFinder';
import HomeServices from '../components/HomeServices';
import WhyChooseUs from '../components/WhyChooseUs';
import MeetTeam from '../components/MeetTeam';
import PatientExperience from '../components/PatientExperience';
import FinalCta from '../components/FinalCta';

export default function HomePage() {
  return (
    <div className="flex-grow flex flex-col justify-start">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <HomeServices />
      <ServiceFinder />

      {/* Why Choose SmileCare Section */}
      <WhyChooseUs />

      {/* Meet Our Team Section */}
      <MeetTeam />

      {/* Patient Experience Section */}
      <PatientExperience />

      {/* Final Call to Action Section */}
      <FinalCta />
    </div>
  );
}
