import { useMemo, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import ProductList from '../../components/ProductList/ProductList';
import Modal from '../../components/Modal/Modal';
import useProducts from '../../hooks/useProducts';
import useTheme from '../../hooks/useTheme';
import { filterAndSortProducts, getCategories } from '../../utils/productFilters';
import './HomePage.css';

function HomePage() {
  const { products, loading, error } = useProducts();
  const { theme, toggleTheme } = useTheme();

  const [searchValue, setSearchValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    category: 'all',
    sort: 'relevance',
    onlyAffordable: false,
  });

  const categories = useMemo(() => getCategories(products), [products]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, searchValue, filters);
  }, [products, searchValue, filters]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="page">
      <div className="container">
        <header className="hero">
          <div>
            <p className="hero__badge">Каталог товаров</p>
            <h1 className="hero__title">Товары</h1>

          </div>

          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
          </button>
        </header>

        <div className="layout">
          <aside className="sidebar">
            <Filters
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </aside>

          <section className="content">
            <div className="content__topbar">
              <h2 className="content__title">Список товаров</h2>
              <p className="content__meta">Найдено: {filteredProducts.length}</p>
            </div>

            {loading && <p className="status">Загрузка...</p>}
            {error && <p className="status status--error">{error}</p>}

            {!loading && !error && (
              <ProductList
                products={filteredProducts}
                onCardClick={handleOpenModal}
              />
            )}
          </section>
        </div>

        <Modal product={selectedProduct} onClose={handleCloseModal} />
      </div>
    </main>
  );
}

export default HomePage;   