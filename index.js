const express = require("express");
const app = express();

/** mongodb connection */
require("./db/mongoose")();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
