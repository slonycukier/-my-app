let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();

let dayWeek = document.querySelector(".day");
let timeWeek = document.querySelector(".time");

if (hour < 10) {
  hour = `0${hour}`;
}

if (minute < 10) {
  minute = `0${minute}`;
}

dayWeek.innerHTML = `${day}`;
timeWeek.innerHTML = `${hour}:${minute}`;

function searchLocation(position) {
  let apiKey = "46ac51283d763b3d23f685ec9d6acbdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(city) {
  let apiKey = "46ac51283d763b3d23f685ec9d6acbdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#theTemp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", findCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("London");
