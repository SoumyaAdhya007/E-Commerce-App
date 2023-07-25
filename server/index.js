const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.listen(process.env.PORT, () => {
  try {
    console.log(`Server listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(
      `Error listening on port ${process.env.PORT} => ${error.message}`
    );
  }
});
