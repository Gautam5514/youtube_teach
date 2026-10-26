import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Compass } from 'lucide-react';
import { SERVICES } from '../data/servicesData';

const INTERESTS = [
  { label: 'Everyday care', id: 'general-dentistry' },
  { label: 'A brighter smile', id: 'teeth-whitening' },
  { label: 'Replacing a tooth', id: 'dental-implants' },
  { label: 'Teeth alignment', id: 'orthodontics' },
  { label: 'Root canal consultation', id: 'root-canal-care' },
  { label: 'Care for my child', id: 'pediatric-dentistry' },
];

export default function ServiceFinder() {
  const [selected, setSelected] = useState('general-dentistry');
  const service = SERVICES.find(({ id }) => id === selected);
  return (
    <section className="section-py bg-white border-b border-slate-border" aria-labelledby="finder-heading">
      <div className="app-container">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          <div>
            <span className="eyebrow"><Compass size={16} aria-hidden="true" /> A LITTLE GUIDANCE</span>
            <h2 id="finder-heading" className="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">Your next step,<br />made a little simpler.</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-lg">What would you like to explore? Choose an interest to find the relevant service and prepare your inquiry.</p>
            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-navy mb-3">I’m interested in…</legend>
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
                {INTERESTS.map(({ label, id }) => (
                  <label key={id} className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border text-sm min-h-12 transition-colors ${selected === id ? 'bg-pale-teal border-teal text-navy' : 'border-slate-border hover:bg-offwhite'}`}>
                    <input type="radio" name="care-interest" value={id} checked={selected === id} onChange={() => setSelected(id)} className="accent-[#0d9488] w-4 h-4 shrink-0" />{label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="bg-offwhite rounded-[24px] border border-slate-border p-6 sm:p-8" aria-live="polite" aria-atomic="true">
            <span className="text-xs tracking-widest font-bold text-teal-hover">EXPLORE THIS SERVICE</span>
            <h3 className="text-2xl sm:text-3xl mt-4">{service.name}</h3>
            <p className="text-sm leading-7 mt-3">{service.detailedDescription}</p>
            <ul className="space-y-3 my-6">{service.chips.map(chip => <li key={chip} className="flex items-center gap-2 text-sm text-navy"><Check size={16} className="text-teal-hover shrink-0" aria-hidden="true" />{chip}</li>)}</ul>
            <Link to={`/appointment?service=${encodeURIComponent(service.name)}`} className="primary-button w-full">Prepare an inquiry <ArrowRight size={17} aria-hidden="true" /></Link>
            <p className="text-xs leading-5 mt-4">This is a menu of your interests, not a clinical recommendation. A dental professional can help you decide what care is appropriate.</p>
            <Link to="/appointment?service=Not%20Sure" className="inline-flex items-center min-h-11 text-sm text-teal-hover font-semibold underline underline-offset-4 mt-2">Not sure? Start with a general inquiry</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
