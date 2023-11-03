import { TextField, styled } from '@mui/material';

export const StyledInput = styled(TextField)(({ disabled, theme }) => ({
  textDecoration: disabled ? 'line-through' : 'unset',
  color: theme.palette.grey[500],
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-disabled fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
}));
