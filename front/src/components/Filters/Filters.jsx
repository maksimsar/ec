import Search from '../Search/Search';
import './Filters.css';

function Filters({
  searchValue,
  onSearchChange,
  filters,
  onFilterChange,
  categories,
}) {
  return (
    <div className="filters">
      <div className="filters__group">
        <h3 className="filters__title">Поиск</h3>
        <Search value={searchValue} onChange={onSearchChange} />
      </div>

      <div className="filters__group">
        <h3 className="filters__title">Цена</h3>

        <div className="filters__row">
          <input
            className="filters__input"
            type="number"
            min="0"
            placeholder="От"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
          />
          <input
            className="filters__input"
            type="number"
            min="0"
            placeholder="До"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="filters__group">
        <h3 className="filters__title">Категория</h3>

        <select
          className="filters__select"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <h3 className="filters__title">Сортировка</h3>

        <select
          className="filters__select"
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
        >
          <option value="relevance">По релевантности</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="title-asc">Название А-Я</option>
          <option value="title-desc">Название Я-А</option>
        </select>
      </div>

      <label className="filters__checkbox">
        <input
          type="checkbox"
          checked={filters.onlyAffordable}
          onChange={(e) => onFilterChange('onlyAffordable', e.target.checked)}
        />
        <span>Только до 5000 ₽</span>
      </label>
    </div>
  );
}

export default Filters;