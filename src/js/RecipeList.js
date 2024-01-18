class RecipeListView {
  #parentElement = document.querySelector(".result-list");

  render = data => {
    const html = data
      .map(({ id, title, publisher, image }) => {
        return `
<li class="recipe-brief">
  <a href="#${id}" class="recipe-brief-link">
    <img
      src=${image}
      alt="recipe thumb image"
      class="recipe-brief-image"
    />
    <h2 class="recipe-brief-title">${title}</h2>
    <p class="recipe-brief-publisher">${publisher}</p>
  </a>
</li>
    `;
      })
      .join("\n");
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  };

  on = (event, handler) => {
    this.#parentElement.addEventListener(event, handler);
  };
}

export default new RecipeListView();
