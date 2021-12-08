const express =require('express') 
const todoController=require('../controllers/todo')
const guard = require('../middleware/auth')

const router = express.Router()

router.post('/',guard, todoController.addTodo)

router.get('/',guard, todoController.getTodos)

router.delete('/:id',guard, todoController.deleteTodo)

router.put('/:id',guard, todoController.updateTodo)
module.exports=router

  