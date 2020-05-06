import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ( props ) => {
  const [weather, setWeather] = useState(null) 

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  console.log(weather)
 
  console.log(props)
  if (weather === null){
    return <></>
  } else {
    console.log(weather.current.weather_icons[0])
    return(
      <div>
        <h1>{props.country.name}</h1>
        <p>
          capital {props.country.capital}<br/>
          population {props.country.population}<br/>
        </p>
        <h2>languages</h2>
        <ul>
          {props.country.languages.map((language,i) =>
            <li key={i}>{language.name}</li>
          )}
        </ul>
        <img alt="country flag" src={props.country.flag} height="100" preserveratio="true"/>
        <h2>weather in {props.country.capital}</h2>
        <p><strong>temperature: </strong> { weather.current.temperature } Celcius</p>
        <img src={ weather.current.weather_icons[0]} height="50" />
          <p><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  }
  
}

export default CountryDetails

