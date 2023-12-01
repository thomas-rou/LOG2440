const path = require("path");
const express = require("express");
const songsRouter = require("./routes/songs");
const playlistsRouter = require("./routes/playlists");
const searchBarRouter = require("./routes/search_bar");
const DB_CONSTS = require("./utils/env");
const { dbService } = require('./services/database.service');
const cors = require("cors");

const app = express();
const PORT = 5020;
const SIZE_LIMIT = "10mb";
const PUBLIC_PATH = path.join(__dirname);

app.use(cors({ origin: "*" }));

// afficher chaque nouvelle requête dans la console
app.use((request, response, next) => {
  console.log(`New HTTP request: ${request.method} ${request.url}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(express.static(PUBLIC_PATH));

app.use("/api/songs", songsRouter.router);
app.use("/api/playlists", playlistsRouter.router);
app.use("/api/search", searchBarRouter.router);

const server = app.listen(PORT, () => {
  dbService.connectToServer(DB_CONSTS.DB_URL).then(() => {
    // TODO : populer la BD avec les valeurs par défaut
    const songsData = require("./data/songs.json");
    const playlistsData = require("./data/playlists.json");
    const songs = songsData.songs;
    const playlists = playlistsData.playlists;
    dbService.populateDb(DB_CONSTS.DB_COLLECTION_SONGS, songs);
    dbService.populateDb(DB_CONSTS.DB_COLLECTION_PLAYLISTS, playlists);
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}.`);
  });
});

module.exports = server;
