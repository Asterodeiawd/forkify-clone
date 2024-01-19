class SearchView {
  #parentElement = document.querySelector(".search");

  getQueryText() {
    return this.#parentElement.querySelector(".search__field").value;
  }

  _clearInput() {
    this.#parentElement.reset();
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", e => {
      e.preventDefault();
      handler();
      this._clearInput();
    });
  }
}

export default new SearchView();
