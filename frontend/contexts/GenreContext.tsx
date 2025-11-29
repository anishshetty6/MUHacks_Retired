"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GenreContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export function GenreProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <GenreContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </GenreContext.Provider>
  );
}

export function useGenre() {
  const context = useContext(GenreContext);
  if (context === undefined) {
    throw new Error('useGenre must be used within a GenreProvider');
  }
  return context;
}

