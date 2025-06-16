const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 9099;

const userRoute = require("./routes/user.route");
const authorRoute = require("./routes/author.route");
const postRoute = require("./routes/post.route");
const addressRoute = require("./routes/address.route");
const authRoute = require("./routes/auth.route");
const loggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

const server = express();
server.use("/uploads", express.static(path.join(__dirname, "./uploads")));

server.use(express.json());

server.use(
  cors({
    origin: [
      "https://esame-modulo-6-node-savi-git-main-simone-randines-projects.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

server.use(loggerMiddleware);

server.use("/users", userRoute);
server.use("/authors", authorRoute);
server.use("/posts", postRoute);
server.use("/address", addressRoute);
server.use("/auth", authRoute);

server.use(errorHandler);

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "errore"));
db.once("open", () => {
  console.log("sei connesso al DB");
});

server.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
