
import React from 'react';
import { ChemicalElement, CATEGORY_COLORS } from '../types';

interface ElementCellProps {
  element: ChemicalElement;
}

const ElementCell: React.FC<ElementCellProps> = ({ element }) => {
  const bgColor = CATEGORY_COLORS[element.category];

  // 检查是否包含汉字，用于决定是否显示假名注音
  const hasKanji = (text: string) => /[一-龠]/.test(text);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        gridRow: element.row,
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
        {/* 中文 & 拼音: 尽量一行，不行则自动换行，不截断 */}
        <div className="text-[6.5px] leading-[1.1] text-center break-words">
          <span className="font-bold">{element.chinese}</span>&nbsp;{element.pinyin}
        </div>
        
        {/* 日文: 汉字+假名，如果是片假名则不重复显示注音 */}
        <div className="text-[5.5px] leading-[1.1] text-center break-words italic opacity-90">
          {element.japanese}
          {hasKanji(element.japanese) && element.japanese !== element.katakana ? ` ${element.katakana}` : ''}
        </div>

        {/* 英文 & IPA: 针对极长单词如 Rutherfordium 使用 break-all */}
        <div className="text-[5px] leading-[1] text-center break-all opacity-80">
          {element.english} {element.ipa}
        </div>
      </div>
    </div>
  );
};

export default ElementCell;
