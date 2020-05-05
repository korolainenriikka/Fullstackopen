import React from 'react'

const Persons = ({personsToShow, deletePerson}) =>
<div>
  {personsToShow.map((person) =>       
    <p key={personsToShow.findIndex((p) => p.name === person.name)}>
      {person.name} {person.number}
      <button onClick={()=> deletePerson(person)}>delete</button>
    </p>
    
  )}
</div>

export default Persons