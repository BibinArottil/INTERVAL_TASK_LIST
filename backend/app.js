const express = require("express");
const cors = require("cors");
const app = express();
const listRoutes = require("./routes/list");

require("dotenv").config();
require("./config/dbConfig");

app.use(
  cors({
    origin: [process.env.FRONTEND],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/", listRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
