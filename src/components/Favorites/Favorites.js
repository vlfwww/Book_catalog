import "./Favorites.css";

export function createFavorites() {
  const aside = document.createElement("aside");
  aside.className = "favorites-sidebar";
  aside.innerHTML = `
    <div class="favorites-header">
      <div class="favorites-container">
        <div class="icon-wrapper">
          <img src="/assets/heart.svg" class="icon icon-white" alt="Heart" />
        </div>
        <p>Favorites</p>
      </div>
      <span id="favorites-count">0 books saved</span>
    </div>
    <div id="favorites-list" class="favorites-list">
      <p class="empty-favorites">No favorite books yet.</p>
    </div>
  `;
  return aside;
}
