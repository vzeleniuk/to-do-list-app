import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { ToDo } from '../../store/ToDo';
import { UpdateToDoPayload } from '../../types';
import { StyledInput } from './ToDoItemView.style';

interface Props {
  item: ToDo;
  addToDo: (name: string) => void;
  removeToDo: (id: string) => void;
  updateToDo: (id: string, payload: UpdateToDoPayload) => void;
}

export const ToDoItemView = observer(({
  item,
  addToDo,
  removeToDo,
  updateToDo,
}: Props) => {
  const [itemName, setItemName] = useState<string | undefined>(undefined);
  const currentItemName = itemName ?? item.name;

  const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentItemName) {
      updateToDo(item.id, {name: currentItemName, checked: event?.target.checked});
    }
  }, [currentItemName]);

  const handleInputBlur = useCallback((value: string) => {
    if (value && !item.name) {
      addToDo(value);
    } else if (value && (value !== item.name)) {
      updateToDo(item.id, {name: value, checked: item.checked});
    } else if (!value && item.name) {
      removeToDo(item.id)
    }
  }, [item])

  const handleDelete = useCallback(() => {
    removeToDo(item.id);
  }, [item])

  return (
    <Stack flexDirection="row" gap={2}>
      <Checkbox
        checked={item.checked}
        disabled={!item.name}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <StyledInput
        hiddenLabel
        value={currentItemName}
        id={item.id}
        size="small"
        placeholder="...start typing"
        disabled={!!item.name && item.checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setItemName(event.target.value);
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
