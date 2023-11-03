import { Container, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

export const AppBar = () => (
  <MuiAppBar position="static">
    <Toolbar disableGutters>
      <Container maxWidth="lg">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ToDo List
        </Typography>
      </Container>
    </Toolbar>
  </MuiAppBar>
)
