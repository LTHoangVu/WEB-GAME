import { fetchProductsData } from "./fetchData.js";
import { Slide } from "./slide.js";

async function loadDataOnCategories() {
  const query = new URLSearchParams(window.location.search);
  const category = query.get("category");
  const data = await fetchProductsData();
  const games = [];

  for (const game of data.games) {
    if (
      game.tags.filter((tag) => tag.tagName.toLowerCase() === category).length >
      0
    ) {
      games.push(game);
    }
  }

  console.log(games);

  loadGamesOnGameGroup(games);
  loadGamesOnMoreGame(games);
  loadGamesOnFeature(games);
  const featureSlide = new Slide("featured", "grid", 3000);
  featureSlide.start();
}

function loadGamesOnGameGroup(games) {
  const feature = document.getElementById("game-group");
  const htmlContent = games
    .map((item) => {
      return `
    <div class="item">
              <img
                src="${item.imageUrl}"
                alt="game image"
                class="item-image"
              />
              <div class="item-content">
                <div class="platform-tags">
                  <i
                    class="fa-brands fa-windows fa-lg"
                    style="color: #7f97a5"
                  ></i>
                  <i class="fa-brands fa-apple fa-lg" style="color: #7f97a5"></i>
                </div>
                ${
                  item.saleoff
                    ? `<div class="discount">
                  <span>${item.saleoff}%</span>
                  </div>`
                  : ``
              }
                <div class="price">
                ${
                  !item.saleoff
                    ? `<span class="original-price"></span>`
                    : `<span class="original-price">${item.oldprice}₫</span>`
                }
                ${
                  !item.price
                    ? `<span class="discounted-price">Free To Play</span>`
                    : `<span class="discounted-price">${item.price}₫</span>`
                  // <span class="original-price">${item.oldprice}₫</span>
                  // <span class="discounted-price">${item.price}₫</span>
                }
                </div>
              </div>
            </div>
          </div>
    `;
    })
    .join("\n");
  feature.innerHTML = htmlContent;
}

function loadGamesOnMoreGame(games) {
  const feature = document.getElementById("more-game");
  const htmlContent = games
    .map((item) => {
      return `
     
        <a class="filtered-game-container" href="../../gameDetail.html?id=${
          item._id
        }">
            <img
            src="${item.imageUrl}"
            alt="${item.title}"
            />

            <div class="filtered-game-description">
                    <p class="filtered-game-name">${item.title}</p>

                    <div class="filtered-game-tags">
                        ${item.tags
                          .map(
                            (tag) =>
                              `<span class="game-tag">${tag.tagName}</span>`
                          )
                          .join("\n")}
                    </div>

                    
                    <p class="filtered-game-situation">Averages <span>${(
                      Math.random() * 100000
                    ).toFixed()} reviews</span></p>
            </div>

            <div class="filtered-game-price">
                <span class="sale">${
                  item.saleoff > 0 ? item.saleoff + "%" : "Not Sale"
                }</span>
                <span class="game-price">${
                  item.price > 1000 ? item.price + "đ" : "Free to play"
                }</span>
                <button class="view-button">View Details...</button>
            </div>
        </a>
    `;
    })
    .join("\n");
  feature.innerHTML =
    htmlContent + `<button class="filtered-show-more">Show more</button>`;
}

function loadGamesOnFeature(games) {
  const feature = document.getElementById("featured");
  const htmlContent = games
    .map((item) => {
      return `

    <a class="featured-item fade" href="../../gameDetail.html?id=${item._id}">
      <img
        src="${item.imageUrl}"
        alt="${item.title}"
      />

      <div class="featured-game-infor-container">
        <h2 class="featured-game-name">${item.title}</h2>

        <span class="featured-game-viewers"
          >Averages <span>${(
            Math.random() * 100000
          ).toFixed()} reviews</span></span
        >

        <div class="featured-game-tags">
        ${item.tags
          .map((tag) => `<span class="game-tag">${tag.tagName}</span>`)
          .join("\n")}
        </div>

        <p class="featured-game-status">
          ${item.description}
        </p>
      </div>
    </a>
    `;
    })
    .join("\n");
  feature.innerHTML += htmlContent;
}

export { loadDataOnCategories, loadGamesOnFeature };
