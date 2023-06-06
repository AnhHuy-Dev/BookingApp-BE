const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const db = require("./db/index");
db.connect();

const route = require("./routes/index");
route(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server started at port " + PORT));
