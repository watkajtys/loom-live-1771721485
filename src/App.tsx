import { useEffect, useState } from 'react';
import { DndContext, type DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor, type DragStartEvent } from '@dnd-kit/core';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { RadialDial } from './components/RadialDial';
import { TaskBacklog } from './components/TaskBacklog';
import { useStore } from './store/useStore';
import { calculateAngle, degreesToTime } from './utils/time';
import { TaskCard } from './components/TaskCard';

function App() {
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const moveTask = useStore((state) => state.moveTask);
  const tasks = useStore((state) => state.tasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Always clear active ID first
    setActiveId(null);

    if (over && over.id === 'radial-dial') {
        const droppedRect = active.rect.current.translated;
        if (!droppedRect) return;

        const dropX = droppedRect.left + droppedRect.width / 2;
        const dropY = droppedRect.top + droppedRect.height / 2;

        const dialElement = document.getElementById('radial-dial');
        
        if (dialElement) {
            const dialRect = dialElement.getBoundingClientRect();
            const centerX = dialRect.left + dialRect.width / 2;
            const centerY = dialRect.top + dialRect.height / 2;

            const angle = calculateAngle(dropX, dropY, centerX, centerY);
            const time = degreesToTime(angle);
            
            moveTask(active.id as string, time);
        }
    }
  };

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <Layout>
      <Header />
      <DndContext 
        sensors={sensors} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24 relative">
           <RadialDial />
           <TaskBacklog />
        </main>
        <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
      
      {/* Footer / Dock */}
      <footer className="absolute bottom-0 w-full px-6 py-4 bg-surface-dark/95 backdrop-blur-xl border-t border-surface-raised z-30">
        <div className="flex items-center justify-between gap-4 max-w-sm mx-auto">
            <button className="flex-1 group h-14 rounded-lg bg-surface-raised shadow-neumorphic-flat active:shadow-neumorphic-pressed active:scale-95 transition-all flex flex-col items-center justify-center border border-transparent active:border-red-500/20">
                <span className="material-symbols-outlined text-slate-400 group-active:text-red-500 transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>stop</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Stop</span>
            </button>
            <button className="flex-[1.5] group h-16 -mt-4 rounded-xl bg-surface-raised shadow-[0_0_20px_rgba(31,249,249,0.1),_4px_4px_10px_rgba(0,0,0,0.5)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)] active:scale-95 transition-all flex flex-col items-center justify-center border border-primary/20 hover:border-primary/50">
                <span className="material-symbols-outlined text-primary group-hover:drop-shadow-[0_0_5px_#1ff9f9] transition-all" style={{ fontSize: '36px', fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                <span className="text-[10px] font-bold text-primary uppercase mt-1">Focus</span>
            </button>
            <button className="flex-1 group h-14 rounded-lg bg-surface-raised shadow-neumorphic-flat active:shadow-neumorphic-pressed active:scale-95 transition-all flex flex-col items-center justify-center border border-transparent active:border-yellow-500/20">
                <span className="material-symbols-outlined text-slate-400 group-active:text-yellow-500 transition-colors">delete_outline</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Clear</span>
            </button>
        </div>
      </footer>
    </Layout>
  );
}

export default App;
