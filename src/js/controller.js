"use strict";
import Recipe from "./Recipe.js";
import Paginator from "./Paginator.js";
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
const spinner1 = document.querySelector("#spinner1");
const pagination = document.querySelector(".pagination");

const paginator = new Paginator(pagination);
searchBtn.addEventListener("click", async e => {
  spinner1.classList.remove("hidden");
  e.preventDefault();
  const value = search.value;
  if (!value) return;

  // TODO: if has any child, remove them
  const recipes = await getAllRecipes(value);
  paginator.initData(recipes, 10);
  const currentPageRecipes = paginator.getPagedRecords();
  currentPageRecipes.forEach(item => addRecipeBrief(item));
  spinner1.classList.add("hidden");
});

pagination.addEventListener("Paging", e => {
  const currentPageRecipes = paginator.getPagedRecords();
  currentPageRecipes.forEach(item => addRecipeBrief(item));
});
