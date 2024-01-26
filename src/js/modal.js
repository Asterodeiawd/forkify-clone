"use strict";
import { getAllRecipes, getRecipeById } from "./api/forkify";
import { RESULTS_PER_PAGE } from "./config";

export const state = {
  recipe: {},
  search: { query: "", results: [], currentPage: 0 },
  bookmarks: [],
};

export const loadRecipe = async id => {
  try {
    const recipe = await getRecipeById(id);

    state.recipe = {
      ...recipe,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      source: recipe.source_url,
    };

    delete state.recipe.cooking_time;
    delete state.recipe.image_url;
    delete state.recipe.source_url;

    if (state.bookmarks.some(item => item.id === id))
      state.recipe.bookmarked = true;
  } catch (e) {
    throw e;
  }
};

export const loadSearchResult = async query => {
  try {
    state.search.query = query;
    results = await getAllRecipes(state.search.query);
    state.search.results = results.map(item => ({
      id: item.id,
      title: item.title,
      publisher: item.publisher,
      image: item.image_url,
    }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getPagedResults = pageIndex => {
  if (pageIndex < 0) {
    state.search.currentPage = 0;
  } else if (pageIndex > getMaxPageIndex()) {
    state.search.currentPage = getMaxPageIndex();
  } else {
    state.search.currentPage = pageIndex;
  }

  return state.search.results.slice(
    RESULTS_PER_PAGE * pageIndex,
    RESULTS_PER_PAGE * (pageIndex + 1)
  );
};

export const getMaxPageIndex = () => {
  return Math.ceil(state.search.results.length / RESULTS_PER_PAGE);
};

export const changeServings = newServings => {
  state.recipe.ingredients.forEach(entry => {
    entry.quantity = (
      (entry.quantity * newServings) /
      state.recipe.servings
    ).toFixed(5);
  });

  state.recipe.servings = newServings;
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(({ id: bid }) => bid === id);

  state.bookmarks.splice(index, 1);
  delete state.recipe.bookmarked;
};
