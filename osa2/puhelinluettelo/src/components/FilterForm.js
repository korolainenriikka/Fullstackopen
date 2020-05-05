import React from 'react'

const FilterForm = (props) =>
<p>
  filter shown with 
  <input
    value={props.filter}
    onChange={props.handleFilterChange}
  />
</p>

export default FilterForm