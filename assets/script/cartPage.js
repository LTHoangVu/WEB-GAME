import { fetchUserCart } from './fetchCart.js';

async function loadDataOnCart() {
  const data = await fetchUserCart();
  const cartData = data.cart;
  console.log(data);
  loadItemsOnCart(cartData);
  deleteItemsOnCart(cartData);
}

async function loadItemsOnCart(cart) {
  const cartListContainer = document.getElementById('cart_item_list');
  const cartTotalPrice = document.getElementById('cart_estimated_total');
  let totalPrice = 0;
  for (let item of cart) {
    const itemHtmlContent = `
        <div class="cart_item">
            <div class="cart_item_price">
                <div class="price">${item.price}₫</div>
                <a class="remove_link remove_each" href="#">Remove</a>
            </div>
            <div class="cart_item_img">
                <a href="http://localhost:8080/products/${item._id}">
                    <img src="${item.imageUrl}" alt="${item.title}" width="120" height="50">
                </a>
            </div>
            <div class="cart_item_desc">
                <div class="cart_item_platform">
                    <span class="win_platform_img"></span>
                </div>
                <a href="http://localhost:8080/products/${item._id}">${item.title}</a><br>
            </div>
        </div>`;
    cartListContainer.innerHTML += itemHtmlContent;
    totalPrice += item.price;
  }
  cartTotalPrice.innerHTML = totalPrice + '₫';
}

async function deleteDataOnCart(idGame) {
  const token = localStorage.getItem('token');
  console.log(idGame);
  if (token) {
    try {
      const response = await fetch(
        'http://localhost:8080/shop/delete-in-cart',
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gameId: idGame }),
        }
      );
      if (!response.ok) {
        const error = new Error('Deleting game to cart failed');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }
      const resData = await response.json();
      return resData;
    } catch (error) {
      console.log(error);
    }
  } else {
    window.location.assign('./login.html');
  }
}

async function deleteItemsOnCart(cart) {
  const deleteBtn = document.getElementsByClassName('remove_each');
  console.log(deleteBtn);
  for (let i = 0; i < deleteBtn.length; i++) {
    let button = deleteBtn[i];
    console.log(button);
    button.onclick = async function (event) {
      const buttonClicked = event.target;
      console.log(cart[i]._id);
      await deleteDataOnCart(cart[i]._id);
      buttonClicked.parentElement.parentElement.remove();
      /*location.reload();*/
      return false;
    };
  }
}

export { loadDataOnCart };
