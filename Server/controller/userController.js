// db connection;
const dbConnection = require("../db/dbConfig");

// password hashing.
const bcrypt = require("bcrypt");
// status code;
const { StatusCodes } = require("http-status-codes");

// importing jwt for check authorization after login
const jwt = require('jsonwebtoken');
//  register function;
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information" });
  }

  try {
    const [user] = await dbConnection.query(
      "select username,userid from users where username =? or email = ? ",
      [username, email],
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered." });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be atleast 8 character." });
    }

    //  // encrypt password;
    // random string generator;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await dbConnection.query(
      "INSERT INTO users(username,firstname,lastname,email,password) VALUES(?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword],
    );
    return res.status(StatusCodes.CREATED).json({
      msg: "user created.",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong , try again later!" });
  }
}
// login function;
async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all Fields!" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username,userid,password from users where email =? ",
      [email],
    );

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user not found" });
    }
      // compare the registered and the  the login passowrd;
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "user not found" });

      }
      const username = user[0].username;
      const userid = user[0].userid;
      const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
        expiresIn: "1day",
      });

      return res.status(StatusCodes.OK).json({
        msg: "user login successfull",
        token,username
      });


  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all Fields!" });
  }
}
// check user function;
async function checUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({
    msg: "valid user",username,userid
  })
}
module.exports = { register, login, checUser };
