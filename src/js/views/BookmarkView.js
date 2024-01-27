import View from "./View";
import previewView from "./PreviewView";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks-menu");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";

  addHandlerLoad = handler => {
    window.addEventListener("load", _ => {
      handler();
    });
  };

  _generateMarkup() {
    return Array.isArray(this._data) && this._data.length === 0
      ? ""
      : `
        <ul class="bookmark-list">
          ${this._data.map(data => previewView.render(data, false)).join("\n")}
        </ul>
      `;
  }
}

export default new BookmarkView();
