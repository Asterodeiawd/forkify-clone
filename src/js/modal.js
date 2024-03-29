"use strict";
import { getAllRecipes, getRecipeById, addNewRecipe } from "./api/forkify";
import { RESULTS_PER_PAGE } from "./config";

export const state = {
  recipe: {},
  search: { query: "", results: [], currentPage: 0 },
  bookmarks: [],
};

function createRecipeObject(data) {
  const recipe = {
    ...data,
    image: data.image_url,
    cookingTime: data.cooking_time,
    source: data.source_url,
  };

  delete recipe.cooking_time;
  delete recipe.image_url;
  delete recipe.source_url;

  return recipe;
}

export const loadRecipe = async id => {
  try {
    const recipe = await getRecipeById(id);
    state.recipe = createRecipeObject(recipe);

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

export const addRecipe = async recipeData => {
  const recipe = await addNewRecipe(recipeData);
  state.recipe = createRecipeObject(recipe);
  addBookmark(recipe);
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

  serializeBookmarks();
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(({ id: bid }) => bid === id);

  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) delete state.recipe.bookmarked;

  serializeBookmarks();
};

function serializeBookmarks() {
  const ids = state.bookmarks.map(bookmark => bookmark.id);
  localStorage.setItem("bookmarks", JSON.stringify(ids));
}

export async function loadBookmarks() {
  const data = localStorage.getItem("bookmarks");

  const bookmarkIds = JSON.parse(data ?? "[]");
  const bookmarks = await Promise.allSettled(
    bookmarkIds.map(async id => {
      const data = await getRecipeById(id);
      return createRecipeObject(data);
    })
  );

  state.bookmarks = bookmarks.map(item => item.value);
}
