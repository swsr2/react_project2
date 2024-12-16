import React from 'react'
import { Button } from 'react-bootstrap';

// 배열, 함수 받아옴
const WeatherButton = ({ cities, setCity, getCurrentLocation }) => {
    console.log(cities)
    return (
        <div>
            <Button variant={`${setCity == null ? "outline-warning" : "warning"}`} onClick={getCurrentLocation}>현재위치</Button>
            {cities.map((item, index) => (
                <Button variant={`${setCity == item ? "outline-warning" : "warning"}`} key={index} onClick={() => setCity(item)} >{item}</Button>
            ))}
        </div>
    )
}

export default WeatherButton
