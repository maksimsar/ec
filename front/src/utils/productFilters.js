import { getSearchRank } from './searchUtils';
// описание фильтрации по категориям, цене, алфавиту
export function getCategories(products) {
  const uniqueCategories = [...new Set(products.map((product) => product.category))];
  return uniqueCategories.sort((a, b) => a.localeCompare(b, 'ru'));
}

export function filterAndSortProducts(products, searchValue, filters) {
  let result = [...products];

  if (filters.category !== 'all') {
    result = result.filter((product) => product.category === filters.category);
  }

  if (filters.minPrice !== '') {
    result = result.filter((product) => product.price >= Number(filters.minPrice));
  }

  if (filters.maxPrice !== '') {
    result = result.filter((product) => product.price <= Number(filters.maxPrice));
  }

  if (filters.onlyAffordable) {
    result = result.filter((product) => product.price <= 5000);
  }

  if (searchValue.trim()) {
    result = result
      .map((product) => ({
        ...product,
        searchRank: getSearchRank(searchValue, product),
      }))
      .filter((product) => Number.isFinite(product.searchRank));
  }

  if (filters.sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.sort === 'title-asc') {
    result.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  } else if (filters.sort === 'title-desc') {
    result.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
  } else if (filters.sort === 'relevance' && searchValue.trim()) {
    result.sort((a, b) => a.searchRank - b.searchRank);
  }

  return result;
}