import { FaLocationDot } from "react-icons/fa6";

// WeatherDisplay component to show current weather information
const WeatherDisplay = ({ weatherData }) => {
  return (
    <>
      <div style={{ margin: "50px" }}>
        {/* Display weather description */}
        <h3>
          {/* Capitalize the first letter of each word in the weather description */}
          {weatherData.weather[0].description.replace(/\b\w/g, (match) =>
            match.toUpperCase()
          )}
        </h3>
        {/* Display current temperature */}
        <h1 style={{ color: "whitesmoke", fontSize: "50px" }}>
          {weatherData.main.temp}°C
        </h1>
        {/* Display city name and country */}
        <h3>
          <FaLocationDot />
          {weatherData.name}, {weatherData.sys.country}
        </h3>
      </div>
    </>
  );
};

export default WeatherDisplay;
