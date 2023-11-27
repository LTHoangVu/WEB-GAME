var params = new URLSearchParams(window.location.search);
var id = params.get("id");

async function loadDataGameInfo() {
  var resData;

  try {
    const response = await fetch("http://localhost:8080/products/" + id);
    if (!response.ok) {
      const error = new Error("Fetching product failed");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    resData = await response.json();
    return resData;
  } catch (error) {
    console.log(error);
  }
}

//create game tab
loadDataGameInfo().then((data) => {
  console.log(data);
  const game = data.game;
  document.title = game.title;
  const html = `<div class="filtered-game">
      <h2 class="heading"${game.title}></h2>
              <div class="media_game">
                <iframe  
                        autoplay loop muted reload="auto" 
                        src="${game.videoUrl}" type="video/mp4">
                       
                </iframe>
                
                
                <div class="info_game">
  
                  <img src="${game.imageUrl}" alt="${game.title}">
     
                  <div class="if_game">${game.description}</div>
                
                    <div class="dev">Development: ${game.developer}</div> 
                    <div class="date">Released date: ${game.releaseDate}</div>
                  
                  
                    <div class="filtered-game-tags">
                    ${getGameTag(game)}
                  </div>                   
  
              </div>
            </div>
             
                <div class="buy_games">
                  <p>${game.title}</p>
                
                    <div class="button_buy">
                      
                     ${
                       game.price
                         ? `<p class="price_block">-${game.saleoff}%</p>
                    
                      <div class="filtered-game-price">
                        <span class="original-price">${game.oldprice}</span>
                        <span class="discounted-price">${game.price}</span>
                      </div>`
                         : `<div class="filtered-game-price">
                      <span class="original-price-free">Free to play</span>
                    </div>`
                     }
                     
                      
                      <p class="buy_block">Add to cart</p>
                     
                    
                  </div>
             
                </div>
            </div>
      </div>`;
  const gameTabContainers = document.querySelector(".filtered-game-container");

  console.log(html);
  gameTabContainers.innerHTML = html;
  console.log(gameTabContainers);
});

// get game tag
function getGameTag(game) {
  let html = "";
  for (let i = 0; i < game.tags.length; i++) {
    if (i === game.tags.length - 1) {
      html += `<span class="game-tag">${game.tags[i].tagName}</span>\n`;
    } else html += `<span class="game-tag">${game.tags[i].tagName}</span>\n`;
  }
  return html;
}
