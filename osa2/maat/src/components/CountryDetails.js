import React from 'react'

const CountryDetails = ( props ) => {
  console.log(props)
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
    </div>
  )
}

export default CountryDetails