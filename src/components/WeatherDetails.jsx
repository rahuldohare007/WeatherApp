import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

// WeatherDetails component for displaying humidity and wind speed
const WeatherDetails = ({ weatherData }) => {
  return (
    <>
      {/* Container for weather details */}
      <div
        className="d-flex justify-content-around"
        style={{ width: "40%", marginLeft: "470px", marginTop: "50px" }}
      >
        {/* Check if weatherData exists before rendering */}
        {weatherData && (
          <>
            {/* Humidity section */}
            <div
              style={{
                height: "80px",
                backgroundColor: "#212529",
                padding: "0 10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              {/* Humidity icon */}
              <WiHumidity />
              <br />
              {/* Humidity value */}
              {weatherData.main.humidity}%<br />
              {/* Label for humidity */}
              HUMIDITY
            </div>
            {/* Wind speed section */}
            <div
              style={{
                height: "80px",
                backgroundColor: "#212529",
                padding: "0 10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              {/* Wind speed icon */}
              <FaWind />
              <br />
              {/* Wind speed value */}
              {weatherData.wind.speed} km/hr
              <br />
              {/* Label for wind speed */}
              WIND SPEED
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherDetails;
