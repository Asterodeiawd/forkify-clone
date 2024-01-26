import View from "./View";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks-menu");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";

  addHandlerLoad = handler => {
    window.addEventListener("load", e => {
      handler();
    });
  };

  _generateMarkup() {
    console.log(this._data);
    if (Array.isArray(this._data) && this._data.length === 0) return "";

    return `
      <ul class="bookmark-list">
        ${this._data.map(this._generateRecipePreview).join("\n")}
      </ul>
    `;
  }

  _generateRecipePreview({ id, title, publisher, image }) {
    const hash = window.location.hash.slice(1);

    return `
    <li class="recipe-brief ${hash === id ? "selected" : ""}">
      <a href="#${id}" class="recipe-brief-link">
        <img
          src=${image}
          alt="recipe thumb image"
          class="recipe-brief-image"
        />
        <h2 class="recipe-brief-title">${title}</h2>
        <p class="recipe-brief-publisher">${publisher}</p>
      </a>
    </li>
    
    `;
  }
}

export default new BookmarkView();
