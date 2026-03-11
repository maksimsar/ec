import { useEffect } from 'react';

function Modal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        <img className="modal__image" src={product.image} alt={product.title} />

        <div className="modal__content">
          <p className="modal__category">{product.category}</p>
          <h2 className="modal__title">{product.title}</h2>
          <p className="modal__description">{product.description}</p>
          <p className="modal__price">{product.price} ₽</p>
          <button className="modal__button">Купить</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;