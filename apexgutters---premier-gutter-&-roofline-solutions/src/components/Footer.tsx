import React, { useState } from 'react';
import { PageTab } from '../types';
import { COMPANY_INFO, SERVICES_DATA } from '../data/siteData';
import {
  Home,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onSelectService?: (slug: string) => void;
  onOpenQuote: () => void;
  onSuccessToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectService,
  onOpenQuote,
  onSuccessToast,
}) => {
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPromoCode(data.promoCode || 'APEX10FALL');
        onSuccessToast(data.message);
        setEmail('');
      } else {
        setPromoCode('APEX10FALL');
      }
    } catch {
      setPromoCode('APEX10FALL');
      onSuccessToast('Subscribed! Promo code APEX10FALL unlocked.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#171A1D] text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F36B21] text-white flex items-center justify-center font-black">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Apex<span className="text-[#F36B21]">Gutters</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Custom seamless aluminum and copper gutters, micro-mesh leaf protection, and engineered residential & commercial stormwater diversion systems.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F36B21] flex-shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F36B21] flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white font-bold transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F36B21] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F36B21] flex-shrink-0" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: QUICK LINKS (Matches image.png exactly) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { tab: 'home', label: 'Home Page' },
                { tab: 'about', label: 'About Us' },
                { tab: 'services', label: 'Services' },
                { tab: 'why-us', label: 'Why Choose Us' },
                { tab: 'projects', label: 'Work Portfolio' },
                { tab: 'team', label: 'Our Specialists' },
                { tab: 'calculator', label: 'Cost Calculator' },
                { tab: 'color-visualizer', label: 'Color Visualizer' },
                { tab: 'drainage-calculator', label: 'Drainage Sizing' },
                { tab: 'blog', label: 'Blog & Advice' },
                { tab: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.tab}>
                  <button
                    onClick={() => {
                      onNavigate(link.tab as PageTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F36B21] transition-colors cursor-pointer text-left block w-full py-0.5"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(srv.id);
                      } else {
                        onNavigate('services');
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#F36B21] transition-colors cursor-pointer text-left block w-full py-0.5"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Discount (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Stay In The Loop
            </h4>
            <p className="text-slate-400 text-xs">
              Get seasonal gutter maintenance tips, weather alerts &amp; special discounts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-800/80 focus-within:border-[#F36B21]">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-[#F36B21] hover:bg-[#D95412] text-white px-3.5 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {promoCode && (
              <div className="p-3 bg-orange-950/60 border border-orange-500/40 rounded-xl text-xs text-orange-200 flex items-start gap-2">
                <Tag className="w-4 h-4 text-[#F36B21] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Promo Code Unlocked:</span>
                  <span className="font-mono font-bold text-orange-400 text-sm tracking-wider">
                    {promoCode}
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    Mention this code for $150 off any seamless gutter installation.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Licensed &amp; Insured.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="hover:text-white transition-colors cursor-pointer font-bold"
            >
              Request Quote
            </button>
            <span>•</span>
            <span className="text-slate-400">Built to protect what matters.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
