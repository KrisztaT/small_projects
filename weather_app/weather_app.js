import { API_KEY } from "./config.js";

const fetchWeatherBtn = document.getElementById("fetch-weather-btn");
const cityInput = document.getElementById("city-input");
const weatherDataDiv = document.getElementById("weather-data");
let fetchCount = 0;

async function fetchData() {
  const cityName = cityInput.value;
  cityInput.value = "";
  if (cityName.trim() === "") {
    alert("Please enter a city name.");
    return cityName;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    fetchCount++;
    displayWeatherData(data);
  } catch (error) {
    alert(error);
    weatherDataDiv.innerHTML = "";
  }
}

fetchWeatherBtn.addEventListener("click", () => {
  if (fetchCount < 3) {
    fetchData();
    if (fetchCount === 3) {
      fetchWeatherBtn.disabled = true;
    }
  }
});

function displayWeatherData(data) {
  const card = document.createElement("div");
  const degree = Math.round(data.main.temp - 273.15);
  let iconCode = data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  card.classList.add("card");
  card.innerHTML = `
        <h2>${data.name}</h2>
        <img id="weather-icon" src="${iconUrl}" alt="Weather icon">
        <p>Temperature: ${degree} C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
  weatherDataDiv.appendChild(card);
}
