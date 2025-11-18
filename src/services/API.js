// https://api.themoviedb.org/3/movie/popular?api_key=056355ec36db5907acf0a553f486b62c

// to import the data and make it readable as json file and export it again to view it.
const API_URL = "https://api.themoviedb.org/3/movie/popular";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

async function loadMovies() {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to load data...");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

// to show the Movie details for each card
// https://api.themoviedb.org/3/movie/911430-f1/credits?api_key=056355ec36db5907acf0a553f486b62c => for geting the credits of the movie and put in the details
// https://api.themoviedb.org/3/movie/911430-f1/videos?api_key=056355ec36db5907acf0a553f486b62c => for geting the videos of the movie and put in the details
// https://api.themoviedb.org/3/movie/313369-La-La-Land/images?api_key=056355ec36db5907acf0a553f486b62c => for getting Imgs of the movie
const MOVIE_URL = "https://api.themoviedb.org/3/movie/";

async function movie_details(id) {
  try {
    const [mainRes, creditsRes, videosRes, imagesRes, movieLinks] =
      await Promise.all([
        fetch(`${MOVIE_URL}${id}?api_key=${API_KEY}`),
        fetch(`${MOVIE_URL}${id}/credits?api_key=${API_KEY}`),
        fetch(`${MOVIE_URL}${id}/videos?api_key=${API_KEY}`),
        fetch(`${MOVIE_URL}${id}/images?api_key=${API_KEY}`),
        fetch(`${MOVIE_URL}${id}/external_ids?api_key=${API_KEY}`),
      ]);

    if (
      !mainRes.ok ||
      !creditsRes.ok ||
      !videosRes.ok ||
      !imagesRes.ok ||
      !movieLinks.ok
    ) {
      throw new Error("Failed to load data...");
    }

    const mainData = await mainRes.json();
    const creditsData = await creditsRes.json();
    const videosData = await videosRes.json();
    const imagesData = await imagesRes.json();
    const links = await movieLinks.json();

    return {
      ...mainData,
      cast: creditsData.cast,
      crew: creditsData.crew,
      videos: videosData.results,
      Images: imagesData,
      socialLinks: links,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

// to import the elements that match the text I type inside the search form
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

async function searchMovies(text) {
  try {
    const response = await fetch(
      `${SEARCH_URL}?api_key=${API_KEY}&query=${text}`
    );
    if (!response.ok) throw new Error("Failed to load data...");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

// To get the Person details and work (actor, crew member)
// https://www.themoviedb.org/3/person/30614?api_key=056355ec36db5907acf0a553f486b62c
// https://www.themoviedb.org/3/person/30614/movie_details?api_key=056355ec36db5907acf0a553f486b62c

const PERSON_URL = "https://api.themoviedb.org/3/person/";

async function personDetails(id) {
  try {
    const response = await fetch(`${PERSON_URL}${id}?api_key=${API_KEY}`);

    const socialsResponse = await fetch(
      `${PERSON_URL}${id}/external_ids?api_key=${API_KEY}`
    );

    const combinedCredits = await fetch(
      `${PERSON_URL}${id}/combined_credits?api_key=${API_KEY}`
    );

    if (!response.ok || !socialsResponse.ok || !combinedCredits.ok)
      throw new Error("Failed to load the data...");

    const personData = await response.json();
    const socialsData = await socialsResponse.json();
    const creditsData = await combinedCredits.json();

    return {
      ...personData,
      socialLinks: socialsData,
      ...creditsData,
    };
  } catch (error) {
    console.log(error);
  }
}

export { loadMovies, searchMovies, movie_details, personDetails };
