import React from 'react'

const WeatherBox = ({ weather }) => {
    console.log("weather", weather)
    let celsius = weather?.main?.temp;
    let convertToF = Math.round(celsius * 9 / 5 + 32);
    return (
        <div className='weather-box'>
            <div>{weather?.name}</div>
            <h2>{celsius}C / {convertToF}F</h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    )
}

export default WeatherBox
