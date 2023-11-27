import fetchData from "./fetchData.js";

async function loadDataOnCategories() {
  const data = await fetchData();
  const games = data.games;
  loadGamesOnMoreGame(games);
}

function loadGamesOnMoreGame(games) {
  const feature = document.getElementById("more-game");
  const htmlContent = games
    .map((item) => {
      return `
     
        <div class="filtered-game-container">
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
                <span class="game-price">${
                  item.price > 1000 ? item.price : "Free to play"
                }</span>
                <button>Add to Cart</button>
            </div>
        </div>
    `;
    })
    .join("\n");
  feature.innerHTML =
    htmlContent + `<button class="filtered-show-more">Show more</button>`;
}

loadDataOnCategories();
