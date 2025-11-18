import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // const [favorites, setFavorites] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    return localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
  });

  // addToFav: only add if not already present
  const addToFav = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // removeFromFav: remove all occurrences (filter)
  const removeFromFav = (movie) => {
    setFavorites((prev) => prev.filter((id) => id.id !== movie.id));
  };

  // isFavorite: check quickly
  const isFavorite = (movieID) =>
    favorites.some((movie) => movie.id === movieID);

  // store the functions/variables we need to move to children

  const value = {
    favorites,
    addToFav,
    removeFromFav,
    isFavorite,
  };

  //

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
