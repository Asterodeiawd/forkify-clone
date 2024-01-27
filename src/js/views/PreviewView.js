import View from "./View";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const hash = window.location.hash.slice(1);
    const { id, title, publisher, image } = this._data;

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

export default new PreviewView();
