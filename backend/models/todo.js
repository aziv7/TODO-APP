const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    deadline: { type: Date },
    description: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    done_in: {
      type: Date,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
