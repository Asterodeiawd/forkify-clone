import { getRecipeById } from "./api/forkify";
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <span class="ingredient-quantity">${quantity}</span>&nbsp;
            <span class="ingredient-unit">${unit}</span>&nbsp;
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span class="value_field">${this.cooking_time}</span>
          <span class="text_field">minutes</span>
        </div>

        <div class="serving-field">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>

          <span class="value_field">${this.servings}</span>
          <span class="text_field">servings</span>
          <div class="serving-amount-operations">
            <button type="button" aria-label="remove serving amount" class="btn-text remove-serving-amount">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button class="btn-text add-serving-amount">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="current-user-indicator ${
          this.publisher === AUTHOR ? "" : "hidden"
        }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <button class="btn-primary add-bookmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
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
