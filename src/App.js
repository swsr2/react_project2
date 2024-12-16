import { use, useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";
//1. 앱이실행되자마자 현재 위치 기반 날씨(도시,섭씨,화씨,상태)
//2. 다른 지역 버튼(1개는 현재, 나머지는 다른도시)
//3. 버튼을 누르면 다른 위치 날씨 보인다 
//4. 현재위치 버튼누르면 다시 현재위치기반의 날씨가 보인다.
//5. 데이터 버퍼링시 로딩스피너 돈다. 

const API_KEY = '62ea77f7fa18b4a59c6a0f031c0ae87c'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('') //부모가 모든 state 가지고있는다
  const [loading, setLoading] = useState(false)
  const [apiError, setAPIError] = useState("");
  const cities = ['Tokyo', 'Switzerland', 'Cancun', 'New york']


  // 현재위치 
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json();
      // console.log("ddd", data)
      setWeather(data)
      setLoading(false)
    } catch (err) {
      setAPIError(err.message)
      setLoading(false)
    }
  }

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json();
      console.log("새로운위치", data)
      setWeather(data)
      setLoading(false)
    } catch (err) {
      setAPIError(err.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    if (city == "") {
      setLoading(true)
      getCurrentLocation()
    } else {
      setLoading(true)
      getWeatherByCity()
    }
  }, [city])

  return (
    <div>
      {loading ? <div className='container'><ClipLoader
        color="#f88c6b"
        loading={loading}
        size={150}
      /></div> : <div className='container'>

        <WeatherBox weather={weather} />
        {/* 함수도 넘길수 있음 */}
        <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation} />
      </div>}
    </div>

  );
}

export default App;
