"use strict";
import Recipe from "./Recipe.js";

const API_END_POINT = "https://forkify-api.herokuapp.com/api/v2/recipes";
const API_KEY = "73fb1d7f-54ab-4ab9-87cb-790d349942a5";

// we will fix this later
const AUTHOR = "Real Simple";

const getAllRecipes = async keyWord => {
  try {
    const resp = await fetch(
      `${API_END_POINT}?search=${keyWord}&key=${API_KEY}`
    );

    const results = await resp.json();
    console.log(results.data.recipes);
    results.data.recipes.forEach(entry => addRecipeBrief(entry));
  } catch (e) {
    console.log(e);
  }
};

const addRecipeBrief = ({ id, title, publisher, image_url }) => {
  const pos = document.querySelector(".result-list");

  pos.insertAdjacentHTML(
    "beforeend",
    `
<li class="recipe-brief" id=${id}>
  <a href="#" class="recipe-brief-link">
    <img
      src=${image_url}
      alt="recipe thumb image"
      class="recipe-brief-image"
    />
    <h2 class="recipe-brief-title">${title}</h2>
    <p class="recipe-brief-publisher">${publisher}</p>
  </a>
</li>
    `
  );
};

getAllRecipes("carrot");

const getRecipeById = async id => {
  try {
    const resp = await fetch(`${API_END_POINT}/${id}`);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

// console.log(recipe);

// console.log(getRecipeById("5ed6604591c37cdc054bcb8a"));
const recipeDetail = document.querySelector(".recipe");
const recipe = {
  publisher: "Real Simple",
  ingredients: [
    {
      quantity: 0.75,
      unit: "cup",
      description: "chopped fresh pineapple",
    },
    {
      quantity: 0.5,
      unit: "cup",
      description: "ice",
    },
    {
      quantity: 0.5,
      unit: "cup",
      description: "ice",
    },
  ],
  source_url:
    "http://www.realsimple.com/food-recipes/browse-all-recipes/carrot-pineapple-smoothie-00000000050727/index.html",
  image_url:
    "http://forkify-api.herokuapp.com/images/carrotsmoothie_30014096fc8.jpg",
  title: "Carrot-Pineapple Smoothie",
  servings: 40,
  cooking_time: 60,
  id: "5ed6604591c37cdc054bcb8a",
};

// showRecipeDetail(recipe);
const recipeView = new Recipe(recipe);
recipeView.render(recipeDetail);
