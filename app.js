const apiKey = "114c32232e8a40cb922bdccee68b13c6";
const baseURL = "https://api.weatherbit.io/v2.0/current";
const iconContainer = document.querySelector(".icon-container");
const cities = [];

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

let lat = "41.404503";
let lon = "2.173884";

function renderSuccess(data) {
  let weatherData = data.data[0];
  let icon = document.createElement("img");
  let col = document.createElement("div");
  let city = document.createElement("p");
  let temperature = document.createElement("p");
  icon.setAttribute("src", `icons/${weatherData.weather.icon}.png`);
  icon.setAttribute("alt", weatherData.weather.description);
  col.setAttribute("class", "col-md-4 text-center rounded");
  city.innerText = weatherData.city_name;
  temperature.innerText = `${weatherData.temp}º`;
  iconContainer.appendChild(col);
  col.appendChild(city);
  col.appendChild(icon);
  col.appendChild(temperature);
}

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

async function getWeather(onSuccess, onFail) {
  cities.forEach((x) => {
    fetch(`${baseURL}?lat=${x.latitude}&lon=${x.longitude}&key=${apiKey}`)
      .then((response) => response.json())
      .then((jsonData) => onSuccess(jsonData))
      .catch((error) => {
        console.error(error);
        return onFail();
      });
  });
}

getWeather(renderSuccess, renderFail);
