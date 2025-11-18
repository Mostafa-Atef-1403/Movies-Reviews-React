import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { movie_details } from "../../services/API";
import Header from "../Header";

const Videos = () => {
  const { id } = useParams();

  const [videos, setVideos] = useState([]);
  const [details, setDetails] = useState(null);

  // to get the type from the storage (which I created later with this name) if there is OR just show trailer
  const [currentType, setCurrentType] = useState(() => {
    return localStorage.getItem("currentType") || "Trailers";
  });

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await movie_details(id);

        setVideos(data.videos);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadVideos();
  }, [id]);

  console.log(videos);

  // grouping the movies by the type

  const movie_groups = {
    Trailers: videos.filter((vid) => vid.type === "Trailer"),
    Teasers: videos.filter((vid) => vid.type === "Teaser"),
    Clips: videos.filter((vid) => vid.type === "Clip"),
    "Behind the Scenes": videos.filter(
      (vid) => vid.type === "Behind the Scenes"
    ),
    Bloopers: videos.filter((vid) => vid.type === "Blooper"),
    Featurettes: videos.filter((vid) => vid.type === "Featurette"),
  };

  // conditional rendering

  useEffect(() => {}, [currentType]);

  // the Date format

  const formatDate = (Stringdate) => {
    const date = new Date(Stringdate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // setting a local storage with this name so if it changes it'll change up in the state.
  useEffect(() => {
    localStorage.setItem("currentType", currentType);
  }, [currentType]);

  if (!videos || !details) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <Header details={details} />
      <div className=" media-row">
        {/* ********** Videos Sidebar ********** */}
        <div className="videos-sidebar">
          <h2>{details.title} Videos</h2>
          <div className="vidoes-types">
            {Object.entries(movie_groups).map(([type, videos]) => (
              <div
                className={`video-type ${type === currentType ? "active" : ""}`}
                onClick={() => setCurrentType(type)}
              >
                {type} <span>{videos.length}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ********** Videos Container ********** */}
        <div className="videos-container media-container">
          {movie_groups[currentType].length > 0 ? (
            movie_groups[currentType].map((vid) => (
              // Each Video Info
              <div className="video">
                <div className="video-media">
                  <iframe
                    width={350}
                    height={200}
                    src={`https://www.youtube.com/embed/${vid?.key}?rel=0&modestbranding=1`}
                    title={vid?.name}
                    frameBorder={0}
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="video-info">
                  <div className="v-info">
                    <div className="video-title">{vid.name}</div>
                    <ul>
                      <li>•{vid.type}</li>
                      <li>•{formatDate(vid.published_at)}</li>
                    </ul>
                  </div>
                  <div className="vid-channal">
                    {/* try getting the channel's name */}
                    Official Channel <i class="bi bi-patch-check-fill"></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Incase there is no media
            <h1 className="message">
              {details.title} has no current {currentType}.
            </h1>
          )}
        </div>
      </div>
    </>
  );
};
export default Videos;
