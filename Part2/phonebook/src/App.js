import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }

        if (persons.map(name =>
          name.name)
          .includes(newName)) {
          errorMessage()
        }
        else {
        setPersons(persons.concat(personObject))
        setNewName("")}
    }

    const errorMessage = () => {
      let message =`${newName} is already added to phonebook`
      window.alert(message)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <div key={person.name}>
                    {person.name}
                </div>
            )}
        </div>
    )
}

export default App
