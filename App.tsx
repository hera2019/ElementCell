
import React, { useCallback } from 'react';
import { ELEMENTS } from './data';
import ElementCell from './components/ElementCell';
import Legend from './components/Legend';

const App: React.FC = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
      {/* Header & Controls - Hidden on print */}
      <header className="no-print flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">专业级多语化学元素周期表</h1>
          <p className="text-sm text-gray-600">
            符合 A4 纸张打印比例 (横向) | 简体中文 · 日本語 · English
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            立即打印 / 保存 PDF
          </button>
          <span className="text-[10px] text-gray-400 italic">
            提示：若打印预览显示两页，请在打印设置中将“方向”设为 <b>横向</b>
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto">
        <div className="print-container mx-auto bg-white p-4 md:p-8 shadow-lg border border-gray-200"
             style={{ width: 'fit-content' }}>
          
          <Legend />

          {/* 周期表网格 */}
          <div className="grid grid-cols-18 bg-white border border-black shadow-sm"
               style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                 gridAutoRows: 'minmax(4.2rem, auto)',
                 width: '100%'
               }}>
            
            {ELEMENTS.map((element) => (
              <ElementCell key={element.number} element={element} />
            ))}

            {/* Column Indices */}
            {[...Array(18)].map((_, i) => (
              <div key={i} className="text-[10px] text-gray-400 font-bold text-center py-1 border-b border-gray-100" style={{ gridRow: 1, gridColumn: i + 1 }}>
                {i + 1}
              </div>
            ))}

            {/* Gap for Lanthanides/Actinides */}
            <div className="h-4" style={{ gridRow: 8, gridColumn: '1 / span 18' }}></div>

            {/* 镧系/锕系 标签 */}
            <div className="flex flex-col items-end justify-center pr-2 text-right border-r border-gray-300 mr-[0.5px] leading-none gap-0.5" 
                 style={{ gridRow: 9, gridColumn: 3 }}>
              <span className="text-[9px] font-bold text-gray-700">镧系 *</span>
              <span className="text-[7px] text-gray-500 italic">ランタノイド</span>
              <span className="text-[7px] text-gray-400">Lanthanides</span>
            </div>
            
            <div className="flex flex-col items-end justify-center pr-2 text-right border-r border-gray-300 mr-[0.5px] leading-none gap-0.5" 
                 style={{ gridRow: 10, gridColumn: 3 }}>
              <span className="text-[9px] font-bold text-gray-700">锕系 **</span>
              <span className="text-[7px] text-gray-500 italic">アクチノイド</span>
              <span className="text-[7px] text-gray-400">Actinides</span>
            </div>
          </div>

          <footer className="mt-6 text-center text-[10px] text-gray-400 border-t pt-4 italic">
            IUPAC Periodic Table of the Elements. Optimized for Professional A4 Landscape Printing.
          </footer>
        </div>
      </main>

      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 5mm;
          }
          html, body {
            width: 297mm;
            height: 210mm;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #root {
            width: 100%;
          }
          .print-container {
            width: 280mm !important; /* 精确锁定 A4 横向宽度，预留边距 */
            height: auto;
            margin: 0 auto !important;
            padding: 5mm !important;
            box-shadow: none !important;
            border: none !important;
            min-width: 0 !important;
            transform-origin: top left;
          }
          .no-print {
            display: none !important;
          }
          /* 强制不分页 */
          .grid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
        .grid-cols-18 {
          grid-template-columns: repeat(18, minmax(0, 1fr));
        }
      `}</style>
    </div>
  );
};

export default App;
