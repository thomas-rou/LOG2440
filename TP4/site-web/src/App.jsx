import { Routes, Route } from "react-router-dom";
import React from 'react';
import PlaylistProvider from "./contexts/PlaylistProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Playlist from "./pages/Playlist";
import "./assets/css/styles.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CreatePlaylist from "./pages/CreatePlaylist";

function App() {
  const routes = [
    { path: "/index", element: <Index /> },
    { path: "/about", element: <About /> },
    { path: "/playlist/:id", element: <Playlist /> },
    { path: "/create_playlist/:id", element: <CreatePlaylist /> },
    { path: "/create_playlist", element: <CreatePlaylist /> },
    { path: "/", element: <Index /> },
  ];

  return (
    <div id="container">
      <PlaylistProvider>
        <NavBar />
        <Routes>
          {/* TODO : Configurer les routes et leurs components à afficher */}
          <Route path={routes[0].path} element={routes[0].element} />
          <Route path={routes[1].path} element={routes[1].element} />
        </Routes>
        <Footer />
      </PlaylistProvider>
    </div>
  );
}

export default App;
