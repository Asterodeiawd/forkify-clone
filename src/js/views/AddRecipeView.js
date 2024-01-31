import View from "./View.js";
import errorIcon from "bundle-text:../../img/exclamation-triangle.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".add-recipe-dialog");
  _closeButton = this._parentElement.querySelector("#close-dialog");
  _uploadButton = this._parentElement.querySelector("#upload");
  _openButton = document.querySelector(".nav__btn--add-recipe");

  constructor() {
    super();

    this._openButton.addEventListener("click", _ => {
      this._parentElement.showModal();
    });

    this._closeButton.addEventListener("click", _ => {
      this._parentElement.close();
    });
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(this._parentElement.firstElementChild);
      const data = [...formData.entries()];
      handler(data);
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class='dialog-error'>
        ${errorIcon}
        <p class="message">${message}</p>
      </div>
    `;

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  clearError() {
    const errorBlocks = this._parentElement.querySelectorAll(".dialog-error");
    errorBlocks.forEach(err => err.remove());
  }
}

export default new AddRecipeView();
