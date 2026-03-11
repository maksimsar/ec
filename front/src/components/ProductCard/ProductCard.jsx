import './ProductCard.css';

function ProductCard({ product, onClick }) {
  return (
    <article className="product-card" onClick={() => onClick(product)}>
      <img
        className="product-card__image"
        src={product.image}
        alt={product.title}
        loading="lazy"
      />

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.title}</h3>

        <div className="product-card__bottom">
          <p className="product-card__price">{product.price} ₽</p>
          <button className="product-card__button" type="button">
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;