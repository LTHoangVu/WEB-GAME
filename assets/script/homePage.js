import { Slide } from "./slide.js";
import { fetchProductsData } from "./fetchData.js";

// Load game data on Homepage
async function loadDataOnHomepage() {
  const data = await fetchProductsData();
  const gamesData = data.games;

  // Load 4 first games on feature
  loadGamesOnFeature(
    gamesData.slice(0, 4),
    "feature-group",
    "feature__slide-control-group"
  );
}

// Load game on specific part (game data, game list container, dots group container, list item)
function loadGamesOnSpecificPart(
  data,
  listGameID,
  dotsGroupID,
  itemHtmlContent
) {
  // Load feature content
  const gameListContainer = document.getElementById(listGameID);
  gameListContainer.innerHTML += itemHtmlContent;

  // Load dots by number of games
  const dotsGroup = document.getElementById(dotsGroupID);
  let dots = [];
  data.forEach(() => dots.push('<div class="slide-control-item"></div>'));
  dotsGroup.innerHTML = dots.join("\n");
}

function loadGamesOnFeature(data, listGameID, dotsGroupID) {
  const html = data
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
          ${
            !item.saleoff
              ? `<span class="feature-item__price-normal">${
                  item.price ? item.price + "₫" : "Free to play"
                }</span>`
              : `<div class="feature-item__price-group">
                    <span class="feature-item__percent">
                    -${item.saleoff}%
                    </span>
                    <span class= "feature-item__old-price">${item.oldprice}₫</span>
                    <span class= "feature-item__current-price">${item.price}₫</span>
                </div>`
          }
        <div class="feature-item__platform">
          <i class="fa fa-windows"></i>
        </div>
      </div>
    </div>
  </article>
    `;
    })
    .join("\n");
  loadGamesOnSpecificPart(data, listGameID, dotsGroupID, html);

  // Slide effect
  const featureSlide = new Slide("feature", "grid", 9000);
  featureSlide.start();
}

// Slide effect
const specialSlide = new Slide("special", "grid", 5000);
const categorySlide = new Slide("category", "grid");

specialSlide.start();
categorySlide.start();

export { loadDataOnHomepage };
