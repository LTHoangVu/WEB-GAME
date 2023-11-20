import { fetchProductsData } from "./fetchData.js";

async function loadDataGameTab() {
  const data = await fetchData();
  const games = data.games;
  loadGameTab(games);

  addEffectFilterTab();
}

//create game tab
function loadGameTab(games) {
  const gameTabContainers = document.querySelectorAll(
    ".filtered-game-container"
  );
  const html = games.map((item) => {
    return `<div class="filtered-game">
        <img src="${item.imageUrl}" alt="game image" />
        <div class="filtered-game-description">
          <div class="filtered-game-name-platform-tags">
            <span class="filtered-game-name">${item.title}</span>
            <div class="filtered-game-platform">
              <i
                class="fa-brands fa-windows fa-lg"
                style="color: #7f97a5"
              ></i>
              <i
                class="fa-brands fa-apple fa-lg"
                style="color: #7f97a5"
              ></i>
            </div>
            <div class="filtered-game-tags">
              ${getGameTag(item)}
            </div>
          </div>
          <div class="filtered-game-discount">
            <span>${item.saleoff}%</span>
          </div>
          <div class="filtered-game-price">
            <span class="original-price">${item.oldprice}</span>
            <span class="discounted-price">${item.price}</span>
          </div>
        </div>
    </div>`;
  });

  let randomArray = [];
  for (let i = 0; i < 20; i++) {
    randomArray.push(i);
  }
  randomArray = shuffle(randomArray);
  console.log(randomArray);

  for (let i = 0; i < gameTabContainers.length; i++) {
    gameTabContainers[i].innerHTML += html[randomArray[i]];
  }
}
// get game tag
function getGameTag(game) {
  let html = "";
  for (let i = 0; i < game.tags.length; i++) {
    if (i === game.tags.length - 1) {
      html += `<span class="game-tag">${game.tags[i].tagName}</span>\n`;
    } else html += `<span class="game-tag">${game.tags[i].tagName},</span>\n`;
  }
  return html;
}

//effect for filterTab
function setFilterTabActive() {
  const filter_tab = document.querySelectorAll(".filter-tab");

  const anchor = document.querySelector(".see-more-anchor");
  const checkbox = document.querySelector("#checkbox-container");
  filter_tab.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  this.classList.add("active");
  checkbox.style.display = "none";
  switch (this.innerText) {
    case "News & Trending":
      anchor.innerText = "New Realeases";
      break;
    case "Top Sellers":
      anchor.innerText = "Top Sellers";
      checkbox.style.display = "flex";
      break;
    case "Popular Upcoming":
      anchor.innerText = "Upcomming Realeases";
      break;
    case "Specials":
      anchor.innerText = "Specials";
      break;
  }
}

function addEffectFilterTab() {
  const filter_tab = document.querySelectorAll(".filter-tab");
  filter_tab.forEach((element) => {
    element.addEventListener("click", setFilterTabActive);
  });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export { loadDataGameTab };
