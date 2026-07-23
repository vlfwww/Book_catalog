const FAVORITES_KEY = "book_catalog_favorites";

export function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(bookTitle) {
  const favorites = getFavorites();
  return favorites.some((book) => book.title === bookTitle);
}

export function toggleFavorite(book) {
  let favorites = getFavorites();
  const index = favorites.findIndex((item) => item.title === book.title);

  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(book);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

  return index === -1;
}
