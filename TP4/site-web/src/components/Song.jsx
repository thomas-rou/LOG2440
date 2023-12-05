import React, { useState, useContext } from "react";
import { ACTIONS } from "../reducers/reducer";

import PlaylistContext from "../contexts/PlaylistContext";

export default function Song({ song, index }) {
  const { dispatch } = useContext(PlaylistContext);
  const [liked, setLiked] = useState(song.liked);
  const api = useContext(PlaylistContext).api;
  const toggleLike = () => {
    setLiked(!liked);
    api.updateSong(song.id);
  };

  const playSong = () => {
    dispatch({ type: ACTIONS.PLAY, payload: { index: - 1 } });
  };
  return (
    <section
      className="song-item flex-row"
      onClick={() => {
        {/*TODO : joueur une chanson seulement si index existe */ }
        if (index !== undefined) playSong();
      }}
    >
    {index !== undefined && <span>{index}</span>}
      {/*TODO : ajouter les informations de la chanson */}
      <p>{song.name}</p>
      <p>{song.genre}</p>
      <p>{song.artist}</p>

      {/*TODO : modifier le statut aimé seulement si index n'existe pas */}
      {index === undefined && (
        <button
          className={`${liked ? "fa" : "fa-regular"} fa-2x fa-heart`}
          onClick={toggleLike}
        ></button>
      )}
    </section>
  );
}