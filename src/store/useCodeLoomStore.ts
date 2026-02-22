import { create } from 'zustand';

interface CodeLoomState {
  code: string;
  language: string;
  padding: number;
  borderRadius: number;
  typographyScale: number;
  background: string;
  darkMode: boolean;
  
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setPadding: (padding: number) => void;
  setBorderRadius: (borderRadius: number) => void;
  setTypographyScale: (scale: number) => void;
  setBackground: (background: string) => void;
  toggleDarkMode: () => void;
}

export const useCodeLoomStore = create<CodeLoomState>((set) => ({
  code: '// Paste your code here\nconsole.log("Hello, World!");',
  language: 'javascript',
  padding: 32,
  borderRadius: 16,
  typographyScale: 1,
  background: 'linear-gradient(135deg, #1f2529, #0f1315)',
  darkMode: true,

  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setPadding: (padding) => set({ padding }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setTypographyScale: (typographyScale) => set({ typographyScale }),
  setBackground: (background) => set({ background }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
