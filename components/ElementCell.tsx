
import React from 'react';
import { ChemicalElement, CATEGORY_COLORS } from '../types';

interface ElementCellProps {
  element: ChemicalElement;
  rowOffset?: number;
}

const ElementCell: React.FC<ElementCellProps> = ({ element, rowOffset = 0 }) => {
  const bgColor = CATEGORY_COLORS[element.category];

  return (
    <div
      style={{
        backgroundColor: bgColor,
        gridRow: element.row + rowOffset,
        gridColumn: element.column,
      }}
      className="border-[0.5px] border-black/40 flex flex-col justify-center items-center p-[1px] relative overflow-hidden text-black leading-none"
    >
      {/* Atomic Number - Positioned top-left to save vertical flow */}
      <span className="absolute top-0.5 left-0.5 text-[6px] font-bold opacity-60 leading-none">
        {element.number}
      </span>

      {/* Symbol - Dominant element */}
      <div className="text-sm font-black tracking-tighter mb-0.5 mt-1.5 print:text-[14px]">
        {element.symbol}
      </div>

      {/* Primary Info: Chinese & Pinyin */}
      <div className="flex flex-col items-center gap-0 w-full mb-0.5">
        <div className="flex items-baseline gap-[1px]">
          <span className="text-[9px] font-bold print:text-[10px]">{element.chinese}</span>
          <span className="text-[5px] font-normal opacity-70 scale-90 origin-left">{element.pinyin}</span>
        </div>
      </div>

      {/* Secondary Info: Japanese & English - Ultra small and centered */}
      <div className="flex flex-col items-center w-full scale-90 origin-top">
        <div className="text-[5px] opacity-80 leading-tight truncate max-w-full text-center">
          {element.japanese}
        </div>
        <div className="text-[4px] opacity-60 leading-none truncate max-w-full text-center uppercase tracking-tighter">
          {element.english}
        </div>
      </div>
    </div>
  );
};

export default ElementCell;
