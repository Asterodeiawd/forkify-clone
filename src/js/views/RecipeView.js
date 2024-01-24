import { Fraction } from "fractional";
import View from "./View.js";

import rightIcon from "bundle-text:../../img/right.svg";
import clockIcon from "bundle-text:../../img/clock.svg";
import usersIcon from "bundle-text:../../img/users.svg";
import userIcon from "bundle-text:../../img/user.svg";
import bookmarkIcon from "bundle-text:../../img/bookmark.svg";
import circlePlusIcon from "bundle-text:../../img/circle-plus.svg";
import circleMinusIcon from "bundle-text:../../img/circle-minus.svg";

// TODO: fix this later!
const AUTHOR = "Real Simple";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We can't find specified recipe! Please try something else.";

  addHandlerRender = handler =>
    ["load", "hashchange"].forEach(item =>
      window.addEventListener(item, handler)
    );

  addHandlerClick = handler => {
    this._parentElement.addEventListener("click", e => {
      const btn = e.target.closest(".btn-change-amount");

      if (!btn) return;
      handler(+btn.dataset.changeTo);
    });
  };

  // overwrite base render function until we remove all DOM create
  // functions to insertAdjacentHTML()!
  render = data => {
    this._data = data;
    this._clear();

    const docFragment = this._build();
    this._parentElement.append(docFragment);
  };

  // update = data => {
  //   this._data = data;
  //   const newDocFragment = Array.from(this._build().querySelectorAll("*"));
  //   const oldFragment = Array.from(this._parentElement.querySelectorAll("*"));

  //   const diffs = newDocFragment.filter(
  //     (item, index) => !item.isEqualNode(oldFragment[index])
  //   );

  //   console.log(diffs);
  // };

  _generateMarkup() {
    // placeholder for later refactor!
    return "<div></div>";
  }

  _build = () => {
    const docFragment = document.createDocumentFragment();
    const article = document.createElement("article");

    article.setAttribute("key", this._data.id);

    article.append(this._buildArticleHero());
    article.append(this._buildServingSection());
    article.append(this._buildIngredientSection());
    article.append(this._buildHowToCookSection());

    docFragment.appendChild(article);

    return docFragment;
  };

  _buildArticleHero = () => {
    const { image_url, title } = this._data;

    const figure = document.createElement("figure");
    figure.className = "recipe-detail-header";

    figure.insertAdjacentHTML(
      "afterbegin",
      `
        <img
          src=${image_url}
          alt="recipe image"
          class="recipe-detail-image"
        />
        <figcaption class="recipe-detail-title">
          <span>${title}</span>
        </figcaption>
      `
    );

    return figure;
  };

  _getRenderedList = () => {
    const renderedItems = this._data.ingredients.map(
      ({ quantity, unit, description }) => {
        const li = document.createElement("li");
        li.className = "ingredient-item";
        li.insertAdjacentHTML(
          "afterbegin",
          `
            ${rightIcon}
            <span class="ingredient-quantity">${
              quantity ? new Fraction(quantity).toString() + "&nbsp;" : ""
            }</span>
            <span class="ingredient-unit">${unit}</span>
            <span class="ingredient-description">${description}</span>
          `
        );
        return li;
      }
    );
    const ul = document.createElement("ul");
    ul.className = "ingredient-list";
    ul.append(...renderedItems);

    return ul;
  };

  _getSection = (...className) => {
    const section = document.createElement("section");
    const classNames = className.join(" ");

    section.className = classNames;
    return section;
  };

  _buildServingSection = () => {
    const section = this._getSection("serving");
    const { cooking_time, servings, publisher } = this._data;

    section.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="serving-field">
          ${clockIcon}
          <span class="value_field">${cooking_time}</span>
          <span class="text_field">minutes</span>
        </div>

        <div class="serving-field">
          ${usersIcon}
          <span class="value_field">${servings}</span>
          <span class="text_field">servings</span>
          <div class="serving-amount-operations">
            <button 
              class="btn-text btn-change-amount"
              type="button" 
              aria-label="remove serving amount"
              data-change-to="${servings > 1 ? servings - 1 : 1}" 
            >
              ${circleMinusIcon}
            </button>
            <button 
              class="btn-text btn-change-amount"
              type="button"
              aria-label="add serving amount" 
              data-change-to="${servings + 1}"
            >
              ${circlePlusIcon}
            </button>
          </div>
        </div>
        <div class="current-user-indicator ${
          publisher === AUTHOR ? "" : "hidden"
        }">
          ${userIcon}
        </div>
        <button class="btn-primary add-bookmark">
          ${bookmarkIcon}
        </button>
      `
    );

    return section;
  };

  _buildIngredientSection = () => {
    const section = this._getSection("section", "ingredients");
    section.insertAdjacentHTML(
      "afterbegin",
      `
        <h2 class="heading2">recipe ingredients</h2>
      `
    );

    section.append(this._getRenderedList());
    return section;
  };

  _buildHowToCookSection = () => {
    const section = this._getSection("section", "how-to-cook");

    section.insertAdjacentHTML(
      "afterbegin",
      `
        <h2 class="heading2">how to cook it</h2>
        <p class="message margin-top--small">
          This recipe was carefully designed and tested by
          <span class="author-name">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <button class="btn-primary show-directions">
          directions &nbsp;&rarr;
        </button>
    `
    );

    return section;
  };
}

export default new RecipeView();
