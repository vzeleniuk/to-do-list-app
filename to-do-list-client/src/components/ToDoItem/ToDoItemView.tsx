import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { ToDoItem } from '../../types/toDo-types';
import { useState } from 'react';

interface Props {
  item?: ToDoItem
}

export const ToDoItemView = ({ item }: Props) => {
  const [name, setName ] = useState('')
  const [checked, setChecked ] = useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log('set checked', event.target.checked, item?.id)
  };
  const isChecked = item?.checked ?? checked;

  return (
    <Stack flexDirection="row" gap={2}>
      <Checkbox
        checked={isChecked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <TextField
        hiddenLabel
        value={item?.name || name}
        id="here-will-be-dynamic-id"
        size="small"
        placeholder="..."
        disabled={isChecked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
        onBlur={(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          console.log('post/put todo: ', event.target.value, item?.id);
        }}
      />
      {(item?.name ?? name) && (
        <IconButton
          aria-label="delete"
          title="Delete"
          onClick={() => {
            console.log("Delete todo", item?.id);
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Stack>
  )
}
