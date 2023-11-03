import { Container } from '@mui/material';
import { AppBar } from './components/AppBar';
import { ToDoItemsList } from './components/ToDoItem/ToDoItemsList';
import { ToDoListStore } from './store/ToDoListStore';
import { ToDo } from './store/ToDo';

export const App = () => {
  const store = new ToDoListStore([new ToDo()]);

  return (
    <>
      <AppBar />
      <Container maxWidth="lg" component="main" sx={{ mt: 2 }}>
        <ToDoItemsList toDoListStore={store} />
      </Container>
    </>
  )
};
