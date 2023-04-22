const fetchWeatherBtn = document.getElementById("fetch-weather-btn");
const cityInput = document.getElementById("city-input");
const weatherDataDiv = document.getElementById("weather-data");
const API_KEY = "your API KEY"

fetchWeatherBtn.addEventListener("click", async () => {
    const cityName = cityInput.value;
    cityInput.value =""
    if (cityName.trim() === "") {
        alert("Please enter a city name.");
        return cityName;
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`)
            if (!response.ok) {
                throw new Error("City not found");
            }
        const data = await response.json()
        displayWeatherData(data)
    }catch(error){
        alert(error);
        weatherDataDiv.innerHTML = "";
    }
});


function displayWeatherData(data) {
    const degree = Math.round(data.main.temp - 273.15)
    let iconCode = data.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherDataDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img id="weather-icon" src="${iconUrl}" alt="Weather icon">
        <p>Temperature: ${degree} C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    
}
