import "./Footer.css";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <p>
      Powered by
      <a href="https://openlibrary.org" target="_blank">Open Library</a>
    </p>
  `;
  return footer;
}
