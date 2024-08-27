import db from "../knex.js";
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = await db("users").where({ id: user.id }).first();
    next();
  });
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET || "secret",
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET || "secret"
  );
};

export default authenticateToken;
