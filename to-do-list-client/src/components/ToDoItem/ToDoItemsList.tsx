import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ToDoListStore } from '../../store/ToDoListStore';
import { ToDoItemView } from './ToDoItemView';

interface Props {
  toDoListStore: ToDoListStore
}

export const ToDoItemsList = observer(({
    toDoListStore: {
      toDoList,
      addToDo,
      removeToDo,
      getToDoList,
    }
  }: Props) => {

  useEffect(() => {
    getToDoList();
  }, [])

  return (
    <Stack>
      {toDoList.map(toDoItem => (
        <ToDoItemView
          item={toDoItem}
          key={toDoItem.id}
          addToDo={addToDo}
          removeToDo={removeToDo}
        />
      )) }
    </Stack>
  );
})
