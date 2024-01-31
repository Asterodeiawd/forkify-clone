import View from "./View.js";

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
}

export default new AddRecipeView();
