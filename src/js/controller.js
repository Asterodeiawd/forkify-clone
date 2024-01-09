"use strict";
import Recipe from "./Recipe.js";
import RecipeList from "./RecipeList.js";
import Paginator from "./Paginator.js";
import { getAllRecipes } from "./api/forkify.js";

const recipeDetail = document.querySelector(".recipe");
const searchBtn = document.querySelector("#search-btn");
const search = document.querySelector("#search");
const spinner1 = document.querySelector("#spinner1");
const pagination = document.querySelector(".pagination");
const paginator = new Paginator(pagination);
const recipeListNode = document.querySelector(".result-list");
const recipeList = new RecipeList(recipeListNode);

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
  // currentPageRecipes.forEach(item => addRecipeBrief(item));
  recipeList.render(currentPageRecipes);
  spinner1.classList.add("hidden");
});

pagination.addEventListener("Paging", e => {
  recipeList.innerHTML = "";
  const currentPageRecipes = paginator.getPagedRecords();
  currentPageRecipes.forEach(item => addRecipeBrief(item));
});

showRecipe = async () => {
  const id = window.location.hash.slice(1);

  if (!id) return;

  const recipe = new Recipe(id);
  await recipe.getData();

  recipeDetail.innerHTML = "";
  recipe.render(recipeDetail);
};

window.addEventListener("load", showRecipe);
window.addEventListener("hashchange", showRecipe);
