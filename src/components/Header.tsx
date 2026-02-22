import { useStore } from '../store/useStore';

export const Header = () => {
  const currentTime = useStore((state) => state.currentTime);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-surface-raised bg-surface-dark/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary animate-pulse-beat" style={{ fontSize: '28px' }}>
          graphic_eq
        </span>
        <h1 className="text-lg font-bold tracking-wider text-slate-100">CIRCADIA</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-primary animate-pulse-beat leading-none">
          {formattedTime}
        </div>
        <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-1">
          CURRENT TIME
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-surface-raised transition-colors text-slate-400 hover:text-white">
        <span className="material-symbols-outlined">settings</span>
      </button>
    </header>
  );
};
