/**
 * SportContext - App-wide Sport Mode State Management
 *
 * This context provides a centralized way to manage which sport mode
 * (soccer or basketball) is currently active across the entire app.
 *
 * Usage:
 * - Wrap your app with <SportProvider>
 * - Use useSport() hook to access currentSport and setCurrentSport
 * - When user toggles sport on profile page, it updates everywhere
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SportType = 'soccer' | 'basketball';

interface SportContextType {
  currentSport: SportType;
  setCurrentSport: (sport: SportType) => void;
}

const SportContext = createContext<SportContextType | undefined>(undefined);

interface SportProviderProps {
  children: ReactNode;
  initialSport?: SportType;
}

export const SportProvider: React.FC<SportProviderProps> = ({
  children,
  initialSport = 'soccer' // Default to soccer (can be user's preference from profile)
}) => {
  const [currentSport, setCurrentSport] = useState<SportType>(initialSport);

  return (
    <SportContext.Provider value={{ currentSport, setCurrentSport }}>
      {children}
    </SportContext.Provider>
  );
};

/**
 * Hook to access sport context
 * Throws error if used outside SportProvider
 */
export const useSport = (): SportContextType => {
  const context = useContext(SportContext);
  if (!context) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
};
