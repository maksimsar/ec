function Search({ value, onChange }) {
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Поиск товара..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Search;