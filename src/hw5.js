let apiKey = "5863935ee9cca4c02ed68203f807c65b";
let units = "metric";

function getWeatherByCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed;
  let precipitation = response.data.clouds.all;

  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${temperature}°C`;

  let updatedCity = document.querySelector(".head");
  updatedCity.innerHTML = city;

  let updatedDesc = document.querySelector("#weather-description");
  updatedDesc.innerHTML = description;

  let updatedWind = document.querySelector("#wind");
  updatedWind.innerHTML = `${windSpeed} km/h`;

  let updatedPrecipitation = document.querySelector("#precipitation");
  updatedPrecipitation.innerHTML = `${precipitation}%`;

  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let timeString = hours + ":" + minutes;

  let updatedTime = document.querySelector("#current-time");
  updatedTime.innerHTML = timeString;
}

let srchButton = document.querySelector("#btn-srch");
srchButton.addEventListener("click", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#place-input");
  let city = cityInput.value;
  getWeatherByCity(city);
});

function getWeatherByCoordinates(latitude, longitude) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherByCoordinates(latitude, longitude);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}
let currentLocationButton = document.querySelector("#btn-curr");
currentLocationButton.addEventListener("click", showCurrentLocation);
