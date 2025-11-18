import { useParams } from "react-router-dom";
import Header from "../Header";

import { movie_details } from "../../services/API";
import { useEffect, useState } from "react";
import Posters from "../Posters";
import Backdrops from "../Backdrops";

function Images() {
  const { id, type } = useParams();
  const movieId = id.split("-")[0];

  const [details, setDetails] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await movie_details(movieId);

        setImages(data.Images);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadImages();
  }, [id]);

  // checking the data

  if (!images || !details) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <Header details={details} />
      <div
        className={`images-container ${
          type === "posters" ? "posters-grid" : "backdrops-grid"
        }`}
      >
        {type === "posters"
          ? images.posters.map((img) => (
              <Posters img={img} details={details} key={img.file_path} />
            ))
          : images.backdrops.map((img) => (
              <Backdrops img={img} details={details} key={img.file_path} />
            ))}
      </div>
    </>
  );
}

export default Images;
