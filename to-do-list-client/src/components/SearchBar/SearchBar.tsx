import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputAdornment } from '@mui/material';
import { StyledSearchInput } from './SearchBar.style';

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ query, setQuery }: Props) => (
  <StyledSearchInput
    value={query}
    label="Search"
    id="search"
    size="small"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            title="Clear"
            aria-label="clear search query"
            onClick={() => setQuery('')}
            edge="end"
          >
            {query && <CloseIcon />}
          </IconButton>
        </InputAdornment>
      )
    }}
  />
)
