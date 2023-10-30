import { Container, Typography } from '@mui/material';
import { AppBar } from './components/AppBar';

export const App = () => (
   <>
    <AppBar />
    <Container maxWidth="lg" component="main" sx={{ mt: 2 }}>
      <Typography component="p">There's nothing here yet</Typography>
    </Container>
   </>
);
