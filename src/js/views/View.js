import spinnerIcon from "bundle-text:../../img/spinner.svg";

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
    if (!data) this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default View;
