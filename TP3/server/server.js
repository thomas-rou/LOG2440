const path = require("path");
const express = require("express");
const cors = require("cors");
const { requestLogger } = require("./middlewares/requestLogger");

const app = express();
const PORT = 5020;
const SIZE_LIMIT = "10mb";
const PUBLIC_PATH = path.join(__dirname);

app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(express.static(PUBLIC_PATH));

// TODO : ajouter le middleware de journalisation pour tous les types de requêtes HTTP
app.use(requestLogger);
// TODO : Rajouter les routeurs sur les bon prefixes
const { router: partnerRouter} = require("./routes/partner");
const { router: reviewRouter } = require("./routes/review");
const { router: logsRouter} = require("./routes/logs");
app.use("/api/partner", partnerRouter);
app.use("/api/review", reviewRouter);
app.use("/logs", logsRouter);

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = server;
