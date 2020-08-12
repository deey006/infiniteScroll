const imgContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
const tweetBtn = document.querySelector('.twitter')

let ready = false;
let imgLoaded = 0;
let totalImage = 0; 

let photoArray = [];

// create elements for links and photos, then add to DOM
function display (){
    imgLoaded = 0;
    totalImage = photoArray.length;
    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        img.appendChild(tweetBtn)
        // check if loading is complete
        img.addEventListener('load', loaded);
        // put <img> inside <a>, then put both in the imageContainer
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// fetching UnsplashApi
const count = 4;
const key = 'tnnE1zJKeLx-XDDSHPVeL9U82B5GQWWXmQgZBJEEgwE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

// check if imgs loaded
function loaded() {
imgLoaded++;
if (imgLoaded === totalImage){
    ready = true;
    loader.hidden = true;
    count = 30;
}
}

// get data from Api

async function getPhotos (){
    try{
        const response = await fetch (apiUrl);
        photoArray = await response.json();
        display()
    }catch(error){

    }
}

window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})

// on loading
getPhotos();