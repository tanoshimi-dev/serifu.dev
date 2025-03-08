import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { SearchTemporaryConditions } from "../../types/search_temporary_conditions";

interface SearchConditionsContextType {
  // getTemporary: {};
  // permanent: {};
  setTemporaryConditions: (params: SearchTemporaryConditions) => void;
  getTemporaryConditions: () => SearchTemporaryConditions | null;
  setPermanentConditions: (params: SearchTemporaryConditions) => void;
  getPermanentConditions: () => {} | null;
}

const SearchConditionsContext = createContext<SearchConditionsContextType | undefined>(undefined);

interface SearchConditionsProviderProps {
  children: React.ReactNode;
}

export const SearchConditionsProvider: React.FC<SearchConditionsProviderProps> = ({ children }) => {
  const [temporary, setTemporary] = useState<SearchTemporaryConditions| null>(null);
  const [permanent, setPermanent] = useState<SearchTemporaryConditions| null>(null);

  const setTemporaryConditions = (params: SearchTemporaryConditions) => {
    setTemporary(params);
    console.log('=== CONTEXT called setTemporaryConditions ===', params);

  };

  const getTemporaryConditions = () => {
    return temporary;
  };

  const setPermanentConditions = (params: SearchTemporaryConditions) => {
    setPermanent(params);
  };

  const getPermanentConditions = () => {
    return permanent;
  };


  return (
    <SearchConditionsContext.Provider value={{ setTemporaryConditions, getTemporaryConditions, setPermanentConditions, getPermanentConditions }}>
      {children}
    </SearchConditionsContext.Provider>
  );
};

export const useSearchConditions = (): SearchConditionsContextType => {
  const context = useContext(SearchConditionsContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an SearchConditionsProvider');
  }
  return context;
};