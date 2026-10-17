// for .env file 
require("dotenv").config();

const express = require("express");
const app = express();

// cors module is used to access URL From the frontend;
const cors = require('cors');
app.use(cors());

const port = 5500;
// db connection;
const dbConnection = require("./db/dbConfig");
// Authentication middleware file;
const authMiddleware = require('./middleware/authmiddleware');
// import userRoute.js
const userRoutes = require("./routes/userRoute");
// import question routes;
const questionRoutes = require("./routes/questionRoute");

// json middleware to extract json data's;
app.use(express.json());
 // for form submissions
app.use(express.urlencoded({ extended: true }));

// user base URL middleware.
app.use("/api/users", userRoutes);

// questions routes base URL      middleware;
app.use("/api/questions",authMiddleware,questionRoutes)
// answer routes base URL middleware;

async function start() {
  try {
    const result = await dbConnection.execute("select'test' ");
    app.listen(port);
    console.log("database connection secessfull")
    console.log(`listening on ${port}`)

  } catch (err) {
    console.log(err.message);
  }
}
start();
