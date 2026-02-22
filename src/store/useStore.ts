import { create } from 'zustand';

export type EnergyLevel = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  duration: number; // in minutes
  energy: EnergyLevel;
  assignedTime: number | null; // minutes from midnight (0-1440) or null if backlog
}

export interface Schedule {
  sleepTime: number; // hour 0-24
  wakeTime: number; // hour 0-24
  peakTime: number; // hour 0-24
}

interface StoreState {
  tasks: Task[];
  schedule: Schedule;
  currentTime: Date;
  addTask: (task: Omit<Task, 'id' | 'assignedTime'>) => void;
  moveTask: (id: string, assignedTime: number | null) => void;
  updateSchedule: (schedule: Partial<Schedule>) => void;
  setCurrentTime: (time: Date) => void;
}

export const useStore = create<StoreState>((set) => ({
  tasks: [
    { id: '1', title: 'Deep Work: Core Architecture', duration: 90, energy: 'high', assignedTime: null },
    { id: '2', title: 'Team Sync', duration: 30, energy: 'medium', assignedTime: null },
    { id: '3', title: 'Email Triage', duration: 15, energy: 'low', assignedTime: null },
    { id: '4', title: 'Design Review', duration: 60, energy: 'high', assignedTime: null },
    { id: '5', title: 'Documentation', duration: 45, energy: 'medium', assignedTime: null },
    { id: '6', title: 'Break / Meditation', duration: 15, energy: 'low', assignedTime: null },
  ],
  schedule: {
    sleepTime: 23,
    wakeTime: 7,
    peakTime: 10,
  },
  currentTime: new Date(),
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9), assignedTime: null }]
  })),
  moveTask: (id, assignedTime) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, assignedTime } : t)
  })),
  updateSchedule: (newSchedule) => set((state) => ({
    schedule: { ...state.schedule, ...newSchedule }
  })),
  setCurrentTime: (time) => set({ currentTime: time }),
}));
