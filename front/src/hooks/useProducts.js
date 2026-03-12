import { useEffect, useState } from 'react';
 // загружаем данные из локального файла data.json через fetch, имитируя запрос к API
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

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

  return { products, loading, error };
}

export default useProducts;