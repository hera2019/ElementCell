
import React from 'react';
import { CATEGORY_COLORS, CATEGORY_LABELS, ElementCategory } from '../types';

const Legend: React.FC = () => {
  const categories: ElementCategory[] = [
    'reactive-nonmetal', 'noble-gas', 'alkali-metal', 'alkaline-earth-metal',
    'metalloid', 'halogen', 'transition-metal', 'post-transition-metal',
    'lanthanide', 'actinide', 'unknown'
  ];

  return (
    <div className="flex flex-col gap-2 mb-4 p-3 bg-white border border-gray-300 rounded-lg shadow-sm print:shadow-none print:border-none print:p-0 print:mb-2">
      <div className="font-bold text-xs mb-1 border-b border-gray-200 pb-1 text-gray-700 print:text-[8px] print:mb-0.5">
        颜色分类 / 凡例 / Color Legend
      </div>
      {/* 打印时使用更小的间距和字体 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2 print:flex print:flex-wrap print:gap-x-4 print:gap-y-0.5">
        {categories.map((cat) => (
          <div key={cat} className="flex items-start gap-2 print:gap-1 print:items-center">
            <div
              className="w-4 h-4 border border-black/20 rounded-sm shrink-0 shadow-sm print:w-2 print:h-2 print:shadow-none"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            <div className="flex flex-col gap-0.5 print:flex-row print:gap-1">
              <span className="text-[10px] font-bold leading-tight text-gray-900 print:text-[7px]">{CATEGORY_LABELS[cat].zh}</span>
              <span className="text-[8px] text-gray-500 italic leading-tight print:hidden">{CATEGORY_LABELS[cat].ja}</span>
              <span className="text-[8px] text-gray-400 leading-tight print:text-[6px] print:italic">{CATEGORY_LABELS[cat].en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
