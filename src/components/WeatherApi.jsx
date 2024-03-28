import { useState, useEffect } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import WeatherDisplay from "./WeatherDisplay";
import ForecastDetails from "./ForecastDetails";
import WeatherDetails from "./WeatherDetails";
import SunnyDay from "../resources/SunnyDay.gif";
import Cloudy from "../resources/Cloudy.gif";
import Rain from "../resources/Rain.gif";
import Snow from "../resources/Snow.gif";
import Thunder from "../resources/Thunder.gif";

export default function WeatherApi() {
  // State variables for weather data, forecast data, loading state, city input, and error handling
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  // Effect hook to fetch weather data for the initial city or user's current location
  useEffect(() => {
    // Fetch weather data for the initial city (e.g., user's current location)
    fetchData(city);
  }, []);

  useEffect(() => {
    // Update container height when window resizes
    function handleResize() {
      setContainerHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // State variable to manage container height
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  // Function to fetch weather data from the API
  const fetchData = async (cityName = "") => {
    setLoading(true);
    setError("");

    const apiKey = "d8c0f9e854a75ec649c71484de8323b1";
    let currentWeatherUrl = "";
    let forecastWeatherUrl = "";

    if (cityName) {
      // Construct URLs for current weather and forecast based on city name
      currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    } else {
      try {
        // Use geolocation to fetch weather for user's current location
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        setCity(""); // Reset city if user allows location access
      } catch (error) {
        console.error("Error getting user location:", error);
        setLoading(false);
        setError(
          <>
            <h5>
              You have disabled location service. Allow <strong>Stomify</strong>{" "}
              to access your location. Your current location will be used for
              calculating Real time weather.
            </h5>
          </>
        );
        return;
      }
    }

    try {
      // Fetch current weather and forecast data from the API
      const [currentWeatherResponse, forecastWeatherResponse] =
        await Promise.all([
          axios.get(currentWeatherUrl),
          axios.get(forecastWeatherUrl),
        ]);
      setWeatherData(currentWeatherResponse.data);
      setForecastData(forecastWeatherResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
      setError(
        "Error fetching weather data. Please try again or enter the correct spelling of the city. Thank you!"
      );
      // Clear weather data if error occurs

      setWeatherData(null);
      setForecastData(null);
    }
  };

  // Function to get user's current position using geolocation
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // Function to handle form submission for city search
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(city);
    setCity("");
  };

  // Function to get weather icon based on weather description
  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear":
        return <img src={SunnyDay} alt="Sunny Day" />;
      case "clouds":
        return <img src={Cloudy} alt="Cloudy" />;
      case "rain":
        return <img src={Rain} alt="Rain" />;
      case "snow":
        return <img src={Snow} alt="Snow" />;
      case "thunderstorm":
        return <img src={Thunder} alt="Thunder" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Input form to get city input from the user */}
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{
          background: "hsla(214, 92%, 47%, 1)",
          width: "100%",
          padding: "20px",
          height: "100px",
        }}
      >
        {/* Input form to get data from User */}
        <InputForm city={city} setCity={setCity} handleSubmit={handleSubmit} />

        {/* Display error message if there's any */}
        {error && (
          <div style={{ marginTop: "10px" }}>
            <h4>{error}</h4>
          </div>
        )}
      </div>

      {/* Main body section */}
      <div
        className="body"
        style={{
          height: loading || !weatherData ? `${containerHeight}px` : "auto",
          textAlign: "center",
          background: "hsla(214, 92%, 47%, 1)",
          width: "100%",
          padding: "10px",
        }}
      >
        {loading ? ( // Display loading message while fetching data
          <>
            <div style={{ marginTop: "100px" }}>
              <h5 style={{ padding: "10px" }}>Fetching weather data...</h5>
            </div>
          </>
        ) : (
          <>
            {/* Display weather data if available */}
            {weatherData && (
              <div style={{ margin: "50px" }}>
                {weatherData.weather[0].description &&
                  getWeatherIcon(weatherData.weather[0].main)}
                <WeatherDisplay weatherData={weatherData} />
              </div>
            )}
            {/* Display detailed weather information */}
            <WeatherDetails weatherData={weatherData} />
            {/* Display forecast data if available */}
            {forecastData && (
              <div style={{ marginBottom: "50px" }}>
                <ForecastDetails forecastData={forecastData} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
