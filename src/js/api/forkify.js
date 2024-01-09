const API_END_POINT = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "73fb1d7f-54ab-4ab9-87cb-790d349942a5";

export const getAllRecipes = async keyWord => {
  try {
    const resp = await fetch(
      `${API_END_POINT}?search=${keyWord}&key=${API_KEY}`
    );

    const results = await resp.json();
    return results.data.recipes;
  } catch (e) {
    console.log(e);
  }
};

export const getRecipeById = async id => {
  try {
    const resp = await fetch(`${API_END_POINT}/${id}`);
    const results = await resp.json();
    return results.data.recipe;
  } catch (e) {
    console.log(e);
  }
};

export const addNewRecipe = async article => {
  try {
    const resp = await fetch(`${API_END_POINT}?key=${API_KEY}`, {
      method: "post",
      data: { ...article },
    });

    return resp.json();
  } catch (e) {
    console.log(e);
  }
};
