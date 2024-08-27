import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authenticateToken from "./middleware/auth.js";

const app = express();

// allow cors for all ports
app.use(cors({ origin: "*", credentials: true })); // credentials: true allows the client to send cookies
// this is needed to parse form data, like when a user logs in
// parse json data sent from the client, eg: when creating a new user or task in the database using the client app (React)
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// call authRoutes before userRoutes and taskRoutes
app.use(authenticateToken);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
