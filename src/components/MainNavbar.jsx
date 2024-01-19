import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <div>
      <div className="col-9 col-lg-7 mainLinks d-md-flex mb-3">
        <Link to={'*'}>TRENDING</Link>
        <Link to={'*'}>PODCAST</Link>
        <Link to={'*'}>MOODS AND GENRES</Link>
        <Link to={'*'}>NEW RELEASES</Link>
        <Link to={'*'}>DISCOVER</Link>
      </div>
    </div>
  );
}

export default MainNavbar;
