import "./BookCard.css";

export function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
    <div class="book-cover-wrapper">
      ${book.coverUrl ? `<img src="${book.coverUrl}" class="book-cover" alt="${book.title}" />` : `<span class="no-cover">No Cover</span>`}
      <button class="favorite-btn" title="Add to favorites"><img src="/assets/heart.svg" class="icon icon-white" alt="Heart" /></button>
    </div>
    <div class="book-info">
      <h4 class="book-title">${book.title}</h4>
      <span class="book-author">${book.author || "Unknown Author"}</span>
      <span class="book-year">${book.firstPublishYear || ""}</span>
    </div>
  `;
  return card;
}
