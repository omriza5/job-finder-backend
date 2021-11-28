const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./routes/user.route");
const auth = require("./routes/auth.route");

/** mongodb connection */
require("./db/mongoose")();

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
