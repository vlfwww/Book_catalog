import "./style.css";
import { createHeader } from "./components/Header/Header.js";
import { createIntro } from "./components/Intro/Intro.js";
import { createCatalog } from "./components/Catalog/Catalog.js";
import { createFavorites } from "./components/Favorites/Favorites.js";
import { createFooter } from "./components/Footer/Footer.js";
import { createBookCard } from "./components/BookCard/BookCard.js";
import { fetchBooks } from "./services/api.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");

  const mainContent = document.createElement("main");
  mainContent.className = "main-content";

  const contentLayout = document.createElement("div");
  contentLayout.className = "content-layout";

  contentLayout.appendChild(createCatalog());
  contentLayout.appendChild(createFavorites());

  mainContent.appendChild(createIntro());
  mainContent.appendChild(contentLayout);

  appContainer.appendChild(createHeader());
  appContainer.appendChild(mainContent);
  appContainer.appendChild(createFooter());

  async function renderBooks(query) {
    const booksGrid = document.getElementById("books-grid");
    const statusMessage = document.getElementById("status-message");
    if (!booksGrid || !statusMessage) return;

    statusMessage.textContent = "Loading...";
    statusMessage.style.display = "block";
    booksGrid.innerHTML = "";

    const rawBooks = await fetchBooks(query);

    if (rawBooks.length === 0) {
      statusMessage.textContent = "Nothing found";
      statusMessage.style.display = "block";
      return;
    }

    statusMessage.style.display = "none";

    rawBooks.forEach((bookData) => {
      const book = {
        title: bookData.title,
        author: bookData.author_name
          ? bookData.author_name[0]
          : "Unknown Author",
        firstPublishYear: bookData.first_publish_year,
        coverUrl: bookData.cover_i
          ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`
          : null,
      };

      const cardElement = createBookCard(book);
      booksGrid.appendChild(cardElement);
    });
  }

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchWrapper = document.getElementById("search-wrapper");
  const inputErrorMessage = document.getElementById("input-error-message");

  function showError(message) {
    searchWrapper.classList.add("error");
    inputErrorMessage.textContent = message;
    inputErrorMessage.style.display = "block";
  }

  function hideError() {
    searchWrapper.classList.remove("error");
    inputErrorMessage.style.display = "none";
  }

  function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
      showError("Please enter a search query.");
      return;
    }

    if (query.length < 3) {
      showError("Please enter at least 3 characters for search.");
      return;
    }

    hideError();
    renderBooks(query);
    searchInput.value = "";
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", handleSearch);

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });

    searchInput.addEventListener("input", () => {
      if (searchWrapper.classList.contains("error")) {
        hideError();
      }
    });
  }

  renderBooks("art");
});
