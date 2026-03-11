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

export function getSearchRank(query, product) {
  const normalizedQuery = query.toLowerCase().trim();
  const title = product.title.toLowerCase();
  const category = product.category.toLowerCase();
  const words = title.split(/[\s-]+/).filter(Boolean);

  if (!normalizedQuery) return 1000;

  if (title === normalizedQuery) return 0;

  if (words.some((word) => word === normalizedQuery)) return 1;

  if (title.startsWith(normalizedQuery)) return 2;

  if (words.some((word) => word.startsWith(normalizedQuery))) return 3;

  if (title.includes(normalizedQuery)) return 4;

  if (category.includes(normalizedQuery) && normalizedQuery.length >= 3) return 6;

  if (normalizedQuery.length < 2) {
    return Number.POSITIVE_INFINITY;
  }

  const distances = words.map((word) => {
    const distance = levenshtein(normalizedQuery, word);
    return distance / Math.max(word.length, normalizedQuery.length);
  });

  const minDistance = Math.min(...distances);

  if (normalizedQuery.length <= 3 && minDistance <= 0.34) {
    return 8 + minDistance;
  }

  if (normalizedQuery.length > 3 && minDistance <= 0.4) {
    return 8 + minDistance;
  }

  return Number.POSITIVE_INFINITY;
}