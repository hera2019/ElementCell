
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
            提示：点击后请在打印设置中选择 <b>方向：横向 (Landscape)</b>
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto print:overflow-visible">
        {/* 容器：屏幕预览时 minWidth 1100px */}
        <div className="print-container mx-auto bg-white p-4 md:p-8 shadow-lg border border-gray-200"
             style={{ width: 'fit-content' }}>
          
          <Legend />

          {/* 周期表网格：明确定义 11 行的分配，防止塌陷 */}
          <div className="grid-layout bg-white border border-black shadow-sm"
               style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                 // 明确行高分配：序号行(auto) + 7行主元素(1fr) + 间隙(1rem) + 2行底表(1fr)
                 gridTemplateRows: 'auto repeat(7, 1fr) 1.2rem repeat(2, 1fr)',
                 width: '100%',
                 minWidth: '1050px',
                 minHeight: '600px' // 屏幕预览时的最小高度
               }}>
            
            {/* Column Indices (Row 1) */}
            {[...Array(18)].map((_, i) => (
              <div key={i} className="text-[10px] text-gray-400 font-bold text-center py-1 border-b border-gray-100 bg-gray-50/50" 
                   style={{ gridRow: 1, gridColumn: i + 1 }}>
                {i + 1}
              </div>
            ))}

            {/* Elements (Row 2 and beyond) */}
            {ELEMENTS.map((element) => (
              <ElementCell 
                key={element.number} 
                element={element} 
                rowOffset={1} 
              />
            ))}

            {/* Gap for Lanthanides/Actinides (Row 9) */}
            <div style={{ gridRow: 9, gridColumn: '1 / span 18' }}></div>

            {/* 镧系/锕系 标签 (Row 10, 11) */}
            <div className="flex flex-col items-end justify-center pr-2 text-right border-r border-gray-300 mr-[0.5px] leading-none gap-0.5" 
                 style={{ gridRow: 10, gridColumn: 3 }}>
              <span className="text-[9px] font-bold text-gray-700">镧系 *</span>
              <span className="text-[7px] text-gray-500 italic text-nowrap">ランタノイド</span>
              <span className="text-[7px] text-gray-400 text-nowrap">Lanthanides</span>
            </div>
            
            <div className="flex flex-col items-end justify-center pr-2 text-right border-r border-gray-300 mr-[0.5px] leading-none gap-0.5" 
                 style={{ gridRow: 11, gridColumn: 3 }}>
              <span className="text-[9px] font-bold text-gray-700">锕系 **</span>
              <span className="text-[7px] text-gray-500 italic text-nowrap">アクチノイド</span>
              <span className="text-[7px] text-gray-400 text-nowrap">Actinides</span>
            </div>
          </div>

          <footer className="mt-6 text-center text-[10px] text-gray-400 border-t pt-4 italic">
            IUPAC Periodic Table of the Elements. Optimized for Professional A4 Landscape Printing.
          </footer>
        </div>
      </main>

      <style>{`
        @media screen {
          .print-container {
            min-width: 1100px;
          }
        }

        @media print {
          @page {
            size: auto; /* 关键：设置为 auto 允许用户在打印对话框中手动选择“横向” */
            margin: 5mm;
          }
          
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .no-print {
            display: none !important;
          }

          /* 打印时容器宽度固定为 A4 横向的安全宽度 */
          .print-container {
            width: 280mm !important;
            min-width: 280mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            display: block !important;
          }

          /* 强制网格在打印时获得充足的高度，防止坍塌 */
          .grid-layout {
            display: grid !important;
            min-height: 175mm !important; /* 核心修复：强制撑开网格 */
            width: 100% !important;
          }
          
          /* 确保每个格子在打印时有最小高度感 */
          .grid-layout > div {
            min-height: 1.5rem;
          }

          /* 避免浏览器分页截断 */
          .print-container, .grid-layout {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
