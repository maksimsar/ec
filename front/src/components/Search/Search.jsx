import './Search.css';

function Search({ value, onChange }) {
  return (
    <input
      className="search__input"
      type="text"
      placeholder="Поиск товара..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Search;