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
let state: { products: Product[]; inCart: CartItem[] } = {
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

  inCart: [],
};



const itemList = document.querySelector(".item-list.store--item-list")
const cartList = document.querySelector(".item-list.cart--item-list")
const totalNumber = document.querySelector(".total-number")


function renderProducts() {
  if (itemList===null) return
  for (const fruit of state.products) {
    const listEl = createListEl(fruit)
    itemList.append(listEl)
  }
}

function addProductToCart(productItem: Product) {
  

  const foundItem = state.inCart.find(function (cartItem: CartItem) {
    return productItem.id === cartItem.id
  })
  if (foundItem) {
    ++foundItem.quantity
    foundItem.productPrice = foundItem.quantity * productItem.price
  } else {
    const inCartInfo = {
      id: productItem.id,
      quantity: 1,
      productPrice: productItem.price,
      name: productItem.name,
    }
    state.inCart.push(inCartInfo)
  }


}


function createListEl(item: any) {
  const listEl = document.createElement("li")
  const imgEl = document.createElement("img")
  imgEl.setAttribute("src", item.img)
  imgEl.setAttribute("alt", item.name)
  const cartBtn = document.createElement("button")
  cartBtn.innerText = `Add to Basket`



  listEl.append(imgEl, cartBtn)

  cartBtn.addEventListener("click", function () {
    addProductToCart(item)
    createCartItems()
    renderTotal()
    console.log("cart list:", state.inCart)
  })
  return listEl
}


function createCartItem(item: any) {
  const listCartEl = document.createElement("li")
  const imgCartEl = document.createElement("img")
  imgCartEl.setAttribute("class", "cart--item-icon")
  imgCartEl.setAttribute("src", item.img)
  imgCartEl.setAttribute("alt", item.name)
  const pCartEl = document.createElement("p")
  pCartEl.innerText = item.name

  const minusBtn = document.createElement("button")
  minusBtn.setAttribute("class", "quantity-btn remove-btn center")
  minusBtn.innerText = "-"
  minusBtn.addEventListener("click", function () {
    decreaseQuantity(item)
    console.log("In Cart:", state.inCart)
  })


  const spanCartEl = document.createElement("span")
  spanCartEl.setAttribute("class", "quantity-text center")
  spanCartEl.innerText = item.quantity
  const plusBtn = document.createElement("button")
  plusBtn.setAttribute("class", "quantity-btn add-btn center")
  plusBtn.innerText = "+"
  plusBtn.addEventListener("click", function () {
    // const singlePrice = item.productPrice / item.quantity
    // item.quantity++
    // spanCartEl.innerText = item.quantity
    // item.productPrice = singlePrice * item.quantity
    // renderTotal()
    increaseQuantity(item)

  })

  listCartEl.append(imgCartEl, pCartEl, minusBtn, spanCartEl, plusBtn)

  return listCartEl
}

function createCartItems() {
  if(cartList===null) return
  cartList.innerHTML = ""
  for (const item of state.inCart) {
    const listCartEl = createCartItem(item)
    cartList.append(listCartEl)
  }
}

function renderTotal() {
  if(totalNumber===null) return
  let totalPrice = 0
  for (const cartItem of state.products) {
    totalPrice += cartItem.price
  }
  totalNumber.innerHTML = `£${totalPrice.toFixed(2)}`
  console.log("total price:", totalPrice)
}

function decreaseQuantity(item: any) {
  const singlePrice = item.productPrice / item.quantity
  item.quantity--
  if (item.quantity === 0) {
    const indexToDelete = state.inCart.findIndex(function (cartItem) {
      return item.productId === cartItem.id
    })
    state.inCart.splice(indexToDelete, 1)
  } else {
    item.productPrice = singlePrice * item.quantity
  }
  createCartItems()
  renderTotal()
}

function increaseQuantity(item: any) {
  const singlePrice = item.productPrice / item.quantity
  item.quantity++
  // spanCartEl.innerText = item.quantity
  item.productPrice = singlePrice * item.quantity
  renderTotal()
}

renderProducts()
renderTotal()