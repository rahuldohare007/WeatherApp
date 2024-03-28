import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WeatherApi from "./components/WeatherApi";

// Main App component responsible for rendering the Navbar, WeatherApi, and Footer components
function App() {
  return (
    <>
      {/* Render the Navbar component */}
      <Navbar />
      {/* Render the WeatherApi component for weather information */}
      <WeatherApi />
      {/* Render the Footer component */}
      <Footer />
    </>
  );
}

export default App;
