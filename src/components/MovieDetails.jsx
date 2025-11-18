import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { movie_details } from "../services/API";
import { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { addToFav, removeFromFav, isFavorite, favorites } = useMovieContext();

  const [details, setDetails] = useState(null);

  const languageNames = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    pt: "Portuguese",
    ru: "Russian",
    ar: "Arabic",
    hi: "Hindi",
  };

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await movie_details(id);

        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadDetails();
  }, [id]);

  // getting the featured crew, in the header. getting the cast in the cast section.

  const getFeaturedJobs = (crew) => {
    const featuredJobs = [
      "Director",
      "Writer",
      "Story",
      "Novel",
      "Screenplay",
      "Characters",
    ];

    const featuredcrew = crew.filter((person) =>
      featuredJobs.includes(person.job)
    );

    let people = [];

    for (let i = 0; i < featuredcrew.length; i++) {
      const person = featuredcrew[i];

      let existing = people.find((p) => p.id === person.id);

      if (existing) {
        existing.jobs.push(person.job);
      } else {
        people.push({
          id: person.id,
          name: person.name,
          jobs: [person.job],
        });
      }
    }

    return people;
  };

  if (!details) return <h1>Loading . . . </h1>;
  // console.log(details);

  // to get the trailer

  const trailer =
    details.videos.find(
      (video) =>
        video.type === "Teaser" && video.site === "YouTube" && video.official
    ) ||
    details.videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

  return (
    <div className="details-container">
      {/* Details Header */}
      <div className="details-header">
        {/* backdrop of the Background */}
        <div
          className="backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,
          }}
        ></div>
        {/* The Content of the Header that is (Poster, Some Info) */}
        <div className="content">
          {/* Movie Poster */}
          <div className="poster">
            <img
              src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${details.poster_path}`}
              srcSet={`
                    https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${details.poster_path} 1x,
                    https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${details.poster_path} 2x
                    `}
              alt={details.original_title}
            />
          </div>

          {/* Movie Info */}
          <div className="info">
            <div className="movie-title">
              <span className="title">{details.title}</span>
              {"  "}
              <span className="release-date">
                ({details.release_date.slice(0, 4)})
              </span>
            </div>

            <ul>
              <li className="date">
                {details.release_date.split("-").reverse().join("/")}
              </li>
              <li className="genres">
                <div className="movie-genres">
                  {details.genres.map((genre) => genre.name).join(", ")}
                </div>
              </li>
              <li className="movie-duration">
                {`${
                  Math.floor(details.runtime / 60) > 0
                    ? `${Math.floor(details.runtime / 60)}h, `
                    : ""
                }${details.runtime % 60}m`}
              </li>
            </ul>

            <div className="movie-tagline">
              <p>{details.tagline}</p>
            </div>

            <div className="movie-overview">
              <span>Overview</span>
              <p>{details.overview}</p>
            </div>

            <div className="people">
              {getFeaturedJobs(details.crew).map((person) => (
                <div className="role" key={person.id}>
                  <span className="name">{person.name}</span>
                  <p className="roles">{person.jobs.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sections">
        {/* Credits Section */}
        <section className="credits s">
          <h1>Top Billed Cast</h1>

          <div className="actors">
            {details.cast.slice(0, 10).map((actor) => (
              <div className="actor" key={actor.id}>
                <div className="actor-pfp">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : actor.gender === 1
                        ? "/assets/female_default.jpg"
                        : "/assets/male_default.jpg"
                    }
                    alt={actor.name}
                  />
                </div>

                <div className="actor-info">
                  <Link
                    to={`/person/${actor.id}-${actor.name
                      .split(" ")
                      .join("-")}`}
                  >
                    <div className="actor-name">{actor.name}</div>
                  </Link>
                  <div className="actor-fake">{actor.character}</div>
                </div>
              </div>
            ))}
            <Link to={`/movie/${id}/cast`}>
              <button className="view-cast">
                View More <i class="bi bi-arrow-right"></i>
              </button>
            </Link>
          </div>
        </section>
        {/* Other Info */}
        <section className="other-info">
          <div className="social-links">
            {Object.entries(details.socialLinks)
              .filter(
                ([key, value]) =>
                  value &&
                  ["facebook_id", "twitter_id", "instagram_id"].includes(key)
              )
              .map(([key, value]) => (
                <div className="link" key={key}>
                  {value ? (
                    key === "facebook_id" ? (
                      <a
                        href={`https://www.facebook.com/${value}`}
                        target="_blank"
                        className="facebook"
                        rel="noreferrer"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                    ) : key === "twitter_id" ? (
                      <a
                        href={`https://www.twitter.com/${value}`}
                        target="_blank"
                        className="twitter"
                        rel="noreferrer"
                      >
                        <i className="bi bi-twitter"></i>
                      </a>
                    ) : key === "instagram_id" ? (
                      <a
                        href={`https://www.instagram.com/${value}`}
                        target="_blank"
                        className="instagram"
                        rel="noreferrer"
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    ) : (
                      ""
                    )
                  ) : null}
                </div>
              ))}
          </div>

          <div className="original-title p">
            <p>
              Original Title <span>{details.original_title}</span>
            </p>
          </div>
          <div className="statues p">
            <p>
              Statues <span>{details.status}</span>
            </p>
          </div>
          <div className="original-lang p">
            <p>
              Original Language{" "}
              <span>
                {languageNames[details.original_language] ||
                  details.original_language}
              </span>
            </p>
          </div>
          <div className="budget p">
            <p>
              Budget <span>${details.budget.toLocaleString()}</span>
            </p>
          </div>
          <div className="income p">
            <p>
              Revenue <span>${details.revenue.toLocaleString()}</span>
            </p>
          </div>

          <div className="production_companies p">
            <p>Production Companies:</p>
            {details.production_companies.map((comp) =>
              comp.logo_path ? (
                <div className="comp-logo">
                  <img
                    src={`https://media.themoviedb.org/t/p/w200/${comp.logo_path}`}
                  />
                  <span>{comp.name}</span>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </section>
        {/* Media Section */}
        <section className="media-container s">
          <div className="media-header">
            <h1>Media</h1>
            <div className="view-media">
              <Link
                to={`/movie/${details.id}-${details.title.replace(
                  /\s+/g,
                  "-"
                )}/videos`}
              >
                <button className="view">
                  Videos{" "}
                  <span className="media-number">{details.videos.length}</span>
                </button>
              </Link>
              <Link
                to={`/movie/${details.id}-${details.title.replace(
                  /\s+/g,
                  "-"
                )}/images/backdrops`}
              >
                <button className="view">
                  Backdrops{" "}
                  <span className="media-number">
                    {details.Images.backdrops.length}
                  </span>
                </button>
              </Link>
              <Link
                to={`/movie/${details.id}-${details.title.replace(
                  /\s+/g,
                  "-"
                )}/images/posters`}
              >
                <button className="view">
                  Posters{" "}
                  <span className="media-number">
                    {details.Images.posters.length}
                  </span>
                </button>
              </Link>
            </div>
          </div>

          <div className="media">
            <div class="main-trailer">
              <iframe
                width={533}
                height={300}
                src={`https://www.youtube.com/embed/${trailer?.key}?rel=0&modestbranding=1`}
                title={trailer?.name}
                frameBorder={0}
                allowFullScreen
              ></iframe>
            </div>
            <div className="main-backdrop">
              <img
                src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${details.backdrop_path}`}
                srcset={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${details.backdrop_path} 1x, https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${details.backdrop_path} 2x`}
                alt={details.tagline}
              />
            </div>
            <div className="main-poster">
              <img
                src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${details.poster_path}`}
                srcset={`https://media.themoviedb.org/t/p/w220_and_h330_face/${details.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${details.poster_path} 2x`}
                alt=""
              />
            </div>
          </div>
        </section>
      </div>

      <div className="fav-btns">
        {isFavorite(details.id) ? (
          <button className="unfav-btn" onClick={() => removeFromFav(details)}>
            <i className="bi bi-heart-fill" />
          </button>
        ) : (
          <button className="fav-btn" onClick={() => addToFav(details)}>
            <i className="bi bi-heart" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
