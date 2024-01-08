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

const searchBtn = document.querySelector("#search-btn");
const search = document.querySelector("#search");
const spinner1 = document.querySelector("#spinner1");
const pagination = document.querySelector(".pagination");
const recipeList = document.querySelector(".result-list");
const paginator = new Paginator(pagination);

searchBtn.addEventListener("click", async e => {
  recipeList.innerHTML = "";
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
  recipeList.innerHTML = "";
  const currentPageRecipes = paginator.getPagedRecords();
  currentPageRecipes.forEach(item => addRecipeBrief(item));
});

recipeList.addEventListener("click", async e => {
  const item = e.target.closest(".recipe-brief");

  if (!item) return;

  const { id } = item;
  const recipeData = await getRecipeById(id);
  const recipe = new Recipe(recipeData);

  recipeDetail.innerHTML = "";
  recipe.render(recipeDetail);
});
