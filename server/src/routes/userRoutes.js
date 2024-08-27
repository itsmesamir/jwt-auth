import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// router.route("/").get(getUsers).post(createUser);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// router.route("/").get(getUsers).post(createUser);

router.get("/", authenticateToken, getUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
