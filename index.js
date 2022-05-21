const { urlencoded } = require("express");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const PORT = process.env.PORT || 5000;
const KEY = process.env.SECRET_KEY || "secretekey";

require("./db/connection");

//routes
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/users");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(
  session({
    secret: KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/dashboard",
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native",
    }),
    cookie: {
      maxAge: 1000 * 24 * 60 * 60,
    },
  })
);

server.use("/auth", authRouter);
server.use("/user", userRouter);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
