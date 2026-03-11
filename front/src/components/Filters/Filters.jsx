import Search from '../Search/Search';

function Filters({ searchValue, onSearchChange }) {
  return (
    <section>
      <Search value={searchValue} onChange={onSearchChange} />
    </section>
  );
}

export default Filters;