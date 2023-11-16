import React from "react";

export default function NavBar() {
  return (
    <header>
      <nav id="nav-bar" className="flex-column">
        <ul className="flex-column">
          <li>
            {/*TODO : ajouter le lien de navigation vers la page /index */}
            <i className="fa fa-music"></i>
            <span>Ma Bibliothèque</span>
          </li>
          <li>
            {/*TODO : ajouter le lien de navigation vers la page /create_playlist */}
            <i className="fa fa-plus"></i>
            <span>Créer Playlist</span>
          </li>
          <li>
            {/*TODO : ajouter le lien de navigation vers la page /create_playlist */}
            <a
              href="/about"
              className={(navData) =>
                navData.isActive ? "active-page" : "none"
              }
            >
              <i className="fa fa-info-circle"></i>
              <span>À Propos</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
