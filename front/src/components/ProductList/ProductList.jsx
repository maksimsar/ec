import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

function ProductList({ products, onCardClick }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3 className="empty-state__title">Ничего не найдено</h3>
        <p className="empty-state__text">
          Попробуй изменить фильтры или поисковый запрос.
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default ProductList;