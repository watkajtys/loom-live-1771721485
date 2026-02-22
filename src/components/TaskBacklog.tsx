import { useStore } from '../store/useStore';
import { TaskCard } from './TaskCard';

export const TaskBacklog = () => {
  const allTasks = useStore((state) => state.tasks);
  const tasks = allTasks.filter((t) => t.assignedTime === null);

  return (
    <section className="flex flex-col gap-4 px-6 mt-4 pb-24">
      <div className="flex justify-between items-center text-xs font-bold text-slate-400 tracking-wider uppercase">
        <span>Backlog</span>
        <span className="text-primary">{tasks.length} TASKS</span>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar bg-surface-dark/50 p-4 rounded-xl border border-surface-raised shadow-neumorphic-pressed min-h-[120px] items-center">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="w-full text-center text-slate-600 text-xs italic py-4">
            No tasks in backlog
          </div>
        )}
      </div>
    </section>
  );
};
