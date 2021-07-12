import './style.css'
import './styles/index.css'
import './styles/index.css'

type Product = {
  id: string;
  name: string;
  price: number;
  type: string;
};

type CartItem = {
  id: string;
  quantity: number;
};
let state: { products: Product[]; cartItems: CartItem[] } = {
  products: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 1,
      type: "vegetable",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.5,
      type: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.5,
      type: "fruit",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.9,
      type: "fruit",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.7,
      type: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell-pepper",
      price: 0.3,
      type: "vegetable",
    },

    {
      id: "008-berry",
      name: "berry",
      price: 1.5,
      type: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 1.5,
      type: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.8,
      type: "vegetable",
    },
  ],

  cartItems: [],
};

function renderAllProducts() {
  for (const product of state.products) {
    let productLi = renderProduct(product);

    let itemUl = document.querySelector(".store--item-list");
    itemUl?.append(productLi);
  }
}

function renderProduct(product: {
  id: string;
  name: string;
  price: number;
  type: string;
}) {
  let productLi = document.createElement("li");

  let productImgDiv = document.createElement("div");
  productImgDiv.setAttribute("class", "store--item-icon");

  let productImg = document.createElement("img");
  productImg.setAttribute("src", `assets/icons/${product.id}.svg`);
  productImg.setAttribute("alt", product.name);
  productImgDiv.append(productImg);

  let addBtn = document.createElement("button");
  addBtn.innerText = "Add to cart";

  addBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let itemIndex = checkExistCart(product);

    if (itemIndex === -1) {
      const newCartItem = addNewProductToCart(product);
      renderCartItem(newCartItem);
      updateTotal();
    } else {
      addQuantity(product.id);
    }
  });

  productLi.append(productImgDiv, addBtn);
  return productLi;
}


function addQuantity(id: string) {
  let updatedCartItem = state.cartItems.find(function (item) {
    return item.id === id;
  });

  if (updatedCartItem) {
    updatedCartItem.quantity++;
    updateCartItem(updatedCartItem);
  }
}

function minusQuantity(id: string) {
  let updatedCartItem = state.cartItems.find(function (item) {
    return item.id === id;
  });

  if (updatedCartItem) {
    updatedCartItem.quantity--;
    updateCartItem(updatedCartItem);
  }
}

function renderAllCartItems() {
  getServerCart().then(function (serverCart) {
    state.cartItems = serverCart;

    state.cartItems.map(renderCartItem);
  });
}

function renderCartItem(cartItem: CartItem) {
  let cartUl = document.querySelector(".cart--item-list");
  let cartLi = document.createElement("li");
  cartLi.setAttribute("id", cartItem.id);
  cartUl?.append(cartLi);

  let productDetail = state.products.find(function (product) {
    return product.id === cartItem.id;
  });
  if (!productDetail) return;
  let cartItemImg = document.createElement("img");
  cartItemImg.setAttribute("class", "cart--item-icon");
  cartItemImg.setAttribute("src", `assets/icons/${cartItem.id}.svg`);
  cartItemImg.setAttribute("alt", productDetail.name);

  let itemName = document.createElement("p");
  itemName.innerText = productDetail.name;

  let minusBtn = document.createElement("button");
  minusBtn.setAttribute("class", "quantity-btn remove-btn center");
  minusBtn.innerText = "-";
  minusBtn.addEventListener("click", function (event) {
    event.preventDefault();
    minusQuantity(cartItem.id);
  });

  let plusBtn = document.createElement("button");
  plusBtn.setAttribute("class", "quantity-btn remove-btn center");
  plusBtn.innerText = "+";
  plusBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addQuantity(cartItem.id);
  });

  let quantitySpan = document.createElement("span");
  quantitySpan.setAttribute("class", "quantity-text center");
  quantitySpan.innerText = cartItem.quantity;

  cartLi.append(cartItemImg, itemName, minusBtn, quantitySpan, plusBtn);
}

function checkExistCart(product: {
  id: string;
  name: string;
  price: number;
  type: string;
}) {
  const itemIndex = state.cartItems.findIndex(function (cartItem) {
    return cartItem.id === product.id;
  });

  return itemIndex;
}