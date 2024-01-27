import View from "./View";

class RecipeListView extends View {
  _parentElement = document.querySelector(".result-list");
  _errorMessage = "Didn't find anything";

  _generateMarkup() {
    return Array.isArray(this._data) && this._data.length === 0
      ? ""
      : `
        <ul>
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

export default new RecipeListView();
