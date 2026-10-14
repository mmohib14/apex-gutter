import React, { useState, useMemo } from 'react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/siteData';
import {
  MapPin,
  Search,
  Layers,
  ArrowUpRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

interface ProjectsGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuote: (servicePref?: string) => void;
  initialFilter?: 'all' | 'residential' | 'commercial' | 'copper' | 'protection';
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  onSelectProject,
  onOpenQuote,
  initialFilter = 'all',
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'copper' | 'protection'>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesCategory =
        activeFilter === 'all' || proj.categories.includes(activeFilter);
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section className="py-16 sm:py-24 bg-white" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-2">
              PROVEN RESULTS & CRAFTSMANSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Installation Showcase
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Browse our portfolio of custom seamless aluminum, hand-soldered architectural copper, and commercial box gutter installations.
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200">
              Showing {filteredProjects.length} of {PROJECTS_DATA.length} Completed Projects
            </span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto" role="tablist">
            {[
              { id: 'all', label: 'All Projects (18)' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'copper', label: 'Copper Custom' },
              { id: 'protection', label: 'Leaf Protection' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#171A1D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, location or metal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium focus:bg-white focus:outline-none focus:border-[#F36B21]"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative h-80 rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                loading="lazy"
              />

              {/* Number Badge */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 font-extrabold text-xs flex items-center justify-center shadow-md border border-white/50 z-10">
                {project.number}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A1D]/95 via-[#171A1D]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Card Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end text-white z-10">
                <span className="self-start text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F36B21] text-white mb-2 shadow-sm">
                  {project.badge}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-1 mt-1 opacity-90">
                  {project.shortDesc}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-3 mt-3 border-t border-slate-700/60 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F36B21]" />
                    {project.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-orange-400 font-bold group-hover:translate-x-1 transition-transform">
                    View Scope <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 mt-6">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-sm">No projects matched your criteria.</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or search query.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#F36B21] text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-[#F36B21] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Have a Similar Project? Request Free Proposal</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
