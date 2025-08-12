import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "620b573f549cc1575448451fe67503fb";

function App() {
  const [city, setCity] = useState("Lagos");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch weather by city name
  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
    setLoading(false);
  };

  
  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      });
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
    } catch (error) {
      console.error("Error fetching location weather:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="weather-app">
      <h1>🌦 Weather App</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Get Weather</button>
        <button onClick={fetchCurrentLocationWeather}>📍 My Location</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : weather && weather.main ? (
        <>
          <div className="weather-widget">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>

          <h3>5-Day Forecast</h3>
          <div className="forecast">
            {forecast.map((day, idx) => (
              <div key={idx} className="forecast-item">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>{Math.round(day.main.temp)}°C</p>
                <p>{day.weather[0].main}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>City not found.</p>
      )}
    </div>
  );
}

export default App;
