"use strict";
import recipeView from "./RecipeView.js";
import recipeListView from "./RecipeList.js";
import searchView from "./searchView.js";
import Paginator from "./Paginator.js";
import * as modal from "./modal.js";

const pagination = document.querySelector(".pagination");
const paginator = new Paginator(pagination);

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
  searchView.addHandlerSearch(controlSearchResults);
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQueryText();
    if (!query) return;

    await modal.loadSearchResult(query);
    // recipeListView.createSpinner();
    recipeListView.render(modal.state.search.results);
  } catch (e) {
    console.log(e);
  }
};

init();
