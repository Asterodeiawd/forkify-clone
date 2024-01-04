"use strict";

const API_END_POINT = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "73fb1d7f-54ab-4ab9-87cb-790d349942a5";

// we will fix this later
const AUTHOR = "Real Simple";

const getAllRecipes = async keyWord => {
  try {
    const resp = await fetch(
      `${API_END_POINT}?search=${keyWord}&key=${API_KEY}`
    );

    const results = await resp.json();
    console.log(results.data.recipes);
    results.data.recipes.forEach(entry => addRecipeBrief(entry));
  } catch (e) {
    console.log(e);
  }
};

const addRecipeBrief = ({ id, title, publisher, image_url }) => {
  const pos = document.querySelector(".result-list");

  pos.insertAdjacentHTML(
    "beforeend",
    `
<li class="recipe-brief" id=${id}>
  <a href="#" class="recipe-brief-link">
    <img
      src=${image_url}
      alt="recipe thumb image"
      class="recipe-brief-image"
    />
    <h2 class="recipe-brief-title">${title}</h2>
    <p class="recipe-brief-publisher">${publisher}</p>
  </a>
</li>
    `
  );
};

getAllRecipes("carrot");

const getRecipeById = async id => {
  try {
    const resp = await fetch(`${API_END_POINT}/${id}`);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

// console.log(recipe);

// console.log(getRecipeById("5ed6604591c37cdc054bcb8a"));
const recipeDetail = document.querySelector(".recipe");
const recipe = {
  publisher: "Real Simple",
  ingredients: [
    {
      quantity: 0.75,
      unit: "cup",
      description: "chopped fresh pineapple",
    },
    {
      quantity: 0.5,
      unit: "cup",
      description: "ice",
    },
    {
      quantity: 0.5,
      unit: "cup",
      description: "ice",
    },
  ],
  source_url:
    "http://www.realsimple.com/food-recipes/browse-all-recipes/carrot-pineapple-smoothie-00000000050727/index.html",
  image_url:
    "http://forkify-api.herokuapp.com/images/carrotsmoothie_30014096fc8.jpg",
  title: "Carrot-Pineapple Smoothie",
  servings: 40,
  cooking_time: 60,
  id: "5ed6604591c37cdc054bcb8a",
};

const showRecipeDetail = ({
  id,
  publisher,
  ingredients,
  source_url,
  image_url,
  title,
  servings,
  cooking_time,
}) => {
  const ingredientItems = ingredients.map(({ quantity, unit, description }) => {
    return ` 
    <li class="ingredient-item">
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
    </li>
    `;
  });

  const html = `
  <article id=#${id}>
         <figure class="recipe-detail-header">
          <img
            src=${image_url}
            alt="recipe image"
            class="recipe-detail-image"
          />
          <figcaption class="recipe-detail-title"><span>${title}</span></figcaption>
        </figure>
       <section class="serving">
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
            <span class="value_field">${cooking_time}</span>
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

            <span class="value_field">${servings}</span>
            <span class="text_field">servings</span>
            <div class="serving-amount-operations">
              <button class="btn-text remove-serving-amount">
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
            publisher === AUTHOR ? "" : "hidden"
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
        </section>
       <section class="section ingredients">
          <h2 class="heading2">recipe ingredients</h2>

          <ul class="ingredient-list">${ingredientItems.join("")}</ul>
        </section>
        <section class="section how-to-cook">
          <h2 class="heading2">how to cook it</h2>
          <p class="message">
            This recipe was carefully designed and tested by
            <span class="author-name">${publisher}</span>. Please check out
            directions at their website.
          </p>
          <button class="btn-primary show-directions">
            directions &nbsp;&rarr;
          </button>
        </section>
        </article>

  `;
  recipeDetail.insertAdjacentHTML("afterbegin", html);
};

showRecipeDetail(recipe);
