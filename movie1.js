// Go to omdbapi.com , create account and explore API documentation.
let searchButton = document.getElementById("search");

searchButton.addEventListener("click", checkMovie);
// document.querySelector("#searchInput").addEventListener("keypress", checkMovie);

async function checkMovie() {
  let searchInput = document.getElementById("searchInput").value;
  let url = `http://www.omdbapi.com/?t=${searchInput}&apikey=c7d4cd8a`;
  let response = await fetch(url);

  // console.log(fetch(url))
  let data = await response.json();
  console.log(data.Error);

  document.querySelector("#output").innerHTML = "";
  if (data.Error) {
    // data error msg
    let h3 = document.createElement("h3");
    h3.innerText = data.Error;
    let img = document.createElement("img");
    img.src =
      "https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg";
    document.querySelector("#output").append(h3, img);
  } else {
    //output movie data

    getData(data);
  }
}

// Create a decent UI where should be able to search for any movie they want. explore how can you make a search request.

// Make a fetch request and get the data depending on whatever movie you entered. Show the movie data on the app.

function getData(data) {
  let outputIn = document.createElement("div");
  outputIn.setAttribute("class", "outputIn");

  let posterBox = document.createElement("div");
  let poster = document.createElement("img");
  poster.src = data.Poster;
  poster.setAttribute("class", "img");

  posterBox.setAttribute("class", "poster");

  posterBox.append(poster);
  outputIn.append(posterBox);

  let detail = [
    "Title",
    "Year",
    "Released",
    "Runtime",
    "Rated",
    "Genre",
    "Director",
    "Writer",
    "Actors",
    "Plot",
    "imdbRating",
    "BoxOffice",
  ];
  let displayMovie = document.createElement("div");
  displayMovie.setAttribute("class", "displayMovie");
  detail.forEach(function (a) {
    let span = document.createElement("span");
    if (data[a] == undefined) {
      data[a] = "N/A";
    }
    let span2 = document.createElement("span");
    span.innerText = a + ": ";
    span2.innerText = data[a];
    span.append(span2);
    displayMovie.append(span);
  });
  // featured
  let feature = document.createElement("span");
  feature.setAttribute("class", "feature");
  if (data.imdbRating > 8.5) {
    feature.innerText = "Featured";
    outputIn.append(feature);
  }

  outputIn.append(displayMovie);
  let imgWatch = [
    "https://cdn.vox-cdn.com/thumbor/Yq1Vd39jCBGpTUKHUhEx5FfxvmM=/39x0:3111x2048/1200x800/filters:focal(39x0:3111x2048)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png",
    "https://images.firstpost.com/wp-content/uploads/2019/11/disney-1024-1.jpg",
    "https://www.telesurenglish.net/__export/1584731358366/sites/telesur/img/2020/03/20/amazon_2.jpg_1718483346.jpg",
  ];
  let divWatch = document.createElement("div");
  divWatch.setAttribute("class", "divWatch");

  let watch = document.createElement("span");
  watch.innerText = "Watch on";
  let watchImg = document.createElement("img");
  watchImg.src = imgWatch[getRandom(imgWatch.length)];
  console.log(imgWatch);

  divWatch.append(watch, watchImg);

  outputIn.append(divWatch);

  document.getElementById("output").append(outputIn);
}

function getRandom(Max) {
  return Math.floor(Math.random() * Max);
}
