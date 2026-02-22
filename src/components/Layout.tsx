import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-grid-pattern bg-grid"></div>
      
      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-screen max-w-md mx-auto overflow-hidden bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm shadow-2xl border-x border-surface-raised">
        {children}
      </div>
    </div>
  );
};
