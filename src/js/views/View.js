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
