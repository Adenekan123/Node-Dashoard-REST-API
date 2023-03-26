const mongoose = require("mongoose");

// mongoose.connect(
//   process.env.MONGO_URI || "mongodb://localhost:27017/dashboard",
//   {
//     useUnifiedTopology: true,
//     keepAlive: true,
//   }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

const connectDB = async () => {
  try {
    console.log("here:", process.env.MONGO_URI);
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/dashboard"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
