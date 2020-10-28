import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_PERSONS, EDIT_BIRTHYEAR } from '../queries'
import Select from 'react-select'

const BirthyearForm = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [ changeBirthYear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_PERSONS } ],
    onError: (error) => {
      props.setErrorMessage(error.message)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 10000)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    const setBornTo = birthyear

    changeBirthYear({ variables: {name, setBornTo}})

    setName('')
    setBirthyear('')
  }


  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedOption}
          onChange={(target) => {
            setSelectedOption(target)
            setName(target.value)
          }}
          options={props.options}
        />
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm