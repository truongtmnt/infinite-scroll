const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];
let totalImgLoad = 0;
let ready = true;

// Unsplash API
const loadImageCount = 5;
const apiKey = "INcdip-Hd6uY0dqULHu5mS0PidkGY_wjRTAIiuR2RMQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${loadImageCount}&content_filter=high&query=nature&orientation=landscape`;

// const apiKey = "19025928-949441ae713a05afd6b8d1e18";
// const apiUrl = `https://pixabay.com/api/?key=${apiKey}&per_page=${loadImageCount}&safesearch=true`;

// Check if all images were loaded
function imageLoaded() {
	totalImgLoad++;
	if (totalImgLoad === loadImageCount) {
		ready = true;
		loader.hidden = true;
	}
}

// Helper function for setAttributes
function setAttributes(item, attributes) {
	for (key in attributes) {
		item.setAttribute(key, attributes[key]);
	}
}

// Create element for Links and Photo, Add to the DOM
function displayPhoto() {
	totalImgLoad = 0;
	// for each in photoArray
	photoArray.forEach((photo) => {
		// create <a> to link to Unsplash
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// create <img> for photo
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// // Event Listener, check when each is finished loading
		// img.addEventListener("load", imageLoaded);
		// Put <img> inside <a>, then put both inside image-container
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
	ready = true;
	loader.hidden = true;
}

// get Photo from Unsplash API
async function getPhoto() {
	try {
		const response = await fetch(apiUrl);
		photoArray = await response.json();
		displayPhoto();
	} catch (error) {
		console.log(error);
	}
}
// check ito see if scrolling near bottom of page
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY - document.body.offsetHeight >= -1000 &&
		ready
	) {
		ready = false;
		getPhoto();
	}
});

// load
getPhoto();
