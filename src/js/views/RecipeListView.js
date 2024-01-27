import View from "./View";
import previewView from "./PreviewView";

class RecipeListView extends View {
  _parentElement = document.querySelector(".result-list");
  _errorMessage = "Didn't find anything";

  _generateMarkup() {
    return Array.isArray(this._data) && this._data.length === 0
      ? ""
      : `
        <ul>
          ${this._data.map(data => previewView.render(data, false)).join("\n")}
        </ul>
        `;
  }
}

export default new RecipeListView();
