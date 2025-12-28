
export type ElementCategory = 
  | 'alkali-metal'
  | 'alkaline-earth-metal'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'halogen'
  | 'unknown';

export interface ChemicalElement {
  number: number;
  symbol: string;
  chinese: string;
  pinyin: string;
  japanese: string;
  katakana: string;
  english: string;
  ipa: string;
  category: ElementCategory;
  row: number; // 1-7
  column: number; // 1-18
}

export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  'alkali-metal': '#FF6666',
  'alkaline-earth-metal': '#FFDEAD',
  'transition-metal': '#FFC0C0',
  'post-transition-metal': '#CCCCCC',
  'metalloid': '#CCCC99',
  'reactive-nonmetal': '#A0FFA0',
  'noble-gas': '#C0FFFF',
  'lanthanide': '#FFBFFF',
  'actinide': '#FF99CC',
  'halogen': '#FFFF99',
  'unknown': '#EEEEEE'
};

export const CATEGORY_LABELS: Record<ElementCategory, { zh: string; ja: string; en: string }> = {
  'alkali-metal': { zh: '碱金属', ja: 'アルカリ金属', en: 'Alkali metals' },
  'alkaline-earth-metal': { zh: '碱土金属', ja: 'アルカリ土類金属', en: 'Alkaline earth metals' },
  'transition-metal': { zh: '过渡金属', ja: '遷移金属', en: 'Transition metals' },
  'post-transition-metal': { zh: '后过渡金属', ja: '典型金属', en: 'Post-transition metals' },
  'metalloid': { zh: '类金属', ja: '半金属', en: 'Metalloids' },
  'reactive-nonmetal': { zh: '非金属', ja: '非金属', en: 'Reactive nonmetals' },
  'noble-gas': { zh: '稀有气体', ja: '希ガス', en: 'Noble gases' },
  'lanthanide': { zh: '镧系元素', ja: 'ランタノイド', en: 'Lanthanides' },
  'actinide': { zh: '锕系元素', ja: 'アクチノイド', en: 'Actinides' },
  'halogen': { zh: '卤族元素', ja: 'ハロゲン', en: 'Halogens' },
  'unknown': { zh: '未知', ja: '不明', en: 'Unknown' }
};
