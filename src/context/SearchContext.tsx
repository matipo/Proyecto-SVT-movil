import React, { createContext, useState, useContext } from 'react';

// Se define qué datos guardará en la "nube"
interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  searchText: '',
  setSearchText: () => {},
});

// El Provider envuelve tu app para dar acceso a los datos
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook personalizado para usarlo fácil
export const useSearch = () => useContext(SearchContext);
