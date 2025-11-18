import Navbar from "./Navbar";
import Home from "./Home";
import Favorites from "./Favorites";
import MovieDetails from "./MovieDetails";

import Cast from "./Cast";
import Person from "./pages/Person";

import Videos from "./pages/Videos";
import Images from "./pages/Images";
import { MovieProvider } from "../context/MovieContext";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

const Main = () => {
  return (
    <MovieProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/:id/cast" element={<Cast />} />

          {/* media */}
          <Route path="/movie/:id/videos" element={<Videos />} />
          <Route path="/movie/:id/images/:type" element={<Images />} />

          {/* people */}
          <Route path="/person/:id" element={<Person />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
};

export default Main;
