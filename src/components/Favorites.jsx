import { useMovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div className="favorite-page">
      {favorites.length > 0 ? (
        <>
          <h1 className="fav-header">My Favourite Movies</h1>
          <div className="movies-container">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="msg">
          <h1>No Favorite Movies Yet!</h1>
          <p>Start adding movies to your favorites to appear here...</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
