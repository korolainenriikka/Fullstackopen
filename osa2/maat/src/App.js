import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails.js'
import FilterForm from './components/FilterForm.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
    
  const countriesToShow = countries.filter((country)=>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )


  if( countriesToShow.length > 10){
    return (
      <div>
        <FilterForm filter={filter} handleFilterChange={handleFilterChange}/>
        <p>
          Too many matches, please specify another filter
        </p>
      </div>
    )
  } else if (countriesToShow.length === 1){
    return (
      <div>
        <FilterForm filter={filter} handleFilterChange={handleFilterChange}/> 
        <CountryDetails country={countriesToShow[0]} />
      </div> 
    )
  } else {
    return (
      <div>
        <FilterForm filter={filter} handleFilterChange={handleFilterChange}/>
        <Countries countries={countriesToShow} setFilter={setFilter}/>
      </div>
    )
  }
}
  

export default App 