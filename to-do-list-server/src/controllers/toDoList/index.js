const { v4: uuidv4 } = require('uuid')

const toDoList = new Map()

const getToDoList = (req, res) => {
  try {
    console.log('Get ToDoList', [...toDoList.values()])
    res.json([...toDoList.values()])
  } catch (error) {
    console.log('Error creating ToDo info ', err)
    throw err
  }
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
      .json({ data: { toDoData } })
  } catch (err) {
    console.log('Error creating ToDo info ', err)
    throw err
  }
}

const updateToDo = (req, res) => {
  try {
    const toDoId = req.params.toDoId;
    const toDoListItemModified = {
      id: toDoId,
      name: req.body.name,
      checked: req.body.checked,
    };
    console.log('Updating ToDo with info ', toDoListItemModified);
    toDoList.set(toDoId, toDoListItemModified);
    console.log('Updated ToDo successfully', toDoList.get(toDoId));
    console.log('ToDo List', [...toDoList.values()])
    res
      .status(200)
      .json({ data: toDoList.get(toDoId) })
  } catch (error) {
    console.log('Error updating ToDo info ', err)
    throw err
  }
}

const deleteToDo = (req, res) => {
  try {
    const toDoId = req.params.toDoId;
    console.log('Deleting ToDo ', toDoId);
    toDoList.delete(toDoId);
    if (!toDoList.has(toDoId)) {
      console.log('Delete ToDo successfully');
    }
    console.log('ToDo List', [...toDoList.values()])
    res
      .status(204)
      .send()
  } catch (error) {
    console.log('Error deleting ToDo ', err)
    throw err
  }
}

module.exports = {
  getToDoList,
  addToDo,
  updateToDo,
  deleteToDo,
}
