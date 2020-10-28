import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_PERSONS } from '../queries'
import BirthyearForm from './BirthyearForm'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const [options, setOptions] = useState([])

  const result = useQuery(ALL_PERSONS)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
      setOptions(result.data.allAuthors.map(a => { 
        return (
          {
            "value": a.name,
            "label": a.name
          }
        ) 
      }))
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthyearForm setErrorMessage={props.setErrorMessage} options={options}/>
    </div>
  )
}

export default Authors
