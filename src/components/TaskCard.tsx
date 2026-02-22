import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../store/useStore';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const energyColor = 
    task.energy === 'high' ? 'text-secondary-magenta' :
    task.energy === 'medium' ? 'text-secondary-lime' :
    'text-primary';
  
  const borderColor = 
    task.energy === 'high' ? 'border-secondary-magenta/50' :
    task.energy === 'medium' ? 'border-secondary-lime/50' :
    'border-primary/50';

  const shadowColor = 
    task.energy === 'high' ? 'shadow-[0_0_15px_rgba(249,31,222,0.15)]' :
    task.energy === 'medium' ? 'shadow-[0_0_15px_rgba(190,249,31,0.15)]' :
    'shadow-[0_0_15px_rgba(31,249,249,0.15)]';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={clsx(
        "flex flex-col gap-2 min-w-[120px] p-3 rounded-xl bg-surface-dark border transition-all cursor-grab active:cursor-grabbing",
        borderColor,
        shadowColor,
        isDragging ? 'opacity-50 z-50 scale-105' : 'opacity-100',
        "hover:border-opacity-100 hover:scale-[1.02]"
      )}
    >
      <div className="flex justify-between items-start">
         <span className={clsx("material-symbols-outlined text-sm", energyColor)}>
            {task.energy === 'high' ? 'bolt' : task.energy === 'medium' ? 'battery_charging_full' : 'spa'}
         </span>
         <span className="text-[10px] font-mono text-slate-500 font-bold">{task.duration}m</span>
      </div>
      <h3 className="text-xs font-bold text-slate-200 leading-tight line-clamp-2">
        {task.title}
      </h3>
    </div>
  );
};
