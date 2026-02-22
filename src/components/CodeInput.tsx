import React from 'react';
import { useCodeLoomStore } from '../store/useCodeLoomStore';
import { detectLanguage } from '../utils/detectLanguage';

export const CodeInput = () => {
  const { code, setCode, setLanguage } = useCodeLoomStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Auto-detect language
    const detected = detectLanguage(newCode);
    if (detected) {
        setLanguage(detected);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-surface-dark/50 backdrop-blur-sm border border-surface-raised rounded-xl shadow-neumorphic-pressed">
      <label className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
        Source Code
      </label>
      <textarea
        className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-sm text-slate-300 placeholder-slate-600"
        value={code}
        onChange={handleChange}
        placeholder="Paste your code here..."
        spellCheck={false}
      />
    </div>
  );
};
