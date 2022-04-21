// get Photos
// display Photos
// load infinite images
// activate the loader
// add a scroll eventListener

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Show Loader during the loading
loader.hidden = false;

let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = // API Key
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // error here
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    // Reset the imagesLoaded, otherwise it increases over 30 after the scrolling completed.
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement("a");
        // I prefer settAttribute method to make the code readable, to make it with a function follow the way below the code.
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);
        // Check with load eventListener, when each photo is loaded
        img.addEventListener("load", imageLoaded);
        // Append the new elements in to DOM
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        // Hide the loader, when loading completed
        loader.hidden = true;
    }
}

// Check to see if scrolling near bottom of page
// Load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loader.hidden = false;
        getPhotos();
    }
})

getPhotos();



/*
SETTING ATTRIBUTES WITH A FUNCTION


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    // otherwise the imagesLoaded increase over 30 after the scrolling is completed
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to full photo
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
*/