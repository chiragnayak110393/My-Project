const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
 bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
           nav.classList.remove('active');
       })
   }


// Get all product images
var productImages = document.querySelectorAll('.pro img');

// Get the main image element
var mainImage = document.getElementById('mainImage');

// Iterate through each product image
for (var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function() {
    // Change the source of the main image to the clicked image
    mainImage.src = this.src;

    // Remove active class from all product images
    for (var j = 0; j < productImages.length; j++) {
      productImages[j].parentElement.classList.remove('active');
    }

    // Add active class to the clicked product image's parent
    this.parentElement.classList.add('active');
  });
}



