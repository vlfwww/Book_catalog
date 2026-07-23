import "./Favorites.css";
import {
  getFavorites,
  toggleFavorite,
} from "../../services/favoritesService.js";

export function createFavorites() {
  const aside = document.createElement("aside");
  aside.className = "favorites-sidebar";
  aside.id = "favorites-sidebar-section";
  aside.innerHTML = `
    <div class="favorites-header">
      <div class="favorites-container">
        <div class="icon-wrapper">
          <svg class="icon heart-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="text-wrapper">
          <p>Favorites</p>
          <span id="favorites-count">0 books saved</span>
        </div>
      </div>
    </div>
    <div id="favorites-list" class="favorites-list">
      <p class="empty-favorites">No favorite books yet.</p>
    </div>
  `;
  return aside;
}

export function updateFavoritesSidebar() {
  const favoritesList = document.getElementById("favorites-list");
  const favoritesCount = document.getElementById("favorites-count");

  if (!favoritesList || !favoritesCount) return;

  const favorites = getFavorites();

  favoritesCount.textContent = `${favorites.length} ${favorites.length === 1 ? "book" : "books"} saved`;

  if (favorites.length === 0) {
    favoritesList.innerHTML = `<p class="empty-favorites">No favorite books yet.</p>`;
    return;
  }

  favoritesList.innerHTML = "";

  favorites.forEach((book) => {
    const item = document.createElement("div");
    item.className = "favorite-item";

    const coverContent = book.coverUrl
      ? `<img src="${book.coverUrl}" alt="${book.title}" />`
      : `<div class="no-cover-placeholder"><span>No cover</span></div>`;

    item.innerHTML = `
      ${coverContent}
      <div class="favorite-item-info">
        <p class="favorite-item-title">${book.title}</p>
        <span class="favorite-item-author">${book.author}</span>
        <span class="favorite-item-year">${book.firstPublishYear || ""}</span>
      </div>
      <button class="remove-favorite-btn" title="Remove">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z" fill="#ef4444" stroke="#ef4444" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    const removeBtn = item.querySelector(".remove-favorite-btn");
    removeBtn.addEventListener("click", () => {
      toggleFavorite(book);
      updateFavoritesSidebar();

      const cardButtons = document.querySelectorAll(".favorite-btn");
      cardButtons.forEach((btn) => {
        const cardTitle = btn
          .closest(".book-card")
          ?.querySelector(".book-title")?.textContent;
        if (cardTitle === book.title) {
          btn.classList.remove("active");
        }
      });
    });

    favoritesList.appendChild(item);
  });
}
