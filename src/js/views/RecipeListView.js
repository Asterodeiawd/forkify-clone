import View from "./View";

class RecipeListView extends View {
  _parentElement = document.querySelector(".result-list");
  _errorMessage = "Didn't find anything";

  _generateMarkup() {
    return this._data.map(this._generateRecipePreview).join("\n");
  }

  _generateRecipePreview({ id, title, publisher, image }) {
    return `
      <li class="recipe-brief">
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

  on = (event, handler) => {
    this._parentElement.addEventListener(event, handler);
  };
}

export default new RecipeListView();
