import "./Intro.css";

export function createIntro(books = [], onFilterChange = () => {}) {
  const section = document.createElement("section");
  section.className = "intro-section";
  section.innerHTML = `
    <h1>Discover Your Next Great Read</h1>
    <p>
      Search millions of books, build your personal library, and never
      lose track of what to read next.
    </p>
    <div class="search-container">
      <div class="search-bar">
        <div class="search-input-wrapper" id="search-wrapper">
          <img src="/assets/search.svg" class="search-icon" alt="Search" />
          <input
            type="text"
            id="search-input"
            placeholder="Search for books by title or author..."
          />
        </div>
        <button id="search-btn">Search</button>
      </div>
      <div id="input-error-message" class="input-error-message" style="display: none;"></div>
    </div>
    <div class="btn-wrapper">
      <button id="view-favorites-mobile-btn" class="view-favorites-mobile-btn">
        <span>View Favorites</span>
      </button>
    </div>
    <div class="filter-container">
      <select id="author-filter" class="author-filter-select">
        <option value="">All Authors</option>
      </select>
    </div>
  `;

  if (books && books.length > 0) {
    setTimeout(() => initAuthorFilter(books, onFilterChange), 0);
  }

  return section;
}

export function initAuthorFilter(books, onFilterChange) {
  const selectElement = document.getElementById("author-filter");
  if (!selectElement) return;

  const authors = [
    ...new Set(books.map((book) => book.author).filter(Boolean)),
  ].sort();

  selectElement.innerHTML = `<option value="">All Authors</option>`;
  authors.forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    selectElement.appendChild(option);
  });

  const newSelectElement = selectElement.cloneNode(true);
  selectElement.parentNode.replaceChild(newSelectElement, selectElement);

  newSelectElement.addEventListener("change", (e) => {
    const selectedAuthor = e.target.value;
    onFilterChange(selectedAuthor);
  });
}

export function filterBooksByAuthor(books, selectedAuthor) {
  if (!selectedAuthor) return books;
  return books.filter((book) => book.author === selectedAuthor);
}
