"use strict";
import recipeView from "./views/RecipeView.js";
import recipeListView from "./views/RecipeListView.js";
import searchView from "./views/searchView.js";
import paginator from "./views/Paginator.js";
import bookmarkView from "./views/BookmarkView.js";
import addRecipeView from "./views/AddRecipeView.js";
import * as modal from "./modal.js";
import { asleep } from "./helper.js";

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

const controlAddRecipe = async data => {
  addRecipeView.clearError();

  try {
    const ingredientsText = Object.entries(data)
      .filter(([key, value]) => key.startsWith("ingredient") && value.trim())
      .map(([_, value]) => value.split(","));

    if (ingredientsText.some(entry => entry.length < 3))
      throw new Error(
        "ingredients must start with a number(or empty) and have three fields!"
      );

    const ingredients = ingredientsText.map(
      ([quantity, unit, description]) => ({
        quantity: quantity ? +quantity : null,
        unit,
        description,
      })
    );

    const recipe = {
      ingredients,
      title: data.title,
      servings: +data.servings,
      cooking_time: +data.prep_time,
      image_url: data.image_url,
      source_url: data.url,
      publisher: data.publisher,
    };

    await modal.addRecipe(recipe);
    recipeView.render(modal.state.recipe);

    history.pushState(null, null, `#${modal.state.recipe.id}`);
    bookmarkView.render(modal.state.bookmarks);

    // await asleep(1000);
    addRecipeView.close();
  } catch (e) {
    addRecipeView.renderError(e);
  }
};

init();
