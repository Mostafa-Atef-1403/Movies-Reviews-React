import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { movie_details } from "../services/API";
import Header from "./Header";

const Cast = () => {
  const { id } = useParams();
  const movie_ID = id.split("-")[0]; // extract only the numeric part

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await movie_details(movie_ID);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadDetails();
  }, [movie_ID]);

  if (!details) {
    return <p>Loading...</p>;
  }

  // to group the crew by the department

  const crew_grouped = details.crew.reduce((acc, person) => {
    const dept = person.department;

    if (!acc[dept]) {
      acc[dept] = [];
    }

    let existing = acc[dept].find((j) => j.id === person.id);

    if (existing) {
      if (!existing.jobs.includes(person.job)) {
        existing.jobs.push(person.job);
      }
    } else {
      acc[dept].push({
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
        gender: person.gender,
        jobs: [person.job],
      });
    }

    return acc;
  }, {});

  return (
    <div className="credits-page">
      <Header details={details} />

      <div className="credits-container">
        <div className="cast-container c">
          <p>
            Cast <span>{details.cast.length}</span>
          </p>
          {details.cast.map((actor) => (
            <Link to={`/person/${actor.id}-${actor.name.split(" ").join("-")}`}>
              <div className="person">
                <div className={`person-pfp`}>
                  <img
                    style={
                      !actor.profile_path
                        ? { width: "60px", height: "60px" }
                        : {}
                    }
                    src={
                      actor.profile_path
                        ? `https://media.themoviedb.org/t/p/w66_and_h66_face/${actor.profile_path}`
                        : actor.gender === 1
                        ? "/assets/female_default.jpg"
                        : "/assets/male_default.jpg"
                    }
                    srcset={
                      actor.profile_path
                        ? ` 
                  https://media.themoviedb.org/t/p/w66_and_h66_face/${actor.profile_path} 1x,
                  https://media.themoviedb.org/t/p/w132_and_h132_face/${actor.profile_path} 2x`
                        : ""
                    }
                    alt={actor.name}
                  />
                </div>

                <div className="person-info">
                  <div className="person-name">{actor.name}</div>
                  <div className="person-ah">{actor.character}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="crew-container c">
          <p>
            Crew <span>{details.crew.length}</span>
          </p>
          {Object.entries(crew_grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([department, people]) => (
              <div className="depart" key={department}>
                <p>
                  {department} <span>{people.length}</span>
                </p>

                {people.map((person) => (
                  <Link
                    to={`/person/${person.id}-${person.name
                      .split(" ")
                      .join("-")}`}
                  >
                    <div className="person">
                      <div className={`person-pfp`}>
                        <img
                          style={
                            !person.profile_path
                              ? { width: "60px", height: "60px" }
                              : {}
                          }
                          src={
                            person.profile_path
                              ? `https://media.themoviedb.org/t/p/w66_and_h66_face/${person.profile_path}`
                              : person.gender === 1
                              ? "/assets/female_default.jpg"
                              : "/assets/male_default.jpg"
                          }
                          srcset={
                            person.profile_path
                              ? ` 
                  https://media.themoviedb.org/t/p/w66_and_h66_face/${person.profile_path} 1x,
                  https://media.themoviedb.org/t/p/w132_and_h132_face/${person.profile_path} 2x`
                              : ""
                          }
                          alt={person.name}
                        />
                      </div>

                      <div className="person-info">
                        <div className="person-name">{person.name}</div>
                        <div className="person-ah">
                          {person.jobs.join(", ")}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cast;
