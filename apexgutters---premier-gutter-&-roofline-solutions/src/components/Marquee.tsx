import React from 'react';
import { Droplet } from 'lucide-react';

export const Marquee: React.FC = () => {
  const items = [
    'SEAMLESS GUTTERS',
    'DOWNSPOUT REPAIR',
    'LEAF PROTECTION',
    'COPPER FABRICATION',
    'RAINWATER DRAINAGE',
    'ROOF CLEANING & FLUSH',
    'COMMERCIAL DOWNSPOUTS',
    'FASCIA & SOFFIT REPAIR',
  ];

  return (
    <div className="bg-[#171A1D] text-white py-4 overflow-hidden border-y border-slate-800 select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.map((item, idx) => (
          <div key={`m1-${idx}`} className="inline-flex items-center mx-6 font-extrabold text-sm sm:text-base tracking-widest uppercase text-slate-200">
            <Droplet className="w-4 h-4 text-[#F36B21] mr-3 fill-[#F36B21]" />
            <span>{item}</span>
          </div>
        ))}
        {items.map((item, idx) => (
          <div key={`m2-${idx}`} className="inline-flex items-center mx-6 font-extrabold text-sm sm:text-base tracking-widest uppercase text-slate-200" aria-hidden="true">
            <Droplet className="w-4 h-4 text-[#F36B21] mr-3 fill-[#F36B21]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
