import { Slide } from "./slide.js";
import { fetchProductsData, fetchCategoriesData } from "./fetchData.js";

// Load game data on Homepage
async function loadDataOnHomepage() {
  const data = await fetchProductsData();
  const gamesData = data.games;

  // Get random games
  const randomGames = [];
  const existedIndexes = [];
  while (existedIndexes.length < 10) {
    const randomIndex = Math.floor(Math.random() * gamesData.length);
    if (!existedIndexes.includes(randomIndex)) {
      randomGames.push(gamesData[randomIndex]);
      existedIndexes.push(randomIndex);
    }
  }

  // Load 4 first games on feature
  loadGamesOnFeature(
    randomGames.slice(0, 4),
    "feature-group",
    "feature__slide-control-group"
  );

  // // Load the most 9 sold off games
  const mostSaleOffGames = gamesData.filter((item) => item.saleoff);
  loadGamesOnSpecial(
    mostSaleOffGames.slice(0, 9),
    "special-group",
    "special__slide-control-group"
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
      <h3 class="feature-item__app-name line-clamp-2">${item.title}</h3>

      <!-- Category tags -->
      <div class="feature-item__game-tags">
        ${item.tags.map((tag) => `<span>${tag.tagName}</span>`)}
      </div>

      <!-- Price and platform -->
      <div class="feature-item__more-info">
          ${
            !item.saleoff
              ? `<span class="feature-item__price-normal">${
                  item.price > 1000 ? item.price + "₫" : "Free to play"
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

      <!-- Action btn -->
      <a class="feature-item__btn" href="./gamedetail.html?id=${
        item._id
      }" >More details...</a>
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

function loadGamesOnSpecial(data, listGameID, dotsGroupID) {
  const smallGroups = [];

  const chunkSize = 3;
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    smallGroups.push(chunk);
  }

  const html = smallGroups
    .map((item) => {
      return ` <div class="special-item fade">
         ${item
           .map((game) => {
             return `<article class="special-item-child">
          <!-- Game thumb -->
          <img
            src="${game.imageUrl}"
            alt="${game.title}"
            class="special-item-child__thumb"
          />
          <div class="special-item-child__content">
            <!-- Game title -->
            <h3 class="special-item-child__app-name">${game.title}</h3>

            <!-- Sale % -->
            <strong class="special-item-child__sale-off"
              >Up to -${game.saleoff}%</strong
            >
          </div>
        </article>`;
           })
           .join("\n")}
        </div>`;
    })
    .join("\n");

  loadGamesOnSpecificPart(smallGroups, listGameID, dotsGroupID, html);

  // Slide effect
  const specialSlide = new Slide("special", "grid", 5000);
  specialSlide.start();
}

// Load categories on Homepage
async function loadCategoriesHomepage() {
  // Get categories
  const data = await fetchCategoriesData();
  const tags = data.tags.map((tag) => tag.tagName);

  // Seperate into small groups
  const smallGroups = [];
  const chunkSize = 4; // Item each group
  for (let i = 0; i < tags.length; i += chunkSize) {
    const chunk = tags.slice(i, i + chunkSize);
    smallGroups.push(chunk);
  }

  // Handle categories array
  const html = smallGroups
    .map((tagGroup) => {
      return `
  <div class="category-item fade">

    ${tagGroup
      .map((tagItem) => {
        return `
      <a href="./categories?category=${tagItem.toLowerCase()}" class="category-item-child">
        <img
          src="https://store.steampowered.com/categories/homepageimage/category/fighting_martial_arts?cc=us&l=english"
          alt=""
          class="category-item-child__img"
        />
        <div class="category-item-child__gradient"></div>
        <span class="category-item-child__label">${tagItem.toUpperCase()}</span>
      </a>`;
      })
      .join("\n")}
  </div>`;
    })
    .join("\n");
  const category = document.getElementById("category-group");
  category.innerHTML += html;

  // Add dots control group
  const slideControlGroup = document.querySelector(
    "#category .slide-control-group"
  );
  smallGroups.forEach(
    () =>
      (slideControlGroup.innerHTML += `<div class="slide-control-item"></div>`)
  );

  // Create slide effect
  const categorySlide = new Slide("category", "grid");
  categorySlide.start();
}

export { loadDataOnHomepage, loadCategoriesHomepage };
