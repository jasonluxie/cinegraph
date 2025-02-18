import React, { createContext, useContext, useState } from "react";

const FilmContext = createContext();

export const useFilmContext = () => useContext(FilmContext);
export const FilmProvider = ({ children }) => {
  const [state, setState] = useState({
    movies: [],
  });

  return (
    <FilmContext.Provider value={[state, setState]}>
      {children}
    </FilmContext.Provider>
  );
};
