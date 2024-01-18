"use strict";
import { getAllRecipes, getRecipeById } from "./api/forkify";

export const state = {
  recipe: {},
  search: { query: "", results: [] },
  bookmarks: [],
};

export const loadRecipe = async id => {
  try {
    state.recipe = await getRecipeById(id);
  } catch (e) {
    console.log(e);
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
