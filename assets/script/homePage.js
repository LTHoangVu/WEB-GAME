import { Slide } from "./slide.js";
import fetchData from "./fetchData.js";

// Load game data on Homepage
async function loadDataOnHomepage() {
  const data = await fetchData();
  const games = data.games;

  loadGamesOnFeature(games.slice(0, 4));

  // Slide effect start
  const featureSlide = new Slide("feature", "grid", 9000);
  featureSlide.start();
}

function loadGamesOnFeature(games) {
  const feature = document.getElementById("feature-group");
  const featureDots = document.querySelector(".feature .slide-control-group");
  let dots = [];
  const html = games
    .map((item) => {
      return `
    <article class="feature-item fade">
    <!-- Main image -->
    <img
      src="${item.imageUrl}"
      alt="${item.title}-thumb"
      class="feature-item__game-thumb"
    />

    <!-- Info -->
    <div class="feature-item__info">
      <!-- Game title -->
      <h3 class="feature-item__app-name">${item.title}</h3>

      <!-- Screenshots group -->
      <div class="feature-item__screenshots">
        <img src="./assets/images/screenshot-01.jpg" alt="" />
        <img src="./assets/images/screenshot-02.jpg" alt="" />
        <img src="./assets/images/screenshot-03.jpg" alt="" />
        <img src="./assets/images/screenshot-04.jpg" alt="" />
      </div>

      <!-- Category tags -->
      <div class="feature-item__game-tags">
        ${item.tags.map((tag) => `<span>${tag.tagName}</span>`)}
      </div>

      <!-- Price and platform -->
      <div class="feature-item__more-info">
        <span class="feature-item__price">${item.price}₫</span>
        <div class="feature-item__platform">
          <i class="fa fa-windows"></i>
        </div>
      </div>
    </div>
  </article>
    `;
    })
    .join("\n");

  feature.innerHTML += html;
  for (var i = 0; i < games.length; i++) {
    dots.push('<div class="slide-control-item"></div>');
  }
  featureDots.innerHTML = dots.join("\n");
}

// Slide effect
const specialSlide = new Slide("special", "grid", 5000);
const categorySlide = new Slide("category", "grid");

specialSlide.start();
categorySlide.start();

export { loadDataOnHomepage };
