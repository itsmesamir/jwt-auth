import db from "../knex.js";
import moment from "moment";

/**
 * get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await db("tasks").select("*");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * get task by id
 *
 * @param {*} req
 * @param {*} res
 */
export const getTaskById = async (req, res) => {
  try {
    const task = await db("tasks").where({ id: req.params.id }).first();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * create task
 *
 * @param {*} req
 * @param {*} res
 */
export const createTask = async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const [id] = await db("tasks").insert(req.body);
    const task = await db("tasks").where({ id }).first();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * update task
 * @param {*} req
 * @param {*} res
 */
export const updateTask = async (req, res) => {
  try {
    //    moment to format updated_at and created_at
    req.body.updated_at = moment().format(req.body.updated_at);
    req.body.created_at = moment().format(req.body.created_at);

    await db("tasks").where({ id: req.params.id }).update(req.body);
    const task = await db("tasks").where({ id: req.params.id }).first();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * delete task
 * @param {*} req
 * @param {*} res
 */
export const deleteTask = async (req, res) => {
  try {
    await db("tasks").where({ id: req.params.id }).del();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
