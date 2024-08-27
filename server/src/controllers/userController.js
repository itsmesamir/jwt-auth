import db from "../knex.js";

/**
 *
 * get all users
 *
 * @param {*} req
 * @param {*} res
 */
export const getUsers = async (req, res) => {
  try {
    const users = await db("userss").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * get user by id
 *
 * @param {*} req
 * @param {*} res
 */
export const getUserById = async (req, res) => {
  try {
    const user = await db("users").where({ id: req.params.id }).first();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * create user
 *
 * @param {*} req
 * @param {*} res
 */
export const createUser = async (req, res) => {
  try {
    const [id] = await db("users").insert(req.body);
    const user = await db("users").where({ id }).first();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * update user
 * @param {*} req
 * @param {*} res
 */
export const updateUser = async (req, res) => {
  try {
    await db("users").where({ id: req.params.id }).update(req.body);
    const user = await db("users").where({ id: req.params.id }).first();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * delete user
 * @param {*} req
 * @param {*} res
 */
export const deleteUser = async (req, res) => {
  try {
    await db("users").where({ id: req.params.id }).del();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
