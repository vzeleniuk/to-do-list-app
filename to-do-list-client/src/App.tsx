import { Container } from '@mui/material';
import { AppBar } from './components/AppBar';
import { ToDoItemsList } from './components/ToDoItem/ToDoItemsList';

export const App = () => (
  <>
    <AppBar />
    <Container maxWidth="lg" component="main" sx={{ mt: 2 }}>
      <ToDoItemsList />
    </Container>
  </>
);
