import { useParams, Link } from "react-router-dom";

const Header = ({ details }) => {
  const { id } = useParams();
  return (
    <div className="credits-header">
      <img
        src={`https://media.themoviedb.org/t/p/w58_and_h87_face/${details.poster_path}`}
        srcset={`https://media.themoviedb.org/t/p/w58_and_h87_face/${details.poster_path} 1x, https://media.themoviedb.org/t/p/w116_and_h174_face/${details.poster_path} 2x`}
        alt={details.title}
      />

      <div className="movie">
        <div className="movie-title">
          {details.title}{" "}
          <span className="movie-release">
            ({details.release_date.slice(0, 4)})
          </span>
        </div>

        <Link to={`/movie/${id}`}>
          <button className="back-to-details">
            <i className="bi bi-arrow-left"></i> Back To Main
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
