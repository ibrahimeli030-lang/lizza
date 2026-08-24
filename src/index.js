const searchInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityEl = document.getElementById("city");
const detailsEl = document.getElementById("details");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const tempEl = document.getElementById("temp");
const iconEl = document.getElementById("weather-icon");
const forecastEl = document.getElementById("forecast");

const weatherCodes = {
  0: { desc: "clear sky", icon: "sun" },
  1: { desc: "mainly clear", icon: "partly-cloudy" },
  2: { desc: "partly cloudy", icon: "partly-cloudy" },
  3: { desc: "overcast clouds", icon: "cloud" },
  45: { desc: "fog", icon: "cloud" },
  48: { desc: "depositing rime fog", icon: "cloud" },
  51: { desc: "light drizzle", icon: "partly-cloudy-rain" },
  53: { desc: "moderate drizzle", icon: "partly-cloudy-rain" },
  55: { desc: "dense drizzle", icon: "rain" },
  56: { desc: "light freezing drizzle", icon: "partly-cloudy-rain" },
  57: { desc: "dense freezing drizzle", icon: "rain" },
  61: { desc: "slight rain", icon: "partly-cloudy-rain" },
  63: { desc: "moderate rain", icon: "rain" },
  65: { desc: "heavy rain", icon: "rain" },
  66: { desc: "light freezing rain", icon: "rain" },
  67: { desc: "heavy freezing rain", icon: "rain" },
  71: { desc: "slight snow", icon: "snow" },
  73: { desc: "moderate snow", icon: "snow" },
  75: { desc: "heavy snow", icon: "snow" },
  77: { desc: "snow grains", icon: "snow" },
  80: { desc: "slight rain showers", icon: "partly-cloudy-rain" },
  81: { desc: "moderate rain showers", icon: "partly-cloudy-rain" },
  82: { desc: "violent rain showers", icon: "rain" },
  85: { desc: "slight snow showers", icon: "snow" },
  86: { desc: "heavy snow showers", icon: "snow" },
  95: { desc: "thunderstorm", icon: "thunder" },
  96: { desc: "thunderstorm with hail", icon: "thunder" },
  99: { desc: "thunderstorm with hail", icon: "thunder" },
};

const icons = {
  sun: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#fbbf24"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  "partly-cloudy": `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="58" cy="26" r="10" fill="#fbbf24"/>
        <ellipse cx="35" cy="40" rx="18" ry="12" fill="#F3F4F6"/>
        <ellipse cx="55" cy="45" rx="15" ry="10" fill="#F3F4F6"/>
        <ellipse cx="25" cy="50" rx="14" ry="9" fill="#F3F4F6"/>
        <ellipse cx="45" cy="53" rx="16" ry="10" fill="#F3F4F6"/>
    </svg>`,
  "partly-cloudy-rain": `<svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="56" cy="22" r="9" fill="#fbbf24"/>
        <ellipse cx="34" cy="34" rx="17" ry="11" fill="#F3F4F6"/>
        <ellipse cx="54" cy="39" rx="14" ry="9" fill="#F3F4F6"/>
        <ellipse cx="24" cy="43" rx="13" ry="8" fill="#F3F4F6"/>
        <ellipse cx="44" cy="46" rx="15" ry="9" fill="#F3F4F6"/>
        <path d="M26 58l-2 4M36 58l-2 4M46 58l-2 4M56 58l-2 4" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  cloud: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="55" cy="30" rx="12" ry="8" fill="#BFDBFE"/>
        <ellipse cx="35" cy="35" rx="18" ry="12" fill="#F3F4F6"/>
        <ellipse cx="55" cy="40" rx="15" ry="10" fill="#F3F4F6"/>
        <ellipse cx="25" cy="45" rx="14" ry="9" fill="#F3F4F6"/>
        <ellipse cx="45" cy="48" rx="16" ry="10" fill="#F3F4F6"/>
    </svg>`,
  rain: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="35" cy="35" rx="18" ry="12" fill="#F3F4F6"/>
        <ellipse cx="55" cy="40" rx="15" ry="10" fill="#F3F4F6"/>
        <ellipse cx="25" cy="45" rx="14" ry="9" fill="#F3F4F6"/>
        <ellipse cx="45" cy="48" rx="16" ry="10" fill="#F3F4F6"/>
        <path d="M25 58l-2 4M35 58l-2 4M45 58l-2 4M55 58l-2 4" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  snow: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="35" cy="35" rx="18" ry="12" fill="#F3F4F6"/>
        <ellipse cx="55" cy="40" rx="15" ry="10" fill="#F3F4F6"/>
        <ellipse cx="25" cy="45" rx="14" ry="9" fill="#F3F4F6"/>
        <ellipse cx="45" cy="48" rx="16" ry="10" fill="#F3F4F6"/>
        <circle cx="22" cy="62" r="2.5" fill="#93c5fd"/>
        <circle cx="35" cy="62" r="2.5" fill="#93c5fd"/>
        <circle cx="48" cy="62" r="2.5" fill="#93c5fd"/>
        <circle cx="61" cy="62" r="2.5" fill="#93c5fd"/>
    </svg>`,
  thunder: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="35" cy="35" rx="18" ry="12" fill="#F3F4F6"/>
        <ellipse cx="55" cy="40" rx="15" ry="10" fill="#F3F4F6"/>
        <ellipse cx="25" cy="45" rx="14" ry="9" fill="#F3F4F6"/>
        <ellipse cx="45" cy="48" rx="16" ry="10" fill="#F3F4F6"/>
        <path d="M42 52l-6 10h6l-3 10" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
};

function formatDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}

function getDayName(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function renderForecast(daily) {
  forecastEl.innerHTML = "";
  const count = Math.min(5, daily.time.length);

  for (let i = 0; i < count; i++) {
    const code = daily.weather_code[i];
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const dayName = getDayName(daily.time[i]);
    const info = weatherCodes[code] || { icon: "cloud" };
    let iconSvg = icons[info.icon] || icons.cloud;

    // Resize forecast icons to 50px
    iconSvg = iconSvg
      .replace(/width="80"/g, 'width="50"')
      .replace(/height="80"/g, 'height="50"');

    const dayDiv = document.createElement("div");
    dayDiv.className = "forecast-day";
    dayDiv.innerHTML = `
            <div class="day-name">${dayName}</div>
            <div class="forecast-icon">${iconSvg}</div>
            <div class="forecast-temps">
                <span class="high">${max}°</span>
                <span class="low">${min}°</span>
            </div>
        `;
    forecastEl.appendChild(dayDiv);
  }
}

async function getWeather(city) {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found. Please try again.");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    const info = weatherCodes[current.weather_code] || {
      desc: "overcast clouds",
      icon: "cloud",
    };

    cityEl.textContent = name;
    detailsEl.textContent = `${formatDate()}, ${info.desc}`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windEl.textContent = `${current.wind_speed_10m}km/h`;
    tempEl.innerHTML = `${Math.round(current.temperature_2m)}<span class="degree">°C</span>`;
    iconEl.innerHTML = icons[info.icon] || icons.cloud;

    renderForecast(weatherData.daily);
  } catch (error) {
    console.error(error);
    alert("Error fetching weather data. Please try again.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) getWeather(city);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) getWeather(city);
  }
});

getWeather("Paris");
