
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
      className="border-[0.5px] border-black/30 flex flex-col p-[2px] min-h-[4.5rem] relative overflow-hidden text-black leading-tight"
    >
      {/* Atomic Number */}
      <div className="text-[7px] font-bold absolute top-0.5 left-0.5">
        {element.number}
      </div>

      {/* Symbol */}
      <div className="flex-1 flex items-center justify-center mt-1">
        <span className="text-xl font-bold tracking-tighter">{element.symbol}</span>
      </div>

      {/* Multilingual Details */}
      <div className="flex flex-col gap-[0.5px] mt-0.5 pb-0.5">
        <div className="text-[6.5px] leading-[1.1] text-center break-words">
          <span className="font-bold">{element.chinese}</span>&nbsp;{element.pinyin}
        </div>
        
        <div className="text-[5.5px] leading-[1.1] text-center break-words italic opacity-90">
          {element.japanese}
          {hasKanji(element.japanese) && element.japanese !== element.katakana ? ` ${element.katakana}` : ''}
        </div>

        <div className="text-[5px] leading-[1] text-center break-all opacity-80">
          {element.english} {element.ipa}
        </div>
      </div>
    </div>
  );
};

export default ElementCell;
