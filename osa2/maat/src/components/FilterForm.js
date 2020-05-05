import React from 'react'

const CountryDetails = ( props ) => {
  return(
    <form>
      find countries <input
        value={props.filter}
        onChange={props.handleFilterChange}
      />
    </form> 
  )
}

export default CountryDetails