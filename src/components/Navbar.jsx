import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to={"/"}>
        <div className="logo">Movies Ocean</div>
      </Link>
      <div className="moving-btn">
        <Link to={"/"}>
          <button className="home">Home</button>
        </Link>
        <Link to={"/favourite"}>
          <button className="fav">Favorite</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
