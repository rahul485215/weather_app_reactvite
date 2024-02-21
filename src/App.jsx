import React from 'react'
import { useState,useEffect } from 'react'
import './App.css'
import Search from './Search'
import Error from './Error'
import WeatherDetails from './WeatherDetails'

//Images
import clear_day from "./images/clear_day.jpg"
import clear_night from "./images/clear_night.jpg"
import cloudy_day from "./images/cloudy_day.jpg"
import cloudy_night from "./images/cloudy_night.jpg"
import drizzle_day from "./images/drizzle_day.jpg"
import drizzle_night from "./images/drizzle_night.jpg"
import humidity_day from "./images/humidity_day.jpg"
import humidity_night from "./images/humidity_night.jpg"
import rainy_day from "./images/rainy_day.jpg"
import rainy_night from "./images/rainy_night.jpg"
import snow_day from "./images/snow_day.jpg"
import snow_night from "./images/snow_night.jpg"

const App = () => {
  const [icon,setIcon]=useState(null)
  const [temp, setTemp] = useState(0)
  const [city,setCity] = useState("")
  const [country,setCountry] = useState("")
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [humidity,setHumidity] = useState(0)
  const [wind,setWind] = useState(0)
  const [text,setText] = useState("")
  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const weatherIconMap = {
    "01d": clear_day,
    "01n": clear_night,
    "02d": cloudy_day,
    "02n": cloudy_night,
    "03d": drizzle_day,
    "03n": drizzle_night,
    "04d": drizzle_day,
    "04n": drizzle_night,
    "09d": rainy_day,
    "09n": rainy_night,
    "10d": rainy_day,
    "10n": rainy_night,
    "13d": snow_day,
    "13n": snow_night,
    "50d": humidity_day,
    "50n": humidity_night
  }

  const search = async () =>{
    if(!text) return;
    setLoading(true)
    let api_key="0d4d1bd44d42caccb72990c62469ee78"
    let URL=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

    try{
        let response= await fetch(URL)
        let data = await response.json();
        if(data.cod ==="404"){
          console.error("City not found")
          setCityNotFound(true);
          setLoading(false)
          setText("")
          return;
        }

        setCity(data.name);
        setTemp(Math.floor(data.main.temp))
        setHumidity(data.main.humidity)
        setWind(data.wind.speed)
        setCountry(data.sys.country)
        setLat(data.coord.lat)
        setLon(data.coord.lon)

        const weatherIconCode = data.weather[0].icon
        setIcon( weatherIconMap[weatherIconCode] || clear_day)
        setCityNotFound(false)
        setText("")


    }catch(err){
        console.error("An error occurred:",err.message)
        setError("An error occurred, while fetching the weather details...")
    }finally{
        setTimeout(() => {
          setLoading(false);
        },1000); 
    }
}
const handleCity = (e) =>{
  e.preventDefault()
    setText(e.target.value)
}

const handleKeyDown = (e) =>{
  if (e.key==='Enter'){
    e.preventDefault()
    search();
    setText("")
  }
}

useEffect(function (){
  search();
},[])

  return (
  
<div className="container">
  <Search
  text={text}
  handleCity={handleCity}
  handleKeyDown={handleKeyDown}
  search={search}
  />

{city && (
       <>
          {!loading && !error && !cityNotFound && (
            <WeatherDetails
              icon={icon}
              temp={temp}
              city={city}
              country={country}
              lat={lat}
              lon={lon}
              humidity={humidity}
              wind={wind}
              />
              )}
            
          </>
)}
          {(loading || error || cityNotFound) && (
            <Error
              loading={loading}
              error={error}
              cityNotFound={cityNotFound}
            />
          )}
        
        
</div>
  )
}

export default App