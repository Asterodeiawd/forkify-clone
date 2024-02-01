import { API_END_POINT } from "../config";
import { API_KEY } from "../config";
import { getJSON, sendJSON } from "../helper";

export const getAllRecipes = async keyWord => {
  const result = await getJSON(
    `${API_END_POINT}?search=${keyWord}&key=${API_KEY}`
  );
  return result.data.recipes;
};

export const getRecipeById = async id => {
  const resp = await getJSON(`${API_END_POINT}/${id}`);
  return resp.data.recipe;
};

export const addNewRecipe = async recipe => {
  const resp = await sendJSON(`${API_END_POINT}?key=${API_KEY}`, recipe);
  if (resp.status !== "success") throw new Error(resp.message);
  return resp.data.recipe;
};
