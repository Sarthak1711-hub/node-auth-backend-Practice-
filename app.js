require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const { isLoggedIn } = require("./middlewares/authMiddleware");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");

// Pages
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));

// Auth routes
app.use(authRoutes);

// Protected route example
app.get("/profile", isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.user_email}`);
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
