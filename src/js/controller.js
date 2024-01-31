"use strict";
import recipeView from "./views/RecipeView.js";
import recipeListView from "./views/RecipeListView.js";
import searchView from "./views/searchView.js";
import paginator from "./views/Paginator.js";
import bookmarkView from "./views/BookmarkView.js";
import addRecipeView from "./views/AddRecipeView.js";
import * as modal from "./modal.js";

const showRecipe = async () => {
  const id = window.location.hash.slice(1);

  if (!id) return;

  recipeView.createSpinner();
  recipeListView.update(modal.getPagedResults(modal.state.search.currentPage));
  bookmarkView.update(modal.state.bookmarks);

  try {
    await modal.loadRecipe(id);
    recipeView.render(modal.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};

const init = async () => {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerClick(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginator.addHanderClick(controlPagination);
  bookmarkView.addHandlerLoad(controlBookmarkList);
  addRecipeView.addHandlerSubmit(controlAddRecipe);

  await modal.loadBookmarks();
  controlBookmarkList();
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQueryText();
    if (!query) return;

    recipeListView.createSpinner();

    await modal.loadSearchResult(query);
    modal.state.search.currentPage = 0;

    const maxPage = modal.getMaxPageIndex();
    const pagedResults = modal.getPagedResults(modal.state.search.currentPage);

    paginator.render({
      current: modal.state.search.currentPage,
      total: maxPage,
    });

    recipeListView.render(pagedResults);
  } catch (e) {
    console.log(e);
  }
};

const controlPagination = index => {
  modal.state.search.currentPage = index;
  paginator.render({ current: index, total: modal.getMaxPageIndex() });
  const pagedResults = modal.getPagedResults(modal.state.search.currentPage);
  recipeListView.render(pagedResults);
};

const controlServings = newServings => {
  modal.changeServings(newServings);
  recipeView.update(modal.state.recipe);
};

const controlBookmark = recipe => {
  if (modal.state.bookmarks.some(({ id }) => id === recipe.id)) {
    modal.deleteBookmark(recipe.id);
  } else modal.addBookmark(recipe);

  recipeView.update(modal.state.recipe);

  bookmarkView.render(modal.state.bookmarks);
};

const controlBookmarkList = () => bookmarkView.render(modal.state.bookmarks);

const controlAddRecipe = data => {
  console.log(data);
};

init();
