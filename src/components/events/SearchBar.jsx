import { SearchIcon } from '../common/Icons';

function SearchBar({ placeholder = 'Search…', value, onChange, style = {} }) {
  return (
    <div className="app-search" style={{ flex: 1, maxWidth: 340, ...style }}>
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ border: 'none', outline: 'none', background: 'transparent', font: 'inherit', color: 'inherit', width: '100%' }}
      />
    </div>
  );
}

export default SearchBar;
