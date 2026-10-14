import React, { useState } from 'react';
import { Check, Palette, ArrowRight, Shield, Sparkles } from 'lucide-react';

export interface GutterColor {
  id: string;
  name: string;
  hex: string;
  finish: string;
  category: 'Aluminum' | 'Architectural Copper' | 'Galvalume';
  idealFor: string;
  warranty: string;
}

export const GUTTER_COLORS: GutterColor[] = [
  {
    id: 'classic-white',
    name: 'Classic Bone White',
    hex: '#F4F5F0',
    finish: 'Low-Gloss Satin Enamel',
    category: 'Aluminum',
    idealFor: 'Traditional Colonial, Craftsman trim, and white fascia boards.',
    warranty: 'Lifetime No-Chipping Warranty'
  },
  {
    id: 'tuxedo-black',
    name: 'Tuxedo Matte Black',
    hex: '#1D2024',
    finish: 'Architectural Matte Powder-Coat',
    category: 'Aluminum',
    idealFor: 'Modern Farmhouse, dark window frames, and contemporary facades.',
    warranty: 'Lifetime No-Fade Guarantee'
  },
  {
    id: 'charcoal-gray',
    name: 'Charcoal Slate Gray',
    hex: '#3E4249',
    finish: 'Satin Baked Enamel',
    category: 'Aluminum',
    idealFor: 'Slate roofs, dark gray asphalt shingles, and stone exteriors.',
    warranty: 'Lifetime Factory Warranty'
  },
  {
    id: 'royal-bronze',
    name: 'Royal Dark Bronze',
    hex: '#372E27',
    finish: 'Deep Luster Satin',
    category: 'Aluminum',
    idealFor: 'Wood shake siding, cedar shingles, and rustic timber frames.',
    warranty: 'Lifetime Factory Warranty'
  },
  {
    id: 'musket-brown',
    name: 'Musket Earth Brown',
    hex: '#4A3B32',
    finish: 'Durable Baked Enamel',
    category: 'Aluminum',
    idealFor: 'Earth-tone siding, brick facades, and woodland estates.',
    warranty: 'Lifetime Factory Warranty'
  },
  {
    id: 'heritage-clay',
    name: 'Heritage Almond Clay',
    hex: '#C8B9A6',
    finish: 'Warm Matte Finish',
    category: 'Aluminum',
    idealFor: 'Beige stucco, sandstone masonry, and Mediterranean villas.',
    warranty: 'Lifetime Factory Warranty'
  },
  {
    id: 'forest-green',
    name: 'Highland Forest Green',
    hex: '#1E382B',
    finish: 'Forest Architectural Enamel',
    category: 'Aluminum',
    idealFor: 'Mountain lodges, green shingle accents, and rustic cottages.',
    warranty: 'Lifetime Factory Warranty'
  },
  {
    id: 'bright-copper',
    name: '16oz Solid Raw Copper',
    hex: '#C87533',
    finish: 'Natural Living Metal',
    category: 'Architectural Copper',
    idealFor: 'Historic restorations, high-end stone estates, and half-round runs.',
    warranty: '80-100 Year Natural Lifespan'
  },
  {
    id: 'patina-copper',
    name: 'Aged Verdigris Patina',
    hex: '#4F7C73',
    finish: 'Antiqued Oxidation Finish',
    category: 'Architectural Copper',
    idealFor: 'Cathedral roofs, vintage brick brownstones, and custom porticos.',
    warranty: 'Perpetual Structural Integrity'
  },
  {
    id: 'galvalume-silver',
    name: 'Galvalume Metallic Steel',
    hex: '#8E939B',
    finish: 'Industrial Zinc-Aluminum',
    category: 'Galvalume',
    idealFor: 'Commercial buildings, metal roofs, and industrial modern lofts.',
    warranty: '35-Year Corrosion Warranty'
  }
];

interface ColorVisualizerProps {
  onSelectColorForQuote?: (colorName: string) => void;
}

export const ColorVisualizer: React.FC<ColorVisualizerProps> = ({ onSelectColorForQuote }) => {
  const [selectedColor, setSelectedColor] = useState<GutterColor>(GUTTER_COLORS[0]);
  const [selectedProfile, setSelectedProfile] = useState<'k-style' | 'half-round' | 'box'>('k-style');

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200" id="color-visualizer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#F36B21] text-xs font-extrabold uppercase tracking-widest mb-3">
            <Palette className="w-3.5 h-3.5" />
            LIVE FINISH &amp; COLOR SELECTOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Match Your Roofline &amp; Exterior Trim
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Choose from 28 factory baked-on enamel colors or natural architectural copper. Our pigments feature UV-inhibitors that prevent chalking, peeling, and sun fade.
          </p>
        </div>

        {/* Visualizer Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Roofline Preview Box */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  SELECTED FINISH
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedColor.name}</h3>
              </div>
              <div
                className="w-10 h-10 rounded-full border-2 border-slate-200 shadow-inner"
                style={{ backgroundColor: selectedColor.hex }}
              />
            </div>

            {/* Profile Selection Toggle */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Select Gutter Profile:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'k-style', label: '5" / 6" K-Style' },
                  { id: 'half-round', label: '6" Half-Round' },
                  { id: 'box', label: '7" Box Commercial' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProfile(p.id as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedProfile === p.id
                        ? 'bg-[#171A1D] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Visual Simulation Mock */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-100 border border-slate-300 p-6 shadow-inner">
              {/* Roof Shingle Line */}
              <div className="h-16 rounded-t-lg bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 flex items-center justify-center text-white/50 text-[11px] font-bold tracking-widest uppercase">
                ROOF SHINGLE LINE (DARK CHARCOAL)
              </div>

              {/* Fascia Board */}
              <div className="h-8 bg-white border-y border-slate-300 flex items-center px-4 text-[10px] text-slate-400 font-semibold uppercase">
                Exterior Fascia Board
              </div>

              {/* Simulated Gutter Run in Selected Color */}
              <div
                className="h-14 rounded-b-xl shadow-lg flex items-center justify-between px-5 transition-all duration-300 border-t border-black/10 relative"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <div className="text-xs font-extrabold tracking-wider filter drop-shadow-sm flex items-center gap-2">
                  <span
                    className={
                      selectedColor.hex === '#F4F5F0' || selectedColor.hex === '#C8B9A6'
                        ? 'text-slate-900 font-black'
                        : 'text-white'
                    }
                  >
                    {selectedProfile === 'k-style'
                      ? 'Seamless K-Style Gutter Run'
                      : selectedProfile === 'half-round'
                      ? 'Seamless Half-Round Trough'
                      : 'Commercial Box Gutter Channel'}
                  </span>
                </div>

                <div
                  className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                    selectedColor.hex === '#F4F5F0' || selectedColor.hex === '#C8B9A6'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-900'
                  }`}
                >
                  {selectedColor.category}
                </div>
              </div>

              {/* Downspout drop simulation */}
              <div className="flex justify-end pr-8 pt-1">
                <div
                  className="w-7 h-28 rounded-b-md shadow-md border-x border-b border-black/10 flex items-center justify-center"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  <div className="w-1 h-full bg-black/10" />
                </div>
              </div>

              {/* Siding wall backdrop */}
              <div className="text-center text-[10px] text-slate-400 font-semibold tracking-wider pt-2 uppercase">
                Exterior Siding Elevation Preview
              </div>
            </div>

            {/* Spec Card for Selected Color */}
            <div className="mt-6 p-4 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Finish Specification:</span>
                <span className="font-bold text-[#F36B21]">{selectedColor.finish}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Hex Code:</span>
                <span className="font-mono text-slate-800">{selectedColor.hex}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Recommended Match:</span>
                <span className="text-slate-600 text-right max-w-[240px] truncate">{selectedColor.idealFor}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-orange-200">
                <span className="font-bold text-slate-700">Durability Guarantee:</span>
                <span className="text-emerald-700 font-bold">{selectedColor.warranty}</span>
              </div>
            </div>

            {/* Apply Color Button */}
            <button
              onClick={() => onSelectColorForQuote && onSelectColorForQuote(`${selectedColor.name} (${selectedProfile})`)}
              className="mt-6 w-full py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Apply "{selectedColor.name}" To Free Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Color Swatches Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
              <h4 className="font-extrabold text-base text-slate-900 mb-1">
                Available Swatches ({GUTTER_COLORS.length})
              </h4>
              <p className="text-xs text-slate-500 mb-6">
                Click any color swatch to load its real-time specification and architectural suitability.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {GUTTER_COLORS.map((c) => {
                  const isSelected = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#F36B21] bg-orange-50/50 shadow-md ring-2 ring-orange-500/30'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm border border-slate-300 flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 stroke-[3] ${
                              c.hex === '#F4F5F0' || c.hex === '#C8B9A6' ? 'text-slate-900' : 'text-white'
                            }`}
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-slate-900 block truncate">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                          {c.finish}
                        </span>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mt-1 block">
                          {c.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#F36B21] flex-shrink-0" />
                <p className="text-xs text-slate-600 leading-snug">
                  <strong className="text-slate-900">Custom Paint Matching:</strong> Need an exact Sherwin-Williams or Benjamin Moore match for historic districts? We offer custom enamel roll-coating upon request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
