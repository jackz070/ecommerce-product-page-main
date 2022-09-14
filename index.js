// Selectors would me much clearer if stated in relevant parts of the code, where they are needed, not on top

const thumbnails = document.querySelectorAll(".main__gallery-thumbnails img");
const largeImage = document.querySelector(".main__gallery-large img");
const addToCartButton = document.querySelector(".addToCartButton");
const itemCount = document.querySelector(".itemCount");
const itemCountMinusButton = document.querySelector(".itemCountMinus");
const itemCountPlusButton = document.querySelector(".itemCountPlus");
const navbarCartBubble = document.querySelector(".navbar__cart-bubble");
const navbarCartPopup = document.querySelector(".navbar__cart-popup");
const navbarCartPopupContent = document.querySelector(
  ".navbar__cart-popup_content"
);
const navbarCartButton = document.querySelector(".navbar__cart");

const inventory = {
  1: {
    itemId: 1,
    name: "Fall Limited Edition Sneakers",
    price: parseFloat(125).toFixed(2),
  },
};

// Declaring cart as an empty array

const cart = [];

// Gallery thumbnails functionality

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));
    thumbnail.classList.toggle("active");
    largeImage.src = thumbnail.src.replace("-thumbnail", "");
  });
});

// Cart button counter bubble

const itemCountMinus = () => {
  if (itemCount.innerText > 0) itemCount.innerText--;
};

const itemCountPlus = () => {
  itemCount.innerText++;
};

// Cart Functionality for display purpose, assuming that we have one item only.

const handleAddToCart = () => {
  let toAdd = { ...inventory[1], count: parseInt(itemCount.innerText) };
  if (itemCount.innerText > 0) {
    if (cart.some((item) => item.itemId === toAdd.itemId)) {
      cart[0].count += parseInt(itemCount.innerText);
    } else {
      cart.push(toAdd);
    }
    navbarCartBubble.innerText = cart[0].count;
    navbarCartBubble.classList.remove("hidden");
    itemCount.innerText = 0;
  }
  //In case it was possible to add item to cart the popup is visible. Atm the popup closes whenever anything out of it is closed
  populateCartPopup();
};

//cart item delete function remove the only item we have AND hides the counter bubble
const cartItemDelete = () => {
  cart.splice(0, 1);
  populateCartPopup();
  navbarCartBubble.classList.add("hidden");
};

//Cart display

// Step 1. function to show the cart popup: event.stopPropagation() stops the listener from triggering on other elements that are higher in structure and allows me not to close the popup immediately by triggering the hide cart listener on window; remove class "hidden" and populate the popup; remove event listener from the button so that it can be used to close the popup

const showCart = (e) => {
  e.stopPropagation();
  navbarCartPopup.classList.remove("hidden");
  populateCartPopup();
  navbarCartButton.removeEventListener("click", showCart);
};

navbarCartButton.addEventListener("click", showCart);

//Step 2. adding stopPropagation() to the popup itself stops it from triggering the listener that closes the popup (on the window, never to be reached)

navbarCartPopup.addEventListener("click", function (e) {
  e.stopPropagation();
});

//Step 3. Add the hide cart event listener to window, which triggers a function that adds "hidden" class to popup and re-adds the show cart event listener to the cart button

const hideCart = (e) => {
  navbarCartPopup.classList.add("hidden");
  navbarCartButton.addEventListener("click", showCart);
};

window.addEventListener("click", hideCart);

// Populate cart popup functions is triggered every time the cart popup is displayed to check the contents of cart: if it contains anything, it will get displayed, if there is nothing a message stating this appears

const populateCartPopup = () => {
  if (cart.length === 0) {
    navbarCartPopupContent.innerHTML =
      "<p class='text__center'>Your cart is empty.</p>";
  } else {
    navbarCartPopupContent.innerHTML = `<div class='navbar__cart-popup_content-item'><img src='images/image-product-1-thumbnail.jpg'/><div class='navbar__cart-popup_content-item_description'><p>${
      cart[0].name
    }</p><p>$${cart[0].price} x ${
      cart[0].count
    } <span class="bold__black">$${parseFloat(
      cart[0].price * cart[0].count
    ).toFixed(
      2
    )}</span></p></div><button class='button__small' onClick='cartItemDelete()'><img class='delete' src='images/icon-delete.svg'/></button></div><button class='button__big'>Checkout</button>`;
  }
};

// Gallery modal (seconds approach, first one was much more convoluted, longer and buggy)

const galleryModal = document.querySelector(".modal__overlay");
const galleryModalLarge = document.querySelector(".modal__gallery-large img");
const modalThumbnails = document.querySelectorAll(
  ".modal__gallery-thumbnails img"
);
let currentIndex = 0;

const handleKeyPress = (e) => {
  if (e.key === "ArrowLeft") {
    prevImage();
  }
  if (e.key === "ArrowRight") {
    nextImage();
  }
  if (e.key === "Escape") {
    modalClose();
  }
};

const modalShow = () => {
  console.log(window.innerWidth);
  if (window.innerWidth >= 900) {
    galleryModal.classList.remove("hidden");
    modalGalleryLargeImagePicker(currentIndex);
    document.addEventListener("keydown", handleKeyPress);
  }
};

const modalClose = () => {
  document.removeEventListener("keydown", handleKeyPress);
  galleryModal.classList.add("hidden");
};

const modalGalleryLargeImagePicker = (index) => {
  galleryModalLarge.src = modalThumbnails[index].src.replace("-thumbnail", "");
  modalThumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));
  modalThumbnails[index].classList.add("active");
  currentIndex = index;
};

// Thumbnail click sets active image
modalThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    modalGalleryLargeImagePicker(
      Array.prototype.indexOf.call(modalThumbnails, thumbnail)
    );
  });
});

// Button click

let prevImage = () => {
  if (currentIndex <= 0) {
    modalGalleryLargeImagePicker(modalThumbnails.length - 1);
  } else {
    modalGalleryLargeImagePicker(currentIndex - 1);
  }
};

let nextImage = () => {
  if (currentIndex >= modalThumbnails.length - 1) {
    modalGalleryLargeImagePicker(0);
  } else {
    modalGalleryLargeImagePicker(currentIndex + 1);
  }
};

// Mobile-view large gallery controls

const images = [
  "image-product-1.jpg",
  "image-product-2.jpg",
  "image-product-3.jpg",
  "image-product-4.jpg",
];
let currentMobileImage = images.indexOf(
  largeImage.src.substr(largeImage.src.lastIndexOf("/") + 1)
);

const galleryMobilePrev = () => {
  if (currentMobileImage > 0) {
    largeImage.src = `images/${images[currentMobileImage - 1]}`;
    currentMobileImage = currentMobileImage - 1;
  } else {
    largeImage.src = `images/${images[images.length - 1]}`;
    currentMobileImage = images.length - 1;
  }
};
const galleryMobileNext = () => {
  if (currentMobileImage < images.length - 1) {
    largeImage.src = `images/${images[currentMobileImage + 1]}`;
    currentMobileImage = currentMobileImage + 1;
  } else {
    largeImage.src = `images/${images[0]}`;
    currentMobileImage = 0;
  }
};
