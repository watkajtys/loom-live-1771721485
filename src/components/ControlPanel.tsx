import { useCodeLoomStore } from '../store/useCodeLoomStore';
import { clsx } from 'clsx';

export const ControlPanel = () => {
  const { 
    language, setLanguage,
    padding, setPadding,
    borderRadius, setBorderRadius,
    typographyScale, setTypographyScale,
    background, setBackground,
    darkMode, toggleDarkMode
  } = useCodeLoomStore();

  const backgroundGradients = [
    'linear-gradient(135deg, #1f2529, #0f1315)', // Default Dark
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
    'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  ];

  return (
    <div className="w-full flex flex-col p-6 bg-surface-dark/80 backdrop-blur-md border border-surface-raised rounded-xl shadow-glass gap-6">
      <div className="flex justify-between items-center border-b border-surface-raised pb-4">
        <h2 className="text-lg font-bold text-slate-200 tracking-wider font-display">SETTINGS</h2>
        <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-surface-raised transition-colors text-slate-400 hover:text-white"
            title="Toggle Dark Mode"
        >
            <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
      </div>

      {/* Language */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Language</label>
        <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-surface-raised text-slate-200 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary block w-full border border-surface-dark/50"
        >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="jsx">JSX</option>
            <option value="tsx">TSX</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
            <option value="json">JSON</option>
            <option value="bash">Bash</option>
        </select>
      </div>

      {/* Padding */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Padding</label>
            <span className="text-xs text-primary">{padding}px</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max="128" 
            value={padding} 
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full h-2 bg-surface-raised rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Border Radius */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Radius</label>
            <span className="text-xs text-primary">{borderRadius}px</span>
        </div>
        <input 
            type="range" 
            min="0" 
            max="64" 
            value={borderRadius} 
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            className="w-full h-2 bg-surface-raised rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Typography Scale */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
            <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Scale</label>
            <span className="text-xs text-primary">{typographyScale}x</span>
        </div>
        <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1"
            value={typographyScale} 
            onChange={(e) => setTypographyScale(Number(e.target.value))}
            className="w-full h-2 bg-surface-raised rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      {/* Background Gradient */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-400 tracking-wider uppercase">Background</label>
        <div className="grid grid-cols-4 gap-2">
            {backgroundGradients.map((grad, i) => (
                <button 
                    key={i}
                    onClick={() => setBackground(grad)}
                    className={clsx(
                        "w-8 h-8 rounded-full shadow-md hover:scale-110 transition-transform border-2",
                        background === grad ? "border-white" : "border-transparent"
                    )}
                    style={{ background: grad }}
                />
            ))}
        </div>
      </div>
    </div>
  );
};
