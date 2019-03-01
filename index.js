const express = require("express");
const apiRoute = require("./routes/api");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api", apiRoute);

const PORT = process.env.port || 3000;
app.listen(PORT);
