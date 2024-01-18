class SearchView {
  #parentElement = document.querySelector(".search");

  getQueryText() {
    return this.#parentElement.querySelector(".search__field").value;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
