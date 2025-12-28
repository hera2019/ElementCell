
import React from 'react';
import { CATEGORY_COLORS, CATEGORY_LABELS, ElementCategory } from '../types';

const Legend: React.FC = () => {
  const categories: ElementCategory[] = [
    'reactive-nonmetal', 'noble-gas', 'alkali-metal', 'alkaline-earth-metal',
    'metalloid', 'halogen', 'transition-metal', 'post-transition-metal',
    'lanthanide', 'actinide', 'unknown'
  ];

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
      <div className="font-bold text-xs mb-1 border-b border-gray-200 pb-1 text-gray-700">
        颜色分类说明 / 凡例 / Color Categories
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-4">
        {categories.map((cat) => (
          <div key={cat} className="flex items-start gap-2">
            <div
              className="w-5 h-5 border border-black/20 rounded-sm shrink-0 mt-0.5 shadow-sm"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold leading-tight text-gray-900">{CATEGORY_LABELS[cat].zh}</span>
              <span className="text-[8px] text-gray-500 italic leading-tight">{CATEGORY_LABELS[cat].ja}</span>
              <span className="text-[8px] text-gray-400 leading-tight">{CATEGORY_LABELS[cat].en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
