import { TextField, styled } from '@mui/material';

export const StyledSearchInput = styled(TextField)(({ theme }) => ({
  maxWidth: 300,
  marginBottom: theme.spacing(1.5),
})) as typeof TextField;
