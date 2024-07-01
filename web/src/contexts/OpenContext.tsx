import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface OpenContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenContext = createContext<OpenContextType>({
  open: false,
  setOpen: () => {},
});

interface OpenProviderProps {
  children: ReactNode;
}

export const OpenProvider: React.FC<OpenProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      {children}
    </OpenContext.Provider>
  );
};

export const useOpen = (): OpenContextType => {
  const context = useContext(OpenContext);
  if (context === undefined) {
    throw new Error('useOpen must be used within an OpenProvider');
  }
  return context;
};