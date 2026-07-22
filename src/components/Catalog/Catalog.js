import "./Catalog.css";

export function createCatalog() {
  const section = document.createElement("section");
  section.className = "catalog-section";
  section.innerHTML = `
    <div id="status-message" class="status-message"></div>
    <div id="books-grid" class="books-grid"></div>
  `;
  return section;
}
