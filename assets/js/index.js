"use strict";

let isCelsiiDegree = true;
const tempUnitBtn = document.getElementById("tempUnitBtn");

tempUnitBtn.onclick = switchTemperatureUnit;

function switchTemperatureUnit() {
  isCelsiiDegree = !isCelsiiDegree;
  updateData();
}
updateData();

function updateData() {
  tempUnitBtn.textContent = `Switch to ${isCelsiiDegree ? "F" : "C"}`;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&timezone=auto${
    isCelsiiDegree ? "" : "&temperature_unit=fahrenheit"
  }`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => generateWeather(data))
    .catch((err) => console.log("error: ", err));
}

function generateWeather({
  current_weather: { temperature, windspeed },
  current_weather_units: { temperature: tempUnit, windspeed: windUnit },
}) {
  const currentTemperatureEl = document.querySelector(".temp");
  currentTemperatureEl.textContent = `${temperature} ${tempUnit}`;
  currentTemperatureEl.style.color = calcTemperatureColor(temperature);

  const currentWindSpeed = document.querySelector(".wind");
  currentWindSpeed.textContent = `${windspeed} ${windUnit}`;
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
