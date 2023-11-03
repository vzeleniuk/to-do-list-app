import { Skeleton, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ToDoListStore } from '../../store/ToDoListStore';
import { ToDoItemView } from './ToDoItemView';

interface Props {
  toDoListStore: ToDoListStore
}

export const ToDoItemsList = observer(({
    toDoListStore: {
      status,
      toDoList,
      addToDo,
      removeToDo,
      getToDoList,
      updateToDo,
    }
  }: Props) => {

  useEffect(() => {
    getToDoList();
  }, [])

  return (
    <Stack>
      {status === 'initial'
        ? <Skeleton variant="rounded" width={400} height={40} />
        : toDoList.map(toDoItem => (
            <ToDoItemView
              item={toDoItem}
              key={toDoItem.id}
              addToDo={addToDo}
              removeToDo={removeToDo}
              updateToDo={updateToDo}
            />
          ))
      }
    </Stack>
  );
})
