import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { personDetails } from "../../services/API";

const Person = () => {
  const { id } = useParams();
  const personID = id.split("-")[0];

  // load person details
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const loadPersonDetails = async () => {
      try {
        const data = await personDetails(personID);

        setPerson(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadPersonDetails();
  }, [personID]);

  // prepare social Links
  const wantedKeys = [
    "facebook_id",
    "instagram_id",
    "tiktok_id",
    "twitter_id",
    "youtube_id",
  ];

  const entries = Object.entries(person?.socialLinks || {});

  const filteredLinksObj = Object.fromEntries(
    entries.filter(([key, value]) => wantedKeys.includes(key))
  );

  // the Birth format

  const formatDate = (Stringdate) => {
    const date = new Date(Stringdate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log(person);
  if (!person) {
    return <p>Loading....</p>;
  }
  // console.log(person);
  return (
    <div className="person-details-container">
      <div className="main-info">
        <div className="personal-img block">
          <img
            src={
              person.profile_path
                ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${person.profile_path}`
                : person.gender === 1
                ? "/assets/female_default.jpg"
                : "/assets/male_default.jpg"
            }
            srcSet={
              person.profile_path
                ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${person.profile_path} 1x, https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${person.profile_path} 2x`
                : person.gender === 1
                ? "/assets/female_default.jpg"
                : "/assets/male_default.jpg"
            }
            alt={person.name}
          />
        </div>
        <h1 className="person-name small-screen-name block">{person.name}</h1>
        <div className="social-links block">
          {filteredLinksObj.facebook_id && (
            <span className="link">
              <a
                href={`https://www.facebook.com/${filteredLinksObj.facebook_id}`}
                target="blank"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </span>
          )}
          {filteredLinksObj.instagram_id && (
            <span className="link">
              <a
                href={`https://www.instagram.com/${filteredLinksObj.instagram_id}`}
                target="blank"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </span>
          )}
          {filteredLinksObj.tiktok_id && (
            <span className="link">
              <a
                href={`https://www.tiktok.com/${filteredLinksObj.tiktok_id}`}
                target="blank"
              >
                <i className="bi bi-tiktok"></i>
              </a>
            </span>
          )}
          {filteredLinksObj.twitter_id && (
            <span className="link">
              <a
                href={`https://www.x.com/${filteredLinksObj.twitter_id}`}
                target="blank"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </span>
          )}
          {filteredLinksObj.youtube_id && (
            <span className="link">
              <a
                href={`https://www.youtube.com/${filteredLinksObj.youtube_id}`}
                target="blank"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </span>
          )}
        </div>

        <div className="personal-info block">
          <h3 className="block">Personal Info</h3>

          <div className="info-line block">
            <strong>Known For</strong>
            <span>{person.known_for_department}</span>
          </div>

          <div className="info-line block">
            <strong>Known Credits</strong>
            <span>
              {person.cast.filter((obj) => obj.media_type === "movie").length +
                person.crew.filter((obj) => obj.media_type === "movie")
                  .length}{" "}
              Movies
            </span>
          </div>

          <div className="info-line block">
            <strong>Gender</strong>
            <span>{person.gender === 2 ? "Male" : "Female"}</span>
          </div>

          <div className="info-line block">
            <strong>Birthday</strong>
            <span>
              {formatDate(person.birthday)} (
              {Number(new Date().getFullYear()) -
                Number(new Date(person.birthday).getFullYear())}{" "}
              Years Old)
            </span>
          </div>

          <div className="info-line block">
            <strong>Place of Birth</strong>
            <span>{person.place_of_birth}</span>
          </div>

          <div className="info-line block">
            <strong>Also Known As</strong>
            {person.also_known_as.map((n) => (
              <span>{n}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="sub-info">
        <h1 className="person-name big-screen-name block">{person.name}</h1>

        <div className="biography">
          <h3 className="block">Biography</h3>
          <p className="block">{person.biography}</p>
        </div>

        <div className="known-for">
          <h3 className="block">Known For</h3>

          <div className="known-for-list">
            {person.cast
              ?.filter(
                (obj) =>
                  obj.media_type === "movie" &&
                  !["Self", "Self (archive footage)"].includes(obj.character)
              )
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 10)
              .map((item) => (
                <Link
                  to={`/movie/${item.id}-${item.title.replace(/\s+/g, "-")}`}
                >
                  <div className="known-item" key={item.id}>
                    <img
                      src={`https://media.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path}`}
                      srcSet={`https://media.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path} 1x, https://media.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path} 2x`}
                      alt={item.title}
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
