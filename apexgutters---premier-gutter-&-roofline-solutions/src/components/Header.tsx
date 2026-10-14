import React, { useEffect, useState } from 'react';
import { PageTab } from '../types';
import { COMPANY_INFO } from '../data/siteData';
import {
  ArrowRight,
  ChevronDown,
  Home,
  Menu,
  PhoneCall,
  X,
} from 'lucide-react';

interface HeaderProps {
  currentTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onSelectServiceSlug?: (slug: string) => void;
  onSelectProjectCategory?: (cat: 'all' | 'residential' | 'copper' | 'commercial' | 'protection') => void;
  onOpenQuote: (defaultService?: string) => void;
}

type DropdownName = 'company' | 'services' | 'projects';
type ProjectCategory = 'all' | 'residential' | 'copper' | 'commercial' | 'protection';

const companyMenuItems: { label: string; tab: PageTab }[] = [
  { label: 'Why Choose Us', tab: 'why-us' },
  { label: 'Our Specialists', tab: 'team' },
  { label: 'Contact Us', tab: 'contact' },
];

const servicesMenuItems = [
  { label: 'Seamless Gutter Installation', slug: 'service-gutter-installation' },
  { label: 'Precision Gutter Repair & Sag Fix', slug: 'service-gutter-repair' },
  { label: 'Downspout Repair & Drainage Upgrades', slug: 'service-downspouts' },
  { label: 'Gutter Guard & Micro-Mesh Protection', slug: 'service-leaf-guards' },
  { label: 'Pro Gutter Cleaning & High-Pressure Flush', slug: 'service-gutter-cleaning' },
  { label: 'Soffit & Fascia Board Replacement', slug: 'service-fascia-soffit' },
  { label: 'Commercial Box Gutters & Large Catchment', slug: 'service-commercial-drainage' },
];

const projectsMenuItems: { label: string; category: ProjectCategory }[] = [
  { label: 'All Completed Work', category: 'all' },
  { label: 'Seamless Aluminum Work', category: 'residential' },
  { label: 'Architectural Copper', category: 'copper' },
  { label: 'Commercial Systems', category: 'commercial' },
  { label: 'Before & After Studies', category: 'protection' },
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onSelectServiceSlug,
  onSelectProjectCategory,
  onOpenQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 25);
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 25;
      setIsScrolled((current) => current === nextIsScrolled ? current : nextIsScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const handleTabClick = (tab: PageTab) => {
    onNavigate(tab);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceItemClick = (slug: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (onSelectServiceSlug) {
      onSelectServiceSlug(slug);
    } else {
      onNavigate('services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectItemClick = (category: ProjectCategory) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (onSelectProjectCategory) {
      onSelectProjectCategory(category);
    } else {
      onNavigate('projects');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCompanyActive = ['about', 'why-us', 'team', 'contact'].includes(currentTab);
  const isServicesActive = currentTab === 'services' || currentTab === 'service-detail';
  const isProjectsActive = currentTab === 'projects' || currentTab === 'project-detail';

  const dropdownButtonClass = (active: boolean) =>
    `flex items-center gap-1.5 whitespace-nowrap py-2 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21] focus-visible:ring-offset-2 ${
      active ? 'text-[#F36B21]' : 'text-slate-700 hover:text-[#F36B21]'
    }`;

  const dropdownMenuClass =
    'absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-100 bg-white py-2 shadow-[0_12px_32px_rgba(23,26,29,0.12)] animate-dropdown';

  const desktopLinkClass = (active: boolean) =>
    `whitespace-nowrap py-2 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21] focus-visible:ring-offset-2 ${
      active ? 'text-[#F36B21]' : 'text-slate-700 hover:text-[#F36B21]'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `w-full rounded-lg px-4 py-2.5 text-left text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21] ${
      active ? 'bg-orange-50 text-[#F36B21]' : 'text-slate-800 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        data-scrolled={isScrolled}
        className={`w-full border-b border-slate-200 bg-white shadow-[0_1px_4px_rgba(23,26,29,0.04)] transition-[width,height,margin,border-radius,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'mx-auto my-0 h-[80px] w-[96%] max-w-[1800px] rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_8px_24px_rgba(23,26,29,0.10)] sm:h-[88px] xl:h-24 xl:w-[94%]'
            : 'mx-auto my-0 h-[88px] max-w-none rounded-none border-x-0 border-t-0 px-0 sm:h-24 xl:h-[104px]'
        }`}
      >
        <div
          className={`mx-auto grid h-full max-w-[1800px] grid-cols-[1fr_auto] items-center px-3 sm:px-5 xl:grid-cols-[minmax(190px,1fr)_auto_minmax(300px,1fr)] xl:px-7 ${
            isScrolled ? 'w-full' : 'w-[96%] xl:w-[94%]'
          }`}
        >
        <button
          onClick={() => handleTabClick('home')}
          className="flex min-w-0 items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21] focus-visible:ring-offset-2 sm:gap-3"
          aria-label="ApexGutters Home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F36B21] text-white shadow-sm shadow-orange-500/20 transition-transform group-hover:scale-105 xl:h-11 xl:w-11">
            <Home className="h-5 w-5 stroke-[2.5] xl:h-6 xl:w-6" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap text-[20px] font-black leading-none tracking-tight text-[#171A1D] sm:text-[22px] xl:text-[25px]">
              Apex<span className="text-[#F36B21]">Gutters</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:block">
              Water Management
            </span>
          </span>
        </button>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-[14px] xl:flex 2xl:gap-7">
          <button
            onClick={() => handleTabClick('home')}
            className={desktopLinkClass(currentTab === 'home')}
          >
            Home
          </button>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('services')}
            onMouseLeave={() => setOpenDropdown(null)}
            onFocus={() => setOpenDropdown('services')}
          >
            <button
              onClick={() => handleTabClick('services')}
              className={dropdownButtonClass(isServicesActive)}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'services'}
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'services' && (
              <div className={dropdownMenuClass}>
                {servicesMenuItems.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handleServiceItemClick(item.slug)}
                    className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition-colors hover:bg-[#FFF3EB] hover:text-[#F36B21] focus-visible:bg-[#FFF3EB] focus-visible:text-[#F36B21] focus-visible:outline-none"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('company')}
            onMouseLeave={() => setOpenDropdown(null)}
            onFocus={() => setOpenDropdown('company')}
          >
            <button
              onClick={() => handleTabClick('about')}
              className={dropdownButtonClass(isCompanyActive)}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'company'}
            >
              About Us
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'company' && (
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-100 bg-white py-2 shadow-[0_12px_32px_rgba(23,26,29,0.12)] animate-dropdown">
                {companyMenuItems.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleTabClick(item.tab)}
                    className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition-colors hover:bg-[#FFF3EB] hover:text-[#F36B21] focus-visible:bg-[#FFF3EB] focus-visible:text-[#F36B21] focus-visible:outline-none"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('projects')}
            onMouseLeave={() => setOpenDropdown(null)}
            onFocus={() => setOpenDropdown('projects')}
          >
            <button
              onClick={() => handleTabClick('projects')}
              className={dropdownButtonClass(isProjectsActive)}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'projects'}
            >
              Projects
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === 'projects' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'projects' && (
              <div className="absolute left-0 top-full z-50 mt-2 w-60 rounded-xl border border-slate-100 bg-white py-2 shadow-[0_12px_32px_rgba(23,26,29,0.12)] animate-dropdown">
                {projectsMenuItems.map((item) => (
                  <button
                    key={item.category}
                    onClick={() => handleProjectItemClick(item.category)}
                    className="block w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition-colors hover:bg-[#FFF3EB] hover:text-[#F36B21] focus-visible:bg-[#FFF3EB] focus-visible:text-[#F36B21] focus-visible:outline-none"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleTabClick('cost-estimator')}
            className={desktopLinkClass(currentTab === 'cost-estimator' || currentTab === 'calculator')}
          >
            Cost Estimator
          </button>
          <button
            onClick={() => handleTabClick('blog')}
            className={desktopLinkClass(currentTab === 'blog' || currentTab === 'blog-detail')}
          >
            Blog
          </button>
        </nav>

        <div className="hidden items-center justify-self-end gap-5 xl:flex">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-orange-50 text-[#F36B21]">
              <PhoneCall className="h-4 w-4" />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-bold uppercase leading-none tracking-wider text-slate-400">
                Call Toll-Free
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="mt-1 block whitespace-nowrap text-[14px] font-black tracking-tight text-[#171A1D] transition-colors hover:text-[#F36B21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21]"
              >
                {COMPANY_INFO.phone}
              </a>
            </span>
          </div>
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#F36B21] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm shadow-orange-500/20 transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[#D95412] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21] focus-visible:ring-offset-2"
          >
            Get a Quote
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-self-end gap-2 xl:hidden">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="inline-flex items-center rounded-lg bg-[#F36B21] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#D95412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21] focus-visible:ring-offset-2 sm:px-4 sm:py-2.5"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Get a Quote</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2.5 text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#F36B21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B21]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mx-auto mb-2 w-[96%] max-w-[1800px] rounded-2xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_8px_24px_rgba(23,26,29,0.10)] sm:px-5 xl:hidden"
        >
          <div className="flex flex-col gap-1">
            <button onClick={() => handleTabClick('home')} className={mobileLinkClass(currentTab === 'home')}>Home</button>
            <button onClick={() => handleTabClick('services')} className={mobileLinkClass(isServicesActive)}>Services</button>
            <button onClick={() => handleTabClick('about')} className={mobileLinkClass(isCompanyActive)}>About Us</button>
            <button onClick={() => handleTabClick('projects')} className={mobileLinkClass(isProjectsActive)}>Projects</button>
            <button
              onClick={() => handleTabClick('cost-estimator')}
              className={mobileLinkClass(currentTab === 'cost-estimator' || currentTab === 'calculator')}
            >
              Cost Estimator
            </button>
            <button
              onClick={() => handleTabClick('blog')}
              className={mobileLinkClass(currentTab === 'blog' || currentTab === 'blog-detail')}
            >
              Blog
            </button>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="mt-3 flex items-center justify-center gap-2 border-t border-slate-100 px-4 pt-3 text-sm font-bold text-slate-700 transition-colors hover:text-[#F36B21]"
          >
            <PhoneCall className="h-4 w-4 text-[#F36B21]" />
            {COMPANY_INFO.phone}
          </a>
        </nav>
      )}
    </header>
  );
};
