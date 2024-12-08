const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT;
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.use(cors());

app.use(bodyParser.json());
app.use("/task", TaskRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
