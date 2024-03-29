require('dotenv').config()
const cors = require("cors");
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
server.use(express.urlencoded({extended:true}));
server.use(express.json());

server.use(
  cors({
    origin:'*',
    preflightContinue:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ["POST", "PUT", "GET", "PATCH", "OPTIONS", "HEAD", "DELETE"],
    optionsSuccessStatus: 200,
  })
);


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
