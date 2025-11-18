import { loadMovies, searchMovies } from "../services/API.js";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function Home() {
  // loading and fetch the movies
  const [movies, setMovies] = useState([]);

  // gotta use "useEffect" for not to cause a re-rendre loop.
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const loadedMovies = await loadMovies();
        setMovies(loadedMovies);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };
    loadPopularMovies();
  }, []);

  // to get search results and show it
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const loadedMovies = await searchMovies(search);
      setMovies(loadedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  /* ===== will be used for showing recomedations while searching ===== */
  // useEffect(() => {
  //   const doSearch = async () => {
  //     if (search.length > 0) {
  //       try {
  //         const results = await searchMovies(search);
  //         setMovies(results);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   doSearch();
  // }, [search]);

  return (
    <div className="homepage">
      <form onSubmit={handleSearch}>
        <i class="bi bi-search" onClick={handleSearch}></i>
        <input
          type="search"
          placeholder="Enter Movie Name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />
      </form>

      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
