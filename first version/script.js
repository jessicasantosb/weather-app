const apiKey = "b73d0e7bb40743bd67b6529abe9cbedd";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const error = document.querySelector("#error");

const cityElement = document.querySelector("#city");
const temperature = document.querySelector("#temperature")
const description  = document.querySelector("#description");
const weatherIcon  = document.querySelector("#weather-icon");
const country = document.querySelector("#country-flag");
const humidity = document.querySelector("#humidity span");
const wind = document.querySelector("#wind span");

const weatherData = document.querySelector("#weather-data");

const getWeatherData = async (city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const res = await fetch(apiWeatherUrl);
    const data = await res.json();
    return data
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if (data.name === undefined) {
        error.innerText = "⚠️ Please, check the city name.";
        setTimeout(() => {
            error.innerText = '';
        }, 4000);
    }
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    description.innerText = data.weather[0].description;
    cityElement.innerText = data.name;
    temperature.innerText = `${parseInt(data.main.temp)} °C`;
    country.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} km/h`;
    weatherData.classList.remove("hide");
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});

// SETUP LANGUAGE
window.gtranslateSettings = {"default_language":"en","detect_browser_language":true,"languages":["en","pt","fr","de","it","es"],"wrapper_selector":".gtranslate_wrapper","alt_flags":{"pt":"brazil"}};