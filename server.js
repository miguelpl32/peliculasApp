const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(`${__dirname}/dist/peliculasApp`));
app.get("/*", function (req, res) {
  res.sendFile(path.join(`./dist/peliculasApp/index.html`));
});
app.listen(process.env.PORT || 3000);
