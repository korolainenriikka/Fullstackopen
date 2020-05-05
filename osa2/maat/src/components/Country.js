import React from 'react'
import CountryDetails from './CountryDetails'

const showCountryDetails = ({ country }) =>{
  return(
    <CountryDetails country={country}/>
  )
}

const Country = ({ country }) => {
  return(
    <>{country.name} <button 
      onAction={() => showCountryDetails({country})}>show</button>
    <br/>
  </>
  )
}
  


export default Country