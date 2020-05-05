import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const personsToShow = 
    persons.filter((person)=>
      person.name.toLowerCase().includes(filter)
    ) 

  const addPerson = (event) =>{
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.find((person)=> person.name === newName)){
      window.alert(`${personObject.name} is already added to phonebook`)
    } else {
      event.preventDefault()
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })  

      setMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }  
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .del(person.id)
    }   

    setMessage(
      `Deleted ${person.name}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div> 
      <h2>Phonebook</h2>
      <Notification message={message} />
      <FilterForm 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>   
    </div>
  )

}

export default App