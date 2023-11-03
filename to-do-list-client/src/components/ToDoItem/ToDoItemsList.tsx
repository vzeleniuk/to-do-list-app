import { Stack } from '@mui/material';
import { ToDoItemView } from './ToDoItemView';
import { observer } from 'mobx-react-lite';
import { ToDoListStore } from '../../store/ToDoListStore';

interface Props {
  toDoListStore: ToDoListStore
}

export const ToDoItemsList = observer(({
    toDoListStore: {
      toDoList,
      addToDo,
      removeToDo
    }
  }: Props) => {

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
