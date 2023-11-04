import { CircularProgress, Stack, Typography } from '@mui/material';
import Fuse from 'fuse.js';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ToDoListStore } from '../../store/ToDoListStore';
import { SearchBar } from '../SearchBar/SearchBar';
import { ToDoItemView } from './ToDoItemView';

interface Props {
  toDoListStore: ToDoListStore
}

export const ToDoItemsList = observer(({
    toDoListStore: {
      status,
      toDoList,
      getToDoList,
      addToDo,
      removeToDo,
      updateToDo,
    }
  }: Props) => {
  const [ query, setQuery ] = useState('');

  useEffect(() => {
    getToDoList();
  }, [])

  const fuse = useMemo(() => {
    return new Fuse(toDoList, {
      keys: [
        'name',
      ],
      threshold: 0.3
    });
  }, [ toDoList ])

  const results = fuse.search(query);
  const toDoListFilterResults = query ? results.map(character => character.item) : toDoList;
  const isNothingFound = !!toDoList.length && !toDoListFilterResults.length;

  return (
    <Stack>
      <Stack px={1.5}>
        <SearchBar
          query={query}
          setQuery={setQuery}
        />
        {isNothingFound && <Typography variant="body2">Nothing found</Typography> }
      </Stack>
      <Stack>
        {status === 'initial'
          ? <CircularProgress />
          : toDoListFilterResults.map(toDoItem => (
              <ToDoItemView
                item={toDoItem}
                key={toDoItem.id}
                addToDo={addToDo}
                removeToDo={removeToDo}
                updateToDo={updateToDo}
              />
            ))
        }
      </Stack>
    </Stack>
  );
})
