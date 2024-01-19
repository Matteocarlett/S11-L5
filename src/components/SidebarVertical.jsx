import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AlbumCard from "./AlbumCard";


const SidebarVertical = () => {
  const [allSongs, setAllSongs] = useState([]);
  const location = useLocation();

  let headers = new Headers({

    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "d5cfe92e59msha6eb3d1bbcc7fcbp119eddjsnbba2be383b8a",
  });

  const search = async () => {
    const div = document.querySelector("#searchResults .row");
    div.innerHTML = "";
    let searchQuery = document.querySelector("#searchField").value;

    if (searchQuery.length > 2) {
      document.querySelector("#searchResults").style.display = "block";

      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
            searchQuery,
          {
            method: "GET",
            headers,
          }
        ); 

        if (response.ok) {
          let result = await response.json();
          let songs = result.data;
          console.log("canzoni cercate:", songs);
          setAllSongs(songs); 
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {

      document.querySelector("#searchResults").style.display = "none";
    }
  };

  return (
    <>
      <div className="col-2">
        <nav
          className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between"
          id="sidebar"
        >
          <div className="nav-container">
            <Link to={"/"} className="navbar-brand">
              <img className="mb-5"
                src="/img/Spotify_Logo.png"
                alt="Spotify_Logo"
                width={131}
                height={40}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <ul>
                  <li>
                    <Link to={"/"} className="text-decoration-none">
                      <a className="nav-item nav-link" href="/">
                        <i className="fas fa-home fa-lg mt-2" />
                        &nbsp; Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/favorites"} className="nav-item nav-link mt-2">
                      <i className="fas fa-book-open fa-lg" />
                      &nbsp; Your Favourites
                    </Link>
                  </li>
                  <li>
                    <div className="input-group mt-4" id="searchBar">
                      <input
                        type="text"
                        className="form-control mb-2"
                        id="searchField"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div
                        className="input-group-append"
                        style={{ marginBottom: "4%" }}
                      >
                        <button
                          className="btn btn-outline-secondary btn-sm me-3"
                          type="button"
                          id="button-addon1"
                          onClick={() => search()}
                        >
                          GO
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="nav-btn">
            <button className="btn signup-btn" type="button">
              Sign Up
            </button>
            <button className="btn login-btn" type="button">
              Login
            </button>
          <div>
          <Link to={"*"}>Cookie Policy</Link> | <Link to={"*"}> Privacy</Link>
          </div>
          </div>
        </nav>
      </div>
      <div className="col-12 col-md-9 offset-md-3 mainPage">
        <div id="searchResults" style={{ display: "none" }}>
          <h2>Search Results</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
            {allSongs &&
              allSongs.map((song, index) => {
                return <AlbumCard key={index} albumInfo={song} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarVertical;
