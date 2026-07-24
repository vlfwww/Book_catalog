import "./style.css";
import { createHeader } from "./components/Header/Header.js";
import {
  createIntro,
  initAuthorFilter,
  filterBooksByAuthor,
} from "./components/Intro/Intro.js";
import { createCatalog } from "./components/Catalog/Catalog.js";
import {
  createFavorites,
  updateFavoritesSidebar,
} from "./components/Favorites/Favorites.js";
import { createFooter } from "./components/Footer/Footer.js";
import { createBookCard } from "./components/BookCard/BookCard.js";
import { fetchBooks } from "./services/api.js";
import { debounce } from "./utils/debounce.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");

  appContainer.appendChild(createHeader());

  const mainContent = document.createElement("main");
  mainContent.className = "main-content";

  const contentLayout = document.createElement("div");
  contentLayout.className = "content-layout";

  contentLayout.appendChild(createCatalog());
  contentLayout.appendChild(createFavorites());

  mainContent.appendChild(createIntro());
  mainContent.appendChild(contentLayout);

  appContainer.appendChild(mainContent);
  appContainer.appendChild(createFooter());

  updateFavoritesSidebar();

  const savedTheme = localStorage.getItem("theme");
  const themeCheckbox = document.getElementById("theme-checkbox");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeCheckbox) themeCheckbox.checked = true;
  }

  if (themeCheckbox) {
    themeCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  let currentBooks = [];

  function renderBooksGrid(booksToRender) {
    const booksGrid = document.getElementById("books-grid");
    const statusMessage = document.getElementById("status-message");
    if (!booksGrid || !statusMessage) return;

    booksGrid.innerHTML = "";

    if (booksToRender.length === 0) {
      statusMessage.textContent = "Nothing found";
      statusMessage.style.display = "block";
      return;
    }

    statusMessage.style.display = "none";

    booksToRender.forEach((book) => {
      const cardElement = createBookCard(book);
      booksGrid.appendChild(cardElement);
    });
  }

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
      currentBooks = [];
      initAuthorFilter([], () => {});
      return;
    }

    statusMessage.style.display = "none";

    currentBooks = rawBooks.map((bookData) => ({
      title: bookData.title,
      author: bookData.author_name ? bookData.author_name[0] : "Unknown Author",
      firstPublishYear: bookData.first_publish_year,
      coverUrl: bookData.cover_i
        ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`
        : null,
    }));

    renderBooksGrid(currentBooks);

    initAuthorFilter(currentBooks, (selectedAuthor) => {
      const filtered = filterBooksByAuthor(currentBooks, selectedAuthor);
      renderBooksGrid(filtered);
    });
  }

  const searchInput = document.getElementById("search-input");
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

  if (searchInput) {
    const debouncedSearch = debounce(() => {
      const query = searchInput.value.trim();

      if (!query) {
        hideError();
        return;
      }

      if (query.length < 3) {
        showError("Please enter at least 3 characters for search.");
        return;
      }

      hideError();
      renderBooks(query);
    }, 500);

    searchInput.addEventListener("input", debouncedSearch);

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query.length >= 3) {
          searchInput.value = "";
          searchInput.blur();
          hideError();
          renderBooks(query);
        }
      }
    });

    searchInput.addEventListener("blur", () => {
      searchInput.value = "";
      hideError();
    });
  }

  renderBooks("art");

  document
    .getElementById("view-favorites-mobile-btn")
    ?.addEventListener("click", () => {
      const sidebar = document.getElementById("favorites-sidebar-section");
      if (sidebar) {
        sidebar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
});
