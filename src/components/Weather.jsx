import React, { useState } from "react";
import axios from "axios";

/*export default function Weather() {
  return (
    <main>
      <WeatherAPI />
      <h1>Todays Weather</h1>
      <div className="location">
        <h2>My location: </h2>
        <p>Wagga Wagga</p>
      </div>
      <div className="temperature">
        <h2>26C</h2>
        <h3>Sunny</h3>
        <h4>L:11 / H:26</h4>
      </div>
    </main>
  );
}*/
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

      {error && <p style={{ color: "red" }}>{error}</p>}

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
