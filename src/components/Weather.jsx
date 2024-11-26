import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
    }
  };

  return (
    <div>
      <h1>Weather Now</h1>
      <div>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p style={{ color: "#840101" }}>{error}</p>}

      {weather && (
        <div>
          <h2>Weather in {weather.address}</h2>
          <p>Temperature: {weather.currentConditions.temp} °C</p>
          <p>Condition: {weather.currentConditions.conditions}</p>
          <p>Humidity: {weather.currentConditions.humidity}%</p>
          <p>Wind Speed: {weather.currentConditions.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
