const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        required:true,
        ref:'Users'

    }
  });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo