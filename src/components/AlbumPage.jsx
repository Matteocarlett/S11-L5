import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import SidebarVertical from "./SidebarVertical";
import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";

const AlbumPage = () => {
  const params = useParams();
  const [album, setAlbum] = useState(null);
  const dispatch = useDispatch();
  const checkIfState = useSelector((state) => state.favorites.songs);
  let audio;

  const addToFavorites = (song) => {
    dispatch({
      type: "ADD_TO_FAVORITES",
      payload: song,
    });
    alert(`${song.title} aggiunta ai preferiti!`);
  };

  const removeFromFavorites = (song) => {
    dispatch({
      type: "REMOVE_FROM_FAVORITES",
      payload: song,
    });
    alert(`${song.title} rimossa dai preferiti!`);
  };

  const playSong = (song) => {
    audio = new Audio(song.preview);
    audio.play();
  };

  const showInPlayer = (song) => {
    console.log("sooooongs", song);
    dispatch({
      type: "SHOW_IN_PLAYER",
      payload: song,
    });
  };

  const start = async () => {
    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "d5cfe92e59msha6eb3d1bbcc7fcbp119eddjsnbba2be383b8a",
    });
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/album/" +
          params.albumID,
        {
          method: "GET",
          headers,
        }
      );
      if (response.ok) {
        let album = await response.json();
        setAlbum(album);
      } else {
        document.querySelector("#img-container").innerHTML =
          "NOT OK" + (await response.text());
      }
    } catch (exception) {
      // ex.: Url is not correct, Internal Server Error
      document.querySelector("#img-container").innerHTML = exception;
    }
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <SidebarVertical />
      <div className="col-12 col-md-9 offset-md-3 mainPage">
        <MainNavbar />
        {album && (
          <div className="row">
            <div className="col-md-3 pt-5 text-center" id="img-container">
              <img
                src={album.cover_medium}
                className="card-img img-fluid rounded"
                alt="Album"
              />
              <div className="mt-4 text-center">
                <p className="album-title">{album.title}</p>
              </div>
              <div className="text-center">
                <Link to={`/artistPage/${album.artist.id}`}>
                  <p className="artist-name">{album.artist.name}</p>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <button id="btnPlay" className="btn btn-success" type="button">
                  Play
                </button>
              </div>
            </div>
            <div className="col-md-8 p-5">
              <div className="row">
                <div className="col-md-10 mb-5" id="trackList">
                  {album &&
                    album.tracks.data.map((track, index) => {
                      return (
                        <div
                          className="py-3 pr-3 trackHover d-flex justify-content-between"
                          key={index}
                        >
                          <Link
                            onClick={() => {
                              showInPlayer(track);
                              playSong(track);
                            }}
                            className="card-title trackHover px-3"
                            style={{ color: "white" }}
                          >
                            {track.title}
                          </Link>
                          <div className="d-flex align-items-center">
                            <i
                              className="bi bi-heart px-5"
                              onClick={() => addToFavorites(track)}
                              style={{
                                display: checkIfState.includes(track)
                                  ? "none"
                                  : "block",
                              }}
                            ></i>
                            <i
                              className="bi bi-heart-fill px-5"
                              onClick={() => removeFromFavorites(track)}
                              style={{
                                display: checkIfState.includes(track)
                                  ? "block"
                                  : "none",
                              }}
                            ></i>
                            <small
                              className="duration"
                              style={{ color: "white" }}
                            >
                              {Math.floor(parseInt(track.duration) / 60)}:
                              {parseInt(track.duration) % 60 < 10
                                ? "0" + (parseInt(track.duration) % 60)
                                : parseInt(track.duration) % 60}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
        <Player />
      </div>
    </>
  );
};

export default AlbumPage;
