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

const cart = [];

// Gallery element

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));
    thumbnail.classList.toggle("active");
    largeImage.src = thumbnail.src.replace("-thumbnail", "");
  });
});

// Counter

const itemCountMinus = () => {
  if (itemCount.innerText > 0) itemCount.innerText--;
};

const itemCountPlus = () => {
  itemCount.innerText++;
};

// Cart Functionality

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
  populateCartPopup();
};

const cartItemDelete = () => {
  cart.splice(0, 1);
  populateCartPopup();
  navbarCartBubble.classList.add("hidden");
};

//Cart display

const toggleShowCart = () => {
  navbarCartPopup.classList.remove("hidden");
  populateCartPopup();

  setTimeout(() => {
    window.addEventListener("click", function handleShow(e) {
      let deleteButton = document.querySelector(".delete");
      if (
        e.target !== navbarCartPopup &&
        !navbarCartPopup.contains(e.target) &&
        e.target !== deleteButton
      ) {
        console.log(e);
        navbarCartPopup.classList.add("hidden");
        window.removeEventListener("click", handleShow);
      }
    });
  }, 100);
};

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

// Gallery modal

// const modalClose = () => {
//   galleryModal.classList.add("hidden");
// };
// const modalShow = () => {
//   galleryModal.classList.remove("hidden");
//   activeModalImage = modalThumbnails[0];
// };

// modalThumbnails.forEach((thumbnail) => {
//   thumbnail.addEventListener("click", () => {
//     modalThumbnails.forEach((thumbnail) =>
//       thumbnail.classList.remove("active")
//     );
//     thumbnail.classList.toggle("active");
//     setActiveModalImage();
//     galleryModalLarge.src = thumbnail.src.replace("-thumbnail", "");
//   });
// });

// setActiveModalImage = () => {
//   let activeModalImage = Array.prototype.find.call(modalThumbnails, (item) =>
//     item.classList.contains("active")
//   );
//   galleryModalLarge.src = activeModalImage.src.replace("-thumbnail", "");
// };

// const prevImage = () => {};

// const nextImage = () => {};

// Gallery modal approach 2

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

// Mobile gallery controls

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
