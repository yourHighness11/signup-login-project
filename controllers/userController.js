const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !name || !password || !phone) {
      res.status(400).send("Please fill all the fields.");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: await bcrypt.hash(password, 10),
    });

    const token = await jwt.sign(
      { user_id: newUser._id, email },
      "my_jsonwebtoken_secret_key",
      {
        expiresIn: "1h",
      }
    );

    newUser.token = token;
    res.status(201).json({
      user_id: newUser._id,
      email: newUser.email,
      token: newUser.token,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).send("Please fill all the fields.");
    }

    const user = await User.findOne({ email });
    const correctPassword = await bcrypt.compare(password, user.password);

    if (user && correctPassword) {
      const token = jwt.sign(
        { user_id: user._id, email },
        "my_jsonwebtoken_secret_key",
        {
          expiresIn: "1h",
        }
      );

      user.token = token;

      res.status(200).json({
        user_id: user._id,
        email: user.email,
        token: user.token,
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
