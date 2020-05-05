import React from 'react'
import Country from './Country'

const Countries = ( props ) => {
  return(
    <p>
    {props.countries.map((country, i) =>
      <Country key={i} country ={country} />
    )}
    </p>
  )
}

export default Countries