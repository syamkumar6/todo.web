const express = require('express')
const Todo = require('../Models/Todo')
const router = express.Router()
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');

const Verify = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ Message: "we need token please provide it ." })
    } else {
      jwt.verify(token,process.env.JWT_KEY,(err, decoded) => {
        if (err) {
          return res.json({ Message: "Authentication Error." });
        } else {
          req.user = decoded.user
          next();
        }
      });
    }
  };

router.get('/', Verify, async (req, res) => {
    try{
        const todos = await Todo.find({user: req.user.id})
        res.status(200).json({todos: todos, user: req.user })
    }
    catch(err){
        console.log(err)
        res.status(500).send("Error")
    }
})

router.post('/',Verify, async (req, res) => {
    const data = req.body
    const user = req.user.id
    try{
        const todo = new Todo({
            ...data,
            user:user
        })
        await todo.save()
        res.status(201).json(todo)
    }
    catch(err){
        res.status(400).send("Invalid input data")
    }
})

router.delete('/:todoId', Verify, async (req, res) => {
    try{
       const givenTodo = await Todo.findById(req.params.todoId)
       const createdUserId = givenTodo.user.toString()
       if(createdUserId === req.user.id){
          await Todo.findByIdAndDelete(req.params.todoId)
          res.status(204).json({Status:"Todo deleted"})
          
       }
       else{
        console.log(err)
        res.status(401).send("Cannot delete todo. Unauthorized!")
       }
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
})

module.exports = router