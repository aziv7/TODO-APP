const Todo = require("../models/todo");
const asyncHandler = require("express-async-handler");

const getTodos = asyncHandler(async (req, res) => {
  const all = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json(all);
});

const addTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({
    title,
    user: req.user._id,
  });
  const created = await todo.save();
  if (created) {
    res.status(201).json(created);
  } else {
    res.status(500);
    throw new Error("unable to add todo");
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  const { title, status } = req.body;
  const done_in = status && new Date();

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, status, done_in },
    { new: true }
  );
  if (!todo) {
    res.status(200);
    throw new Error("todo not found");
  }
  res.status(200).json(todo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("todo not found");
  }

  res.status(200).json(todo);
});
module.exports = { deleteTodo, updateTodo, addTodo, getTodos };
