import React from 'react'

const WeatherBox = ({ weather }) => {
    const temp = weather?.main?.temp;
    return (
        <div className='weather-box'>
            <div>{weather?.name}</div>
            <h2>{temp}°C</h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    )
}

export default WeatherBox
