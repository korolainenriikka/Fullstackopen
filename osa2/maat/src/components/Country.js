import React from 'react'

const Country = ({ country , setFilter}) => {
  return(
    <>{country.name} <button 
      onClick={() => {setFilter(country.name)}}>show</button>
    <br/>
  </>
  )
}
  


export default Country