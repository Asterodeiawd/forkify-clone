"use strict";
import recipeView from "./RecipeView.js";
import recipeListView from "./RecipeList.js";
import Paginator from "./Paginator.js";
import { getAllRecipes } from "./api/forkify.js";
import * as modal from "./modal.js";

const searchBtn = document.querySelector("#search-btn");
const search = document.querySelector("#search");
const spinner1 = document.querySelector("#spinner1");
const pagination = document.querySelector(".pagination");
const paginator = new Paginator(pagination);

searchBtn.addEventListener("click", async e => {
  recipeListView.innerHTML = "";
  spinner1?.classList.remove("hidden");
  e.preventDefault();
  const value = search.value;
  if (!value) return;

  // TODO: if has any child, remove them
  const recipes = await getAllRecipes(value);
  paginator.initData(recipes, 10);
  const currentPageRecipes = paginator.getPagedRecords();
  // currentPageRecipes.forEach(item => addRecipeBrief(item));
  recipeListView.render(currentPageRecipes);
  spinner1.classList.add("hidden");
});

pagination.addEventListener("Paging", e => {
  recipeListView.innerHTML = "";
  const currentPageRecipes = paginator.getPagedRecords();
  currentPageRecipes.forEach(item => addRecipeBrief(item));
});

showRecipe = async () => {
  const id = window.location.hash.slice(1);

  if (!id) return;
  recipeView.createSpinner();
  await modal.loadRecipe(id);
  recipeView.render(modal.state.recipe);
};

const init = () => {
  recipeView.addHandlerRender(showRecipe);
};

init();
