import { useEffect, useState } from 'react';
import './Modal.css';

function Modal({ product, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!product) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [product]);

  if (!product) return null;

  const handleClose = () => {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isVisible ? 'modal-overlay--visible' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal ${isVisible ? 'modal--visible' : ''}`}>
        <button
          className="modal__close"
          onClick={handleClose}
          type="button"
          aria-label="Закрыть"
        >
          ×
        </button>

        <img className="modal__image" src={product.image} alt={product.title} />

        <div className="modal__content">
          <p className="modal__category">{product.category}</p>
          <h2 className="modal__title">{product.title}</h2>
          <p className="modal__description">{product.description}</p>

          <div className="modal__footer">
            <p className="modal__price">{product.price} ₽</p>
            <button className="modal__button" type="button">
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;