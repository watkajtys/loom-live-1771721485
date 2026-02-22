import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 
// Import common languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markup'; // html
import 'prismjs/components/prism-bash';

import { useCodeLoomStore } from '../store/useCodeLoomStore';

export const PreviewCanvas = () => {
  const { code, language, padding, borderRadius, typographyScale, background, darkMode } = useCodeLoomStore();
  const codeRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (codeRef.current) {
      // Force Prism to highlight again
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-black/20 overflow-auto">
      <div 
        id="preview-canvas"
        className="transition-all duration-300 ease-in-out relative shadow-2xl min-w-[300px]"
        style={{
          background: background,
          padding: `${padding}px`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <div 
            className={`relative overflow-hidden ${darkMode ? 'bg-black/40' : 'bg-white/80'} backdrop-blur-md border border-white/10 shadow-lg`}
            style={{
                borderRadius: `${Math.max(4, borderRadius - 4)}px`, 
            }}
        >
            {/* Window Controls (Mac-style) */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
                <div className="flex-1 text-center text-[10px] text-white/30 font-mono uppercase tracking-widest ml-[-36px]">
                    {language}
                </div>
            </div>

            <div 
                className="overflow-x-auto"
                style={{
                    fontSize: `${14 * typographyScale}px`,
                    lineHeight: `${1.5 * typographyScale}`,
                }}
            >
                <pre 
                    className={`!bg-transparent !m-0 !p-6 font-mono ${!darkMode ? '!text-slate-800' : '!text-slate-200'}`} 
                    style={{ margin: 0 }}
                >
                    <code ref={codeRef} className={`language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
        
        {/* Watermark / Branding */}
        <div className="absolute bottom-2 right-4 opacity-30 pointer-events-none">
             <span className="text-[10px] font-bold text-white uppercase tracking-widest font-display">CodeLoom</span>
        </div>
      </div>
    </div>
  );
};
