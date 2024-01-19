import { API_END_POINT } from "../config";
import { API_KEY } from "../config";
import { getJSON } from "../helper";

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

export const addNewRecipe = async article => {
  const resp = await getJSON(`${API_END_POINT}?key=${API_KEY}`, {
    method: "post",
    data: { ...article },
  });

  return resp;
};
