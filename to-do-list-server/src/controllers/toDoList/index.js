const { v4: uuidv4 } = require('uuid')

const toDoList = new Map()

const getToDoList = (req, res) => {
  console.log('getToDoList', [...toDoList.values()])
  res.json([...toDoList.values()])
}

const addToDo = (req, res) => {
  try {
    const toDoId = uuidv4()
    const toDoData = {
      id: toDoId,
      name: req.body.name,
      checked: false
    }

    console.log('Creating ToDo with info ', toDoData)
    toDoList.set(toDoId, toDoData)
    console.log('ToDo created successfully ')
    console.log('ToDo List', [...toDoList.values()])
    res
    .status(200)
    .json(toDoData)
  } catch (err) {
    console.log('Error creating ToDo info ', err)
    throw err
  }
}

const updateToDo = (req, res) => {
  res.json({
    message: 'Updated'
  })
}

const deleteToDo = (req, res) => {
  res.json({
    message: 'Deleted'
  })
}


module.exports = {
  getToDoList,
  addToDo,
  updateToDo,
  deleteToDo,
}
