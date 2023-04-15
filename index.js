const { urlencoded } = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const express = require("express");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

const PORT = process.env.PORT || 5000;
// const KEY = process.env.SECRET_KEY || "secretekey";

const connectDB = require("./db/connection");

//routes
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/users");
const postRouter = require("./src/routes/post");
const farmvisitRouter = require("./src/routes/farmvisit");
const careerRouter = require("./src/routes/career");
const dashboardRouter = require("./src/routes/dashboard");

const server = express();
server.use(
  cors({
    origin: [
      process.env.ADMIN_URL,
      process.env.CLIENT_URL
    ],
    methods: ["POST", "PUT", "GET", "PATCH", "OPTIONS", "HEAD", "DELETE"],
    optionsSuccessStatus: 200,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(helmet());
server.use(xss());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  next();
});
server.use("/auth", authRouter);
server.use("/api", userRouter);
server.use("/posts", postRouter);
server.use("/farmvisits", farmvisitRouter);
server.use("/career", careerRouter);
server.use("/dashboard", dashboardRouter);


connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`listening for requests on port ${PORT}`);
  });
});
