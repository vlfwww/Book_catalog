import "./Header.css";

export function createHeader() {
  const header = document.createElement("header");
  header.className = "header";
  header.innerHTML = `
    <div class="logo">
      <span class="logo-icon icon-wrapper">
        <img src="/assets/book.svg" class="icon icon-white" alt="Book" />
      </span>
      <div class="logo-text">
        <p class = "title">The Library</p>
        <p class="description">Discover your next favorite book</p>
      </div>
    </div>
  `;

  return header;
}
