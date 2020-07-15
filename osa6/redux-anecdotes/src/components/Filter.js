import React from 'react'
import { useDispatch } from 'react-redux'
import { editFilter } from '../reducers/filterReducer' 

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    dispatch(editFilter(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter