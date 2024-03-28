const ForecastDetails = ({ forecastData }) => {
  return (
    <>
      {/* Container for forecast details */}
      <div style={{ marginTop: "50px" }}>
        {/* Title showing the forecast city */}
        <h2>Forecast for {forecastData?.city?.name}</h2>
        {/* Table to display forecast details */}
        <table
          style={{
            margin: "auto",
            borderCollapse: "collapse",
            width: "80%",
            marginTop: "20px",
          }}
        >
          {/* Table header */}
          <thead>
            <tr style={{ backgroundColor: "#212529", color: "white" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Temperature (°C)
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Mapping through forecast data to display each forecast */}
            {forecastData?.list?.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                }}
              >
                {/* Date of the forecast */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(item.dt * 1000).toLocaleDateString()}
                </td>
                {/* Temperature of the forecast */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.main.temp}°C
                </td>
                {/* Description of the forecast */}
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.weather[0].description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ForecastDetails;
