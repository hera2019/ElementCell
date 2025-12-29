
import React from 'react';
import { CATEGORY_COLORS, CATEGORY_LABELS, ElementCategory } from '../types';

const Legend: React.FC = () => {
  const categories: ElementCategory[] = [
    'reactive-nonmetal', 'noble-gas', 'alkali-metal', 'alkaline-earth-metal',
    'metalloid', 'halogen', 'transition-metal', 'post-transition-metal',
    'lanthanide', 'actinide', 'unknown'
  ];

  return (
    <div className="flex flex-col gap-1 mb-2 p-2 bg-white border border-gray-300 rounded shadow-sm print:shadow-none print:border-none print:p-0 print:mb-1">
      <div className="font-bold text-[10px] mb-0.5 text-gray-700 print:text-[8px] print:mb-0">
        凡例 / Color Legend
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 print:gap-x-2 print:gap-y-0">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5 print:gap-1">
            <div
              className="w-3 h-3 border border-black/20 rounded-sm shrink-0 print:w-2 print:h-2"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-bold text-gray-900 print:text-[7px]">{CATEGORY_LABELS[cat].zh}</span>
              <span className="text-[8px] text-gray-400 print:text-[6px]">{CATEGORY_LABELS[cat].en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
