import { isFavorite, toggleFavorite } from "../../services/favoritesService";
import { updateFavoritesSidebar } from "../Favorites/Favorites.js";
import "./BookCard.css";

export function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const isFav = isFavorite(book.title);

  card.innerHTML = `
    <div class="book-cover-wrapper">
      ${book.coverUrl ? `<img src="${book.coverUrl}" class="book-cover" alt="${book.title}" />` : `<span class="no-cover">No Cover</span>`}
      <button class="favorite-btn ${isFav ? "active" : ""}" title="Add to favorites">
        <svg class="heart-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="book-info">
      <p class="book-title">${book.title}</p>
      <span class="book-author">${book.author || "Unknown Author"}</span>
      <span class="book-year">${book.firstPublishYear || ""}</span>
    </div>
  `;

  const toggleFavoriteBtn = card.querySelector(".favorite-btn");

  toggleFavoriteBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isFavoriteState = toggleFavorite(book);

    if (isFavoriteState) {
      toggleFavoriteBtn.classList.add("active");
    } else {
      toggleFavoriteBtn.classList.remove("active");
    }

    updateFavoritesSidebar();
  });

  return card;
}
