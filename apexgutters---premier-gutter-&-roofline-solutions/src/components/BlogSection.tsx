import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/siteData';
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Tag
} from 'lucide-react';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
  onOpenQuote: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost, onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'maintenance' | 'installation' | 'protection' | 'commercial'>('all');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-16 sm:py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-2">
            GUTTER CARE & ADVICE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Latest Guttering Insights & Maintenance Guides
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Practical advice from the ApexGutters team on protecting your roofline, choosing materials, stopping leaks, and storm preparedness.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'maintenance', label: 'Maintenance & Inspections' },
            { id: 'installation', label: 'Seamless Installation' },
            { id: 'protection', label: 'Leaf Protection & Guards' },
            { id: 'commercial', label: 'Commercial Drainage' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#F36B21] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Card (First Post if 'all') */}
        {activeCategory === 'all' && (
          <div
            onClick={() => onSelectPost(BLOG_POSTS[0])}
            className="mb-12 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden relative">
              <img
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#F36B21] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow">
                Featured Guide
              </span>
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F36B21]" />
                    {BLOG_POSTS[0].date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F36B21]" />
                    {BLOG_POSTS[0].readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#F36B21] transition-colors mb-3 leading-tight">
                  {BLOG_POSTS[0].title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {BLOG_POSTS[0].excerpt}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#F36B21] group-hover:translate-x-1 transition-transform">
                <span>Read Complete Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#171A1D]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold mb-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F36B21]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#F36B21] transition-colors mb-2.5 leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#F36B21] mt-auto">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
