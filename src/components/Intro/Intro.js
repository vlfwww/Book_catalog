import "./Intro.css";

export function createIntro() {
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
  `;
  return section;
}
