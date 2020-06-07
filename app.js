const apiKey = "114c32232e8a40cb922bdccee68b13c6";
const baseURL = "https://api.weatherbit.io/v2.0/current";
const iconContainer = document.querySelector(".icon-container");
let lat = "41.404503";
let lon = "2.173884";

function renderSuccess(data) {
  let weatherData = data.data[0];
  let icon = document.createElement("img");
  let col = document.createElement("div");
  icon.setAttribute("src", `icons/${weatherData.weather.icon}.png`);
  icon.setAttribute("alt", weatherData.weather.description);
  col.setAttribute("class", "col-md-6 text-center rounded");
  iconContainer.appendChild(col);
  col.appendChild(icon);
}

function renderFail() {
  let icon = document.createElement("img");
  icon.setAttribute("src", `c04d.png`);
  icon.setAttribute("alt", "something went wrong");
  iconContainer.appendChild(icon);
}

async function getWeather(lat, lon, onSuccess, onFail) {
  let getData = await fetch(`${baseURL}?lat=${lat}&lon=${lon}&key=${apiKey}`)
    .then((response) => response.json())
    .then((jsonData) => onSuccess(jsonData))
    .catch((error) => {
      console.error(error);
      return onFail();
    });
}

getWeather(lat, lon, renderSuccess, renderFail);
