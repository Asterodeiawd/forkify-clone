console.log("es module loaded");

const getAllRecipes = async keyWord => {
  try {
    const resp = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyWord}&key=73fb1d7f-54ab-4ab9-87cb-790d349942a5`
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
  console.log("pos", pos);

  pos.insertAdjacentHTML(
    "beforeend",
    `
<li class="recipe-brief" data-id=${id}>
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

getAllRecipes("rice");
