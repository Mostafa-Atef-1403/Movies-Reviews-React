import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

const MovieCard = ({ movie }) => {
  const { addToFav, removeFromFav, isFavorite, favorites } = useMovieContext();

  // console.log("favorites changed:", favorites);

  return (
    <div className="movie-card">
      {/* <Link to={`/movie/${movie.id}-${movie.title.replace(/\s+/g, "-")}`}> */}
      <div className="card">
        <Link to={`/movie/${movie.id}-${movie.title.replace(/\s+/g, "-")}`}>
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              srcSet={`
                      https://image.tmdb.org/t/p/w500/${movie.poster_path} 1x,
                      https://image.tmdb.org/t/p/w780/${movie.poster_path} 2x
                    `}
              alt={`${movie.title}`}
            />
          </div>
        </Link>
        <div className="movie-info">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-date">{movie.release_date}</div>
        </div>

        <div className="movie-actions">
          <div className="rating">⭐ {movie.vote_average}</div>
          <div className="act-btns ">
            {isFavorite(movie.id) ? (
              <button
                className="unfav-btn"
                onClick={() => removeFromFav(movie)}
              >
                <i className="bi bi-heart-fill" />
              </button>
            ) : (
              <button className="fav-btn" onClick={() => addToFav(movie)}>
                <i className="bi bi-heart" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Link to={`/movie/${movie.id}-${movie.title.replace(/\s+/g, "-")}`}>
        <div className="movie-summary">
          <p>{movie.overview}</p>
        </div>
      </Link>
      {/* </Link> */}
    </div>
  );
};

export default MovieCard;
