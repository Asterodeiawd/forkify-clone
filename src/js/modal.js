"use strict";
import { getRecipeById } from "./api/forkify";

export const state = {
  recipe: {},
  search: {},
  bookmarks: [],
};

export const loadRecipe = async id => {
  try {
    state.recipe = await getRecipeById(id);
  } catch (e) {
    console.log(e);
  }
};
