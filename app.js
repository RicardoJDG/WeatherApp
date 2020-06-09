const apiKey = "114c32232e8a40cb922bdccee68b13c6";
const baseURL = "https://api.weatherbit.io/v2.0/current";
const iconContainer = document.querySelector(".icon-container");
const cities = [];
const addBtn = document.querySelector("#add");
const filterInput = document.querySelector("#city");
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");

// Predefined cities
cities.push({
  name: "Barcelona",
  latitude: 41.3887901,
  longitude: 2.1589899,
});

cities.push({
  name: "Guatire",
  latitude: 10.4762001,
  longitude: -66.5426636,
});

cities.push({
  name: "Sidney",
  latitude: -33.8678513,
  longitude: 151.2073212,
});

//Rendering function
function renderSuccess(jsonData) {
  let weatherData = jsonData.data[0];
  let icon = document.createElement("img");
  let col = document.createElement("div");
  let city = document.createElement("p");
  let temperature = document.createElement("p");
  icon.setAttribute("src", `icons/${weatherData.weather.icon}.png`);
  icon.setAttribute("alt", weatherData.weather.description);
  col.setAttribute("class", "col-md-4 text-center rounded");
  city.innerText = weatherData.city_name;
  temperature.innerText = `${weatherData.temp}ºC`;
  iconContainer.appendChild(col);
  col.appendChild(city);
  col.appendChild(icon);
  col.appendChild(temperature);
  return weatherData.city_name;
}

function addMarker(lat, lon) {
  var marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
}

//Catch function
function renderFail() {
  let col = document.createElement("div");
  let icon = document.createElement("img");
  let title = document.createElement("p");
  let questionMark = document.createElement("p");
  col.setAttribute("class", "col-md-4 text-center rounded");
  icon.setAttribute("src", `icons/c04d.png`);
  icon.setAttribute("alt", "something went wrong");
  title.innerText = "Something went wrong";
  title.setAttribute("class", "error");
  questionMark.innerText = "?";
  iconContainer.appendChild(col);
  col.appendChild(title);
  col.appendChild(icon);
  col.appendChild(questionMark);
}

//Adding a city
function addCity(lat, lon) {
  cities.push({
    name: "n/a",
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
  });
  //We called the main function again with the city added
  getWeather(renderSuccess, renderFail);
}

//Main functon
async function getWeather(onSuccess, onFail) {
  cities.forEach((x) => {
    fetch(`${baseURL}?lat=${x.latitude}&lon=${x.longitude}&key=${apiKey}`)
      .then((response) => response.json())
      .then((jsonData) => {
        x.name = onSuccess(jsonData);
        addMarker(x.latitude, x.longitude);
      })
      .catch((error) => {
        console.error(error);
        return onFail();
      });
  });
}

//Filter
filterInput.addEventListener("keyup", function (event) {
  const value = event.target.value;
  console.log(value);
  let containers = document.querySelectorAll(".col-md-4");
  for (let i = 2; i < containers.length; i++) {
    if (!containers[i].childNodes[0].innerText.startsWith(value)) {
      containers[i].style.display = "none";
    } else {
      containers[i].style.display = "block";
    }
  }
});

addBtn.addEventListener("click", function () {
  addCity(latitudeInput.value, longitudeInput.value);
  iconContainer.innerHTML = "";
});

getWeather(renderSuccess, renderFail);
console.log(`${baseURL}?lat=${x.latitude}&lon=${x.longitude}&key=${apiKey}`);
