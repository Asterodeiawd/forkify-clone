import { Fraction } from "fractional";

import { getRecipeById } from "./api/forkify";
import rightIcon from "bundle-text:../img/right.svg";
import clockIcon from "bundle-text:../img/clock.svg";
import usersIcon from "bundle-text:../img/users.svg";
import userIcon from "bundle-text:../img/user.svg";
import bookmarkIcon from "bundle-text:../img/bookmark.svg";
import circlePlusIcon from "bundle-text:../img/circle-plus.svg";
import circleMinusIcon from "bundle-text:../img/circle-minus.svg";
const AUTHOR = "Real Simple";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  getData = async () => {
    try {
      const {
        publisher,
        ingredients,
        source_url,
        image_url,
        title,
        servings,
        cooking_time,
      } = await getRecipeById(this.id);
      this.publisher = publisher;
      this.ingredients = ingredients;
      this.source_url = source_url;
      this.image_url = image_url;
      this.title = title;
      this.servings = servings;
      this.cooking_time = cooking_time;
    } catch (e) {
      console.log(e);
    }
  };

  render = node => {
    const docFragment = document.createDocumentFragment();
    const article = document.createElement("article");

    article.setAttribute("key", this.id);

    article.append(this._buildArticleHero());
    article.append(this._buildServingSection());
    article.append(this._buildIngredientSection());
    article.append(this._buildHowToCookSection());

    docFragment.appendChild(article);
    node.append(docFragment);
  };

  _buildArticleHero = () => {
    const figure = document.createElement("figure");
    figure.className = "recipe-detail-header";

    figure.insertAdjacentHTML(
      "afterbegin",
      `
        <img
          src=${this.image_url}
          alt="recipe image"
          class="recipe-detail-image"
        />
        <figcaption class="recipe-detail-title">
          <span>${this.title}</span>
        </figcaption>
      `
    );

    return figure;
  };

  _getRenderedList = () => {
    const renderedItems = this.ingredients.map(
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

    section.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="serving-field">
          ${clockIcon}
          <span class="value_field">${this.cooking_time}</span>
          <span class="text_field">minutes</span>
        </div>

        <div class="serving-field">
          ${usersIcon}
          <span class="value_field">${this.servings}</span>
          <span class="text_field">servings</span>
          <div class="serving-amount-operations">
            <button type="button" aria-label="remove serving amount" class="btn-text remove-serving-amount">
              ${circleMinusIcon}
            </button>
            <button class="btn-text add-serving-amount">
              ${circlePlusIcon}
            </button>
          </div>
        </div>
        <div class="current-user-indicator ${
          this.publisher === AUTHOR ? "" : "hidden"
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
        <p class="message">
          This recipe was carefully designed and tested by
          <span class="author-name">${this.publisher}</span>. Please check out
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
