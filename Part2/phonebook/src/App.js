import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(name =>
      name.name)
      .includes(newName)) {
      errorMessage()
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const errorMessage = () => {
    let message = `${newName} is already added to phonebook`
    window.alert(message)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showMatches = () => {

    let copyOfPersons = [...persons]
    let copyOfFilter = newFilter

    let personObjects = copyOfPersons.filter(s => s.name.toUpperCase()
      .includes(copyOfFilter.toUpperCase()))

    if (copyOfFilter.length === 0) {
      return []
    }

    return personObjects
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={newFilter}
          onChange={handleFilterChange} />
      </div>
      <h2>
        add a new
            </h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {showMatches()
          .map(line => {
            return (
              <div key={line.name}>
                {line.name}
                {" "}
                {line.number}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default App
