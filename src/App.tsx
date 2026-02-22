import { CodeInput } from './components/CodeInput';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ControlPanel } from './components/ControlPanel';
import { ExportButton } from './components/ExportButton';
import { useCodeLoomStore } from './store/useCodeLoomStore';

function App() {
  const { darkMode } = useCodeLoomStore();

  return (
    <div className={`min-h-screen w-full flex flex-col ${darkMode ? 'dark' : ''} bg-background-dark text-slate-100 font-display`}>
      {/* Background Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-grid"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-surface-raised bg-surface-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary animate-pulse-beat" style={{ fontSize: '28px' }}>code</span>
            <h1 className="text-xl font-bold tracking-wider font-display">
                CODELOOM <span className="text-primary font-normal text-sm tracking-widest opacity-80">STUDIO</span>
            </h1>
        </div>
        <div className="flex items-center gap-4">
             <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Documentation</button>
             <button className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Github</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
         {/* Left/Top Panel: Controls & Input */}
         <aside className="w-full lg:w-[400px] flex-shrink-0 flex flex-col bg-surface-dark/90 border-r border-surface-raised overflow-y-auto p-6 gap-6 z-40 backdrop-blur-md shadow-2xl">
            <ControlPanel />
            <div className="flex-1 min-h-[300px] flex flex-col">
                <CodeInput />
            </div>
            <ExportButton />
         </aside>

         {/* Center Panel: Preview */}
         <section className="flex-1 relative overflow-hidden flex flex-col bg-black/40">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary-magenta/5 pointer-events-none"></div>
            
            <PreviewCanvas />
         </section>
      </main>
    </div>
  );
}

export default App;
