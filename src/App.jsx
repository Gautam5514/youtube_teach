import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const AppointmentPage = lazy(() => import('./pages/AppointmentPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center text-navy">Loading SmileCare…</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="appointment" element={<AppointmentPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="project" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
