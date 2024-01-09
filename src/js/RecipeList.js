export default class RecipeList {
  constructor(container) {
    this.container = container;
  }

  render = data => {
    const html = data
      .map(({ id, title, publisher, image_url }) => {
        return `
<li class="recipe-brief">
  <a href="#${id}" class="recipe-brief-link">
    <img
      src=${image_url}
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
    this.container.innerHTML = "";
    this.container.insertAdjacentHTML("afterbegin", html);
  };

  on = (event, handler) => {
    this.container.addEventListener(event, handler);
  };
}
