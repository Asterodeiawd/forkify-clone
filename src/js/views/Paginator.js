import View from "./View";

class Paginator extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const elements = [];
    const { total, current } = this._data;

    current > 0 && elements.push(this._createButton(current - 1, true));
    current < total - 1 && elements.push(this._createButton(current + 1));

    return elements.join("");
  }

  _createButton(targetIndex, prev = false) {
    return `
      <button type="button" class="btn-page" id="${
        prev ? "prev" : "next"
      }" data-index="${targetIndex}">
        Page ${targetIndex + 1}
      </button>
    `;
  }

  addHanderClick(handler) {
    this._parentElement.addEventListener("click", e => {
      const button = e.target.closest("button");

      if (!button) return;

      const page = +button.dataset.index;
      handler(page);
    });
  }
}

export default new Paginator();
