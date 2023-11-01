const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5020;
const SIZE_LIMIT = "10mb";
const PUBLIC_PATH = path.join(__dirname);

app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(express.static(PUBLIC_PATH));

// TODO : ajouter le middleware de journalisation pour tous les types de requêtes HTTP

// TODO : Rajouter les routeurs sur les bon prefixes
app.use("/api/partner", ()=>{});
app.use("/api/review",  ()=>{});
app.use("/logs", ()=>{});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = server;
