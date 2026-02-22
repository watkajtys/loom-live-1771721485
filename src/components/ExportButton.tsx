import { useState } from 'react';
import { toPng, toSvg } from 'html-to-image';

export const ExportButton = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: 'png' | 'svg') => {
    setLoading(true);
    const node = document.getElementById('preview-canvas');
    if (!node) {
        setLoading(false);
        return;
    }

    try {
        let dataUrl;
        if (format === 'png') {
            dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
        } else {
            dataUrl = await toSvg(node, { cacheBust: true });
        }
        
        const link = document.createElement('a');
        link.download = `codeloom-${Date.now()}.${format}`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('oops, something went wrong!', err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="w-full flex gap-4 mt-4">
      <button 
        onClick={() => handleExport('png')}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-raised hover:bg-surface-raised/80 text-white rounded-lg shadow-neumorphic-flat transition-all active:scale-95 disabled:opacity-50 border border-white/5"
      >
        <span className="material-symbols-outlined">image</span>
        <span className="text-xs font-bold uppercase tracking-wider">Export PNG</span>
      </button>
      <button 
        onClick={() => handleExport('svg')}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-raised hover:bg-surface-raised/80 text-white rounded-lg shadow-neumorphic-flat transition-all active:scale-95 disabled:opacity-50 border border-white/5"
      >
        <span className="material-symbols-outlined">code</span>
        <span className="text-xs font-bold uppercase tracking-wider">Export SVG</span>
      </button>
    </div>
  );
};
