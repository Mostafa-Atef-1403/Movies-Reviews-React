const Posters = ({ img, details }) => {
  return (
    <div className={`image`}>
      <div className="img-path">
        <a
          href={`https://image.tmdb.org/t/p/original/${img.file_path}`}
          target="blank"
        >
          <img
            loading="lazy"
            className="poster-img"
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${img.file_path}`}
            srcset={`https://media.themoviedb.org/t/p/w220_and_h330_face/${img.file_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face//${img.file_path} 2x`}
            alt={details.title}
          />
        </a>
      </div>

      <div className="img-info">
        <div className="vote-cnt">
          Vote-Count<span>{img.vote_count}</span>
        </div>

        <div className="vote-avg">
          Vote Average<span>{img.vote_average}</span>
        </div>

        <div className="img-size">
          Size
          <span>
            {img.width}x{img.height}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Posters;
