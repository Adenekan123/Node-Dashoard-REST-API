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
    origin: [process.env.ADMIN_URL, process.env.CLIENT_URL],
    optionsSuccessStatus: 200,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// server.use(
//   session({
//     secret: KEY,
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//       mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/dashboard",
//       ttl: 24 * 60 * 60,
//       autoRemove: "native",
//     }),
//     cookie: {
//       httpOnly: false,
//       maxAge: 1000 * 24 * 60 * 60,
//       secure: true,
//     },
//   })
// );

// var whitelist = [
//   "https://dorfville.cyclic.app",
//   "https://dorfvilleadmin.netlify.app",
//   "http://localhost:3001",
//   "http://localhost:3000",
// ];
// var corsOptions = {
//   origin: whitelist,
//   methods: ["POST", "PUT", "GET", "PATCH", "OPTIONS", "HEAD", "DELETE"],
// };

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

// server.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`listening for requests on port ${PORT}`);
  });
});
