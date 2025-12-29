
import React, { useCallback } from 'react';
import { ELEMENTS } from './data';
import ElementCell from './components/ElementCell';
import Legend from './components/Legend';

const App: React.FC = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 md:p-8 print:p-0 print:bg-white">
      {/* Header & Controls - Hidden on print */}
      <header className="no-print flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">专业化学元素周期表</h1>
          <p className="text-sm text-gray-500 mt-1">
            双语 Pinyin 对照 · A4 横向优化版
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-8 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            打印本页 (A4 横向)
          </button>
          <div className="flex flex-col items-end text-[10px] text-gray-400 font-medium">
            <span>方向：<b>横向 (Landscape)</b></span>
            <span>边距：<b>无 (None)</b></span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex justify-center print:block">
        {/* 核心打印容器 */}
        <div className="print-area bg-white p-6 shadow-2xl border border-gray-200 print:p-0 print:m-0 print:border-none print:shadow-none">
          
          <Legend />

          {/* 周期表网格 */}
          <div className="grid-table bg-white border border-black"
               style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                 // 明确 11 行的高度分配
                 gridTemplateRows: '1.2rem repeat(7, 1fr) 0.5rem repeat(2, 1fr)',
                 width: '100%',
                 minWidth: '1000px',
                 minHeight: '520px' 
               }}>
            
            {/* Column Indices */}
            {[...Array(18)].map((_, i) => (
              <div key={i} className="text-[10px] text-gray-400 font-bold text-center flex items-center justify-center border-b border-gray-100 bg-gray-50/50 print:text-[8px] print:h-4" 
                   style={{ gridRow: 1, gridColumn: i + 1 }}>
                {i + 1}
              </div>
            ))}

            {/* Elements */}
            {ELEMENTS.map((element) => (
              <ElementCell 
                key={element.number} 
                element={element} 
                rowOffset={1} 
              />
            ))}

            {/* Gap Row 9 */}
            <div style={{ gridRow: 9, gridColumn: '1 / span 18' }}></div>

            {/* Labels Row 10, 11 */}
            <div className="flex flex-col items-end justify-center pr-1 text-right border-r border-gray-300 mr-[0.5px] leading-none" 
                 style={{ gridRow: 10, gridColumn: 3 }}>
              <span className="text-[8px] font-bold text-gray-700">镧系 *</span>
            </div>
            
            <div className="flex flex-col items-end justify-center pr-1 text-right border-r border-gray-300 mr-[0.5px] leading-none" 
                 style={{ gridRow: 11, gridColumn: 3 }}>
              <span className="text-[8px] font-bold text-gray-700">锕系 **</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="no-print mt-8 text-center text-xs text-gray-400 pb-10">
        Professional Chemistry Reference Tool. Follows IUPAC Standards.
      </footer>

      <style>{`
        @media print {
          @page {
            size: landscape;
            margin: 0; /* 彻底移除物理边距 */
          }
          
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }

          .no-print {
            display: none !important;
          }

          .print-area {
            width: 297mm !important; /* A4 横向宽度 */
            height: 210mm !important; /* A4 横向高度 */
            padding: 10mm !important; /* 在容器内部留出 10mm 边距，比外部边距更稳定 */
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
          }

          .grid-table {
            flex: 1 !important; /* 自动撑满剩余空间 */
            width: 100% !important;
            min-height: 0 !important; /* 允许压缩 */
          }

          /* 防止任何元素产生第二页 */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
