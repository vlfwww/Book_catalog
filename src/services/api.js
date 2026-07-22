export async function fetchBooks(query) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}
