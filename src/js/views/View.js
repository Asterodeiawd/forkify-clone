import spinnerIcon from "bundle-text:../../img/spinner.svg";
import errorIcon from "bundle-text:../../img/exclamation-triangle.svg";

class View {
  _data;

  _clear = () => {
    this._parentElement.innerHTML = "";
  };

  createSpinner() {
    const spinnerMarkup = `
      <div class="spinner">
        ${spinnerIcon}
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return;
    }

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    // this operation will call this._build until we change all code to _generateMarkup()
    const newDoc =
      this._build?.() ??
      document.createRange().createContextualFragment(this._generateMarkup());

    const newNodes = Array.from(newDoc.querySelectorAll("*"));
    const oldNodes = Array.from(this._parentElement.querySelectorAll("*"));

    oldNodes.forEach((node, index) => {
      const newNode = newNodes[index];

      if (node.isEqualNode(newNode)) return;

      // update node text
      if (node.firstChild?.nodeValue?.trim()) {
        node.textContent = newNode.textContent;
      }

      // update attributes
      Array.from(newNode.attributes).forEach(attr =>
        node.setAttribute(attr.name, attr.value)
      );
    });
  }

  renderError(error = this._errorMessage) {
    const markup = `
      <div class='error'>
        ${errorIcon}
        <p class="message">${error}</p>
      </div>

    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default View;
