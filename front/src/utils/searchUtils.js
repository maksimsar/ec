// Считаем расстояние Левенштейна между двумя строками
export function levenshtein(a, b) {
  const first = a.toLowerCase().trim();
  const second = b.toLowerCase().trim();

  if (first === second) return 0;
  if (!first.length) return second.length;
  if (!second.length) return first.length;

  const matrix = Array.from({ length: first.length + 1 }, () =>
    new Array(second.length + 1).fill(0)
  );

  for (let i = 0; i <= first.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= second.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= first.length; i += 1) {
    for (let j = 1; j <= second.length; j += 1) {
      const cost = first[i - 1] === second[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[first.length][second.length];
}
// обычный поиск по вхождению строки в название товара, а также с учетом опечаток (до 1 символа для коротких слов и до 2 для длинных)
export function getSearchRank(query, product) {
  const normalizedQuery = query.toLowerCase().trim();
  const title = product.title.toLowerCase();
  const words = title.split(/[\s-]+/).filter(Boolean);

  if (!normalizedQuery) {
    return 0;
  }

  if (normalizedQuery.length < 2) {
    return Number.POSITIVE_INFINITY;
  }

  if (title.includes(normalizedQuery)) {
    return 1;
  }

  const minDistance = Math.min(
    ...words.map((word) => levenshtein(normalizedQuery, word))
  );

  const allowedDistance = normalizedQuery.length <= 4 ? 1 : 2;

  if (minDistance <= allowedDistance) {
    return 2 + minDistance;
  }

  return Number.POSITIVE_INFINITY;
}