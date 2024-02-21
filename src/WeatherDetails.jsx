import React from "react";


/*Images */
import humidityIcon from "./images/humidity.png"
import windIcon from "./images/wind.png"


const WeatherDetails = ({icon,temp,city,country,lat,lon,humidity,wind}) => {
  return (
    <>
   <div className="image">
    <img src={icon} alt="Image" />
   </div>
   <div className="temp">{temp}°C</div>
   <div className="location">{city}</div>
   <div className="country">{country}</div>
   <div className="cord">
        <div>
            <span className='lat'>latitude</span>
            <span>{lat}</span>
        </div>
        <div>
            <span className='lon'>longitude</span>
            <span>{lon}</span>
        </div>
   </div>
   <div className="data-container">
    <div className="element">
        <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
        </div>
    </div>
    <div className="element">
        <img src={windIcon} alt="wind" className='icon'/>
        <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
        </div>
    </div>
   </div>
   
   </>
  )
}

export default WeatherDetails