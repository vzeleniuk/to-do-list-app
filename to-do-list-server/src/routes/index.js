const express = require('express')
	const router = express.Router();
	const toDoList = require('../controllers/toDoList');

	/// public endpoints
	router.get('/', toDoList.getToDoList);
	router.post('/', toDoList.addToDo);
	router.put('/:toDoId', toDoList.updateToDo);
	router.delete('/:toDoId', toDoList.deleteToDo);

	module.exports = router;
