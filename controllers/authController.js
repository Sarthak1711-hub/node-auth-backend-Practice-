const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---------------- SIGNUP ----------------
exports.signup = (req, res) => {
  const { name, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send("Salt error");

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send("Hash error");

      try {
        const user = await usermodel.create({
          name,
          user_email: email,
          secret_password: hash,
          age,
        });

        const token = jwt.sign(
          { user_email: user.user_email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
        });

        res.send("Signup successful");
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  });
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // IMPORTANT: explicitly fetch hidden password
    const user = await usermodel
      .findOne({ user_email: email })
      .select("+secret_password");

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.secret_password);

    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { user_email: user.user_email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};

// ---------------- LOGOUT ----------------
exports.logout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.redirect("/");
};
