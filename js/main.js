const key = 'Ea9hc0jvNqwGkwy7C_ssyueb9m7E44RLrTPBPhoQ-eE'
let search = document.querySelector("#search");
let form = document.querySelector(".form-container");
let url = `https://api.unsplash.com/search/photos/`
let img = document.querySelector(".img-class");

function init() {
    form.addEventListener("click", unsplashImage)

    }


    function unsplashImage(ev) {

        ev.preventDefault();
        let imageSearch = search.value.trim();
        fetch(`${url}?query=${imageSearch}&client_id=${key}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error ('Something is wrong')
            }
            return response.json()
        })
        .then((data)=>{if (imageSearch) {
            if (data.results == "") {
                img.innerHTML = "Please Type Anything else";
            }
          }
    
            ourImage(data.results)
        })
        .catch((err)=>{
            console.log(err)
            img.innerHTML=`No Images found for ${search}`;
        })
}

function ourImage(unsplash) {
    img = document.querySelector(".img-class");
    img.innerHTML =""
    unsplash.forEach((image)=>{

    fetch(image.urls.raw)
    .then((response)=>{
        if(!response.ok){
            throw new Error("https error occurred");
        }
        return response.blob()
    })
    .then((data)=>{
        let newURL = URL.createObjectURL(data)
        img.innerHTML += `<img src=${newURL} alt="something">`
    })
})
}


window.addEventListener("DOMContentLoaded", init);

