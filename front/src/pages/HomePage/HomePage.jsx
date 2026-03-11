import { useEffect, useMemo, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import ProductList from '../../components/ProductList/ProductList';
import Modal from '../../components/Modal/Modal';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data.json');

        if (!response.ok) {
          throw new Error('Не удалось загрузить товары');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [products, searchValue]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="home-page">
      <div className="container">
        <h1 className="home-page__title">Каталог товаров</h1>

        <Filters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {loading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <ProductList
            products={filteredProducts}
            onCardClick={handleOpenModal}
          />
        )}

        <Modal product={selectedProduct} onClose={handleCloseModal} />
      </div>
    </main>
  );
}

export default HomePage;