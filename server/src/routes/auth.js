import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import db from "../knex.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db("users").insert({
      name: username,
      email: username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // send the error message to the client
    // sending error messages to the client can be a security risk
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { username: email, password } = req.body;

  try {
    const user = await db("users").where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, keys.refreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { email: user.username },
      keys.accessTokenSecret,
      { expiresIn: keys.accessTokenExpiry }
    );
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.json({ accessToken });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
});

export default router;
