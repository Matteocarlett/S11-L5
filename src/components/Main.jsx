import AlbumCard from "./AlbumCard";
import { useState, useEffect } from "react";
import MainNavbar from "./MainNavbar";
import SidebarVertical from "./SidebarVertical";
import Player from "./Player";

const Main = () => {
  const [albums, setAlbums] = useState([]);

  let rockArtists = [
    "queen",
    "u2",
    "The Who",
    "pinkfloyd",
    "thedoors",
    "aereosmith",
  ];

  let MetalArtists = [
    "metallica",
    "blacksabbath",
    "ironmaiden",
    "gunsnroses",
    "kiss",
    "acdc",
  ];

  let BluesArtists = [
    "garymoore",
    "bobdylan",
    "raycharles",
    "ericclapton",
    "jimihendrix",
  ];

  let headers = new Headers({
    // sets the headers
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "d5cfe92e59msha6eb3d1bbcc7fcbp119eddjsnbba2be383b8a",
  });

  const handleArtist = async (artistName, domQuerySelector) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          artistName,
        {
          method: "GET",
          headers,
        }
      );
      if (response.ok) {
        let result = await response.json();
        console.log("result", result);
        let songInfo = result.data; 
        console.log("handle artist song info:", songInfo[0], typeof songInfo);
        setAlbums((albums) => [...albums, songInfo[0]]);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const start = async () => {
    let rockRandomArtists = [];
    let MetalRandomArtists = [];
    let BluesRandomArtists = [];

    document.querySelector("#searchField").value = "";

    while (rockRandomArtists.length < 4) {
      let artist = rockArtists[Math.floor(Math.random() * rockArtists.length)];
      if (!rockRandomArtists.includes(artist)) {
        rockRandomArtists.push(artist);
      }
    }

    while (MetalRandomArtists.length < 4) {
      let artist =
        MetalArtists[Math.floor(Math.random() * MetalArtists.length)];
      if (!MetalRandomArtists.includes(artist)) {
        MetalRandomArtists.push(artist);
      }
    }

    while (BluesRandomArtists.length < 4) {
      let artist =
        BluesArtists[Math.floor(Math.random() * BluesArtists.length)];
      if (!BluesRandomArtists.includes(artist)) {
        BluesRandomArtists.push(artist);
      }
    }

    for (let j = 0; j < rockRandomArtists.length; j++)
      await handleArtist(rockRandomArtists[j], "#rockSection");

    for (let k = 0; k < MetalRandomArtists.length; k++)
      await handleArtist(MetalRandomArtists[k], "#popSection");

    for (let l = 0; l < BluesRandomArtists.length; l++)
      await handleArtist(BluesRandomArtists[l], "#hipHopSection");
  };

  useEffect(() => {
   
    start();
  }, []);

  return (
    <>
      <SidebarVertical />

      <div className="col-12 col-md-9 offset-md-2 mainPage">
        <MainNavbar />

        <div className="row">
          <div className="col-10">
            <div id="searchResults" style={{ display: "none" }}>
              <h2>Search Results</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <div id="rock">
              <h2>Rock Classics</h2>
              <div
                className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                id="rockSection"
              >
                {albums &&
                  albums.slice(0, 4).map((album, index) => {
                    return <AlbumCard key={index} albumInfo={album} />;
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <div id="pop">
              <h2>Heavy Metal</h2>
              <div
                className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                id="popSection"
              >
                {albums &&
                  albums.slice(4, 8).map((album, index) => {
                    return <AlbumCard key={index} albumInfo={album} />;
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <div id="hiphop">
              <h2>Blues</h2>
              <div
                className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                id="hipHopSection"
              >
                {albums &&
                  albums.slice(8, 12).map((album, index) => {
                    return <AlbumCard key={index} albumInfo={album} />;
                  })}
              </div>
            </div>
          </div>
        </div>
        <Player />
      </div>
    </>
  );
};

export default Main;
