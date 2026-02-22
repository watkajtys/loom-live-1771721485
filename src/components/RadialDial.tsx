import { useDroppable } from '@dnd-kit/core';
import { useStore } from '../store/useStore';
import { timeToDegrees, getPointOnCircle } from '../utils/time';

const RADIUS = {
  high: 190,
  medium: 155,
  low: 120,
};

const STROKE_WIDTH = 18;

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    let end = endAngle;
    if (end < startAngle) end += 360;
    
    const p1 = getPointOnCircle(radius, startAngle, x, y);
    const p2 = getPointOnCircle(radius, end, x, y);

    const largeArcFlag = end - startAngle <= 180 ? "0" : "1";
    
    return [
        "M", p1.x, p1.y, 
        "A", radius, radius, 0, largeArcFlag, 1, p2.x, p2.y
    ].join(" ");
};

export const RadialDial = () => {
  const { setNodeRef } = useDroppable({
    id: 'radial-dial',
  });
  
  const allTasks = useStore((state) => state.tasks);
  const tasks = allTasks.filter((t) => t.assignedTime !== null);
  const currentTime = useStore((state) => state.currentTime);

  const timeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const timeDegrees = timeToDegrees(timeMinutes);

  return (
    <section className="relative flex-shrink-0 w-full aspect-square flex items-center justify-center p-4 my-2">
      {/* Center Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full border border-surface-raised bg-surface-dark shadow-neumorphic-flat flex items-center justify-center z-10 pointer-events-auto cursor-pointer hover:bg-surface-raised transition-colors group">
          <span className="material-symbols-outlined text-slate-600 text-4xl group-hover:text-primary transition-colors">play_circle</span>
        </div>
      </div>

      <div ref={setNodeRef} id="radial-dial" className="relative w-full h-full max-w-[360px] max-h-[360px]">
        <svg className="w-full h-full" viewBox="0 0 400 400">
           <defs>
            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
             <filter id="glow-magenta" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
             <filter id="glow-lime" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>

          {/* Background Rings */}
          <circle cx="200" cy="200" r={RADIUS.high} fill="none" stroke="#1f2529" strokeWidth="24" className="transition-colors hover:stroke-surface-raised" />
          <circle cx="200" cy="200" r={RADIUS.medium} fill="none" stroke="#1f2529" strokeWidth="24" className="transition-colors hover:stroke-surface-raised" />
          <circle cx="200" cy="200" r={RADIUS.low} fill="none" stroke="#1f2529" strokeWidth="24" className="transition-colors hover:stroke-surface-raised" />
          <circle cx="200" cy="200" r={85} fill="none" stroke="#1f2529" strokeWidth="24" />

          {/* Render Tasks */}
          {tasks.map((task) => {
             const startAngle = timeToDegrees(task.assignedTime!);
             const endAngle = timeToDegrees(task.assignedTime! + task.duration);
             const radius = RADIUS[task.energy];
             const color = task.energy === 'high' ? '#f91fde' : task.energy === 'medium' ? '#bef91f' : '#1ff9f9';
             const filter = task.energy === 'high' ? 'url(#glow-magenta)' : task.energy === 'medium' ? 'url(#glow-lime)' : 'url(#glow-cyan)';
             
             return (
               <g key={task.id} className="cursor-pointer hover:opacity-80 transition-opacity">
                 <path 
                   d={describeArc(200, 200, radius, startAngle, endAngle)} 
                   fill="none" 
                   stroke={color} 
                   strokeWidth={STROKE_WIDTH} 
                   strokeLinecap="round"
                   filter={filter}
                 />
               </g>
             );
          })}

          {/* Current Time Indicator (Radar Line) */}
           <line 
             x1="200" y1="200" 
             x2="200" y2="20" 
             stroke="#1ff9f9" 
             strokeWidth="2"
             strokeDasharray="4 4"
             className="opacity-50"
             transform={`rotate(${timeDegrees} 200 200)`}
           />
        </svg>
        
        {/* Radar Sweep Animation Overlay */}
        <div className="absolute inset-0 pointer-events-none radar-line z-20">
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-bottom shadow-[0_0_10px_#1ff9f9]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
