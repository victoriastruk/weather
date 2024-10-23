"use strict";

const weatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&timezone=auto";

fetch(weatherUrl)
  .then((response) => response.json())
  .then((data) => generateWeather(data))
  .catch((err) => console.log("error: ", err));

//відобразити на сторінці поточну температуру з одиницею виміру
//відобразити темп.від'ємну синів кольором, 0 чорним
// додатню до 40 - зеленим, >=40 - червоним
// відобразити швидкість вітру з одиницею виміру
function generateWeather({
  current_weather: { temperature, windspeed },
  current_weather_units: { temperature: tempUnit, windspeed: windUnit },
}) {
  const currentTemperatureEl = document.createElement("div");
  currentTemperatureEl.textContent = `${temperature} ${tempUnit}`;
  currentTemperatureEl.style.color = calcTemperatureColor(temperature);

  const currentWindSpeed = document.createElement("div");
  currentWindSpeed.textContent = `${windspeed} ${windUnit}`;
  document.body.append(currentTemperatureEl, currentWindSpeed);
}

function calcTemperatureColor(temperature) {
  if (temperature < 0) {
    return "blue";
  } else if (temperature === 0) {
    return "black";
  } else if (temperature > 0 && temperature < 40) {
    return "green";
  } else {
    return "red";
  }
}
