import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import WeatherBox from "./component/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";

const API_KEY = "62ea77f7fa18b4a59c6a0f031c0ae87c";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setAPIError] = useState("");
  const [cityInput, setCityInput] = useState("");

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setAPIError("");
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async (cityName) => {
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "404") {
        setAPIError(`'${cityName}' is not a valid city.`);
        setWeather(null);
      } else {
        setWeather(data);
        setAPIError("");
      }
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityInput) {
      getWeatherByCity(cityInput);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        </div>
      ) : (
        <div className="container">
          <div className="search-container">
            <Form onSubmit={handleSearch} className="d-flex w-100">
              <Form.Control
                type="text"
                placeholder="도시를 입력하세요"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="me-2"
              />
              <Button variant="primary" type="submit" className="search-button ">
                검색
              </Button>
              <Button
                variant="info"
                onClick={getCurrentLocation}
                className="text-white current-location-button"
              >
                현재 위치
              </Button>
            </Form>
          </div>
          <div className="weather-app-container">
            {weather ? (
              <WeatherBox weather={weather} />
            ) : (
              apiError && <div className="error-message">{apiError}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
