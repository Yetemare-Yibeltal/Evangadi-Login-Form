const mysq2 = require("mysql2");
// database connection;
const dbconnection = mysq2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});
// check .env files in termial
// console.log(process.env.USER)
// console.log(process.env.DATABASE);
// console.log(process.env.PASSWORD);
// console.log( process.env.JWT_SECRET);

// // check if the connection is successfull;
// dbconnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbconnection.promise();