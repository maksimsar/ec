function ProductCard({ product, onClick }) {
  return (
    <article className="product-card" onClick={() => onClick(product)}>
      <img
        className="product-card__image"
        src={product.image}
        alt={product.title}
      />
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">{product.price} ₽</p>
      </div>
    </article>
  );
}

export default ProductCard;