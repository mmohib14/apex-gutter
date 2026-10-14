import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface FAQItem {
  id: string;
  category: 'installation' | 'guards' | 'materials' | 'warranty';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'installation',
    question: 'How long does a typical seamless gutter installation take?',
    answer: 'Most single-family residential installations are completed within 1 full working day (typically 4 to 8 hours). Because our trucks are equipped with mobile roll-forming machines, we extrude custom seamless continuous lengths directly on-site to match your exact eave measurements.'
  },
  {
    id: 'faq-2',
    category: 'materials',
    question: 'What is the real difference between seamless gutters and store-bought sectional gutters?',
    answer: 'Sectional gutters come in 10-foot precut lengths that must be glued or caulked together with joints. Every joint is an inevitable future leak point that fails under thermal expansion and heavy winter snow loads. Seamless gutters have zero seams along the runs, eliminating 95% of leaks and preventing rotted fascia boards.'
  },
  {
    id: 'faq-3',
    category: 'guards',
    question: 'Will micro-mesh gutter guards block heavy pine needles and roof grit?',
    answer: 'Yes! Our surgical-grade 316 stainless steel micro-mesh guards have micro-apertures designed specifically to block small pine needles, roof shingle granules, pollen tassels, and maple seeds while allowing up to 150 inches of rainfall per hour to pass smoothly into the trough.'
  },
  {
    id: 'faq-4',
    category: 'warranty',
    question: 'What is included in your Lifetime Transferable Warranty?',
    answer: 'Our warranty covers both heavy-gauge metal fabrication (zero cracking, peeling, or rust-through) and installation workmanship (secure bracket attachment, correct slope pitch, and joint sealing). If you sell your home, the warranty transfers seamlessly to the next homeowner.'
  },
  {
    id: 'faq-5',
    category: 'materials',
    question: 'How long does architectural copper last compared to aluminum?',
    answer: 'Heavy 0.032" seamless aluminum typically lasts 25 to 35+ years. Solid 16oz architectural copper lasts 80 to 100+ years. Over time, copper naturally oxidizes from shiny bronze to deep chestnut and eventually develops a beautiful protective green verdigris patina.'
  },
  {
    id: 'faq-6',
    category: 'installation',
    question: 'What happens if my fascia wood behind the gutters is rotted?',
    answer: 'We never mount new gutters onto rotted or spongy wood. Our crews carry kiln-dried cedar and cellular PVC fascia boards. During the removal phase, we inspect all rafter tails and fascia, replace rotted boards, and install weatherproof flashing before hanging new gutters.'
  },
  {
    id: 'faq-7',
    category: 'guards',
    question: 'Do gutter guards cause winter ice dams?',
    answer: 'No. Ice dams are caused by heat escaping into uninsulated attics, melting snow on the upper roof that refreezes at the cold eaves. While gutter guards cannot fix attic insulation, our systems can be integrated with commercial low-voltage self-regulating heat trace cables to keep gutters running freely during sub-zero freezes.'
  },
  {
    id: 'faq-8',
    category: 'warranty',
    question: 'How do you test gutter flow and pitch before leaving the jobsite?',
    answer: 'Every installation undergoes a certified water flow cascade test. We introduce water at the highest pitch point to verify rapid, uninterrupted velocity down to the outlets with zero pooling low-spots along the entire linear run.'
  }
];

export const FAQSection: React.FC<{ onOpenQuote?: () => void }> = ({ onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'installation' | 'guards' | 'materials' | 'warranty'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((f) => {
      const matchCat = activeCategory === 'all' || f.category === activeCategory;
      const matchSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200" id="faqs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#F36B21] text-xs font-extrabold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            HOMEOWNER KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Clear answers about gutter sizing, materials, pricing, and lifetime warranty coverage.
          </p>
        </div>

        {/* Search & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'installation', label: 'Installation' },
              { id: 'guards', label: 'Gutter Guards' },
              { id: 'materials', label: 'Materials & Copper' },
              { id: 'warranty', label: 'Warranty' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#171A1D] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#F36B21]"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-orange-100 text-[#F36B21]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-sm font-bold text-slate-700">No questions matched your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 px-4 py-1.5 bg-[#F36B21] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#171A1D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-lg sm:text-xl font-bold">Have a specific roofline question?</h4>
            <p className="text-xs text-slate-400 mt-1">
              Speak directly with an experienced rainwater drainage technician — no pushy sales reps.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#F36B21]" />
              <span>Call (888) 488-7767</span>
            </a>
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="px-5 py-2.5 bg-[#F36B21] hover:bg-[#D95412] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
