
import React from 'react';
import { ChemicalElement, CATEGORY_COLORS } from '../types';

interface ElementCellProps {
  element: ChemicalElement;
  rowOffset?: number;
}

const ElementCell: React.FC<ElementCellProps> = ({ element, rowOffset = 0 }) => {
  const bgColor = CATEGORY_COLORS[element.category];

  // 检查是否包含汉字
  const hasKanji = (text: string) => /[一-龠]/.test(text);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        gridRow: element.row + rowOffset,
        gridColumn: element.column,
      }}
      className="border-[0.5px] border-black/30 flex flex-col p-[1px] min-h-[3.8rem] print:min-h-0 relative overflow-hidden text-black leading-none"
    >
      {/* Header Row: Number and Symbol together to save space */}
      <div className="flex items-baseline justify-between px-0.5 mt-0.5">
        <span className="text-[7px] font-bold opacity-70">{element.number}</span>
        <span className="text-base font-bold tracking-tighter leading-none">{element.symbol}</span>
        <span className="w-2"></span> {/* Spacer to balance number width */}
      </div>

      {/* Multilingual Details - Compact for printing */}
      <div className="flex flex-col gap-[0.2px] mt-0.5 pb-0.5 items-center">
        <div className="text-[7px] leading-none">
          <span className="font-bold">{element.chinese}</span>
          <span className="text-[5.5px] ml-0.5 font-normal print:scale-[0.8] inline-block origin-left">{element.pinyin}</span>
        </div>
        
        <div className="text-[5.5px] leading-tight italic opacity-90 truncate max-w-full print:scale-[0.9]">
          {element.japanese}
          {hasKanji(element.japanese) && element.japanese !== element.katakana ? ` ${element.katakana}` : ''}
        </div>

        <div className="text-[4.5px] leading-none opacity-80 truncate max-w-full text-center">
          {element.english}
        </div>
      </div>
    </div>
  );
};

export default ElementCell;
