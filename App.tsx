
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
            设置提示：<b>方向选择“横向”</b>，<b>边距选择“无”或“最小”</b>
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto print:overflow-visible">
        {/* 容器：打印时严格限制在 A4 横向范围内 */}
        <div className="print-container mx-auto bg-white p-4 md:p-8 shadow-lg border border-gray-200 print:p-0 print:m-0 print:border-none print:shadow-none"
             style={{ width: 'fit-content' }}>
          
          <Legend />

          {/* 周期表网格 */}
          <div className="grid-layout bg-white border border-black"
               style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                 gridTemplateRows: 'auto repeat(7, 1fr) 0.8rem repeat(2, 1fr)',
                 width: '100%',
                 minWidth: '1050px',
                 minHeight: '550px' 
               }}>
            
            {/* Column Indices (Row 1) */}
            {[...Array(18)].map((_, i) => (
              <div key={i} className="text-[10px] text-gray-400 font-bold text-center py-1 border-b border-gray-100 bg-gray-50/50 print:py-0 print:text-[8px]" 
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

            {/* Gap (Row 9) */}
            <div style={{ gridRow: 9, gridColumn: '1 / span 18' }}></div>

            {/* Labels (Row 10, 11) */}
            <div className="flex flex-col items-end justify-center pr-2 text-right border-r border-gray-300 mr-[0.5px] leading-none gap-0.5 print:gap-0" 
                 style={{ gridRow: 10, gridColumn: 3 }}>
              <span className="text-[9px] font-bold text-gray-700 print:text-[7px]">镧系 *</span>
              <span className="text-[7px] text-gray-400 text-nowrap print:hidden">Lanthanides</span>
            </div>
            
            <div className="flex flex-col items-end justify-center pr-2 text-right border-r border-gray-300 mr-[0.5px] leading-none gap-0.5 print:gap-0" 
                 style={{ gridRow: 11, gridColumn: 3 }}>
              <span className="text-[9px] font-bold text-gray-700 print:text-[7px]">锕系 **</span>
              <span className="text-[7px] text-gray-400 text-nowrap print:hidden">Actinides</span>
            </div>
          </div>

          <footer className="mt-4 text-center text-[10px] text-gray-400 border-t pt-2 italic print:mt-1 print:pt-1 print:text-[7px]">
            IUPAC Periodic Table. Professional Edition.
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
            size: auto; /* 允许手动选横向 */
            margin: 8mm; /* 给一点页边距，防止某些打印机切边 */
          }
          
          body {
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .print-container {
            width: 100% !important;
            max-width: 285mm !important; /* A4 横向是 297mm，扣除页边距 */
            margin: 0 auto !important;
            padding: 0 !important;
            display: block !important;
          }

          /* 核心调整：减小最小高度，确保 Legend + Grid < 210mm */
          .grid-layout {
            display: grid !important;
            min-height: 155mm !important; 
            width: 100% !important;
          }

          /* 确保底部注记不会撑开新页 */
          footer {
            page-break-after: avoid;
          }

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
