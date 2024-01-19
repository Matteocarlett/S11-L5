import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import AlbumPage from "./components/AlbumPage";
import ArtistPage from "./components/ArtistPage";
import Favorites from "./components/Favorites";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albumPage/:albumID" element={<AlbumPage />} />
          <Route path="/artistPage/:artistID" element={<ArtistPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
