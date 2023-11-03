import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, Stack, TextField, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { ToDo } from '../../store/ToDo';

const StyledInput = styled(TextField)(({ disabled, theme }) => ({
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

interface Props {
  item: ToDo;
  addToDo: Function;
  removeToDo: Function;
}

export const ToDoItemView = observer(({ item, addToDo, removeToDo }: Props) => {
  const handleCheckboxChange = useCallback((_event: React.ChangeEvent<HTMLInputElement>) => {
    item.toggle();
  }, [item]);

  const handleInputBlur = useCallback((value: string) => {
    if (value) {
      addToDo();
    } else {
      removeToDo(item.id)
    }

  }, [item, addToDo, removeToDo])

  const handleDelete = useCallback(() => {
    console.log("Delete", item.id)
  }, [item])

  return (
    <Stack flexDirection="row" gap={2}>
      <Checkbox
        checked={item.checked}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <StyledInput
        hiddenLabel
        value={item.name}
        id="here-will-be-dynamic-id"
        size="small"
        placeholder="..."
        disabled={!!item.name && item.checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          item.update(event.target.value);
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          handleInputBlur(event.target.value)
        }}
      />
      {item.name && (
        <IconButton
          aria-label="delete"
          title="Delete"
          onClick={handleDelete}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  )
})
