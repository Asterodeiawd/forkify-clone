"use strict";
import Recipe from "./Recipe.js";
import { getAllRecipes, getRecipeById } from "./api/forkify.js";

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

const recipeDetail = document.querySelector(".recipe");

// showRecipeDetail(recipe);
id = "5ed6604591c37cdc054bcf54";
(async () => {
  const recipe = await getRecipeById(id);
  const recipeView = new Recipe(recipe);
  recipeView.render(recipeDetail);
})();

const searchBtn = document.querySelector("#search-btn");
const search = document.querySelector("#search");

searchBtn.addEventListener("click", async e => {
  e.preventDefault();
  const value = search.value;
  if (!value) return;

  const recipes = await getAllRecipes(value);
  console.log(recipes);

  recipes.forEach(item => addRecipeBrief(item));
});
