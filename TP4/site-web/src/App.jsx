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
          <Route path={routes[0].path} element={routes[0].element} />
          <Route path={routes[1].path} element={routes[1].element} />
          <Route path={routes[2].path} element={routes[2].element} />
          <Route path={routes[3].path} element={routes[3].element} />
          <Route path={routes[4].path} element={routes[4].element} />
          <Route path={routes[5].path} element={routes[5].element} />
        </Routes>
        <Footer />
      </PlaylistProvider>
    </div>
  );
}

export default App;
