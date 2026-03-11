import ProductCard from '../ProductCard/ProductCard';

function ProductList({ products, onCardClick }) {
  if (!products.length) {
    return <p>Ничего не найдено.</p>;
  }

  return (
    <section className="products-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onCardClick}
        />
      ))}
    </section>
  );
}

export default ProductList;